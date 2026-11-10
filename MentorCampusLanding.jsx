import React, { useState, useMemo, useEffect, useRef } from 'react';
import './MentorCampusLanding.css';

// ============================================================================
// DATA SETS: AUTHENTIC MENTOR CAMPUS DIRECTORY & CONTENT
// ============================================================================

const TRACK_CATEGORIES = [
  { id: 'all', label: 'All Mentors', count: '40+' },
  { id: 'ai', label: 'Artificial Intelligence', count: '100+' },
  { id: 'hr', label: 'Human Resources', count: '100+' },
  { id: 'entrepreneur', label: 'Founders & Startups', count: '100+' },
  { id: 'gov', label: 'Gov & Angel Investors', count: '100+' },
  { id: 'cyber', label: 'IoT & Cybersecurity', count: '100+' },
];

const HERO_PILLS = [
  {
    id: 'creators',
    title: 'Creators',
    subtitle: 'Ideas & media',
    filterTrack: 'all',
    type: 'dot',
  },
  {
    id: 'founders',
    title: 'Founders',
    subtitle: 'Entrepreneurs',
    filterTrack: 'entrepreneur',
    type: 'arrow',
  },
  {
    id: 'leaders',
    title: 'Leaders',
    subtitle: 'Community leaders',
    filterTrack: 'gov',
    type: 'dot',
  },
  {
    id: 'professionals',
    title: 'Professionals',
    subtitle: 'Career builders',
    filterTrack: 'ai',
    type: 'grid',
  },
];

const MENTORS_DATA = [
  // --- Artificial Intelligence Track ---
  {
    id: 'm-ai-1',
    name: 'Senthilkumar Viswanathan',
    role: 'Chief Technical AI Architect',
    company: 'Ford Motor Company',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'SV',
    highlight: 'Enterprise AI & Architecture',
    bio: 'Pioneering large-scale enterprise AI infrastructure and autonomous vehicle machine learning systems at Ford.',
    topics: ['Production ML Deployment', 'Autonomous Systems Architecture', 'AI Engineering Roadmaps'],
    sessionsTaken: 14,
    color: 'from-blue-600 to-indigo-600',
    image: './images/mentors/senthilkumar-viswanathan.png',
  },
  {
    id: 'm-ai-2',
    name: 'Bharathi Ravindran',
    role: 'Director, AI Science',
    company: 'Verizon',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'BR',
    highlight: 'Applied AI & ML Science',
    bio: 'Directs applied data science and deep learning research teams scaling telecommunications intelligence.',
    topics: ['Applied AI in Telecom', 'From Research to Production', 'Data Science Career Ladders'],
    sessionsTaken: 9,
    color: 'from-sky-500 to-blue-600',
    image: './images/mentors/bharathi-ravindran.png',
  },
  {
    id: 'm-ai-3',
    name: 'Senthilvel Kasirajan',
    role: 'Director, Gen AI & Data Science, GCP',
    company: 'Capgemini',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'SK',
    highlight: 'Generative AI & Cloud Data',
    bio: 'Oversees GCP AI Center of Excellence, helping enterprises architect generative AI and LLM solutions.',
    topics: ['Enterprise Generative AI', 'Cloud Foundation Models', 'Agentic Workflows'],
    sessionsTaken: 11,
    color: 'from-indigo-500 to-blue-700',
    image: './images/mentors/senthilvel-kasirajan.png',
  },
  {
    id: 'm-ai-4',
    name: 'Ramesh Babu',
    role: 'Director, Data & AI',
    company: 'Metayb',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'RB',
    highlight: 'Big Data Strategy & AI',
    bio: 'Architecting big data pipelines and distributed analytics systems for global clients.',
    topics: ['Big Data at Scale', 'Data Engineering vs Data Science', 'Real-time Streaming'],
    sessionsTaken: 7,
    color: 'from-cyan-600 to-blue-600',
    image: './images/mentors/ramesh-babu.png',
  },
  {
    id: 'm-ai-5',
    name: 'Raj Arun',
    role: 'Director, AI Engineering',
    company: 'Fractal',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'RA',
    highlight: 'AI Engineering & Production',
    bio: 'Driving engineering excellence and AI model monitoring for Fortune 500 analytics implementations.',
    topics: ['MLOps Best Practices', 'Scaling Model Observability', 'AI Consulting Dynamics'],
    sessionsTaken: 8,
    color: 'from-blue-500 to-cyan-500',
    image: './images/mentors/raj-arun.png',
  },
  {
    id: 'm-ai-6',
    name: 'Kishan S',
    role: 'Assistant Vice President, Data & AI',
    company: 'EXL',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'KS',
    highlight: 'Enterprise AI Operations',
    bio: 'Guiding global analytics transformation, financial data modeling, and enterprise risk intelligence.',
    topics: ['Fintech AI Applications', 'Executive Data Strategy', 'Consulting Readiness'],
    sessionsTaken: 12,
    color: 'from-indigo-600 to-violet-600',
    image: './images/mentors/kishan-s.png',
  },
  {
    id: 'm-ai-7',
    name: 'Karthick Nethaji Kaleeswaran',
    role: 'Director of AI Product Management',
    company: 'HCLTech',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'KK',
    highlight: 'AI Product Strategy & Roadmap',
    bio: 'Spearheading product vision for enterprise cognitive solutions and applied AI software suites.',
    topics: ['Product Management for AI', 'Validating AI Business Value', 'Product Roadmapping'],
    sessionsTaken: 6,
    color: 'from-blue-600 to-slate-700',
    image: './images/mentors/karthick-nethaji-kaleeswaran.png',
  },
  {
    id: 'm-ai-8',
    name: 'Amudha Murugesan',
    role: 'Director, AI Managed Services',
    company: 'Vendasta',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'AM',
    highlight: 'AI Services & Scaling',
    bio: 'Leads AI service delivery and customer enablement for high-growth SaaS ecosystems.',
    topics: ['SaaS Scale-up with AI', 'Operational AI Excellence', 'Customer Experience Automation'],
    sessionsTaken: 5,
    color: 'from-sky-600 to-indigo-600',
    image: './images/mentors/amudha-murugesan.png',
  },
  {
    id: 'm-ai-9',
    name: 'Edward Satish C',
    role: 'Head of Digital Tech & Automation AI',
    company: 'WPP Production',
    track: 'ai',
    trackLabel: 'Artificial Intelligence',
    initials: 'EC',
    highlight: 'Automation AI & Media Tech',
    bio: 'Bridging creative agency automation with bleeding-edge generative media and digital technology.',
    topics: ['Generative Media Tech', 'Creative Automation', 'Next-Gen Content Engines'],
    sessionsTaken: 8,
    color: 'from-slate-700 to-blue-800',
    image: './images/mentors/edward-satish-c.png',
  },

  // --- Human Resources Track ---
  {
    id: 'm-hr-1',
    name: 'Keerthana Arul',
    role: 'Senior HR Business Analyst',
    company: 'Deloitte',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'KA',
    highlight: 'HR Analytics & Talent Ops',
    bio: 'Specializes in talent supply-chain analytics and modern hiring intelligence frameworks.',
    topics: ['Cracking Campus Placements', 'What Recruiters Screen For', 'Resume Decoders'],
    sessionsTaken: 16,
    color: 'from-teal-500 to-emerald-600',
    image: './images/mentors/keerthana-arul.png',
  },
  {
    id: 'm-hr-2',
    name: 'Vignesh U',
    role: 'Senior Talent Acquisition Partner',
    company: 'ADP',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'VU',
    highlight: 'Talent Acquisition & Hiring',
    bio: 'Recruiter with over a decade hiring engineers, engineering managers, and cloud architects.',
    topics: ['Technical Interview Prep', 'Navigating Salary Negotiations', 'Engineering Culture'],
    sessionsTaken: 13,
    color: 'from-blue-500 to-teal-600',
    image: './images/mentors/vignesh-u.png',
  },
  {
    id: 'm-hr-3',
    name: 'Vasanth M',
    role: 'Cluster HR Business Partner',
    company: 'Flipkart',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'VM',
    highlight: 'E-commerce HRBP & Operations',
    bio: 'Manages high-volume talent development and leadership scaling for India premier e-commerce ecosystem.',
    topics: ['High-Growth Culture', 'First 90 Days at Work', 'Leadership Transitions'],
    sessionsTaken: 10,
    color: 'from-amber-500 to-orange-600',
    image: './images/mentors/vasanth-m.png',
  },
  {
    id: 'm-hr-4',
    name: 'Reshma Subash',
    role: 'Senior Talent Acquisition Specialist',
    company: 'IBM',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'RS',
    highlight: 'Tech Recruiting & Culture',
    bio: 'Sourcing and onboarding talent for IBM cloud, consulting, and cybersecurity divisions.',
    topics: ['Global Enterprise Sourcing', 'LinkedIn Profile Optimization', 'Behavioral Interviews'],
    sessionsTaken: 12,
    color: 'from-blue-700 to-indigo-700',
    image: './images/mentors/reshma-subash.png',
  },
  {
    id: 'm-hr-5',
    name: 'Ayush Ranjan',
    role: 'Human Resources Business Partner',
    company: 'NielsenIQ',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'AR',
    highlight: 'Corporate People Strategy',
    bio: 'Driving HR business partnerships, talent metrics, and executive performance coaching.',
    topics: ['People Operations Scaling', 'Competency Mapping', 'HR in Multinational Firms'],
    sessionsTaken: 8,
    color: 'from-purple-500 to-indigo-600',
    image: './images/mentors/ayush-ranjan-hr.png',
  },
  {
    id: 'm-hr-6',
    name: 'Pavithran Sivakumar',
    role: 'Senior Talent Acquisition Specialist',
    company: 'Accenture',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'PS',
    highlight: 'Campus to Corporate Transition',
    bio: 'Dedicated to helping campus students understand corporate communication and onboarding standards.',
    topics: ['Campus to Corporate Shift', 'Overcoming Imposter Syndrome', 'Interview Do’s & Don’ts'],
    sessionsTaken: 15,
    color: 'from-violet-600 to-purple-600',
    image: './images/mentors/pavithran-sivakumar.png',
  },
  {
    id: 'm-hr-7',
    name: 'Shaffiullah S',
    role: 'HR Business Partner',
    company: 'TCS',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'SS',
    highlight: 'Workforce Planning & People Dev',
    bio: 'Guiding thousands of young engineers through structured capability building and mentorship.',
    topics: ['Career Pathing in Large IT', 'Continuous Upskilling', 'Performance Evaluations'],
    sessionsTaken: 9,
    color: 'from-blue-600 to-cyan-700',
    image: './images/mentors/shaffiullah-s.png',
  },
  {
    id: 'm-hr-8',
    name: 'Roshini Karunakaran',
    role: 'Senior Executive Talent Acquisition',
    company: 'Wipro',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'RK',
    highlight: 'Engineering Hiring & Sourcing',
    bio: 'Specialist in early-career engineering recruitment, skill-matrix assessments, and hiring operations.',
    topics: ['Acing Coding Interviews', 'Soft Skills for Engineers', 'Campus Selection Process'],
    sessionsTaken: 11,
    color: 'from-emerald-600 to-teal-700',
    image: './images/mentors/roshini-karunakaran.png',
  },
  {
    id: 'm-hr-9',
    name: 'Saravana Kumar',
    role: 'Talent Acquisition Lead',
    company: 'UST',
    track: 'hr',
    trackLabel: 'Human Resources',
    initials: 'SK',
    highlight: 'Global IT Talent Strategy',
    bio: 'Leads digital tech sourcing and lateral hiring strategies for cloud and enterprise software engineering.',
    topics: ['Lateral vs Freshers Hiring', 'Tech Stack Demands', 'Building Professional Networks'],
    sessionsTaken: 14,
    color: 'from-indigo-600 to-blue-700',
    image: './images/mentors/saravana-kumar.png',
  },

  // --- Entrepreneur Track ---
  {
    id: 'm-ent-1',
    name: 'Rakesh R',
    role: 'Co-Founder and CEO',
    company: 'Aptahire',
    track: 'entrepreneur',
    trackLabel: 'Founders & Startups',
    initials: 'RR',
    highlight: 'Early-stage Venture Building',
    bio: 'Bootstrapped and scaled hiring tech platforms serving rapid-growth startups across India.',
    topics: ['Finding Product-Market Fit', 'Bootstrapping vs VC Funding', 'First 10 Hires'],
    sessionsTaken: 18,
    color: 'from-rose-500 to-pink-600',
    image: './images/mentors/rakesh-r-aptahire.png',
  },
  {
    id: 'm-ent-2',
    name: 'Nithya Rajasekar',
    role: 'Founder & CEO',
    company: 'Unitive Technologies',
    track: 'entrepreneur',
    trackLabel: 'Founders & Startups',
    initials: 'NR',
    highlight: 'Tech Product Entrepreneurship',
    bio: 'Serial entrepreneur building developer tooling and enterprise SaaS products.',
    topics: ['Validating SaaS Ideas', 'Building in Public', 'Sales for Introverted Engineers'],
    sessionsTaken: 11,
    color: 'from-fuchsia-600 to-purple-600',
    image: './images/mentors/nithya-rajasekar-unitive.png',
  },
  {
    id: 'm-ent-3',
    name: 'Balachander G',
    role: 'Founder & Director',
    company: 'BookWater',
    track: 'entrepreneur',
    trackLabel: 'Founders & Startups',
    initials: 'BG',
    highlight: 'CleanTech & IoT Systems',
    bio: 'Building IoT-enabled water delivery networks and sustainable urban utility hardware.',
    topics: ['Hardware & IoT Startups', 'Sustainability Ventures', 'Managing Supply Chains'],
    sessionsTaken: 7,
    color: 'from-blue-500 to-teal-500',
    image: './images/mentors/balachander-g.png',
  },
  {
    id: 'm-ent-4',
    name: 'Pinku B',
    role: 'Founder & CEO',
    company: 'Taxina',
    track: 'entrepreneur',
    trackLabel: 'Founders & Startups',
    initials: 'PB',
    highlight: 'Fintech & Mobility Startups',
    bio: 'Building urban mobility solutions and decentralized fintech payment integration models.',
    topics: ['Mobility Tech Platforms', 'Fintech Unit Economics', 'Customer Acquisition Cost'],
    sessionsTaken: 8,
    color: 'from-amber-600 to-orange-600',
    image: './images/mentors/pinku-b.png',
  },
  {
    id: 'm-ent-5',
    name: 'Ayush Ranjan',
    role: 'CEO & Mentor',
    company: 'Vibrant Education',
    track: 'entrepreneur',
    trackLabel: 'Founders & Startups',
    initials: 'AR',
    highlight: 'EdTech & Skill Building',
    bio: 'Educator and entrepreneur scaling student enablement programs and experiential learning.',
    topics: ['EdTech Business Models', 'Student Entrepreneurship', 'Scaling Offline-Online Hybrids'],
    sessionsTaken: 10,
    color: 'from-purple-500 to-indigo-600',
    image: './images/mentors/ayush-ranjan-vibrant.png',
  },
  {
    id: 'm-ent-6',
    name: 'Senthil K Chinnasamy',
    role: 'Investor, Partner — Strategy & Growth',
    company: 'Varam.app',
    track: 'entrepreneur',
    trackLabel: 'Founders & Startups',
    initials: 'SC',
    highlight: 'Venture Strategy & Scale',
    bio: 'Active early-stage angel investor and startup operator guiding scaling ventures.',
    topics: ['Growth Playbooks', 'Evaluating Startup Traction', 'Fundraising Realities'],
    sessionsTaken: 12,
    color: 'from-emerald-600 to-teal-600',
    image: './images/mentors/senthil-k-chinnasamy.png',
  },
  {
    id: 'm-ent-7',
    name: 'Siraj M.K',
    role: 'Managing Partner',
    company: 'Pathfinder',
    track: 'entrepreneur',
    trackLabel: 'Founders & Startups',
    initials: 'SM',
    highlight: 'Business Incubation & Advisory',
    bio: 'Consultant and enterprise mentor advising early-stage founders on corporate governance and market entry.',
    topics: ['Go-to-Market Strategy', 'Navigating Regulatory Frameworks', 'Founder Resilience'],
    sessionsTaken: 9,
    color: 'from-cyan-600 to-blue-700',
    image: './images/mentors/siraj-m-k.png',
  },
  {
    id: 'm-ent-8',
    name: 'Sudarsan Babu',
    role: 'Founder & CEO',
    company: 'Pauket',
    track: 'entrepreneur',
    trackLabel: 'Founders & Startups',
    initials: 'SB',
    highlight: 'Consumer Tech & SaaS',
    bio: 'Creating viral consumer mobile apps and social micro-commerce platforms.',
    topics: ['Consumer Growth Hacking', 'UI/UX That Converts', 'From College Hackathon to Startup'],
    sessionsTaken: 14,
    color: 'from-purple-600 to-indigo-600',
    image: './images/mentors/sudarsan-babu.png',
  },
  {
    id: 'm-ent-9',
    name: 'Selventhiran Kathiresan',
    role: 'Co Founder',
    company: 'Arthamandapam',
    track: 'entrepreneur',
    trackLabel: 'Founders & Startups',
    initials: 'SK',
    highlight: 'Cultural & Tech Ventures',
    bio: 'Co-founder blending digital platforms with cultural commerce and decentralized creator networks.',
    topics: ['Niche Market Penetration', 'Building Mission-Driven Brands', 'Community-Led Growth'],
    sessionsTaken: 7,
    color: 'from-sky-600 to-blue-700',
    image: './images/mentors/selventhiran-kathiresan.png',
  },

  // --- Gov & Angel Track ---
  {
    id: 'm-gov-1',
    name: 'Rakesh R',
    role: 'VP, Promotions & Facilitation',
    company: 'ELCOT',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'RR',
    highlight: 'State IT Ecosystem & Infrastructure',
    bio: 'Fosters state-level technology policy, IT corridors, and academic incubation centers.',
    topics: ['State Incubation Grants', 'Public Policy in Tech', 'Tier-2/3 City Opportunities'],
    sessionsTaken: 8,
    color: 'from-emerald-600 to-green-700',
    image: './images/mentors/rakesh-r-elcot.png',
  },
  {
    id: 'm-gov-2',
    name: 'Nithya Rajasekar',
    role: 'Vice President & Chief of Staff',
    company: 'StartupTN',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'NR',
    highlight: 'Startup Policy & Incubation',
    bio: 'Spearheading state government initiatives to fund and support student founders across 500+ colleges.',
    topics: ['Government Grants for Students', 'Incubator Access', 'State Innovation Ecosystem'],
    sessionsTaken: 19,
    color: 'from-blue-600 to-teal-600',
    image: './images/mentors/nithya-rajasekar-startuptn.png',
  },
  {
    id: 'm-gov-3',
    name: 'Dharanidharan Sivasamy',
    role: 'Foreign Direct Investment Officer',
    company: 'hub.brussels',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'DS',
    highlight: 'Global Trade & FDI Policy',
    bio: 'Advising European and Indian trade delegations on international startup expansion.',
    topics: ['Global Mobility for Engineers', 'International Market Entry', 'Diplomacy in Tech'],
    sessionsTaken: 6,
    color: 'from-indigo-600 to-blue-700',
    image: './images/mentors/dharanidharan-sivasamy.png',
  },
  {
    id: 'm-gov-4',
    name: 'Rajan BL',
    role: 'Vice President — Tamil Nadu Startup & AI Ecosystem',
    company: 'StartupTN',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'RB',
    highlight: 'State AI & Startup Missions',
    bio: 'Directing statewide AI innovation corridors and public-private industry accelerator programs.',
    topics: ['State Startup Grants', 'Emerging Tech Public Policy', 'Incubator Networks'],
    sessionsTaken: 13,
    color: 'from-teal-600 to-cyan-700',
    image: './images/mentors/rajan-bl.png',
  },
  {
    id: 'm-gov-5',
    name: 'Nikunj Panchal',
    role: 'Assistant Vice President',
    company: 'StartupTN',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'NP',
    highlight: 'Incubation & Seed Grants',
    bio: 'Evaluating early-stage grant applications and student founder incubation readiness.',
    topics: ['Writing Winning Grant Proposals', 'Government Seed Funds', 'Campus Pitch Competitions'],
    sessionsTaken: 11,
    color: 'from-blue-600 to-slate-700',
    image: './images/mentors/nikunj-panchal.png',
  },
  {
    id: 'm-gov-6',
    name: 'Rajsekar Sivasamy',
    role: 'Project Associate',
    company: 'StartupTN',
    track: 'gov',
    trackLabel: 'Gov & Policy',
    initials: 'RS',
    highlight: 'Campus Ecosystem Outreach',
    bio: 'Facilitating student entrepreneurship awareness drives across higher education institutions.',
    topics: ['Student Innovation Hubs', 'Accessing State Labs', 'College Startup Cells'],
    sessionsTaken: 9,
    color: 'from-sky-600 to-indigo-600',
    image: './images/mentors/rajsekar-sivasamy.png',
  },
  {
    id: 'm-gov-7',
    name: 'Raghavender R',
    role: 'Angel Investor',
    company: 'Angel Network',
    track: 'gov',
    trackLabel: 'Gov & Angel Investors',
    initials: 'RR',
    highlight: 'Early-stage Venture Backing',
    bio: 'Angel investor backing high-conviction founders solving enterprise SaaS and digital logistics problems.',
    topics: ['What Angels Look For in First Pitches', 'Cap Table Essentials', 'Market Validation'],
    sessionsTaken: 10,
    color: 'from-amber-600 to-orange-600',
    image: './images/mentors/raghavender-r.png',
  },
  {
    id: 'm-gov-8',
    name: 'Dr Prabhu Venugopal',
    role: 'Angel Investor & Syndicate Lead',
    company: 'Angel Network',
    track: 'gov',
    trackLabel: 'Gov & Angel Investors',
    initials: 'PV',
    highlight: 'Pre-Seed / Seed Angel Backing',
    bio: 'Active angel investor with 25+ portfolio bets across healthcare, AI, and developer tools.',
    topics: ['How Angels Read Pitch Decks', 'Cap Table Hygiene', 'Valuation Realities'],
    sessionsTaken: 15,
    color: 'from-amber-600 to-orange-600',
    image: './images/mentors/dr-prabhu-venugopal.png',
  },
  {
    id: 'm-gov-9',
    name: 'Tarun Billa',
    role: 'Angel Investor',
    company: 'Private Syndicate',
    track: 'gov',
    trackLabel: 'Gov & Angel Investors',
    initials: 'TB',
    highlight: 'Early Growth & Syndicate Investing',
    bio: 'Angel syndicate member supporting tech-enabled founders during pre-seed and angel rounds.',
    topics: ['Preparing for Due Diligence', 'Term Sheets 101', 'Founder-Investor Relationships'],
    sessionsTaken: 8,
    color: 'from-purple-600 to-pink-600',
    image: './images/mentors/tarun-billa.png',
  },

  // --- IoT & Cybersecurity Track ---
  {
    id: 'm-cyb-1',
    name: 'Vinod Kumar',
    role: 'Senior Application Developer',
    company: 'UPS',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'VK',
    highlight: 'Logistics Systems & IoT Architecture',
    bio: 'Building enterprise tracking networks and resilient supply-chain IoT edge infrastructure.',
    topics: ['Edge Computing & IoT', 'Supply Chain Telemetry', 'Embedded Systems Engineering'],
    sessionsTaken: 7,
    color: 'from-amber-700 to-stone-800',
    image: './images/mentors/vinod-kumar.png',
  },
  {
    id: 'm-cyb-2',
    name: 'Arivukkarasan Raja',
    role: 'Director',
    company: 'AstraZeneca',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'AR',
    highlight: 'Pharma Tech, IoT & Infrastructure',
    bio: 'Leading enterprise cloud compliance and medical device connectivity for life sciences.',
    topics: ['HealthTech Security', 'Regulatory Compliance & GxP', 'Enterprise Architecture'],
    sessionsTaken: 10,
    color: 'from-teal-600 to-cyan-700',
    image: './images/mentors/arivukkarasan-raja.png',
  },
  {
    id: 'm-cyb-3',
    name: 'Abishek R',
    role: 'Technical Lead',
    company: 'HCLTech',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'AR',
    highlight: 'SecOps & Embedded Security',
    bio: 'Leading vulnerability assessments, secure firmware development, and IoT device hardening.',
    topics: ['Embedded System Security', 'Penetration Testing Essentials', 'Securing Connected Devices'],
    sessionsTaken: 8,
    color: 'from-blue-600 to-slate-700',
    image: './images/mentors/abishek-r.png',
  },
  {
    id: 'm-cyb-4',
    name: 'Prasath Jayasundar',
    role: 'Senior Cybersecurity Engineer',
    company: 'PayPal',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'PJ',
    highlight: 'Financial Cyber Defense & SOC',
    bio: 'Protects critical financial rails from sophisticated multi-vector attacks and breach threats.',
    topics: ['Fintech Security Standards', 'Ethical Hacking & Bug Bounties', 'SOC Analyst Careers'],
    sessionsTaken: 12,
    color: 'from-blue-600 to-indigo-600',
    image: './images/mentors/prasath-jayasundar.png',
  },
  {
    id: 'm-cyb-5',
    name: 'Aravindh Raj',
    role: 'Cyber Security Manager',
    company: 'Northern Lights',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'AR',
    highlight: 'Enterprise Threat Intelligence',
    bio: 'Managing cybersecurity operations, incident response, and cloud perimeter defense for critical platforms.',
    topics: ['Incident Response In Action', 'Threat Hunting Techniques', 'Certifications (CEH, OSCP, CISSP)'],
    sessionsTaken: 9,
    color: 'from-indigo-600 to-purple-600',
    image: './images/mentors/aravindh-raj.png',
  },
  {
    id: 'm-cyb-6',
    name: 'Muhamadu Mansur R',
    role: 'Technology Lead',
    company: 'Infosys',
    track: 'cyber',
    trackLabel: 'IoT & Cybersecurity',
    initials: 'MM',
    highlight: 'Cloud Security & IoT Networks',
    bio: 'Hands-on architect designing cloud perimeter defense and identity systems for global banks.',
    topics: ['Cloud Security Posture (CSPM)', 'Zero-Trust Architecture', 'Security Certifications'],
    sessionsTaken: 11,
    color: 'from-sky-600 to-blue-700',
    image: './images/mentors/muhamadu-mansur-r.png',
  },
];

const TRUSTED_COMPANIES = [
  { name: 'Ford', logoText: 'Ford', mentorsCount: '8+ Mentors' },
  { name: 'Verizon', logoText: 'verizon', mentorsCount: '6+ Mentors' },
  { name: 'Capgemini', logoText: 'Capgemini', mentorsCount: '12+ Mentors' },
  { name: 'Deloitte', logoText: 'Deloitte.', mentorsCount: '9+ Mentors' },
  { name: 'IBM', logoText: 'IBM', mentorsCount: '7+ Mentors' },
  { name: 'Flipkart', logoText: 'Flipkart', mentorsCount: '5+ Mentors' },
  { name: 'Accenture', logoText: 'accenture', mentorsCount: '14+ Mentors' },
  { name: 'PayPal', logoText: 'PayPal', mentorsCount: '6+ Mentors' },
  { name: 'TCS', logoText: 'TATA TCS', mentorsCount: '15+ Mentors' },
  { name: 'Wipro', logoText: 'wipro', mentorsCount: '8+ Mentors' },
  { name: 'HCLTech', logoText: 'HCLTech', mentorsCount: '10+ Mentors' },
  { name: 'AstraZeneca', logoText: 'AstraZeneca', mentorsCount: '4+ Mentors' },
  { name: 'StartupTN', logoText: 'StartupTN', mentorsCount: 'State Partner' },
  { name: 'ELCOT', logoText: 'ELCOT', mentorsCount: 'Gov Partner' },
];

const SESSION_FORMATS = [
  {
    id: 'expert-talks',
    title: 'Expert talks',
    badge: 'High Impact',
    desc: 'A senior leader visits your college for a single, focused session, followed by open and uncensored Q&A with students.',
    duration: '90 Minutes',
    highlights: ['Direct access to VP/Director level leaders', 'Audience-driven 45-min open Q&A', 'Real workplace case studies & metrics'],
    stats: '150+ Talks Hosted',
  },
  {
    id: 'panel-discussions',
    title: 'Panel discussions',
    badge: 'Multi-Perspective',
    desc: 'Multiple experts discuss a shared emerging theme, moderated specifically for students in an engaging, interactive format.',
    duration: '120 Minutes',
    highlights: ['3 to 4 cross-sector practitioners', 'Healthy debates on industry shifts', 'Diverse career trajectory roadmaps'],
    stats: '60+ Panels Curated',
  },
  {
    id: 'interactive-workshops',
    title: 'Interactive workshops',
    badge: 'Hands-on Mastery',
    desc: 'Smaller, hands-on masterclasses that go deep on one specific skill, practical toolstack, or industry workflow.',
    duration: 'Half-Day / Full-Day',
    highlights: ['Intimate cohort size for direct feedback', 'Live tooling, code reviews & resume audits', 'Zero abstract theories'],
    stats: '85+ Masterclasses Run',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Instead of another generic motivation lecture, our students were listening to the Chief AI Architect from Ford break down how production models are deployed. The candid Q&A changed how students view their engineering projects.',
    author: 'Dr. S. Sundararajan',
    role: 'Dean of Academic & Industry Relations',
    institution: 'PSG College of Technology',
    tag: 'Institutional Leader',
    category: 'dean',
    rating: 5,
  },
  {
    quote:
      'I got to ask direct questions about what hiring managers actually look for in portfolio projects versus resume keywords. That 90-minute session was more actionable than 3 years of classroom theory.',
    author: 'Ananya Mehra',
    role: 'Final Year B.Tech Student & Club Lead',
    institution: 'Mentor Campus Club Member',
    tag: 'Student Perspective',
    category: 'student',
    rating: 5,
  },
  {
    quote:
      'Giving back through Mentor Campus is deeply fulfilling because there are zero PR scripts or artificial barriers. Students ask real, difficult questions about the industry, and we give them honest, grounded answers.',
    author: 'Bharathi Ravindran',
    role: 'Director, AI Science',
    institution: 'Verizon & Mentor Campus Contributor',
    tag: 'Industry Mentor',
    category: 'mentor',
    rating: 5,
  },
  {
    quote:
      'Setting up a student-led Mentor Campus Club on our campus has created an ongoing buzz. Sessions happen every month across AI, Startups, and HR, making industry exposure a regular part of campus life.',
    author: 'Prof. K. Venkatesh',
    role: 'Faculty Coordinator, Innovation Cell',
    institution: 'Anna University Affiliated Campus',
    tag: 'Campus Coordinator',
    category: 'dean',
    rating: 5,
  },
];

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

// Handshake Logo using the official Mentor Campus Handshake Logo
const MentorCampusLogo = ({ className = 'h-11 sm:h-12' }) => (
  <div className="flex items-center gap-2.5">
    <img
      src="./Mentor Campus Handshake Logo.png"
      alt="Mentor Campus"
      className={`w-auto object-contain transition-transform duration-200 hover:scale-[1.02] ${className}`}
      onError={(e) => {
        if (!e.target.dataset.triedFallback) {
          e.target.dataset.triedFallback = 'true';
          e.target.src = './images/Mentor Campus Handshake Logo.png';
        }
      }}
    />
  </div>
);

// Individual Mentor Marquee Card
const MentorMarqueeCard = ({ mentor, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(mentor)}
      className="w-[300px] sm:w-[325px] flex-shrink-0 bg-white/95 rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(33,96,220,0.12)] hover:border-blue-400 transition-all duration-300 group cursor-pointer select-none card-sheen"
    >
      <div className="flex items-start gap-3.5 mb-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 shrink-0 border border-slate-200/60">
          {mentor.image ? (
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`w-full h-full items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${mentor.color} ${mentor.image ? 'hidden' : 'flex'}`}
          >
            {mentor.initials}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-gray-900 text-sm truncate group-hover:text-[#2160dc] transition-colors">
              {mentor.name}
            </h4>
            <span className="inline-flex text-[#2160dc]" title="Verified Mentor">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <p className="text-[12px] text-gray-500 truncate mt-0.5">{mentor.role}</p>
        </div>
      </div>

      <div className="space-y-2 pt-2.5 border-t border-slate-100 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 font-medium">Organization</span>
          <span className="font-semibold text-gray-800 bg-[#eceef1] px-2 py-0.5 rounded-md text-[11px] truncate max-w-[160px]">
            {mentor.company}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 font-medium">Domain</span>
          <span className="text-[#2160dc] font-semibold text-[11px] truncate max-w-[170px]">{mentor.highlight}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-slate-50">
        <span className="text-emerald-600 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {mentor.sessionsTaken} sessions completed
        </span>
        <span className="text-[#2160dc] font-semibold group-hover:translate-x-0.5 transition-transform">
          View Profile →
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// ANIMATED HEADER NAV PILLS COMPONENT
// ============================================================================
const AnimatedNavPills = ({ activeNav, onNavClick, onJoinClick }) => {
  const navItems = [
    { label: 'Home', section: 'home' },
    { label: 'About us', section: 'about' },
    { label: 'Mentors', section: 'mentors' },
    { label: 'Testimonials', section: 'testimonials' },
    { label: 'Contact us', section: 'contact' },
    { label: 'Join us', action: onJoinClick },
  ];

  const containerRef = useRef(null);
  const btnRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
    isReady: false,
  });

  const updateIndicator = () => {
    const activeBtn = btnRefs.current[activeNav];
    if (activeBtn && containerRef.current) {
      const navRect = containerRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicatorStyle((prev) => ({
        left: btnRect.left - navRect.left,
        top: btnRect.top - navRect.top,
        width: btnRect.width,
        height: btnRect.height,
        opacity: 1,
        isReady: prev.opacity > 0,
      }));
    }
  };

  useEffect(() => {
    updateIndicator();
    const rafId = requestAnimationFrame(updateIndicator);
    const timer1 = setTimeout(updateIndicator, 50);
    const timer2 = setTimeout(updateIndicator, 150);

    window.addEventListener('resize', updateIndicator);
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateIndicator);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeNav]);

  return (
    <nav
      ref={containerRef}
      aria-label="Main Navigation"
      className="relative hidden md:flex items-center bg-[#eaecef] p-1 rounded-full text-xs font-semibold text-gray-600 shadow-inner px-1.5"
    >
      {/* Smooth Sliding Pill Indicator with Apple Spring Physics */}
      <span
        className="absolute top-0 left-0 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] pointer-events-none nav-pill-indicator"
        style={{
          transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
          width: `${indicatorStyle.width}px`,
          height: `${indicatorStyle.height}px`,
          opacity: indicatorStyle.opacity,
          transition: indicatorStyle.isReady
            ? 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), width 320ms cubic-bezier(0.16, 1, 0.3, 1), height 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease'
            : 'opacity 180ms ease',
        }}
        aria-hidden="true"
      />

      {navItems.map((item) => {
        const isActive = activeNav === item.label;
        return (
          <button
            key={item.label}
            ref={(el) => (btnRefs.current[item.label] = el)}
            onClick={() => {
              if (item.action) {
                item.action();
              } else {
                onNavClick(item.label, item.section);
              }
            }}
            className={`relative z-10 px-4 py-1.5 rounded-full transition-colors duration-250 cursor-pointer select-none ${
              isActive
                ? 'text-gray-950 font-bold'
                : 'text-gray-600 hover:text-gray-950 font-medium'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function MentorCampusLanding() {
  // Navigation & Active section state
  const [activeNav, setActiveNav] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Marquee filtering
  const [selectedTrack, setSelectedTrack] = useState('all');

  // Modals state
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [signInTab, setSignInTab] = useState('student'); // 'student' | 'college' | 'mentor'
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [joinRole, setJoinRole] = useState('college'); // 'student' | 'college' | 'mentor'

  // Interactive Content Tabs
  const [activeSessionTab, setActiveSessionTab] = useState('expert-talks');
  const [activeTestimonialTab, setActiveTestimonialTab] = useState('all');

  // Join form fields
  const [joinFormData, setJoinFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    preferredTrack: 'Technology & AI',
    notes: '',
  });

  // Filtered Mentors
  const filteredMentors = useMemo(() => {
    if (selectedTrack === 'all') return MENTORS_DATA;
    return MENTORS_DATA.filter((m) => m.track === selectedTrack);
  }, [selectedTrack]);

  // Infinite Marquee data split
  const row1Mentors = useMemo(() => {
    const list = filteredMentors.slice(0, Math.ceil(filteredMentors.length / 2));
    const effective = list.length > 0 ? list : filteredMentors;
    return [...effective, ...effective, ...effective, ...effective];
  }, [filteredMentors]);

  const row2Mentors = useMemo(() => {
    const list = filteredMentors.slice(Math.ceil(filteredMentors.length / 2));
    const effective = list.length > 0 ? list : filteredMentors;
    return [...effective, ...effective, ...effective, ...effective];
  }, [filteredMentors]);

  // Filtered Testimonials
  const filteredTestimonials = useMemo(() => {
    if (activeTestimonialTab === 'all') return TESTIMONIALS;
    return TESTIMONIALS.filter((t) => t.category === activeTestimonialTab);
  }, [activeTestimonialTab]);

  // Handle Join Form
  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setJoinSubmitted(true);
    setTimeout(() => {
      setJoinSubmitted(false);
      setShowJoinModal(false);
      setJoinFormData({
        name: '',
        institution: '',
        email: '',
        phone: '',
        preferredTrack: 'Technology & AI',
        notes: '',
      });
    }, 2400);
  };

  const isClickScrollingRef = useRef(false);

  // Nav click smooth scroll helper
  const handleNavClick = (navItem, sectionId) => {
    setActiveNav(navItem);
    setMobileMenuOpen(false);
    isClickScrollingRef.current = true;
    setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementPosition - offset),
          behavior: 'smooth',
        });
      }
    }
  };

  // Scroll Spy: Keep activeNav and animated pill synchronized with scroll position
  useEffect(() => {
    const sections = [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About us' },
      { id: 'mentors', label: 'Mentors' },
      { id: 'testimonials', label: 'Testimonials' },
      { id: 'contact', label: 'Contact us' },
    ];

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav((curr) => (curr !== sections[i].label ? sections[i].label : curr));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans antialiased selection:bg-blue-100 selection:text-[#2160dc] relative overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[760px] h-[520px] bg-gradient-to-b from-blue-100/70 via-indigo-100/30 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute top-[38%] -right-32 w-[520px] h-[520px] bg-blue-50/70 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-[70%] -left-32 w-[520px] h-[520px] bg-indigo-50/60 rounded-full blur-3xl opacity-60" />
      </div>

      {/* ==================================================================== */}
      {/* 1. MAIN HEADER / PERSISTENT STATIC TOOLBAR */}
      {/* ==================================================================== */}
      <header className="sticky top-0 z-50 w-full bg-[#FBFBFD]/90 backdrop-blur-xl border-b border-gray-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between py-3.5">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Home', 'home');
            }}
            className="flex items-center gap-2.5 focus:outline-none"
          >
            <MentorCampusLogo />
          </a>

          {/* Center Navigation Pill Container with Smooth Sliding Animation */}
          <AnimatedNavPills
            activeNav={activeNav}
            onNavClick={handleNavClick}
            onJoinClick={() => {
              setActiveNav('Join us');
              setShowJoinModal(true);
            }}
          />

          {/* Right Header Sign In Action (From reference) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSignInModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#1961e6] text-xs font-bold text-gray-800 hover:bg-blue-50/70 transition-all shadow-sm active:scale-95 cursor-pointer bg-white"
            >
              <span className="text-[#1961e6] font-bold text-sm leading-none">+</span>
              <span>Sign In</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-slate-100"
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
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 px-6 py-4 shadow-xl space-y-2">
            {['Home', 'About us', 'Mentors', 'Testimonials', 'Contact us'].map((lbl) => (
              <button
                key={lbl}
                onClick={() => handleNavClick(lbl, lbl.toLowerCase().replace(' ', ''))}
                className="block w-full text-left py-2 text-sm font-medium text-gray-700 hover:text-[#2160dc]"
              >
                {lbl}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowJoinModal(true);
              }}
              className="w-full mt-2 py-2.5 rounded-full bg-[#2160dc] text-white font-bold text-xs shadow-md"
            >
              Join MentorCampus
            </button>
          </div>
        )}
      </header>

      {/* ==================================================================== */}
      {/* 2. HERO SECTION & FLOATING AVATAR NETWORK (Landing_page (1).html) */}
      {/* ==================================================================== */}
      <main id="home" className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 flex flex-col items-center pt-2 relative z-10">
        {/* Floating Avatar Composition & Category Badges from reference */}
        <div className="w-full max-w-6xl mx-auto py-6 select-none flex flex-col items-center justify-center gap-7">
          {/* Top Category Badges Row */}
          <div className="w-full max-w-4xl flex items-center justify-center md:justify-between gap-3 sm:gap-4 md:gap-8 flex-wrap px-4">
            {HERO_PILLS.map((pill) => (
              <button
                key={pill.id}
                onClick={() => {
                  setSelectedTrack(pill.filterTrack);
                  const el = document.getElementById('mentors');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200/70 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                title={`Filter by ${pill.title}`}
              >
                {pill.type === 'dot' && (
                  <div className="w-5 h-5 rounded-full border-2 border-[#1961e6] flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 bg-[#1961e6] rounded-full group-hover:scale-125 transition-transform" />
                  </div>
                )}
                {pill.type === 'arrow' && (
                  <div className="w-5 h-5 rounded-lg bg-[#1961e6] flex items-center justify-center text-white shrink-0 group-hover:rotate-45 transition-transform">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                {pill.type === 'grid' && (
                  <div className="w-5 h-5 rounded-lg bg-[#1961e6] flex items-center justify-center text-white shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect height="16" rx="2" width="16" x="4" y="4" />
                      <rect fill="currentColor" height="8" rx="1" width="8" x="8" y="8" />
                    </svg>
                  </div>
                )}
                <div className="leading-tight text-left">
                  <p className="text-xs font-bold text-gray-900 group-hover:text-[#2160dc] transition-colors">
                    {pill.title}
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium">{pill.subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          {/* 5 Tiered Organic Mentor Avatars with Real Brochure Photos */}
          <div className="flex items-end justify-center gap-3 sm:gap-6 md:gap-9 flex-nowrap pt-2">
            {/* Avatar 1: Dr Prabhu Venugopal */}
            <div
              onClick={() => setSelectedMentor(MENTORS_DATA.find((m) => m.id === 'm-gov-8'))}
              className="relative w-16 h-20 bg-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center justify-center shrink-0 float-avatar-1 cursor-pointer group hover:scale-105 transition-transform border border-slate-200/80"
              title="Dr Prabhu Venugopal • Angel Investor"
            >
              <img
                src="./images/mentors/dr-prabhu-venugopal.png"
                alt="Dr Prabhu Venugopal"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Avatar 2: Nithya Rajasekar */}
            <div
              onClick={() => setSelectedMentor(MENTORS_DATA.find((m) => m.id === 'm-gov-2'))}
              className="relative w-24 h-28 bg-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center justify-center shrink-0 float-avatar-2 cursor-pointer group hover:scale-105 transition-transform border border-slate-200/80"
              title="Nithya Rajasekar • VP, StartupTN"
            >
              <img
                src="./images/mentors/nithya-rajasekar-startuptn.png"
                alt="Nithya Rajasekar"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Avatar 3 - Featured Center: Senthilkumar Viswanathan */}
            <div
              onClick={() => setSelectedMentor(MENTORS_DATA.find((m) => m.id === 'm-ai-1'))}
              className="relative w-32 h-36 bg-slate-100 rounded-3xl overflow-hidden shadow-md border border-gray-200/60 flex flex-col items-center justify-center shrink-0 ring-4 ring-blue-500/20 z-10 float-avatar-3 cursor-pointer group hover:scale-105 transition-transform"
              title="Senthilkumar Viswanathan • Ford Chief AI Architect"
            >
              <img
                src="./images/mentors/senthilkumar-viswanathan.png"
                alt="Senthilkumar Viswanathan"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Avatar 4: Bharathi Ravindran */}
            <div
              onClick={() => setSelectedMentor(MENTORS_DATA.find((m) => m.id === 'm-ai-2'))}
              className="relative w-24 h-28 bg-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center justify-center shrink-0 float-avatar-4 cursor-pointer group hover:scale-105 transition-transform border border-slate-200/80"
              title="Bharathi Ravindran • Director AI Science, Verizon"
            >
              <img
                src="./images/mentors/bharathi-ravindran.png"
                alt="Bharathi Ravindran"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Avatar 5: Keerthana Arul */}
            <div
              onClick={() => setSelectedMentor(MENTORS_DATA.find((m) => m.id === 'm-hr-1'))}
              className="relative w-16 h-20 bg-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center justify-center shrink-0 float-avatar-5 cursor-pointer group hover:scale-105 transition-transform border border-slate-200/80"
              title="Keerthana Arul • Senior HR Analyst, Deloitte"
            >
              <img
                src="./images/mentors/keerthana-arul.png"
                alt="Keerthana Arul"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 font-medium -mt-2">
            Click any avatar or badge to preview verified mentors
          </p>
        </div>

        {/* Hero Copy (Exact typography & layout from Landing_page (1).html) */}
        <div className="text-center max-w-5xl mx-auto flex flex-col items-center mt-2 px-4">
          {/* Eyebrow Tag */}
          <p className="text-sm sm:text-base font-extrabold tracking-[0.25em] text-[#1961e6] uppercase mb-2">
            WITH A VISION
          </p>

          {/* Main Headline with handwritten cursive script */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-950 tracking-tight leading-[1.15] mb-4 text-center max-w-4xl mx-auto whitespace-normal">
            <span className="block">The world is bigger than</span>
            <span
              className="block text-[#2160DC] font-normal lowercase tracking-normal -mt-1 sm:-mt-2 relative inline-block font-handwritten"
              style={{ fontSize: '1.25em', lineHeight: 1.1 }}
            >
              your classroom.
              {/* Hand-drawn SVG underline curve */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-4 overflow-visible pointer-events-none"
                viewBox="0 0 300 20"
                fill="none"
              >
                <path
                  d="M5 14C80 4 220 5 295 12"
                  stroke="#2160DC"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="draw-underline"
                />
              </svg>
            </span>
          </h1>

          {/* Supporting Body Text */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8 px-4">
            Mentor Campus connects students with real people, real conversations and real-world exposure beyond the classroom.
          </p>

          {/* Primary Call to Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowJoinModal(true)}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#2160DC] text-white font-bold text-sm tracking-wider uppercase hover:bg-blue-700 transition-all duration-150 shadow-md shadow-blue-500/30 active:scale-95 cursor-pointer"
            >
              <span>JOIN MENTORCAMPUS</span>
              <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#mentors"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-gray-700 font-bold text-sm tracking-wider uppercase shadow-xs hover:border-blue-400 transition-all"
            >
              EXPLORE MENTORS
            </a>
          </div>
        </div>
      </main>

      {/* ==================================================================== */}
      {/* 3. TRUSTED PARTNERS & LEADING ENTERPRISES */}
      

{/* ==================================================================== */}
      <section id="about" className="relative z-10 py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Purpose */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eceef1] text-gray-800 text-xs font-bold uppercase tracking-wider mb-4">
                <span>About Mentor Campus</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight">
                Bridging the chasm between classrooms and industry reality.
              </h2>
              <p className="mt-5 text-gray-600 text-sm sm:text-base leading-relaxed">
                MentorCampus (<a href="https://mentorcampus.in" target="_blank" rel="noreferrer" className="text-[#2160dc] font-semibold underline">mentorcampus.in</a>) was created to solve the deep disconnect between college academic theory and actual workplace practices.
              </p>
              <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                Rather than treating industry talks as isolated annual ceremonies, we empower colleges to build an ongoing
                culture of interactive discussions, direct networking, and hands-on skill exposure.
              </p>

              {/* Three Pillars */}
              <div className="mt-8 space-y-4.5">
                {[
                  {
                    title: 'Practitioners, Not Textbook Theorists',
                    desc: 'Sessions are led exclusively by leaders actively deploying code, raising capital, and hiring talent right now.',
                  },
                  {
                    title: 'Student-Driven Campus Chapters',
                    desc: 'Colleges form student-led Mentor Campus clubs that establish an ongoing calendar rather than one-off events.',
                  },
                  {
                    title: 'Unscripted, High-Candor Q&A',
                    desc: 'Over 50% of session time is dedicated to unmoderated student questions about career hurdles, salaries, and real day-to-day challenges.',
                  },
                ].map((pillar, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-[#2160dc] flex items-center justify-center shrink-0 mt-0.5 text-xs font-extrabold">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{pillar.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Campus Club Framework Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#0b192c] via-[#111827] to-[#1e293b] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-700/50">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">Mentor Campus Club Model</h3>
                    <p className="text-xs text-slate-400">Institutional Blueprint for Colleges</p>
                  </div>
                  <span className="text-xs font-bold bg-[#2160dc]/40 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full">
                    Student-Led
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                        01
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Faculty Coordinator & Core Student Team</div>
                        <p className="text-[11px] text-slate-300">Empowers students with leadership experience managing campus events</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                        02
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Monthly Focus Tracks & Masterclasses</div>
                        <p className="text-[11px] text-slate-300">AI Month, Startup Sprint, HR Decoded & Cyber Defense cycles</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                        03
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Direct Mentorship & Portfolio Reviews</div>
                        <p className="text-[11px] text-slate-300">Build relationships with senior practitioners who can advise on careers</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs text-slate-300">Ready to launch a chapter?</div>
                  <button
                    onClick={() => {
                      setJoinRole('college');
                      setShowJoinModal(true);
                    }}
                    className="px-5 py-2.5 rounded-full bg-white text-gray-900 text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
                  >
                    Start a Chapter →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. TESTIMONIALS */}

{/* ==================================================================== */}
      <section id="sessions" className="relative z-10 py-20 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#2160dc] mb-2">
            HOW THE SESSIONS WORK
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight">
            Curated formats designed for honesty & impact
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Designed specifically to eliminate monotone textbook lectures and substitute them with direct, honest
            dialogues.
          </p>
        </div>

        {/* 3 Session Format Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SESSION_FORMATS.map((format) => (
            <div
              key={format.id}
              onClick={() => setActiveSessionTab(format.id)}
              className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                activeSessionTab === format.id
                  ? 'bg-white border-[#2160dc] shadow-[0_16px_36px_rgba(33,96,220,0.1)] ring-2 ring-blue-500/20'
                  : 'bg-white/80 border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-bold text-[#2160dc] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {format.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
                    {format.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-950 mb-3 tracking-tight">{format.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{format.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                {format.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 text-[#2160dc] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Signature Philosophy Callout (Authentic PDF Quote Banner) */}
        <div className="mt-14 rounded-3xl bg-[#091528] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#2160dc]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block text-blue-400 text-xs font-extrabold tracking-wider uppercase mb-3">
              MENTOR CAMPUS, PROGRAM PHILOSOPHY
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

      {/* ==================================================================== */}
      {/* 6. ABOUT SECTION & CAMPUS CLUB FRAMEWORK */}

{/* ==================================================================== */}
      <section id="partners" className="relative z-10 py-12 mt-16 border-y border-slate-200/80 bg-white/60">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-8">
            Mentors & Industry Leaders Participating From Global Organizations
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-5 sm:gap-8 items-center justify-center">
            {TRUSTED_COMPANIES.map((company, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center justify-center py-2 px-3 text-gray-800 font-bold tracking-tight text-sm hover:text-[#2160dc] transition-all cursor-default"
              >
                <span className="border-b-2 border-transparent group-hover:border-[#2160dc] pb-0.5 transition-colors">
                  {company.logoText}
                </span>
                <span className="text-[10px] text-gray-400 font-normal opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-3">
                  {company.mentorsCount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. SCROLLING-ANIMATED MENTOR DETAILS (RICH DIRECTORY & MARQUEE) */}
      {/* ==================================================================== */}
      <section id="mentors" className="relative z-10 py-20 bg-slate-50/70 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2160dc] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Featured Track Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight">
            Meet the leaders mentoring on campus
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Real industry practitioners taking candid sessions through Mentor Campus — from enterprise AI architects to
            venture founders and policy directors.
          </p>

          {/* Track Segmented Pills */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap mt-7 p-1.5 bg-[#eaecef] rounded-2xl max-w-fit mx-auto border border-slate-300/50 shadow-inner">
            {TRACK_CATEGORIES.map((cat) => {
              const active = selectedTrack === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTrack(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? 'bg-white text-gray-950 shadow-sm font-bold'
                      : 'text-gray-600 hover:text-gray-950 hover:bg-white/40'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active ? 'bg-blue-50 text-[#2160dc] font-bold' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Infinite Scrolling Marquees */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Edge Blur Gradients */}
          <div className="absolute left-0 inset-y-0 w-28 bg-gradient-to-r from-[#FBFBFD] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-28 bg-gradient-to-l from-[#FBFBFD] to-transparent z-10 pointer-events-none" />

          {/* Row 1 (Leftwards) */}
          <div className="animate-mc-marquee gap-5">
            {row1Mentors.map((mentor, index) => (
              <MentorMarqueeCard
                key={`r1-${mentor.id}-${index}`}
                mentor={mentor}
                onSelect={(m) => setSelectedMentor(m)}
              />
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden py-3 mt-1">
          <div className="absolute left-0 inset-y-0 w-28 bg-gradient-to-r from-[#FBFBFD] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-28 bg-gradient-to-l from-[#FBFBFD] to-transparent z-10 pointer-events-none" />

          {/* Row 2 (Rightwards) */}
          <div className="animate-mc-marquee-reverse gap-5">
            {row2Mentors.map((mentor, index) => (
              <MentorMarqueeCard
                key={`r2-${mentor.id}-${index}`}
                mentor={mentor}
                onSelect={(m) => setSelectedMentor(m)}
              />
            ))}
          </div>
        </div>

        {/* 3 Metric Cards from PDF Reference */}
        <div className="max-w-4xl mx-auto px-6 mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center shadow-xs soft-apple-hover">
            <div className="text-4xl font-extrabold text-[#2160dc] tracking-tight">100+</div>
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mt-1.5">
              Leaders On This Track
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Enterprise directors, architects & founders</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center shadow-xs soft-apple-hover">
            <div className="text-4xl font-extrabold text-gray-950 tracking-tight">10+</div>
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mt-1.5">
              Industry Tracks Overall
            </p>
            <p className="text-xs text-gray-500 mt-0.5">AI, Startups, HR, Policy, Cyber & Media</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center shadow-xs soft-apple-hover">
            <div className="text-4xl font-extrabold text-gray-950 tracking-tight">3</div>
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mt-1.5">
              Session Formats
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Customized for maximum student candor</p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. HOW THE SESSIONS WORK (From PDF) */}

{/* ==================================================================== */}
      <section id="testimonials" className="relative z-10 py-20 bg-slate-50/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#2160dc] mb-2">TESTIMONIALS</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight">
              Loved by students, faculty & mentors alike
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Hear firsthand how unfiltered conversations with industry leaders transform college perspectives.
            </p>

            {/* Testimonial Category Filter */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'student', label: 'Students' },
                { id: 'dean', label: 'Deans & Faculty' },
                { id: 'mentor', label: 'Industry Mentors' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTestimonialTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTestimonialTab === tab.id
                      ? 'bg-[#2160dc] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-gray-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
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
                    <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">{t.author}</h5>
                    <p className="text-[11px] text-gray-500">{t.role}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#2160dc] bg-blue-50 px-2.5 py-1 rounded-md">
                    {t.institution}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. BRING MENTOR CAMPUS TO YOUR COLLEGE (CTA BANNER FROM PDF) */}
      {/* ==================================================================== */}
      <section id="contact" className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#1961e6] via-[#2160dc] to-indigo-700 rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-blue-200 text-xs font-bold tracking-widest uppercase">
              Host Industry Leaders On Your Campus
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-1 mb-3">
              Bring Mentor Campus to your college
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Set up expert talks, panel discussions, and workshops for your students in any of our specialized industry
              tracks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setJoinRole('college');
                setShowJoinModal(true);
              }}
              className="px-7 py-3.5 rounded-full bg-white text-[#2160dc] font-bold text-xs sm:text-sm hover:bg-blue-50 active:scale-95 shadow-md transition-all text-center cursor-pointer"
            >
              Request a Session
            </button>
            <a
              href="mailto:contact@mentorcampus.in"
              className="px-7 py-3.5 rounded-full bg-blue-800/60 hover:bg-blue-800 border border-blue-400/40 text-white font-semibold text-xs sm:text-sm text-center transition-all"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 9. FOOTER */}
      {/* ==================================================================== */}
      <footer className="relative z-10 border-t border-slate-200 bg-white py-12 text-gray-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <MentorCampusLogo />

            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 font-medium">
              <button onClick={() => handleNavClick('Home', 'home')} className="hover:text-[#2160dc] cursor-pointer">
                Home
              </button>
              <button onClick={() => handleNavClick('About us', 'about')} className="hover:text-[#2160dc] cursor-pointer">
                About us
              </button>
              <button onClick={() => handleNavClick('Mentors', 'mentors')} className="hover:text-[#2160dc] cursor-pointer">
                Mentors Directory
              </button>
              <button onClick={() => handleNavClick('Testimonials', 'testimonials')} className="hover:text-[#2160dc] cursor-pointer">
                Testimonials
              </button>
              <a href="https://mentorcampus.in" target="_blank" rel="noreferrer" className="text-[#2160dc] hover:underline">
                mentorcampus.in ↗
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-400 text-[11px] gap-3">
            <p>© {new Date().getFullYear()} Mentor Campus (mentorcampus.in). All rights reserved.</p>
            <p>Designed with Soft Apple Aesthetics & Verified Industry Leaders.</p>
          </div>
        </div>
      </footer>

      {/* ==================================================================== */}
      {/* 10. MODAL: SIGN IN (From Header Action) */}
      {/* ==================================================================== */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-backdrop">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-modal-pop">
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-gray-500 hover:text-gray-950 flex items-center justify-center text-xs font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <span className="text-[11px] font-extrabold text-[#2160dc] uppercase tracking-wider">
                MentorCampus Portal
              </span>
              <h3 className="text-2xl font-bold text-gray-950 tracking-tight mt-1">Welcome back</h3>
              <p className="text-xs text-gray-500 mt-1">Sign in to manage your campus sessions & mentorship</p>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#eaecef] rounded-2xl mb-5 text-xs font-semibold text-gray-600">
              {(['student', 'college', 'mentor']).map((r) => (
                <button
                  key={r}
                  onClick={() => setSignInTab(r)}
                  className={`py-1.5 rounded-xl capitalize cursor-pointer transition-all ${
                    signInTab === r ? 'bg-white text-gray-950 shadow-xs font-bold' : 'hover:text-gray-950'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Signed in as ${signInTab}!`);
                setShowSignInModal(false);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder={
                    signInTab === 'student'
                      ? 'student@college.edu.in'
                      : signInTab === 'college'
                      ? 'coordinator@college.edu.in'
                      : 'mentor@company.com'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2160dc]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">Password</label>
                  <a href="#" className="text-[11px] text-[#2160dc] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2160dc]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#2160DC] hover:bg-blue-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all mt-2 cursor-pointer"
              >
                Sign In to Portal
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-gray-400">
                  New to Mentor Campus?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setShowSignInModal(false);
                      setShowJoinModal(true);
                    }}
                    className="text-[#2160dc] font-bold hover:underline cursor-pointer"
                  >
                    Join us here
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 11. MODAL: JOIN MENTORCAMPUS (From Hero CTA & Nav) */}
      {/* ==================================================================== */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-backdrop">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-modal-pop">
            <button
              onClick={() => setShowJoinModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-gray-500 hover:text-gray-950 flex items-center justify-center text-xs font-bold cursor-pointer"
            >
              ✕
            </button>

            {joinSubmitted ? (
              <div className="py-10 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-950 tracking-tight">Application Received!</h3>
                <p className="text-gray-500 text-xs sm:text-sm max-w-xs mx-auto mt-2">
                  Our campus coordination team will connect with you via email & WhatsApp within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <span className="text-[11px] font-extrabold text-[#2160dc] uppercase tracking-wider">
                    Join The Movement
                  </span>
                  <h3 className="text-2xl font-bold text-gray-950 tracking-tight mt-0.5">
                    Connect With MentorCampus
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Bring industry leaders to your campus or become a contributing mentor.
                  </p>
                </div>

                {/* Role Picker */}
                <div className="flex gap-2 mb-4">
                  {[
                    { id: 'college', label: 'College / Faculty' },
                    { id: 'student', label: 'Student Chapter' },
                    { id: 'mentor', label: 'Industry Leader' },
                  ].map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setJoinRole(role.id)}
                      className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        joinRole === role.id
                          ? 'bg-[#2160dc] text-white shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleJoinSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. / Prof. / Student Name"
                      value={joinFormData.name}
                      onChange={(e) => setJoinFormData({ ...joinFormData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2160dc]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        {joinRole === 'mentor' ? 'Current Company' : 'College / University'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={joinRole === 'mentor' ? 'e.g. Google, Ford' : 'e.g. NIT Trichy, PSG Tech'}
                        value={joinFormData.institution}
                        onChange={(e) => setJoinFormData({ ...joinFormData, institution: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2160dc]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        WhatsApp / Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={joinFormData.phone}
                        onChange={(e) => setJoinFormData({ ...joinFormData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2160dc]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="coordinator@college.edu.in"
                      value={joinFormData.email}
                      onChange={(e) => setJoinFormData({ ...joinFormData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2160dc]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Target Track of Interest
                    </label>
                    <select
                      value={joinFormData.preferredTrack}
                      onChange={(e) => setJoinFormData({ ...joinFormData, preferredTrack: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-gray-700 focus:outline-none focus:border-[#2160dc]"
                    >
                      <option>Technology & Artificial Intelligence</option>
                      <option>Human Resources & Talent Acquisition</option>
                      <option>Founders, CXOs & Entrepreneurship</option>
                      <option>Government Policy & Angel Investing</option>
                      <option>IoT, Cybersecurity & Cloud Infrastructure</option>
                      <option>Multi-Track Annual Campus Chapter</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#2160DC] hover:bg-blue-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all mt-2 cursor-pointer"
                  >
                    Submit Application
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-1">
                    Official domain: mentorcampus.in • Direct email: contact@mentorcampus.in
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 12. MODAL: MENTOR QUICK VIEW PROFILE */}
      {/* ==================================================================== */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-backdrop">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-modal-pop">
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-gray-500 hover:text-gray-950 flex items-center justify-center text-xs font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-start gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shadow-md shrink-0 border border-slate-200/80">
                {selectedMentor.image ? (
                  <img
                    src={selectedMentor.image}
                    alt={selectedMentor.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center text-white font-extrabold text-xl bg-gradient-to-br ${selectedMentor.color}`}
                  >
                    {selectedMentor.initials}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-[#2160dc] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                  {selectedMentor.trackLabel}
                </span>
                <h3 className="text-xl font-bold text-gray-950 mt-1">{selectedMentor.name}</h3>
                <p className="text-xs text-gray-500">{selectedMentor.role}</p>
                <p className="text-xs font-semibold text-gray-800 mt-0.5">{selectedMentor.company}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-4">
              {selectedMentor.bio}
            </p>

            <div className="mb-5">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                Primary Session Topics
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedMentor.topics.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-gray-700 bg-[#eceef1] px-3 py-1 rounded-full border border-gray-200/50"
                  >
                    • {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <span className="font-bold text-emerald-600">{selectedMentor.sessionsTaken}</span> campus sessions delivered
              </div>
              <button
                onClick={() => {
                  setSelectedMentor(null);
                  setShowJoinModal(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#2160dc] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Request Session With Mentor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
