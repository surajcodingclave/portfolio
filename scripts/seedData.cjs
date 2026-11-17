const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Schema definitions
const SiteInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: String,
  bio: String,
  avatarUrl: String,
  contactEmail: String,
  phone: String,
  location: String,
  skills: [String],
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  imageUrl: String,
  demoUrl: String,
  repoUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  icon: String,
  features: [String],
  createdAt: { type: Date, default: Date.now },
});

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  period: String,
  description: String,
  technologies: [String],
  createdAt: { type: Date, default: Date.now },
});

const SiteInfo = mongoose.models.SiteInfo || mongoose.model('SiteInfo', SiteInfoSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

async function seed() {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // 1. Site Info
    await SiteInfo.deleteMany({});
    await SiteInfo.create({
      name: 'Suraj Gupta',
      tagline: 'Full-Stack Web Developer',
      bio: 'Full-Stack Software Engineer specializing in MERN Stack, PHP with Laravel, and Python with Django. Passionate about crafting modern, ultra-responsive, scalable enterprise applications with clean architectures and top performance.',
      avatarUrl: '/images/profile.png',
      contactEmail: 'surajgupta.dev@example.com',
      phone: '+91 98765 43210',
      location: 'Lucknow, Uttar Pradesh, India',
      skills: [
        'React.js',
        'Next.js 13/14',
        'Node.js',
        'Express.js',
        'MongoDB',
        'TypeScript',
        'Tailwind CSS',
        'PHP',
        'Laravel',
        'Python',
        'Django',
        'PostgreSQL',
        'MySQL',
        'Redis',
        'RESTful APIs',
        'GraphQL',
        'Docker',
        'Git & GitHub'
      ],
    });
    console.log('✅ SiteInfo seeded');

    // 2. Projects (5 high quality dummy projects)
    await Project.deleteMany({});
    const sampleProjects = [
      {
        title: 'Tuition & Coaching Management Cloud',
        description: 'Comprehensive enterprise SaaS software for coaching institutes with student tracking, batch schedules, automated fee reminders, and interactive progress analytics.',
        techStack: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
        demoUrl: 'https://demo-tuition.example.com',
        repoUrl: 'https://github.com/surajgupta/tuition-management',
      },
      {
        title: 'MediCare E-Healthcare & Patient Portal',
        description: 'HIPAA-aligned telehealth and appointment scheduling engine with doctor calendars, prescription generation, and real-time appointment reminders.',
        techStack: ['React.js', 'Python', 'Django', 'PostgreSQL', 'Tailwind CSS'],
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
        demoUrl: 'https://demo-medicare.example.com',
        repoUrl: 'https://github.com/surajgupta/medicare-portal',
      },
      {
        title: 'MaurMart Multi-Vendor E-Commerce Hub',
        description: 'High-volume marketplace featuring merchant dashboards, customer carts, Razorpay/Stripe checkout gateways, inventory matrices, and order tracking.',
        techStack: ['PHP', 'Laravel 10', 'MySQL', 'Blade', 'Bootstrap 5', 'Redis'],
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
        demoUrl: 'https://demo-maurmart.example.com',
        repoUrl: 'https://github.com/surajgupta/maurmart-ecommerce',
      },
      {
        title: 'TailorCV Pro - AI Resume Builder',
        description: 'Smart resume editor with live markdown preview, multiple modern PDF export templates, ATS keyword scoring, and cover letter generator.',
        techStack: ['MERN Stack', 'Next.js', 'Express.js', 'OpenAI API', 'Tailwind CSS'],
        imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop',
        demoUrl: 'https://demo-tailorcv.example.com',
        repoUrl: 'https://github.com/surajgupta/tailorcv-builder',
      },
      {
        title: 'StreamSphere Real-Time Video & Chat Platform',
        description: 'WebRTC-powered peer-to-peer video conference room with instant group messaging, screen sharing, recording, and encrypted rooms.',
        techStack: ['Node.js', 'React.js', 'WebRTC', 'Socket.io', 'MongoDB'],
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        demoUrl: 'https://demo-streamsphere.example.com',
        repoUrl: 'https://github.com/surajgupta/streamsphere-app',
      },
    ];
    await Project.insertMany(sampleProjects);
    console.log('✅ 5 Projects seeded');

    // 3. Services
    await Service.deleteMany({});
    const sampleServices = [
      {
        title: 'Full-Stack MERN Development',
        description: 'Crafting responsive single-page web apps with React.js/Next.js on the frontend and scalable Node.js/Express.js & MongoDB on the backend.',
        icon: 'FaCode',
        features: ['SPA & SSR architectures', 'REST & GraphQL APIs', 'State Management (Redux/Zustand)', 'Modern Tailwind UI'],
      },
      {
        title: 'PHP & Laravel Applications',
        description: 'Building robust, secure backend applications, enterprise management systems, CMS platforms, and multi-tenant SaaS services with Laravel.',
        icon: 'FaServer',
        features: ['MVC Architecture', 'Eloquent ORM & Migrations', 'Stripe & Razorpay Integration', 'Authentication & RBAC'],
      },
      {
        title: 'Python & Django Solutions',
        description: 'Developing high-throughput microservices, data processing pipelines, and rapid prototypes with Python, Django, and Django REST Framework.',
        icon: 'FaDatabase',
        features: ['Django REST Framework (DRF)', 'Relational database schema design', 'Background tasks with Celery/Redis', 'Admin dashboard customizations'],
      },
      {
        title: 'API Engineering & Integrations',
        description: 'Designing clean, documented RESTful APIs with strict rate limits, secure JWT authentication, and seamless third-party webhooks.',
        icon: 'FaCloud',
        features: ['Swagger/OpenAPI docs', 'Webhook handlers', 'Payment gateways & SMS APIs', 'CORS & Security compliance'],
      },
      {
        title: 'Database Architecture & Optimization',
        description: 'Structuring schemas, indexing queries, and optimizing read/write throughput across MongoDB, PostgreSQL, and MySQL databases.',
        icon: 'FaRocket',
        features: ['Schema modeling & indexing', 'Replication & caching layers', 'Aggregation pipelines', 'Data migration scripts'],
      },
      {
        title: 'Mobile-Responsive UI/UX Crafting',
        description: 'Translating design mockups into pixel-perfect, accessible, and fast-loading user interfaces with Tailwind CSS and Next.js.',
        icon: 'FaMobileAlt',
        features: ['Mobile-first layout system', 'Cross-browser compatibility', 'Dark mode integration', 'Core Web Vitals tuning'],
      },
    ];
    await Service.insertMany(sampleServices);
    console.log('✅ Services seeded');

    // 4. Experience
    await Experience.deleteMany({});
    const sampleExperiences = [
      {
        role: 'Senior Full-Stack Developer',
        company: 'InnovateTech Solutions',
        location: 'Lucknow, India (Hybrid)',
        period: '2023 - Present',
        description: 'Architecting and scaling core enterprise web applications using Next.js, Node.js, and MongoDB. Led team migrations from monolithic backends to decoupled microservices and boosted API responsiveness by 40%.',
        technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
      },
      {
        role: 'Full-Stack Web Engineer',
        company: 'Apex Digital Systems',
        location: 'Remote',
        period: '2021 - 2023',
        description: 'Engineered custom client portals, e-commerce stores, and CRM modules using Laravel and Python/Django. Implemented secure role-based access control, payment gateways, and automated email/SMS pipelines.',
        technologies: ['PHP', 'Laravel', 'Python', 'Django', 'MySQL', 'Redis'],
      },
      {
        role: 'Associate Frontend Developer',
        company: 'WebCraft Studio',
        location: 'Lucknow, India',
        period: '2020 - 2021',
        description: 'Developed responsive user interfaces, interactive landing pages, and dynamic dashboards with JavaScript, React.js, and CSS frameworks. Collaborated with UI designers for seamless UX delivery.',
        technologies: ['JavaScript (ES6)', 'React.js', 'Bootstrap', 'HTML5/CSS3', 'Git'],
      },
    ];
    await Experience.insertMany(sampleExperiences);
    console.log('✅ Experience seeded');

    console.log('🎉 ALL DUMMY DATA SEEDED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
