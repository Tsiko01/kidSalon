import type { Dict } from './index';

// English dictionary — must mirror ka.ts exactly (enforced by the Dict type).
export const en: Dict = {
  meta: {
    siteName: 'Kids Salon',
    tagline: "Children's hair salon in Tbilisi",
  },

  nav: {
    home: 'Home',
    portfolio: 'Portfolio',
    services: 'Services',
    booking: 'Booking',
    about: 'About',
    guide: 'For parents',
    reviews: 'Reviews',
    faq: 'FAQ',
    contact: 'Contact',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    skip: 'Skip to main content',
    langLabel: 'Change language',
    langCurrent: 'English',
    themeDark: 'Dark mode',
    homeLink: 'Kids Salon — home page',
    menuDesc: {
      home: 'The salon at a glance',
      portfolio: 'Our work',
      services: 'Haircuts & prices',
      booking: 'Book online',
      about: 'Our philosophy',
      guide: 'Tips for parents',
      reviews: 'What parents say',
      faq: 'Common questions',
      contact: 'How to find us',
    },
  },

  common: {
    book: 'Book',
    bookNow: 'Book an appointment',
    bookThis: 'Book this service',
    seeWork: 'See our work',
    allServices: 'All services & prices',
    call: 'Call',
    callUs: 'Call us',
    whatsapp: 'WhatsApp',
    writeWhatsapp: 'Message us on WhatsApp',
    facebook: 'Facebook',
    instagram: 'Instagram',
    from: 'from ',
    fromSuffix: '',
    currency: '₾',
    priceOnRequest: 'Price on request',
    indicativeNote: 'Prices shown are indicative — the salon confirms the final price when you book.',
    age: 'Age',
    phone: 'Phone',
    address: 'Address',
    hours: 'Opening hours',
    newTab: '(opens in a new tab)',
    breadcrumb: 'Breadcrumb',
    scroll: 'Scroll',
    backTop: 'Back to top',
    addressUnknown: 'Tbilisi, Georgia',
    addressUnknownNote: 'Message us on WhatsApp and we’ll send the exact address and directions.',
    hoursUnknown: 'We’ll confirm opening hours when you book.',
    hoursUnknownNote: 'Message us on WhatsApp — we reply quickly.',
    readFaq: 'Frequently asked questions',
    goGuide: 'Parents’ guide',
    followFacebook: 'Kids Salon on Facebook',
    followInstagram: 'Kids Salon on Instagram',
    fab: 'Chat with us',
  },

  loader: {
    line: "Children's hair salon · Tbilisi",
  },

  cta: {
    eyebrow: 'Ready?',
    title: 'A fresh new look is just one message away',
    text: 'Fill in a short form — we’ll reply on WhatsApp and confirm your visit time.',
  },

  footer: {
    tagline: "Children's hair salon in Tbilisi. Little guests, big care.",
    pages: 'Pages',
    contact: 'Contact',
    follow: 'Follow us',
    rights: 'All rights reserved.',
    bigLine: 'See you at the salon',
  },

  seo: {
    home: {
      title: "Kids Salon — Children's Hair Salon in Tbilisi",
      description:
        "Kids Salon is a children's hair salon at 46 Tsintsadze St., Tbilisi. First haircuts, boys' and girls' styles in toy race-car chairs. Book via WhatsApp.",
    },
    portfolio: {
      title: "Portfolio — Kids' Haircuts & Salon Moments | Kids Salon",
      description:
        "Browse the Kids Salon portfolio: children's haircuts, festive hairstyles, first-haircut moments and the colourful salon atmosphere in Tbilisi.",
    },
    services: {
      title: "Services & Prices — Kids' Haircuts in Tbilisi | Kids Salon",
      description:
        "Children's haircut prices in Tbilisi: first haircut, boys' style cuts, girls' haircuts, festive hairstyles, fringe trims and teen haircuts.",
    },
    booking: {
      title: 'Book an Appointment Online | Kids Salon Tbilisi',
      description:
        'Book at Kids Salon in under a minute: choose a service, date and time — your request is sent via WhatsApp and the salon confirms your visit.',
    },
    about: {
      title: 'About Us — Our Philosophy | Kids Salon Tbilisi',
      description:
        "Meet Kids Salon — a salon where a child's comfort and a parent's trust come first. Our philosophy, values and colourful atmosphere.",
    },
    guide: {
      title: "Parents' Guide — Your Child's First Haircut | Kids Salon",
      description:
        'How to prepare your child for a haircut: tips for before and during the visit, haircut ideas by age and easy hair care at home.',
    },
    reviews: {
      title: 'Parent Reviews | Kids Salon Tbilisi',
      description:
        "Read genuine reviews from parents about Kids Salon, or share your own experience after your child's haircut.",
    },
    faq: {
      title: "FAQ — Kids' Haircuts & Booking | Kids Salon",
      description:
        "Answers to common questions about booking, children's haircuts, prices, opening hours, location and payment at Kids Salon.",
    },
    contact: {
      title: 'Contact — Phone, WhatsApp & Location | Kids Salon',
      description:
        'Contact Kids Salon at 46 Tsintsadze St., Tbilisi. Phone and WhatsApp: +995 595 970 704. Map, opening hours and Facebook.',
    },
    notFound: {
      title: 'Page not found | Kids Salon',
      description: 'The page you requested could not be found. Return to the Kids Salon home page.',
    },
  },

  home: {
    hero: {
      eyebrow: "Children's hair salon · Tbilisi",
      titleA: 'Little guests,',
      titleB: 'big',
      titleC: 'care',
      lead: 'A salon where children get their hair cut calmly, happily and without fear — from the very first haircut to the teenage years.',
      note: 'Book via WhatsApp — in a minute',
      badge: 'KIDS SALON · TBILISI · HAPPY HAIRCUTS · ',
    },
    marquee: ['First haircuts', "Boys' styles", "Girls' haircuts", 'Festive hairstyles', 'Race-car chairs', 'Caring hands'],
    intro: {
      eyebrow: 'About us',
      statement: 'We created a place where a child feels like a guest — not a customer.',
      body: 'For a child, a haircut can feel new, unfamiliar and even a little scary. That’s why everything here happens slowly, kindly and at their pace. And for parents, it’s a place to relax and trust.',
      link: 'Discover our philosophy',
      quote: 'Your little ones’ smiles are our greatest motivation!',
      quoteCite: 'The Kids Salon team',
    },
    services: {
      eyebrow: 'Services',
      title: 'Haircuts for every age',
      lead: 'From a gentle first haircut to a teenager’s own style — every visit is tailored to your child’s age and personality.',
    },
    why: {
      eyebrow: 'Why parents choose us',
      title: "Every detail designed around your child's comfort",
      items: [
        {
          title: 'Patience comes first',
          text: 'We never rush. Children get time to get to know the chair, the tools — and us.',
        },
        {
          title: 'Clean, careful work',
          text: 'We work with clean tools and gentle hands — safety is always our priority.',
        },
        {
          title: 'A haircut in a race car',
          text: 'Little ones sit in toy race-car chairs, surrounded by toys and colour — the kind of place children want to come back to.',
        },
        {
          title: 'Parents are part of it',
          text: 'We agree on the style together before we start, and you’re welcome to stay close throughout.',
        },
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Fresh cuts, happy faces',
      link: 'View the full portfolio',
    },
    steps: {
      eyebrow: 'How booking works',
      title: 'Booking in three simple steps',
      items: [
        { title: 'Choose a service', text: 'Fill in a short form with the service and your preferred day and time.' },
        { title: 'Send it on WhatsApp', text: 'The form prepares the message for you — you just press “send”.' },
        { title: 'We confirm', text: 'The salon replies and confirms the exact time. Your visit is confirmed only once we reply.' },
      ],
    },
    reviews: {
      eyebrow: 'Reviews',
      title: 'What parents say',
      link: 'All reviews',
    },
    social: {
      eyebrow: 'Social',
      title: 'Everyday moments from the salon',
      text: 'New haircuts and news from the salon — see them first on our page.',
      handle: '@kidssalon.ge',
    },
  },

  reviewsBlock: {
    emptyTitle: 'Your words matter to us',
    emptyText:
      'We’re gathering genuine reviews from parents. If you’ve visited us, share your experience on Facebook — we’d love to feature it here too.',
    write: 'Write a review on Facebook',
    writeGoogle: 'Review us on Google',
    read: 'Reviews on Facebook',
    whatsapp: 'Send us feedback on WhatsApp',
    ratingLabel: 'Rated {n} out of 5 stars',
    source: {
      facebook: 'Facebook',
      google: 'Google',
      instagram: 'Instagram',
      direct: 'Private message',
    },
    viewOriginal: 'View original',
  },

  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Our work',
    lead: 'Every haircut is a little story. Here are some of our favourite moments from the salon — fresh cuts, happy faces and colourful details.',
    count: '{n} photos',
    openPhoto: 'Enlarge photo: {alt}',
    photoAlt: 'Kids Salon — portfolio photo {n}',
    artAlt: 'Kids Salon illustration {n}',
    more: 'More photos on Facebook',
    moreText: 'We regularly share new work on our Facebook page.',
    lightbox: {
      label: 'Photo viewer',
      close: 'Close',
      prev: 'Previous photo',
      next: 'Next photo',
      counter: '{n} / {total}',
    },
  },

  services: {
    eyebrow: 'Services & prices',
    title: 'Services & Prices',
    lead: 'Every cut begins with a short chat — so we know exactly what your child wants and what works for you.',
    listTitle: 'Price list',
    tableService: 'Service',
    tableAge: 'Age',
    tablePrice: 'Price',
    includedTitle: 'Included in every visit',
    included: [
      { title: 'A short consultation', text: 'Together we choose a style your child loves and you find practical.' },
      { title: 'A calm, unhurried pace', text: 'We work at your child’s pace — with breaks, if needed.' },
      { title: 'Tips for home', text: 'We’ll show you how to care for the new style and when to come back.' },
    ],
    notSureTitle: 'Not sure which to choose?',
    notSureText: 'Send us your child’s age and the style you have in mind — we’ll recommend the right service.',
  },

  booking: {
    eyebrow: 'Online booking',
    title: 'Book an appointment',
    lead: 'Fill in the form and your request will reach us on WhatsApp. Your visit is confirmed once the salon replies.',
    formTitle: 'Booking form',
    required: 'required field',
    requiredHint: 'Fields marked with an asterisk (*) are required.',
    groupFamily: 'Who is visiting',
    groupVisit: 'Visit details',
    fields: {
      parent: "Parent's name",
      parentPh: 'e.g. Nino',
      child: "Child's name",
      childPh: 'e.g. Luka',
      age: "Child's age",
      agePh: 'e.g. 4 years',
      optional: 'optional',
      phone: 'Phone number',
      phonePh: '+995 5XX XX XX XX',
      date: 'Preferred date',
      time: 'Preferred time',
      service: 'Service',
      servicePh: 'Choose a service',
      message: 'Additional information',
      messagePh: 'e.g. It’s the first haircut, my child is nervous about clippers…',
    },
    errors: {
      required: 'Please fill in this field.',
      name: 'The name should be at least 2 letters long.',
      phone: 'Enter a valid phone number, e.g. +995 595 12 34 56.',
      date: 'Choose today or a future date.',
      time: 'Choose a preferred time.',
      service: 'Please choose a service.',
      summary: 'Please correct the highlighted fields.',
    },
    submit: 'Book appointment via WhatsApp',
    disclaimer:
      'Pressing the button opens WhatsApp with a ready-made message. Your appointment is confirmed only after the salon replies.',
    success: {
      status: 'Awaiting salon confirmation',
      title: 'Your message is ready!',
      text: 'WhatsApp should open now — just press “send”. We’ll reply and confirm your visit time.',
      fallback: 'WhatsApp didn’t open? Try this button:',
      open: 'Open WhatsApp',
      again: 'Start a new request',
    },
    message: {
      greeting: 'Hello! I would like to book a visit.',
      parent: "Parent's name",
      child: "Child's name",
      age: "Child's age",
      phone: 'Phone',
      service: 'Service',
      date: 'Preferred date',
      time: 'Preferred time',
      note: 'Additional information',
    },
    side: {
      nextTitle: 'What happens next?',
      next: [
        'WhatsApp opens with your request',
        'The salon replies and agrees the time with you',
        'Your visit is confirmed once we reply',
      ],
      callTitle: 'Prefer to call?',
      callText: 'Give us a ring and we’ll book you by phone.',
    },
  },

  about: {
    eyebrow: 'About us',
    title: "A salon that moves at a child's pace",
    lead: 'Kids Salon is a place where a haircut becomes an adventure for children — and a calm, trustworthy experience for parents.',
    storyEyebrow: 'Our story',
    storyTitle: 'It all started with one simple idea',
    story: [
      'A child’s haircut shouldn’t be an ordeal for the whole family. No tears, no hurried movements, no tense parents — just smiles, curiosity and pride when they see the new style in the mirror.',
      'That’s the idea behind Kids Salon: a space designed especially for children, and a team who knows that connecting with a little guest matters just as much as the haircut itself.',
    ],
    pillarsEyebrow: 'Philosophy',
    pillarsTitle: 'Three things that never change',
    pillars: [
      {
        title: "The child's comfort",
        text: 'Every child is different. Some need jokes, some need quiet, some need their favourite cartoon. We read the mood and adapt to it.',
      },
      {
        title: "The parent's trust",
        text: 'We’ll honestly tell you what suits your child and how to care for their hair. Your voice always matters — before, during and after the cut.',
      },
      {
        title: 'Love for the craft',
        text: 'Children’s hair is special: finer, livelier and often unruly. We create shapes that grow out beautifully and make everyday brushing easier.',
      },
    ],
    atmosphereEyebrow: 'Atmosphere',
    atmosphereTitle: 'More playroom than barbershop',
    atmosphereText:
      'Colourful walls, toy race-car chairs, shelves full of toys and friendly faces — every detail of the salon is chosen so children feel at ease from the very first minute.',
    promiseEyebrow: 'Our promise',
    promiseTitle: 'What we promise parents',
    promises: [
      'We never force a child — if they need a break, we take one.',
      'We always ask for your opinion before we start.',
      'We’ll honestly tell you what will suit them — and what won’t.',
      'We aim to end every visit with a smile.',
    ],
  },

  guide: {
    eyebrow: 'For parents',
    title: "Parents' guide: stress-free haircuts for kids",
    lead: 'Simple, practical tips that turn your child’s first (and every following) haircut into a calm and happy experience.',
    tocLabel: 'On this page',
    before: {
      title: 'Before the visit',
      items: [
        { title: 'Pick the right time', text: 'Plan the visit when your child is rested and fed. Mornings or the hours after a nap often work best.' },
        { title: 'Talk it through', text: 'Tell your child what will happen: the chair, the water spray, the sound of scissors. Familiar things feel less scary.' },
        { title: 'Play “salon” at home', text: 'Pretend play with a comb and toys makes the real visit much easier.' },
        { title: 'Bring a favourite toy', text: 'A familiar toy or book adds calm in a new place.' },
        { title: 'Dress comfortably', text: 'Choose clothes that hair slides off easily. A spare T-shirt never hurts.' },
      ],
    },
    during: {
      title: 'During the visit',
      items: [
        { title: 'Stay calm', text: 'Children mirror their parents’ mood. Your calm voice is the best support they can have.' },
        { title: 'Praise every step', text: '“You’re sitting so nicely!” — a little praise works wonders.' },
        { title: 'Trust the stylist', text: 'Let the stylist build their own connection with your child — it creates trust.' },
      ],
    },
    after: {
      title: 'After the haircut',
      items: [
        { title: 'Celebrate', text: 'Take a photo, show the grandparents — your child will learn that a haircut is a happy event.' },
        { title: 'Keep a memory', text: 'After the first haircut, many parents keep a small lock of hair as a keepsake.' },
        { title: 'Plan the next visit', text: 'Regular trims keep the shape and help your child befriend the salon.' },
      ],
    },
    ideas: {
      title: 'Haircut ideas by age',
      lead: 'Just for inspiration — the final choice is always made together, based on your child’s hair type and personality.',
      items: [
        { age: 'Ages 0–3', title: 'Soft and natural', text: 'A light trim, a fringe that keeps the eyes clear and a soft shape that grows out naturally.', service: 'first-haircut' },
        { age: 'Ages 3–6', title: 'A first “real” style', text: 'A classic bob, a short scissor cut for boys, or a style with a fringe.', service: 'kids-haircut' },
        { age: 'Ages 7–11', title: 'Showing personality', text: 'A textured top, a side part or soft long layers.', service: 'boys-style' },
        { age: 'Ages 12+', title: 'Their own style', text: 'A soft fade, defined curls or a trendy length — teens choose, we help.', service: 'teen-haircut' },
      ],
      book: 'Book: {service}',
    },
    care: {
      title: 'Hair care at home',
      items: [
        { title: 'Brush from the ends', text: 'Start at the ends and work your way up slowly — it hurts much less.' },
        { title: 'Gentle shampoo', text: 'Use mild products made especially for children.' },
        { title: 'Towel-dry gently', text: 'Squeeze the hair softly instead of rubbing — it tangles less.' },
        { title: 'Regular trims', text: 'Trimming the ends keeps the shape and the hair healthy.' },
      ],
    },
    rhythm: {
      title: 'How often should kids get a haircut?',
      lead: 'A general guide — every child’s hair grows at its own pace.',
      rows: [
        { type: 'Short styles', every: 'Every 4–6 weeks' },
        { type: 'Medium length', every: 'Every 6–8 weeks' },
        { type: 'Long hair', every: 'Every 8–12 weeks' },
      ],
      colType: 'Hairstyle',
      colEvery: 'Recommended frequency',
    },
  },

  reviewsPage: {
    eyebrow: 'Reviews',
    title: 'Reviews from parents',
    lead: 'The best advertising for us is a happy child and a relaxed parent. We publish only genuine reviews from our guests here.',
    average: 'Average rating',
    count: '{n} reviews',
    emptyTitle: 'The first review could be yours',
    emptyText:
      'We only publish genuine reviews left by parents. If you’ve already visited us, could you spare two minutes?',
    howTitle: 'How to leave a review',
    how: [
      { title: 'Open our Facebook page', text: 'The button below takes you straight to the reviews section.' },
      { title: 'Choose “Recommend”', text: 'Tell us whether you’d recommend Kids Salon to other parents.' },
      { title: 'Share your experience', text: 'A few sentences are enough — they help other parents choose.' },
    ],
    privateTitle: 'Prefer to write to us privately?',
    privateText: 'Every note or thank-you helps us get even better.',
  },

  faq: {
    eyebrow: 'Help',
    title: 'Frequently asked questions',
    lead: 'Can’t find an answer? Message us on WhatsApp — we’re happy to help.',
    groups: {
      booking: 'Booking',
      visit: 'The visit & haircut',
      practical: 'Practical information',
    },
    items: {
      how: {
        q: 'How do I book an appointment?',
        a: 'Fill in the booking form on our website — it automatically prepares a WhatsApp message with all the details. You can also message us directly on WhatsApp or call {phone}.',
      },
      confirmed: {
        q: 'Is my booking confirmed right away?',
        a: 'No. After you send the form, the salon replies on WhatsApp and confirms the exact time. Your visit is only confirmed once we reply.',
      },
      reschedule: {
        q: 'Can I reschedule or cancel?',
        a: 'Of course. Just message us on WhatsApp as early as possible — that way the time can go to another family.',
      },
      siblings: {
        q: 'Can I book several children together?',
        a: 'Yes. In the “Additional information” field, tell us how many children are coming and which service each needs — we’ll find a time together.',
      },
      ages: {
        q: 'What ages do you work with?',
        a: 'We welcome children from their very first haircut through to the teenage years. See services by age on the “Services & Prices” page.',
      },
      scared: {
        q: 'My child is afraid of haircuts. What can we do?',
        a: 'That’s completely natural. We work slowly, introduce the tools and give your child time to settle in. You’ll find helpful tips for preparing at home in our parents’ guide.',
      },
      stay: {
        q: 'Can I stay with my child?',
        a: 'Yes — having a parent close by helps children feel calm. We’ll also agree on the style together before we start.',
      },
      first: {
        q: 'When is the best time for a first haircut?',
        a: 'There’s no exact age. Many parents plan the first haircut when hair starts reaching the eyes or losing its shape. Most important is that your child is rested and in a good mood.',
      },
      duration: {
        q: 'How long does a haircut take?',
        a: 'It depends on the service, the hair length and your child’s mood. We never rush — we’ll give you an estimate when you book.',
      },
      prices: {
        q: 'How much does a haircut cost?',
        a: 'You’ll find all services and prices on the “Services & Prices” page.',
        aIndicative: 'You’ll find all services and prices on the “Services & Prices” page. Prices shown are indicative — we confirm the final price when you book.',
      },
      hours: {
        q: 'When is the salon open?',
        a: 'Our opening hours: {hours}.',
        aUnknown: 'We’ll confirm opening hours when you book. Message us on WhatsApp and we’ll reply quickly.',
      },
      location: {
        q: 'Where is the salon?',
        a: 'Our address is {address}. See the map and directions on the contact page.',
        aUnknown: 'The salon is in Tbilisi. Message us on WhatsApp and we’ll send you the exact address and directions.',
      },
      payment: {
        q: 'How can I pay?',
        a: 'Payment methods: {methods}.',
        aUnknown: 'We’ll confirm the available payment methods when you book — feel free to ask us on WhatsApp.',
      },
    },
    linkServices: 'Services & prices',
    linkGuide: 'Parents’ guide',
    linkContact: 'Contact & map',
    linkBooking: 'Booking form',
    stillTitle: 'Still have a question?',
    stillText: 'Message or call us — you’ll hear back soon.',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Visit us or just say hello',
    lead: 'Have a question, want to book or need some advice? We’re always happy to help.',
    cards: {
      phoneTitle: 'Call us',
      phoneText: 'Bookings and questions by phone.',
      waTitle: 'WhatsApp',
      waText: 'The fastest way to book.',
      waAction: 'Start a chat',
      fbTitle: 'Facebook',
      fbText: 'New work and salon news.',
      fbAction: 'Visit our page',
      igTitle: 'Instagram',
      igText: 'Everyday moments from the salon.',
      igAction: 'View profile',
    },
    whereTitle: 'Where we are',
    mapTitle: 'How to find us',
    mapShow: 'Show the map',
    mapNote: 'The map loads from Google Maps only with your consent.',
    mapOpen: 'Open in Google Maps',
    mapFrameTitle: 'Kids Salon on the map',
    waGreeting: 'Hello Kids Salon! I have a question.',
    faqTitle: 'Have a question?',
    faqText: 'We’ve gathered answers about booking, prices and visits on one page.',
  },

  notFound: {
    code: '404',
    title: 'Page not found',
    text: 'Looks like this page got lost somewhere between the comb and the scissors.',
    back: 'Back to the home page',
  },
};
