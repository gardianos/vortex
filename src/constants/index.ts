// Vortex Brand Constants
export const BRAND = {
  name: 'VORTEX',
  tagline: 'Intelligence Empowers Capital',
  description: 'We leverage cutting-edge AI and data intelligence to transform capital markets and empower informed investment decisions.',
};

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'Über Uns', href: '#about' },
  { name: 'Produkte', href: '#products' },
  { name: 'Analytics', href: '#charts' },
  { name: 'Kontakt', href: '#contact' },
];

// About Us Content (Über Uns)
export const ABOUT_CONTENT = {
  title: 'Über Uns',
  subtitle: 'Intelligence Empowers Capital',
  sections: [
    {
      id: 'what-we-do',
      title: 'Was tun wir',
      description: 'Wir entwickeln innovative SaaS-Lösungen, die künstliche Intelligenz und Big Data kombinieren, um Investmentprozesse zu revolutionieren. Unsere Plattform bietet Echtzeit-Analysen, prädiktive Modelle und automatisierte Insights für Kapitalmärkte.',
      icon: 'rocket',
    },
    {
      id: 'who-we-are',
      title: 'Wer sind wir',
      description: 'Ein Team aus erfahrenen Finanzexperten, Data Scientists und Software-Ingenieuren. Wir verbinden tiefes Marktverständnis mit technologischer Exzellenz, um Mehrwert für unsere Kunden zu schaffen.',
      icon: 'users',
    },
    {
      id: 'our-goal',
      title: 'Was ist unser Ziel',
      description: 'Unser Ziel ist es, die Demokratisierung von Finanzintelligenz voranzutreiben. Wir machen fortschrittliche Analysetools zugänglich und ermöglichen fundierte Investitionsentscheidungen für alle.',
      icon: 'target',
    },
  ],
};

// Team Members
export const TEAM_MEMBERS = [
  {
    name: 'Dr. Alexander Schmidt',
    role: 'CEO & Founder',
    description: '15+ Jahre Erfahrung in Quantitative Finance',
    image: '/team/ceo.jpg',
  },
  {
    name: 'Maria Hoffmann',
    role: 'CTO',
    description: 'Ex-Google, AI/ML Spezialistin',
    image: '/team/cto.jpg',
  },
  {
    name: 'Thomas Weber',
    role: 'Head of Product',
    description: 'Fintech Veteran, Serial Entrepreneur',
    image: '/team/product.jpg',
  },
];

// Products
export const PRODUCTS = {
  title: 'Unsere Produkte',
  subtitle: 'Innovative Lösungen für jeden Bedarf',
  categories: [
    {
      id: 'b2b',
      title: 'B2B Solutions',
      description: 'Enterprise-grade Lösungen für institutionelle Anleger und Finanzdienstleister',
      features: [
        'Echtzeit Portfolio Analytics',
        'Risk Management Suite',
        'Regulatory Reporting',
        'API Integration',
        'Custom Dashboards',
        'Dedizierter Support',
      ],
      cta: 'Enterprise Demo anfragen',
      highlighted: true,
    },
    {
      id: 'b2c',
      title: 'B2C Platform',
      description: 'Intuitive Tools für private Anleger und Vermögensverwalter',
      features: [
        'Smart Portfolio Tracking',
        'AI-powered Insights',
        'Market Sentiment Analysis',
        'Personalisierte Alerts',
        'Mobile App',
        'Community Features',
      ],
      cta: 'Kostenlos starten',
      highlighted: false,
    },
  ],
};

// Chart Data for Analytics Section
export const CHART_DATA = {
  performance: [
    { month: 'Jan', value: 45, benchmark: 42 },
    { month: 'Feb', value: 52, benchmark: 44 },
    { month: 'Mar', value: 48, benchmark: 43 },
    { month: 'Apr', value: 61, benchmark: 47 },
    { month: 'Mai', value: 55, benchmark: 46 },
    { month: 'Jun', value: 67, benchmark: 49 },
    { month: 'Jul', value: 72, benchmark: 51 },
    { month: 'Aug', value: 78, benchmark: 53 },
    { month: 'Sep', value: 74, benchmark: 52 },
    { month: 'Okt', value: 85, benchmark: 55 },
    { month: 'Nov', value: 89, benchmark: 57 },
    { month: 'Dez', value: 95, benchmark: 59 },
  ],
  allocation: [
    { name: 'Aktien', value: 45, color: '#a8b5b0' },
    { name: 'Anleihen', value: 25, color: '#c5d0cc' },
    { name: 'Rohstoffe', value: 15, color: '#2d5f4d' },
    { name: 'Krypto', value: 10, color: '#1e4d3d' },
    { name: 'Cash', value: 5, color: '#1a3d2e' },
  ],
  metrics: [
    { label: 'AUM', value: '€2.4B', change: '+15%' },
    { label: 'Active Users', value: '45K+', change: '+28%' },
    { label: 'Accuracy', value: '94.7%', change: '+2.3%' },
    { label: 'Latency', value: '<50ms', change: '-12%' },
  ],
};

// Contact Information
export const CONTACT = {
  title: 'Kontakt',
  subtitle: 'Starten Sie Ihre Intelligence Journey',
  email: 'hello@vortex-capital.io',
  phone: '+49 30 1234567',
  address: 'Vortex Intelligence GmbH\nFriedrichstraße 123\n10117 Berlin, Germany',
  social: {
    linkedin: 'https://linkedin.com/company/vortex',
    twitter: 'https://twitter.com/vortex',
    github: 'https://github.com/vortex',
  },
};

// Animation Settings
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    verySlow: 2.0,
  },
  ease: {
    default: 'power2.out',
    smooth: 'power3.out',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'bounce.out',
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
};
