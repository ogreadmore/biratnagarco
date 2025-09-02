(function () {
  const byId = (id) => document.getElementById(id);
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  const phone = document.body.getAttribute('data-phone') || '';
  const whatsapp = document.body.getAttribute('data-whatsapp') || '';
  const email = qs('#lead-form')?.getAttribute('data-email') || 'hello@biratnagar.co';

  const telHref = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '#';
  const waHref = whatsapp ? `https://wa.me/${whatsapp.replace(/[^+\d]/g, '').replace(/^\+/, '')}` : '#';

  const setHref = (id, href) => { const el = byId(id); if (el) el.setAttribute('href', href); };

  ['cta-call','band-call','direct-call','foot-call'].forEach(id => setHref(id, telHref));
  ['cta-whatsapp','band-whatsapp','direct-whatsapp','foot-whatsapp'].forEach(id => setHref(id, waHref));
  const primaryCTA = byId('hero-primary-cta');
  if (primaryCTA) primaryCTA.addEventListener('click', (e) => {
    const target = byId('contact');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const nav = qs('.site-nav');
  const toggle = qs('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  qsa('.reveal').forEach((el) => io.observe(el));

  const leadForm = byId('lead-form');
  const leadWhatsApp = byId('lead-whatsapp');

  function buildMessage() {
    const name = byId('name')?.value?.trim() || '';
    const phoneVal = byId('phone')?.value?.trim() || '';
    const service = byId('service')?.value || '';
    const details = byId('details')?.value?.trim() || '';
    const lines = [
      `New request via biratnagar.co`,
      `Name: ${name}`,
      `Phone: ${phoneVal}`,
      `Service: ${service}`,
      details ? `Details: ${details}` : ''
    ].filter(Boolean);
    return lines.join('\n');
  }

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = encodeURIComponent('Service Request - biratnagar.co');
      const body = encodeURIComponent(buildMessage());
      const href = `mailto:${email}?subject=${subject}&body=${body}`;
      window.location.href = href;
    });
  }

  if (leadWhatsApp) {
    leadWhatsApp.addEventListener('click', () => {
      const text = encodeURIComponent(buildMessage());
      if (waHref && waHref !== '#') {
        window.open(`${waHref}?text=${text}`, '_blank');
      }
    });
  }

  const y = new Date().getFullYear();
  const yearEl = byId('year');
  if (yearEl) yearEl.textContent = String(y);
 
  // Simple i18n
  const I18N = {
    en: {
      nav_about: 'About', nav_services: 'Services', nav_how: 'How It Works', nav_why: 'Why Us', nav_trust: 'Trust', nav_contact: 'Contact',
      cta_whatsapp: 'WhatsApp', cta_call: 'Call Now', cta_request: 'Request a Callback', cta_explore: 'Explore Services',
      cta_email: 'Email',
      hero_h1: 'One Call. Trusted People. Jobs Done.',
      hero_lead: 'From factory runs to home fixes—get vetted local pros coordinated by one trusted contact. Fast quotes. Clear pricing. No hassle.',
      badge_vetted: 'Vetted network', badge_pricing: 'Transparent pricing', badge_contact: 'Single contact',
      rates_title: 'Popular Rates', rate_freight: 'Local Freight (within city)', rate_taxi: 'Airport Taxi (pickup/drop)', rate_suv: 'SUV Day Hire', rate_repairs: 'Repairs Call‑out', rates_note: 'Quick quotes. Transparent fees. Same‑day options.',
      services_title: 'Services That Move Biratnagar', services_sub: 'Built for the city’s industrial backbone and everyday needs. Highest‑impact offers first.',
      svc1_title: 'Local Freight & Goods Transport', svc1_desc: 'Fast, reliable local moves for factories and traders—first/last‑mile within Sunsari‑Morang. You get a vetted driver, right vehicle, and live updates.', svc1_b1: 'Fast quotes and same‑day options', svc1_b2: 'Right vehicle for your load', svc1_b3: 'Live updates from pickup to delivery', svc1_cta: 'Book a Truck',
      svc2_title: 'On‑Demand Private Security', svc2_desc: 'Trusted guards for events, shops, and sites. Ex‑service personnel where possible; rapid, temporary coverage or recurring shifts.', svc2_b1: 'Verified guards with clear briefings', svc2_b2: 'Emergency, night, and short‑notice cover', svc2_b3: 'Punctual reporting and simple SOPs', svc2_cta: 'Request Security',
      svc3_title: 'Specialized Vehicle & Driver Hire', svc3_desc: 'SUVs, Jeeps, vans and sedans for tourism and business. Local pros who know the routes and the roads.', svc3_b1: 'Clean vehicles, polite local drivers', svc3_b2: 'Airport and hotel‑friendly coordination', svc3_b3: 'Fixed pricing and clear wait rules', svc3_cta: 'Hire a Vehicle',
      svc4_title: 'Home & Commercial Repair Hub', svc4_desc: 'Skilled, vetted electricians, plumbers, carpenters and painters. One contact for reliable fixes—residential or business.', svc4_b1: 'Skilled, vetted technicians', svc4_b2: 'Same‑day emergency options', svc4_b3: 'Before/after photo updates', svc4_cta: 'Request a Pro',
      svc5_title: 'Event Support & Logistics', svc5_desc: 'Staff, decor, guest transport, and on‑site coordination. One reliable subcontractor for complex events.', svc5_b1: 'Fast vendor matchmaking', svc5_b2: 'One plan, one point of contact', svc5_b3: 'Smooth on‑the‑day coordination', svc5_cta: 'Plan Support',
      svc6_title: 'Tour Guide Service', svc6_desc: 'Curated local tours to Ilam tea gardens, Koshi Tappu, Dhankuta, and cultural spots—safe drivers, friendly guides, clear pricing.', svc6_b1: 'Friendly local guides', svc6_b2: 'Tea, nature, and culture itineraries', svc6_b3: 'Safe drivers, clear pricing', svc6_cta: 'Book a Guide',
      hiw_title: 'How It Works', hiw_sub: 'Simple, accountable, and fast—from your first call to job completion.',
      hiw_s1_t: '1. Tell us the need', hiw_s1_d: 'Share the what, where, and when.', hiw_s2_t: '2. We match the right pro', hiw_s2_d: 'From a vetted roster with availability.', hiw_s3_t: '3. Live updates', hiw_s3_d: 'Pickup ETA, on‑site status, completion.', hiw_s4_t: '4. Clear payment', hiw_s4_d: 'Transparent fees with receipt.',
      why_title: 'Why OneCall Biratnagar', why_sub: 'Local knowledge, vetted network, and single‑contact accountability.',
      why_lede: 'We remove the friction from getting work done. With OneCall, you talk to one person, receive a clear quote, and a vetted professional shows up. No chasing drivers, guards, or tradespeople—just dependable coordination across Biratnagar’s industrial corridor and neighborhoods.',
      why_c1_l: 'Local advantage:', why_c1_d: 'decades of route and vendor knowledge.', why_c2_l: 'Vetted network:', why_c2_d: 'quality you can trust, fast.', why_c3_l: 'Single contact:', why_c3_d: 'no more calling 10 numbers.', why_c4_l: 'B2B ready:', why_c4_d: 'factories, warehouses, hotels, venues.',
      test_title: 'What Clients Say', test_sub: 'Proof you can count on.',
      contact_title: 'Request a Callback', contact_sub: 'Share a few details and we’ll call you back with availability and a clear quote.',
      label_name: 'Your Name', label_phone: 'Phone', label_service: 'Service Needed', label_details: 'Details', btn_email: 'Send via Email', btn_whatsapp: 'Send via WhatsApp', form_note: 'No spam. We only use your details to coordinate your request.',
      foot_brand: 'OneContact convenience for freight, security, repairs, vehicles, and events—built on a vetted local network. Fast quotes, clear pricing, and a single accountable coordinator so you never chase providers again.',
      foot_quick: 'Quick Links', foot_contact: 'Contact', foot_serving: 'Serving industry, SMEs, and families across the Sunsari‑Morang corridor.',
      about_title: 'About OneCall Biratnagar',
      about_p1: 'OneCall Biratnagar makes logistics and services simple for businesses and families across the Sunsari‑Morang corridor. One trusted coordinator handles your request end‑to‑end—so you get fast quotes, clear updates, and the right professional for the job.',
      about_p2: 'Founder: Rajendra Bhattarai is a Biratnagar local with deep route knowledge and a vetted network of drivers, guards, and tradespeople. His focus is reliability, transparent pricing, and friendly service you can count on.',
      about_alt: 'Rajendra Bhattarai, Founder of OneCall Biratnagar',
      contact_area: 'Service Area', contact_hours: 'Hours', contact_lines: 'Direct Lines', contact_social: 'Social'
    },
    ne: {
      nav_about: 'हाम्रो बारे', nav_services: 'सेवाहरू', nav_how: 'यो कसरी काम गर्छ', nav_why: 'किन हामी', nav_trust: 'विश्वास', nav_contact: 'सम्पर्क',
      cta_whatsapp: 'Whatsapp', cta_call: 'अहिले कल गर्नुहोस्', cta_request: 'कलब्याकको लागि अनुरोध', cta_explore: 'सेवाहरू हेर्नुहोस्', cta_email: 'इमेल',
      hero_h1: 'एक कल। भरपर्दा मान्छे। काम सम्पन्न।',
      hero_lead: 'कारखानाबाट घर मर्मतसम्म—एक विश्वसनीय सम्पर्कमार्फत प्रमाणित स्थानीय प्रोहरू। छिटो कोट। स्पष्ट मूल्य। झन्झटबिनाको सेवा।',
      badge_vetted: 'प्रमाणित सञ्जाल', badge_pricing: 'पारदर्शी मूल्य', badge_contact: 'एकल सम्पर्क',
      rates_title: 'लोकप्रिय दर', rate_freight: 'स्थानीय माल ढुवानी (सहर भित्र)', rate_taxi: 'विमानस्थल ट्याक्सी (पिकअप/ड्रप)', rate_suv: 'एसयूभी दैनिक भाडा', rate_repairs: 'मर्मत कल‑आउट', rates_note: 'छिटो कोट। पारदर्शी शुल्क। आजकै सेवा विकल्प।',
      services_title: 'बिराटनगरका लागि सेवाहरू', services_sub: 'औद्योगिक आधार र दैनिकीका आवश्यकताका लागि बनाइएका सेवाहरू।',
      svc1_title: 'स्थानीय माल र सामान ढुवानी', svc1_desc: 'कारखाना र व्यापारीका लागि द्रुत र भरपर्दा स्थानीय ढुवानी—सुनसरी‑मोरङ भित्र पहिलो/अन्तिम‑माइल समन्वय।', svc1_b1: 'छिटो कोट र आजकै विकल्प', svc1_b2: 'लोडअनुसार सही सवारी', svc1_b3: 'पिकअपदेखि डेलिभरीसम्म लाइभ अपडेट', svc1_cta: 'ट्रक बुक गर्नुहोस्',
      svc2_title: 'मागअनुसार निजी सुरक्षा', svc2_desc: 'कार्यक्रम, पसल र साइटहरूका लागि विश्वासिलो गार्डहरू। सम्भव भएमा पूर्व‑सेनानी; आपतकालीन वा नियमित सिफ्ट।', svc2_b1: 'प्रमाणित गार्ड र स्पष्ट ब्रीफिङ', svc2_b2: 'आपतकालीन/राति/छोटो‑सूचना कभर', svc2_b3: 'समयमै रिपोर्ट र सरल SOP', svc2_cta: 'सुरक्षा अनुरोध गर्नुहोस्',
      svc3_title: 'विशेष सवारी र चालक भाडा', svc3_desc: 'पर्यटन र व्यवसायका लागि SUV, जीप, भ्यान र सेडान। मार्ग र सडक चिनेका स्थानीय प्रोहरू।', svc3_b1: 'सफा सवारी, सभ्य स्थानीय ड्राइभर', svc3_b2: 'एयरपोर्ट/होटल‑मैत्री समन्वय', svc3_b3: 'फिक्स्ड मूल्य र स्पष्ट प्रतीक्षा नियम', svc3_cta: 'सवारी भाडा गर्नुहोस्',
      svc4_title: 'घर र व्यावसायिक मर्मत सेवा', svc4_desc: 'सीपयुक्त इलेक्ट्रिसियन, प्लम्बर, काठे काम र पेन्ट। एउटै सम्पर्कबाट भरपर्दा मर्मत।', svc4_b1: 'सीपयुक्त, प्रमाणित प्राविधिक', svc4_b2: 'उही दिन आपतकालीन विकल्प', svc4_b3: 'पहिले/पछि फोटो अपडेट', svc4_cta: 'प्रो बोलाउनुहोस्',
      svc5_title: 'इभेन्ट सहयोग र लगिस्टिक्स', svc5_desc: 'स्टाफ, डेकोर, पाहुना यातायात र अन‑साइट समन्वय—जटिल इभेन्टका लागि एकै ठाउँको समाधान।', svc5_b1: 'छिटो भेन्डर म्याच', svc5_b2: 'एक योजना, एक सम्पर्क', svc5_b3: 'इभेन्ट‑दिनको सहज समन्वय', svc5_cta: 'सहयोग योजना',
      svc6_title: 'टुर गाइड सेवा', svc6_desc: 'इलाम चिया बगान, कोशी टप्पु, धनकुटा र सांस्कृतिक स्थानका क्युरेटेड भ्रमण—सुरक्षित चालक, मैत्री गाइड, स्पष्ट मूल्य।', svc6_b1: 'मैत्री स्थानीय गाइड', svc6_b2: 'चिया/प्रकृति/संस्कृति कार्यक्रम', svc6_b3: 'सुरक्षित चालक, स्पष्ट मूल्य', svc6_cta: 'गाइड बुक गर्नुहोस्',
      hiw_title: 'यो कसरी काम गर्छ', hiw_sub: 'पहिलो फोनबाट काम सकिएसम्म—छिटो र जिम्मेवार समन्वय।',
      hiw_s1_t: '१. आवश्यकताबारे बताउनुहोस्', hiw_s1_d: 'के, कहाँ, कहिले—छोटोमा सेयर गर्नुहोस्।', hiw_s2_t: '२. ठीक प्रो म्याच गर्छौं', hiw_s2_d: 'उपलब्ध प्रमाणित सञ्जालबाट।', hiw_s3_t: '३. लाइभ अपडेट', hiw_s3_d: 'पिकअप ETA, साइट स्टाटस, कम्प्लिसन।', hiw_s4_t: '४. स्पष्ट भुक्तानी', hiw_s4_d: 'रसीदसहित पारदर्शी शुल्क।',
      why_title: 'किन OneCall बिराटनगर', why_sub: 'स्थानीय ज्ञान, प्रमाणित सञ्जाल, र एकल सम्पर्कद्वारा जिम्मेवारी।',
      why_lede: 'काम गराउने झन्झट हटाउँछौं। OneCall मा तपाईं एक जनासँग कुरा गर्नुहुन्छ, स्पष्ट कोट पाउनुहुन्छ, र प्रमाणित प्रो समयमै पुग्छ।',
      why_c1_l: 'स्थानीय फाइदा:', why_c1_d: 'मार्ग र विक्रेता ज्ञानको दशकौँ अनुभव।', why_c2_l: 'प्रमाणित सञ्जाल:', why_c2_d: 'द्रुत र भरपर्दा गुणस्तर।', why_c3_l: 'एकल सम्पर्क:', why_c3_d: '१० वटा नम्बर डायलको झन्झट छैन।', why_c4_l: 'B2B तयार:', why_c4_d: 'कारखाना, गोदाम, होटल, स्थल।',
      test_title: 'ग्राहकहरू के भन्छन्', test_sub: 'विश्वास गर्न सकिने प्रमाण।',
      contact_title: 'कलब्याकको लागि अनुरोध', contact_sub: 'केही विवरण दिनुहोस्—उपलब्धता र स्पष्ट कोटसहित हामी फोन गर्छौं।',
      label_name: 'तपाईंको नाम', label_phone: 'फोन', label_service: 'आवश्यक सेवा', label_details: 'विवरण', btn_email: 'इमेलमार्फत पठाउनुहोस्', btn_whatsapp: 'Whatsapp मार्फत पठाउनुहोस्', form_note: 'स्पाम हुँदैन। तपाईंका विवरण केवल समन्वयका लागि मात्र।',
      foot_brand: 'ढुवानी, सुरक्षा, मर्मत, सवारी र इभेन्टका लागि OneContact सुविधा—प्रमाणित स्थानीय सञ्जालमा आधारित। छिटो कोट, स्पष्ट मूल्य, र एकल उत्तरदायी समन्वय।',
      foot_quick: 'द्रुत लिङ्क', foot_contact: 'सम्पर्क', foot_serving: 'सुनसरी‑मोरङ क्षेत्रमा उद्योग, SME र परिवारहरूलाई सेवा।',
      about_title: 'OneCall बिराटनगरबारे',
      about_p1: 'OneCall बिराटनगरले व्यवसाय र परिवारका लागि ढुवानी र सेवाहरू सजिलो बनाउँछ। एउटै विश्वसनीय समन्वयकर्ताले अनुरोध सुरुदेखि अन्त्यसम्म सम्हाल्छ—छिटो कोट, स्पष्ट अपडेट, र सही प्रो।',
      about_p2: 'संस्थापक: राजेन्द्र भट्टराई—स्थानीय मार्ग ज्ञान र प्रमाणित ड्राइभर, गार्ड र प्राविधिकहरूको सञ्जालसँग। प्राथमिकता: भरपर्दा सेवा, पारदर्शी मूल्य, मैत्री व्यवहार।',
      about_alt: 'OneCall बिराटनगरका संस्थापक राजेन्द्र भट्टराई',
      contact_area: 'सेवा क्षेत्र', contact_hours: 'समय', contact_lines: 'डाइरेक्ट लाइन', contact_social: 'सोसल'
    },
    hi: {
      nav_about: 'हमारे बारे में', nav_services: 'सेवाएँ', nav_how: 'यह कैसे काम करता है', nav_why: 'क्यों हम', nav_trust: 'विश्वास', nav_contact: 'संपर्क',
      cta_whatsapp: 'व्हाट्सऐप', cta_call: 'अभी कॉल करें', cta_request: 'कॉल बैक का अनुरोध', cta_explore: 'सेवाएँ देखें', cta_email: 'ईमेल',
      hero_h1: 'एक कॉल. भरोसेमंद लोग. काम पूरा.',
      hero_lead: 'फ़ैक्टरी रन से घर की मरम्मत तक—एक विश्वसनीय संपर्क के माध्यम से सत्यापित स्थानीय प्रो. तेज़ कोट. स्पष्ट मूल्य. बिना झंझट।',
      badge_vetted: 'सत्यापित नेटवर्क', badge_pricing: 'पारदर्शी कीमत', badge_contact: 'एकल संपर्क',
      rates_title: 'लोकप्रिय दर', rate_freight: 'स्थानीय माल ढुलाई (शहर के भीतर)', rate_taxi: 'एयरपोर्ट टैक्सी (पिकअप/ड्रॉप)', rate_suv: 'SUV डे हायर', rate_repairs: 'मरम्मत कॉल‑आउट', rates_note: 'तेज़ कोट. पारदर्शी शुल्क. आज ही उपलब्ध।',
      services_title: 'बिराटनगर के लिए सेवाएँ', services_sub: 'औद्योगिक ज़रूरतों और दैनिक आवश्यकताओं के लिए बनाई गई।',
      svc1_title: 'स्थानीय माल और वस्तु परिवहन', svc1_desc: 'कारख़ानों और व्यापारियों के लिए तेज़, भरोसेमंद स्थानीय परिवहन—सुनसरी‑मोरंग में फ़र्स्ट/लास्ट‑माइल।', svc1_b1: 'तेज़ कोट और आज‑ही विकल्प', svc1_b2: 'लोड के अनुसार सही वाहन', svc1_b3: 'पिकअप से डिलीवरी तक लाइव अपडेट', svc1_cta: 'ट्रक बुक करें',
      svc2_title: 'ऑन‑डिमांड प्राइवेट सिक्योरिटी', svc2_desc: 'इवेंट, दुकानों और साइटों के लिए भरोसेमंद गार्ड. जहाँ संभव हो, पूर्व‑सेना; आपातकालीन/नियमित शिफ्ट।', svc2_b1: 'वेरिफाइड गार्ड और स्पष्ट ब्रीफिंग', svc2_b2: 'आपात, रात और शॉर्ट‑नोटिस कवर', svc2_b3: 'समय पर रिपोर्टिंग और सरल SOP', svc2_cta: 'सुरक्षा अनुरोध करें',
      svc3_title: 'विशेष वाहन और ड्राइवर हायर', svc3_desc: 'पर्यटन और व्यवसाय के लिए SUV, जीप, वैन और सेडान. मार्ग जानने वाले स्थानीय प्रो।', svc3_b1: 'साफ वाहन, शालीन स्थानीय ड्राइवर', svc3_b2: 'एयरपोर्ट/होटल‑फ्रेंडली समन्वय', svc3_b3: 'फिक्स्ड प्राइस और स्पष्ट वेट नियम', svc3_cta: 'वाहन हायर करें',
      svc4_title: 'घर और वाणिज्यिक मरम्मत सेवाएँ', svc4_desc: 'कुशल इलेक्ट्रिशियन, प्लंबर, कारपेंटर और पेंटर. एक संपर्क से भरोसेमंद मरम्मत।', svc4_b1: 'कुशल, सत्यापित तकनीशियन', svc4_b2: 'उसी दिन आपात विकल्प', svc4_b3: 'पहले/बाद के फोटो अपडेट', svc4_cta: 'विशेषज्ञ बुलाएँ',
      svc5_title: 'इवेंट सपोर्ट और लॉजिस्टिक्स', svc5_desc: 'स्टाफ, डेकोर, अतिथि परिवहन और ऑन‑साइट समन्वय. जटिल इवेंट के लिए एक विश्वसनीय साझेदार।', svc5_b1: 'तेज़ वेंडर मैचमेकिंग', svc5_b2: 'एक प्लान, एक संपर्क', svc5_b3: 'इवेंट‑डे का स्मूथ समन्वय', svc5_cta: 'सपोर्ट प्लान करें',
      svc6_title: 'टूर गाइड सेवा', svc6_desc: 'इलाम चाय बागान, कोशी तप्पू, धनकुटा और सांस्कृतिक स्थलों के क्यूरेटेड टूर—सुरक्षित ड्राइवर, मित्रवत गाइड, स्पष्ट कीमत।', svc6_b1: 'मित्रवत स्थानीय गाइड', svc6_b2: 'चाय/प्रकृति/संस्कृति इटिनरेरी', svc6_b3: 'सुरक्षित ड्राइवर, स्पष्ट कीमत', svc6_cta: 'गाइड बुक करें',
      hiw_title: 'यह कैसे काम करता है', hiw_sub: 'पहले कॉल से काम पूरा होने तक—तेज़ और जिम्मेदार।',
      hiw_s1_t: '1. ज़रूरत बताइए', hiw_s1_d: 'क्या, कहाँ, कब—संक्षेप में साझा करें।', hiw_s2_t: '2. सही प्रो से मैच', hiw_s2_d: 'उपलब्ध सत्यापित नेटवर्क से।', hiw_s3_t: '3. लाइव अपडेट', hiw_s3_d: 'पिकअप ETA, ऑन‑साइट स्टेटस, कम्प्लीशन।', hiw_s4_t: '4. स्पष्ट भुगतान', hiw_s4_d: 'रसीद के साथ पारदर्शी शुल्क।',
      why_title: 'क्यों OneCall बिराटनगर', why_sub: 'स्थानीय ज्ञान, सत्यापित नेटवर्क और एकल संपर्क की जवाबदेही।',
      why_lede: 'काम कराने की झंझट हटाते हैं. OneCall में आप एक व्यक्ति से बात करते हैं, स्पष्ट कोट पाते हैं, और सत्यापित प्रो समय पर पहुँचता है।',
      why_c1_l: 'स्थानीय लाभ:', why_c1_d: 'रूट और वेंडर ज्ञान का वर्षों का अनुभव।', why_c2_l: 'सत्यापित नेटवर्क:', why_c2_d: 'तेज़ और भरोसेमंद गुणवत्ता।', why_c3_l: 'एकल संपर्क:', why_c3_d: '10 नंबरों पर कॉल करने की ज़रूरत नहीं।', why_c4_l: 'B2B तैयार:', why_c4_d: 'फ़ैक्टरी, वेयरहाउस, होटल, स्थल।',
      test_title: 'ग्राहक क्या कहते हैं', test_sub: 'भरोसे का प्रमाण।',
      contact_title: 'कॉल बैक का अनुरोध', contact_sub: 'कुछ विवरण दें—उपलब्धता और स्पष्ट कोट के साथ कॉल करेंगे।',
      label_name: 'आपका नाम', label_phone: 'फ़ोन', label_service: 'सेवा आवश्यक', label_details: 'विवरण', btn_email: 'ईमेल से भेजें', btn_whatsapp: 'व्हाट्सऐप से भेजें', form_note: 'कोई स्पैम नहीं। आपके विवरण सिर्फ समन्वय के लिए।',
      foot_brand: 'ढुलाई, सुरक्षा, मरम्मत, वाहन और इवेंट के लिए OneContact सुविधा—सत्यापित स्थानीय नेटवर्क पर आधारित। तेज़ कोट, स्पष्ट मूल्य, और एक जवाबदेह समन्वयक।',
      foot_quick: 'त्वरित लिंक', foot_contact: 'संपर्क', foot_serving: 'सुनसरी‑मोरंग क्षेत्र में उद्योग, SMEs और परिवारों की सेवा।',
      about_title: 'OneCall बिराटनगर के बारे में',
      about_p1: 'OneCall बिराटनगर व्यापार और परिवारों के लिए लॉजिस्टिक्स और सेवाओं को आसान बनाता है। एक विश्वसनीय समन्वयक आपका अनुरोध शुरू से अंत तक संभालता है—तेज़ कोट, स्पष्ट अपडेट और सही प्रो।',
      about_p2: 'संस्थापक: राजेन्द्र भट्टराई—स्थानीय मार्ग ज्ञान और सत्यापित ड्राइवर, गार्ड और तकनीशियनों का नेटवर्क। प्राथमिकता: भरोसेमंद सेवा, पारदर्शी कीमत, और मैत्रीपूर्ण व्यवहार।',
      about_alt: 'OneCall बिराटनगर के संस्थापक राजेन्द्र भट्टराई',
      contact_area: 'सेवा क्षेत्र', contact_hours: 'समय', contact_lines: 'डायरेक्ट लाइन्स', contact_social: 'सोशल'
    }
  };

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.en;
    qsa('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && dict[key]) el.textContent = dict[key];
    });
    // Attribute-level i18n: data-i18n-attr="attr:key,attr2:key2"
    qsa('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr') || '';
      spec.split(',').map(s => s.trim()).filter(Boolean).forEach(pair => {
        const [attr, key] = pair.split(':').map(v => v.trim());
        if (attr && key && dict[key]) el.setAttribute(attr, dict[key]);
      });
    });
    document.documentElement.setAttribute('lang', lang);
    // Toggle switcher state
    qsa('.lang-switch .lang').forEach(btn => btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false'));
    localStorage.setItem('lang', lang);
    // Remove any accidental %/commission lines from service bullets
    sanitizeServiceBullets();
  }

  function sanitizeServiceBullets() {
    const banned = /%|commission|मार्जिन|कमीशन|मर्जिन/i;
    qsa('.cards-grid .bullets li').forEach(li => {
      if (banned.test(li.textContent || '')) {
        li.remove();
      }
    });
  }

  // Default to Nepali unless stored preference exists
  const saved = localStorage.getItem('lang') || 'ne';
  applyLang(saved);

  qsa('.lang-switch .lang').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
  });
  
  // Smooth-scroll for in-page anchors with header offset
  const header = qs('.site-header');
  const headerH = () => (header ? header.getBoundingClientRect().height : 0);
  qsa('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    a.addEventListener('click', (e) => {
      const id = href.slice(1);
      const target = byId(id);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - headerH() - 8;
        window.scrollTo({ top: y, behavior: 'smooth' });
        // Close mobile menu if open
        if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // Scroll spy for nav links
  const sections = ['about','services','how-it-works','why-us','testimonials','contact']
    .map(id => byId(id))
    .filter(Boolean);
  const navLinks = new Map();
  qsa('.site-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) navLinks.set(href.slice(1), a);
  });
  const setActive = (id) => {
    qsa('.site-nav a').forEach(a => a.classList.remove('active'));
    const link = navLinks.get(id);
    if (link) link.classList.add('active');
  };
  const onScroll = () => {
    const offset = headerH() + 16;
    let current = sections[0]?.id;
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top - offset <= 0) current = sec.id;
    });
    if (current) setActive(current);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
