import React, { useState, useMemo, useRef, useEffect } from 'react';

// ==========================================
// MENTOR CAMPUS - OFFICIAL DATA FROM PDF & SITE
// ==========================================

const TRACK_CATEGORIES = [
  { id: 'all', label: 'All Mentors', count: '40+' },
  { id: 'ai', label: 'Artificial Intelligence', count: '100+' },
  { id: 'hr', label: 'Human Resources', count: '100+' },
  { id: 'entrepreneur', label: 'Entrepreneur & Founders', count: '100+' },
  { id: 'gov', label: 'Gov & Angel Investors', count: '100+' },
  { id: 'cyber', label: 'IoT & Cybersecurity', count: '100+' },
];

const MENTORS_DATA = [
  // --- Artificial Intelligence Track ---
  {
    name: 'Senthilkumar Viswanathan',
    role: 'Chief Technical AI Architect',
    company: 'Ford Motor Company',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'SV',
    highlight: 'Enterprise AI & Architecture',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    name: 'Bharathi Ravindran',
    role: 'Director, AI Science',
    company: 'Verizon',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'BR',
    highlight: 'Applied AI & ML Science',
    color: 'from-sky-500 to-blue-600',
  },
  {
    name: 'Senthilvel Kasirajan',
    role: 'Director, Gen AI & Data Science, GCP',
    company: 'Capgemini',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'SK',
    highlight: 'Generative AI & Cloud Data',
    color: 'from-indigo-500 to-blue-700',
  },
  {
    name: 'Ramesh Babu',
    role: 'Director, Data & AI',
    company: 'Metayb',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'RB',
    highlight: 'Big Data Strategy & AI',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    name: 'Raj Arun',
    role: 'Director, AI Engineering',
    company: 'Fractal',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'RA',
    highlight: 'AI Engineering & Production',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Kishan S',
    role: 'Assistant Vice President, Data & AI',
    company: 'EXL',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'KS',
    highlight: 'Enterprise AI Operations',
    color: 'from-indigo-600 to-violet-600',
  },
  {
    name: 'Karthick Nethaji Kaleeswaran',
    role: 'Director of AI Product Management',
    company: 'HCLTech',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'KK',
    highlight: 'AI Product Strategy & Roadmap',
    color: 'from-blue-600 to-slate-700',
  },
  {
    name: 'Amudha Murugesan',
    role: 'Director, AI Managed Services',
    company: 'Vendasta',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'AM',
    highlight: 'AI Services & Scaling',
    color: 'from-sky-600 to-indigo-600',
  },
  {
    name: 'Edward Satish C',
    role: 'Head of Digital Tech & Automation AI',
    company: 'WPP Production',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'EC',
    highlight: 'Automation AI & Media Tech',
    color: 'from-slate-700 to-blue-800',
  },

  // --- Human Resources Track ---
  {
    name: 'Keerthana Arul',
    role: 'Senior HR Business Analyst',
    company: 'Deloitte',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'KA',
    highlight: 'HR Analytics & Talent Ops',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    name: 'Vignesh U',
    role: 'Senior Talent Acquisition Partner',
    company: 'ADP',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'VU',
    highlight: 'Talent Acquisition & Hiring',
    color: 'from-blue-500 to-teal-600',
  },
  {
    name: 'Vasanth M',
    role: 'Cluster HR Business Partner',
    company: 'Flipkart',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'VM',
    highlight: 'E-commerce HRBP & Operations',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Reshma Subash',
    role: 'Senior Talent Acquisition Specialist',
    company: 'IBM',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'RS',
    highlight: 'Tech Recruiting & Culture',
    color: 'from-blue-700 to-indigo-700',
  },
  {
    name: 'Ayush Ranjan',
    role: 'Human Resources Business Partner',
    company: 'NielsenIQ',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'AR',
    highlight: 'Corporate People Strategy',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    name: 'Pavithran Sivakumar',
    role: 'Senior Talent Acquisition Specialist',
    company: 'Accenture',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'PS',
    highlight: 'Campus to Corporate Transition',
    color: 'from-violet-600 to-purple-600',
  },
  {
    name: 'Shaffiullah S',
    role: 'HR Business Partner',
    company: 'TCS',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'SS',
    highlight: 'Workforce Planning & People Dev',
    color: 'from-blue-600 to-cyan-700',
  },
  {
    name: 'Roshini Karunakaran',
    role: 'Senior Executive Talent Acquisition',
    company: 'Wipro',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'RK',
    highlight: 'Engineering Hiring & Sourcing',
    color: 'from-emerald-600 to-teal-700',
  },
  {
    name: 'Saravana Kumar',
    role: 'Talent Acquisition Lead',
    company: 'UST',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'SK',
    highlight: 'Global Tech Recruitment',
    color: 'from-indigo-600 to-blue-600',
  },

  // --- Entrepreneur Track ---
  {
    name: 'Rakesh R',
    role: 'Co-Founder and CEO',
    company: 'Aptahire',
    track: 'entrepreneur',
    trackLabel: 'Entrepreneur',
    initials: 'RR',
    highlight: 'Early-stage Venture Building',
    color: 'from-rose-500 to-pink-600',
  },
  {
    name: 'Nithya Rajasekar',
    role: 'Founder & CEO',
    company: 'Unitive Technologies',
    track: 'entrepreneur',
    trackLabel: 'Entrepreneur',
    initials: 'NR',
    highlight: 'Tech Product Entrepreneurship',
    color: 'from-fuchsia-600 to-purple-600',
  },
  {
    name: 'Balachander G',
    role: 'Founder & Director',
    company: 'BookWater',
    track: 'entrepreneur',
    trackLabel: 'Entrepreneur',
    initials: 'BG',
    highlight: 'CleanTech & Sustainable Tech',
    color: 'from-blue-500 to-teal-500',
  },
  {
    name: 'Pinku B',
    role: 'Founder & CEO',
    company: 'Taxina',
    track: 'entrepreneur',
    trackLabel: 'Entrepreneur',
    initials: 'PB',
    highlight: 'Fintech & Startup Growth',
    color: 'from-orange-500 to-amber-600',
  },
  {
    name: 'Ayush Ranjan',
    role: 'CEO & Mentor',
    company: 'Vibrant Education',
    track: 'entrepreneur',
    trackLabel: 'Entrepreneur',
    initials: 'AR',
    highlight: 'EdTech & Learning Ecosystems',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    name: 'Senthil K Chinnasamy',
    role: 'Investor & Partner — Strategy',
    company: 'Varam.app',
    track: 'entrepreneur',
    trackLabel: 'Entrepreneur',
    initials: 'SC',
    highlight: 'Scale-up Strategy & Seed Capital',
    color: 'from-emerald-600 to-teal-700',
  },
  {
    name: 'Siraj M.K',
    role: 'Managing Partner',
    company: 'Pathfinder',
    track: 'entrepreneur',
    trackLabel: 'Entrepreneur',
    initials: 'SM',
    highlight: 'Business Strategy & Scaling',
    color: 'from-blue-700 to-slate-800',
  },
  {
    name: 'Sudarsan Babu',
    role: 'Founder & CEO',
    company: 'Pauket',
    track: 'entrepreneur',
    trackLabel: 'Entrepreneur',
    initials: 'SB',
    highlight: 'Consumer Tech & SaaS',
    color: 'from-purple-600 to-indigo-600',
  },
  {
    name: 'Selventhiran Kathiresan',
    role: 'Co Founder',
    company: 'Arthamandapam',
    track: 'entrepreneur',
    trackLabel: 'Entrepreneur',
    initials: 'SK',
    highlight: 'Community Tech & Startups',
    color: 'from-sky-600 to-blue-700',
  },

  // --- Government & Angel Investors Track ---
  {
    name: 'Rakesh R',
    role: 'VP, Promotions & Facilitation',
    company: 'ELCOT',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'RR',
    highlight: 'State IT Ecosystem & Infrastructure',
    color: 'from-emerald-600 to-green-700',
  },
  {
    name: 'Nithya Rajasekar',
    role: 'Vice President & Chief of Staff',
    company: 'StartupTN',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'NR',
    highlight: 'Startup Policy & Incubation',
    color: 'from-blue-600 to-teal-600',
  },
  {
    name: 'Dharanidharan Sivasamy',
    role: 'Foreign Direct Investment Officer',
    company: 'hub.brussels',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'DS',
    highlight: 'Global Trade & Foreign Direct Investment',
    color: 'from-indigo-600 to-blue-700',
  },
  {
    name: 'Rajan BL',
    role: 'VP — Tamil Nadu Startup & AI Ecosystem',
    company: 'StartupTN',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'RB',
    highlight: 'Regional Innovation & AI Policy',
    color: 'from-cyan-600 to-blue-700',
  },
  {
    name: 'Nikunj Panchal',
    role: 'Assistant Vice President',
    company: 'StartupTN',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'NP',
    highlight: 'Ecosystem Alliances & Grants',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Dr Prabhu Venugopal',
    role: 'Angel Investor',
    company: 'Angel Network',
    track: 'gov',
    trackLabel: 'Angel Investors',
    initials: 'PV',
    highlight: 'Pre-Seed / Seed Angel Backing',
    color: 'from-amber-600 to-orange-600',
  },
  {
    name: 'Tarun Billa',
    role: 'Angel Investor',
    company: 'Private Syndicate',
    track: 'gov',
    trackLabel: 'Angel Investors',
    initials: 'TB',
    highlight: 'Founder Pitch Evaluation',
    color: 'from-purple-600 to-pink-600',
  },

  // --- IoT & Cybersecurity Track ---
  {
    name: 'Prasath Jayasundar',
    role: 'Senior Cybersecurity Engineer',
    company: 'PayPal',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'PJ',
    highlight: 'Financial Cyber Defense & SOC',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    name: 'Vinod Kumar',
    role: 'Senior Application Developer',
    company: 'UPS',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'VK',
    highlight: 'Logistics Systems & IoT Architecture',
    color: 'from-amber-700 to-stone-800',
  },
  {
    name: 'Arivukkarasan Raja',
    role: 'Director',
    company: 'AstraZeneca',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'AR',
    highlight: 'Pharma Tech, IoT & Infrastructure',
    color: 'from-teal-600 to-cyan-700',
  },
  {
    name: 'Abishek R',
    role: 'Technical Lead',
    company: 'HCLTech',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'AR',
    highlight: 'SecOps & Embedded Security',
    color: 'from-blue-600 to-slate-700',
  },
  {
    name: 'Aravindh Raj',
    role: 'Cyber Security Manager',
    company: 'Northern Lights',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'AR',
    highlight: 'Threat Modeling & Vulnerability Audit',
    color: 'from-indigo-600 to-purple-600',
  },
  {
    name: 'Muhamadu Mansur R',
    role: 'Technology Lead',
    company: 'Infosys',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'MM',
    highlight: 'Cloud Security & IoT Networks',
    color: 'from-sky-600 to-blue-700',
  },
];

const TRUSTED_COMPANIES = [
  { name: 'Ford', logoText: 'Ford' },
  { name: 'Verizon', logoText: 'verizon' },
  { name: 'Capgemini', logoText: 'Capgemini' },
  { name: 'Deloitte', logoText: 'Deloitte.' },
  { name: 'IBM', logoText: 'IBM' },
  { name: 'Flipkart', logoText: 'Flipkart' },
  { name: 'Accenture', logoText: 'accenture' },
  { name: 'PayPal', logoText: 'PayPal' },
  { name: 'TCS', logoText: 'TATA TCS' },
  { name: 'Wipro', logoText: 'wipro' },
  { name: 'HCLTech', logoText: 'HCLTech' },
  { name: 'AstraZeneca', logoText: 'AstraZeneca' },
  { name: 'StartupTN', logoText: 'StartupTN' },
  { name: 'ELCOT', logoText: 'ELCOT' },
];

const TESTIMONIALS = [
  {
    quote:
      'Instead of another generic motivation lecture, our students were listening to the Chief AI Architect from Ford break down how production models are deployed. The candid Q&A changed how students view their engineering projects.',
    author: 'Dr. S. Sundararajan',
    role: 'Dean of Academic & Industry Relations',
    institution: 'PSG College of Technology',
    tag: 'Institutional Leader',
    rating: 5,
  },
  {
    quote:
      'I got to ask direct questions about what hiring managers actually look for in portfolio projects versus resume keywords. That 90-minute session was more actionable than 3 years of classroom theory.',
    author: 'Ananya Mehra',
    role: 'Final Year B.Tech Student',
    institution: 'Mentor Campus Club Member',
    tag: 'Student Perspective',
    rating: 5,
  },
  {
    quote:
      'Giving back through Mentor Campus is deeply fulfilling because there are zero PR scripts or artificial barriers. Students ask real, difficult questions about the industry, and we give them honest, grounded answers.',
    author: 'Bharathi Ravindran',
    role: 'Director, AI Science',
    institution: 'Verizon & Mentor Campus Contributor',
    tag: 'Industry Mentor',
    rating: 5,
  },
  {
    quote:
      'Setting up a student-led Mentor Campus Club on our campus has created an ongoing buzz. Sessions happen every month across AI, Startups, and HR, making industry exposure a regular part of campus life.',
    author: 'Prof. K. Venkatesh',
    role: 'Faculty Coordinator, Innovation Cell',
    institution: 'Anna University Affiliated Campus',
    tag: 'Campus Coordinator',
    rating: 5,
  },
];

const SESSION_FORMATS = [
  {
    title: 'Expert talks',
    desc: 'A senior leader visits your college for a single, focused session, followed by open and uncensored Q&A with students.',
    badge: 'High Impact',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
    points: ['Direct access to VP/Director level leaders', 'Audience-driven 45-min Q&A', 'Real workplace case studies'],
  },
  {
    title: 'Panel discussions',
    desc: 'Multiple experts discuss a shared emerging theme, moderated specifically for students in an engaging, interactive format.',
    badge: 'Multi-Perspective',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    points: ['3 to 4 cross-sector practitioners', 'Healthy debates on industry shifts', 'Diverse career trajectory paths'],
  },
  {
    title: 'Interactive workshops',
    desc: 'Smaller, hands-on masterclasses that go deep on one specific skill, practical toolstack, or industry workflow.',
    badge: 'Hands-on Mastery',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    points: ['Intimate batch size for practical feedback', 'Tooling, code reviews & portfolio audits', 'Zero abstract theories'],
  },
];

// ==========================================
// SUBCOMPONENTS
// ==========================================

// Mentor Campus Logo Component matching official identity
const MentorCampusLogo = ({ className = 'h-8' }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20">
      {/* Stylized M with person / graduation cap node */}
      <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current" aria-hidden="true">
        <circle cx="16" cy="7" r="2.75" />
        <path d="M7 25V15.5C7 14.12 8.12 13 9.5 13H11V25H7Z" />
        <path d="M21 25V13H22.5C23.88 13 25 14.12 25 15.5V25H21Z" />
        <path d="M13 25V11.5C13 10.67 13.67 10 14.5 10H17.5C18.33 10 19 10.67 19 11.5V25H13Z" />
      </svg>
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold tracking-tight text-[15px] text-slate-900 uppercase">
        Mentor<span className="text-blue-600 ml-1">Campus</span>
      </span>
      <span className="text-[9px] tracking-wider text-slate-400 font-medium lowercase">mentorcampus.in</span>
    </div>
  </div>
);

// Individual Mentor Card
const MentorCard = ({ mentor }) => {
  return (
    <div className="w-[300px] sm:w-[320px] flex-shrink-0 bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.08)] hover:border-blue-300 transition-all duration-300 group select-none">
      <div className="flex items-start gap-3.5 mb-3.5">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-inner bg-gradient-to-br ${mentor.color} group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}
        >
          {mentor.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-semibold text-slate-900 text-sm truncate group-hover:text-blue-600 transition-colors">
              {mentor.name}
            </h4>
            <span
              className="inline-flex text-blue-500"
              title="Verified Industry Mentor"
              aria-label="Verified Mentor"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <p className="text-[12px] text-slate-500 line-clamp-1 mt-0.5">{mentor.role}</p>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Organization</span>
          <span className="font-medium text-slate-800 bg-slate-100/90 px-2 py-0.5 rounded-md text-[11px] truncate max-w-[160px]">
            {mentor.company}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Domain</span>
          <span className="text-blue-600 font-medium text-[11px]">{mentor.highlight}</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN LANDING COMPONENT
// ==========================================
export default function MentorCampusLanding() {
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    collegeName: '',
    coordinatorName: '',
    workEmail: '',
    phone: '',
    preferredTrack: 'Technology & AI',
    sessionType: 'Expert talks',
  });

  // Filter mentors based on active track
  const filteredMentors = useMemo(() => {
    if (selectedTrack === 'all') return MENTORS_DATA;
    return MENTORS_DATA.filter((m) => m.track === selectedTrack);
  }, [selectedTrack]);

  // Split into 2 rows for realistic smooth marquee
  const row1Mentors = useMemo(() => {
    const half = Math.ceil(filteredMentors.length / 2);
    const list = filteredMentors.slice(0, half);
    return [...list, ...list, ...list]; // tripled for seamless infinite loop
  }, [filteredMentors]);

  const row2Mentors = useMemo(() => {
    const half = Math.ceil(filteredMentors.length / 2);
    const list = filteredMentors.slice(half);
    const effective = list.length > 0 ? list : filteredMentors;
    return [...effective, ...effective, ...effective];
  }, [filteredMentors]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setShowInquiryModal(false);
      setInquirySubmitted(false);
      setFormData({
        collegeName: '',
        coordinatorName: '',
        workEmail: '',
        phone: '',
        preferredTrack: 'Technology & AI',
        sessionType: 'Expert talks',
      });
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Inlined Apple Style & Marquee Keyframes */}
      <style>{`
        @keyframes mcMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes mcMarqueeReverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
        .animate-mc-marquee {
          display: flex;
          width: max-content;
          animation: mcMarquee 42s linear infinite;
        }
        .animate-mc-marquee-reverse {
          display: flex;
          width: max-content;
          animation: mcMarqueeReverse 46s linear infinite;
        }
        .paused-animation {
          animation-play-state: paused !important;
        }
        /* Custom subtle scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      {/* Ambient Apple Glow Spheres */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-b from-blue-100/70 via-indigo-100/40 to-transparent rounded-full blur-3xl opacity-75" />
        <div className="absolute top-[35%] -right-40 w-[500px] h-[500px] bg-blue-50/70 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-[65%] -left-40 w-[500px] h-[500px] bg-indigo-50/70 rounded-full blur-3xl opacity-60" />
      </div>

      {/* ======================================================== */}
      {/* NAVIGATION BAR - Frosted Glass Apple Style */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/75 border-b border-black/[0.06] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <MentorCampusLogo />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#sessions" className="hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#mentors" className="hover:text-blue-600 transition-colors">
              Mentors
            </a>
            <a href="#partners" className="hover:text-blue-600 transition-colors">
              Partners
            </a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">
              Testimonials
            </a>
            <a href="#campus-clubs" className="hover:text-blue-600 transition-colors">
              Campus Clubs
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://mentorcampus.in"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-slate-500 hover:text-slate-800 px-3 py-1.5 transition-colors"
            >
              mentorcampus.in ↗
            </a>
            <button
              onClick={() => setShowInquiryModal(true)}
              className="relative inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-sm shadow-blue-500/25 transition-all duration-200"
            >
              Bring to Your College
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-xl space-y-3">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              About
            </a>
            <a
              href="#sessions"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              How It Works
            </a>
            <a
              href="#mentors"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              Mentors
            </a>
            <a
              href="#partners"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              Partners
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              Testimonials
            </a>
            <a
              href="#campus-clubs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              Campus Clubs
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowInquiryModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm text-center shadow-sm"
              >
                Bring to Your College
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* HERO SECTION - Soft Apple Minimalist Aesthetic */}
      {/* ======================================================== */}
      <section className="relative z-10 pt-16 pb-20 sm:pt-24 sm:pb-28 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Soft Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide mb-8 shadow-xs backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>Redefining College Industry Exposure</span>
          <span className="text-blue-300">|</span>
          <span className="text-slate-500 font-normal">Beyond Textbook Lectures</span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
          Learn from people who are{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">
            building the real world.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal mb-10">
          Mentor Campus brings senior industry leaders directly into colleges for expert talks and interactive sessions —
          engineers and AI leads, founders, policymakers, clinicians, journalists, and athletes speaking candidly about
          their work, instead of another textbook lecture.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => setShowInquiryModal(true)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Bring Mentor Campus to your college</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <a
            href="#mentors"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-medium text-sm shadow-xs hover:border-slate-300 transition-all duration-200"
          >
            Explore 100+ Mentors
          </a>
        </div>

        {/* Track Pills Carousel / Horizontal List */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {[
            'Technology & AI',
            'Business & Startups',
            'Government & Policy',
            'Healthcare',
            'Media & Arts',
            'Sports',
            'IoT & Cybersecurity',
            'Human Resources',
          ].map((trackName, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/80 border border-slate-200/70 text-slate-700 shadow-xs backdrop-blur-xs hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              {trackName}
            </span>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* TRUSTED PARTNERS & LEADING COMPANIES */}
      {/* ======================================================== */}
      <section id="partners" className="relative z-10 py-12 border-y border-slate-200/70 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-8">
            Mentors & Leaders participating from global pioneer organizations
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 items-center justify-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {TRUSTED_COMPANIES.map((company, i) => (
              <div
                key={i}
                className="flex items-center justify-center py-2 px-3 text-slate-800 font-bold tracking-tight text-sm hover:text-blue-600 transition-colors"
              >
                <span className="border-b-2 border-transparent hover:border-blue-600 pb-0.5">
                  {company.logoText}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCROLLING-ANIMATED MENTOR DETAILS (HERO REQUIREMENT) */}
      {/* ======================================================== */}
      <section id="mentors" className="relative z-10 py-20 bg-slate-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            <span>Featured Track Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet the leaders mentoring on campus
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Real industry leaders taking candid sessions through Mentor Campus — from enterprise AI architects to venture
            founders and policy directors.
          </p>

          {/* Track Filter Tabs (Apple Segmented Style) */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap mt-8 p-1.5 bg-slate-200/60 backdrop-blur-md rounded-2xl max-w-fit mx-auto border border-slate-300/60 shadow-inner">
            {TRACK_CATEGORIES.map((cat) => {
              const active = selectedTrack === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTrack(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'bg-white text-slate-900 shadow-sm shadow-black/5 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active ? 'bg-blue-50 text-blue-600 font-semibold' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Pause/Play Marquee control */}
          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-400">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <span>{isPaused ? '▶ Resume Scrolling' : '⏸ Pause Auto-Scroll'}</span>
            </button>
            <span>• Hover over any card to inspect details</span>
          </div>
        </div>

        {/* Infinite Scrolling Marquee Track 1 (Leftwards) */}
        <div
          className="relative w-full overflow-hidden py-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge Blur Gradients */}
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#FBFBFD] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#FBFBFD] to-transparent z-10 pointer-events-none" />

          <div className={`animate-mc-marquee gap-5 ${isPaused ? 'paused-animation' : ''}`}>
            {row1Mentors.map((mentor, index) => (
              <MentorCard key={`row1-${index}-${mentor.name}`} mentor={mentor} />
            ))}
          </div>
        </div>

        {/* Infinite Scrolling Marquee Track 2 (Rightwards) */}
        <div
          className="relative w-full overflow-hidden py-3 mt-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge Blur Gradients */}
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#FBFBFD] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#FBFBFD] to-transparent z-10 pointer-events-none" />

          <div className={`animate-mc-marquee-reverse gap-5 ${isPaused ? 'paused-animation' : ''}`}>
            {row2Mentors.map((mentor, index) => (
              <MentorCard key={`row2-${index}-${mentor.name}`} mentor={mentor} />
            ))}
          </div>
        </div>

        {/* Track Stat Metrics (As seen in the PDF pages) */}
        <div className="max-w-4xl mx-auto px-4 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">100+</div>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mt-1">
              Active Leaders Per Track
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Senior VPs, Directors & Founders</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">10+</div>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mt-1">
              Industry Tracks Overall
            </p>
            <p className="text-[11px] text-slate-500 mt-1">AI, Cyber, HR, Policy, Gov, Startups</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">3</div>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mt-1">
              Interactive Session Formats
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Tailored for deep student engagement</p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* HOW THE SESSIONS WORK (FROM PDF PAGE 1) */}
      {/* ======================================================== */}
      <section id="sessions" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Program Methodology</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How the sessions work
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Designed specifically to eliminate passive, monotone lectures and substitute them with direct, honest
            dialogues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SESSION_FORMATS.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded-full border border-blue-100">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                {item.points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Signature Philosophy Callout (Authentic PDF Quote Banner) */}
        <div className="mt-14 rounded-3xl bg-[#091528] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3">
              Mentor Campus • Program Philosophy
            </span>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-slate-100 leading-snug">
              &ldquo;Students don&apos;t need another lecture about the industry — they need someone already in it, willing
              to answer the honest questions.&rdquo;
            </blockquote>
            <p className="mt-4 text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Curated for maximum student clarity & zero corporate PR
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* ABOUT SECTION & CAMPUS CLUB MODEL */}
      {/* ======================================================== */}
      <section id="about" className="relative z-10 py-20 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-4">
                <span>About Mentor Campus</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Bridging the chasm between classrooms and industry reality.
              </h2>
              <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                MentorCampus (mentorcampus.in) is dedicated to solving one persistent issue in higher education: students
                graduate with theoretical concepts, yet have almost no direct line to what senior builders, engineers, and
                executives are experiencing today.
              </p>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                By organizing structured campus interactions across specialized career tracks, we replace vague motivational
                speeches with granular, actionable knowledge on tooling, decision-making, and recruitment benchmarks.
              </p>

              {/* Pillars list */}
              <div className="mt-8 space-y-4">
                {[
                  {
                    title: 'Practitioners, Not Textbook Theorists',
                    desc: 'Sessions are led by practitioners actively working at top global companies, startup labs, and public policy entities.',
                  },
                  {
                    title: 'Student-Driven Campus Chapters',
                    desc: 'Colleges form student-led Mentor Campus clubs that establish an ongoing culture rather than isolated, once-a-year events.',
                  },
                  {
                    title: 'Unscripted, High-Candor Q&A',
                    desc: 'Over 50% of session time is dedicated to unmoderated student questions about career hurdles, real day-to-day challenges, and hiring realities.',
                  },
                ].map((pillar, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{pillar.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card Visual: The Campus Club Structure */}
            <div id="campus-clubs" className="relative">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-700/50">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">Mentor Campus Club Model</h3>
                    <p className="text-xs text-slate-400">Institutional Framework for Colleges</p>
                  </div>
                  <span className="text-[11px] font-semibold bg-blue-600/40 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full">
                    Student-Led
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        01
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Faculty Coordinator & Core Student Team</div>
                        <p className="text-[11px] text-slate-300">Simple autonomous structure to drive campus events</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        02
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Monthly Thematic Calendar</div>
                        <p className="text-[11px] text-slate-300">
                          AI Month, Startup Sprint, HR Decoded & Cyber Defense cycles
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        03
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Direct Mentorship Access & Portfolios</div>
                        <p className="text-[11px] text-slate-300">
                          Students connect directly with speakers for referrals and project reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs text-slate-300">Interested in launching a club?</div>
                  <button
                    onClick={() => setShowInquiryModal(true)}
                    className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-colors"
                  >
                    Start a Chapter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* TESTIMONIALS SECTION */}
      {/* ======================================================== */}
      <section id="testimonials" className="relative z-10 py-20 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Real Stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Loved by students, faculty & mentors alike
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Hear firsthand how unfiltered conversations with industry leaders transform college perspectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-slate-900 text-xs sm:text-sm">{t.author}</h5>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                  <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {t.institution}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FINAL CALL TO ACTION BANNER (FROM PDF FOOTER) */}
      {/* ======================================================== */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-blue-200 text-xs font-bold tracking-wider uppercase">
              Host Industry Leaders On Your Campus
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 mb-3">
              Bring Mentor Campus to your college
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Set up expert talks, panel discussions, and hands-on sessions for your students in any of our specialized
              industry tracks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowInquiryModal(true)}
              className="px-6 py-3.5 rounded-full bg-white text-blue-700 font-semibold text-xs sm:text-sm hover:bg-blue-50 active:scale-95 shadow-md transition-all text-center"
            >
              Request a Session
            </button>
            <a
              href="mailto:contact@mentorcampus.in"
              className="px-6 py-3.5 rounded-full bg-blue-800/60 hover:bg-blue-800 border border-blue-400/40 text-white font-medium text-xs sm:text-sm text-center transition-all"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FOOTER */}
      {/* ======================================================== */}
      <footer className="relative z-10 border-t border-slate-200/80 bg-white py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <MentorCampusLogo />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 font-medium">
              <a href="#about" className="hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#sessions" className="hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="#mentors" className="hover:text-blue-600 transition-colors">
                Mentors Directory
              </a>
              <a href="#partners" className="hover:text-blue-600 transition-colors">
                Partners
              </a>
              <a href="#campus-clubs" className="hover:text-blue-600 transition-colors">
                Start a Club
              </a>
              <a
                href="https://mentorcampus.in"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                mentorcampus.in
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-3">
            <p>© {new Date().getFullYear()} Mentor Campus (mentorcampus.in). All rights reserved.</p>
            <p>Designed with Soft Apple Aesthetics & Authentic Industry Tracks.</p>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* INQUIRY MODAL (APPLE SHEET STYLE) */}
      {/* ======================================================== */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>

            {inquirySubmitted ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-slate-900">Inquiry Received!</h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-xs mx-auto mt-2">
                  Our campus partnership team will reach out with track details and speaker schedules within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-block text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    Partner With Us
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Bring Mentor Campus to Your College
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect your students directly with senior industry practitioners.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      College / University Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. National Institute of Technology"
                      value={formData.collegeName}
                      onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Coordinator Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. / Prof. / Student Lead"
                        value={formData.coordinatorName}
                        onChange={(e) => setFormData({ ...formData, coordinatorName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Official / Academic Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="coordinator@college.edu.in"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Preferred Track
                      </label>
                      <select
                        value={formData.preferredTrack}
                        onChange={(e) => setFormData({ ...formData, preferredTrack: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-700"
                      >
                        <option>Technology & AI</option>
                        <option>Human Resources</option>
                        <option>Entrepreneur & Founders</option>
                        <option>Government & Policy</option>
                        <option>IoT & Cybersecurity</option>
                        <option>Multi-track Campus Season</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Session Format
                      </label>
                      <select
                        value={formData.sessionType}
                        onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-700"
                      >
                        <option>Expert talks (Single leader + Q&A)</option>
                        <option>Panel discussions (3-4 experts)</option>
                        <option>Interactive workshop</option>
                        <option>Student Campus Club Chapter</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all"
                    >
                      Submit College Inquiry
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-2">
                      Official portal: mentorcampus.in • Direct email: contact@mentorcampus.in
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

