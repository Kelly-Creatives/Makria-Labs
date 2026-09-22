import { img } from "framer-motion/client";

export const servicesData = [
  {
    id: 1,
    title: 'Software Development',
    description: 'Custom websites, web apps, SaaS platforms, and backend systems.',
    icon: 'Code',

    capabilities: ['Web Applications', 'Mobile Apps', 'APIs & Backend', 'System Integration']
  },
  {
    id: 2,
    title: 'Creative Design',
    description: 'Brand identity, UI/UX design, product design, and marketing materials.',
    icon: 'PenTool',
    capabilities: ['Brand Identity', 'UI/UX Design', 'Product Design', 'Presentation Design']
  },
  {
    id: 3,
    title: 'Virtual Assistance',
    description: 'Administrative support, data entry, customer support, and email management.',
    icon: 'Headphones',
    capabilities: ['Admin Support', 'Customer Support', 'Calendar Management', 'Internet Research']
  },
  {
    id: 4,
    title: 'Digital Content Creation',
    description: 'Social media content, short-form video, copywriting, and storytelling.',
    icon: 'Camera',
    capabilities: ['Social Media', 'Short-form Video', 'Copywriting', 'Content Strategy']
  },
  {
    id: 5,
    title: 'Consulting',
    description: 'Technology consulting, digital transformation, and startup strategy.',
    icon: 'Lightbulb',
    capabilities: ['Tech Consulting', 'Digital Strategy', 'Business Automation', 'Product Strategy']
  }
];

export const portfolioData = [
  {
    id: 1,
    title: 'Meridian Finance',
    category: 'Web App',
    description: 'A modern finance dashboard helping a digital bank track cash flow, risk, and growth in real time.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    image: 'public/makria logo.png'
  },
  {
    id: 2,
    title: 'Northline Atelier',
    category: 'Website',
    description: 'A premium ecommerce experience for a boutique fashion label with elevated product storytelling.',
    technologies: ['Next.js', 'Stripe', 'Shopify'],
    image: 'public/makria logo.png'
  },
  {
    id: 3,
    title: 'Harbor Transit',
    category: 'Mobile App',
    description: 'A ride-share companion app built for streamlined booking, live dispatch, and trip transparency.',
    technologies: ['React Native', 'Firebase', 'Maps API'],
    image: 'public/makria logo.png'
  },
  {
    id: 4,
    title: 'Verve Ops',
    category: 'Software',
    description: 'An operations system that centralized tasks, approvals, and reporting for a growing service business.',
    technologies: ['React', 'Express', 'MySQL'],
    image: 'public/makria logo.png'
  },
  {
    id: 5,
    title: 'Luma Studio',
    category: 'Branding',
    description: 'A full identity refresh and visual system for a startup preparing to scale its digital presence.',
    technologies: ['Figma', 'Illustrator', 'Brand Strategy'],
    image: 'public/makria logo.png'
  },
  {
    id: 6,
    title: 'Spark Narrative',
    category: 'Content',
    description: 'A marketing content engine designed to turn brand messaging into short-form video and social growth.',
    technologies: ['Premiere Pro', 'After Effects', 'Content Strategy'],
    image: 'public/makria logo.png'
  }
];

export const processData = [
  {
    step: '01',
    title: 'Discover',
    description: "Understand the client's business, goals, and challenges."
  },
  {
    step: '02',
    title: 'Strategize',
    description: 'Develop the right technology, design, and business strategy.'
  },
  {
    step: '03',
    title: 'Create',
    description: 'Design and develop the solution.'
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Test, refine, and launch.'
  },
  {
    step: '05',
    title: 'Grow',
    description: 'Provide support, optimization, and continuous improvement.'
  }
];

export const testimonialsData = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    company: 'TechFlow Solutions',
    role: 'CEO',
    text: 'Makria Labs delivered our product ahead of schedule with exceptional quality. Their understanding of both business strategy and technical execution is rare.',
    avatar: 'public/makria logo.png'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    company: 'Elevate Retail',
    role: 'Marketing Director',
    text: 'The rebranding and e-commerce platform they built for us completely transformed our digital presence. Highly recommend their creative and dev teams.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    company: 'NextGen Mobility',
    role: 'Product Manager',
    text: 'A true partner in innovation. Makria Labs helped us iterate quickly on our mobile app while ensuring a premium user experience.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  }
];

export const blogData = [
  {
    id: 1,
    title: 'Why Every Business Needs Digital Systems',
    category: 'Business Automation',
    date: 'Oct 12, 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'How AI Is Changing Business Operations',
    category: 'Technology',
    date: 'Sep 28, 2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'From Idea to Product: Building Your First Digital Platform',
    category: 'Software Development',
    date: 'Sep 15, 2026',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
  }
];
