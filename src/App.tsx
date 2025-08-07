import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaGithub, FaWordpress } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaWordpressSimple, FaShopify, FaRocket, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiPhp, SiN8N, SiJquery, SiMysql, SiGraphql } from 'react-icons/si';

const sectionTitle = (title: string) => (
  <motion.div
    className="relative text-center mb-10"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    {/* Background Text */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span className="text-8xl md:text-8xl font-black text-[#333] opacity-40 uppercase tracking-wider">
        {title}
      </span>
    </div>
    
    {/* Main Title */}
    <motion.h2
      className="text-4xl font-bold text-[#cc5500] relative z-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {title}
      <motion.div
        className="mx-auto mt-2 h-1 w-24 bg-gradient-to-r from-[#333] to-[#cc5500] rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ originX: 0.5 }}
      />
    </motion.h2>
  </motion.div>
);

const skills = [
  {
    title: 'WordPress',
    items: [
      'Theme creation (ACF, Elementor, Bakery Builder)',
      'WooCommerce',
      'Plugin development & improvement',
      'Troubleshooting & Technical Support',
    ],
  },
  {
    title: 'Shopify',
    items: [
      'Theme & Shopify Plus',
      'Liquid, Storefront APIs, GraphQL APIs',
      'Wholesale, Custom Integrations',
    ],
  },
  {
    title: 'Web Tech',
    items: [
      'PHP, HTML, CSS, Bootstrap, JavaScript, jQuery, AJAX, MYSQL, MVC, REST APIs, Laravel',
    ],
  },
  {
    title: '3rd Party & Tools',
    items: [
      'PayPal, Stripe, SMS APIs, FedEx, Braintree, Payment Gateway Integration',
      'Firebase, Chat APIs, Geolocation, API, Push Notification, Video SDK, FFMPEG, n8n',
      'Github/git, SVN, Docker, Postman, Kanban, Clickup, Asana, Jira, Microsoft Office',
      'MailChimp, Klaviyo, Hubspot, etc.',
    ],
  },
];

const journey = [
  {
    year: '2022 – Present',
    title: 'Sr. WordPress Developer & Project Assistant',
    company: 'Microweb',
    icon: '💼',
    details: [
      'Led WordPress plugin development, project execution, and technical support for multiple clients.',
      'Implemented CodeIgniter in projects, collaborated with designers/developers, and delivered client solutions.',
      'Managed digital event invitation system, proposal platform, and matrimonial portal.',
      'Built n8n automation and workflows to improve efficiency.',
    ],
  },
  {
    year: '2017 – 2022',
    title: 'Web Developer',
    company: 'Keshav Infotech',
    icon: '🛠️',
    details: [
      'Developed and maintained WordPress plugins and WooCommerce extensions for diverse clients.',
      'Led a team of 5, improved product accuracy/scalability, and coordinated with project managers.',
      'Designed and maintained Gift Card plugin, WooCommerce extensions, and Shopify sites.',
      'Implemented GraphQL APIs, React, Twilio, Stockdio, Stripe, Braintree integrations.',
    ],
  },
];

function FloatingIcon({ icon, name, position, delay, top, gradient }: { 
  icon: React.ReactNode, 
  name: string,
  position: 'left' | 'right', 
  delay: number, 
  top: string,
  gradient: string
}) {
  return (
    <motion.div
      className={`absolute ${position === 'left' ? 'left-8 md:left-16' : 'right-8 md:right-16'} ${top} w-14 h-14 rounded-full p-3 shadow-lg flex items-center justify-center group cursor-pointer`}
      animate={{
        y: position === 'left' ? [0, -15, 0] : [0, 15, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      style={{
        background: gradient,
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
        boxShadow: '0 0 20px rgba(255, 102, 0, 0.3)'
      }}
    >
      <div className="text-white text-xl">
        {icon}
      </div>
      {/* Tooltip */}
      <div className={`absolute ${position === 'left' ? 'left-full ml-2' : 'right-full mr-2'} top-1/2 transform -translate-y-1/2 bg-[#0f0f0f] text-[#f5f5f5] px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-[#cc5500] shadow-lg z-50`}
      >
        {name}
        <div className={`absolute top-1/2 ${position === 'left' ? '-left-2' : '-right-2'} transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent ${position === 'left' ? 'border-r-4 border-r-[#0f0f0f]' : 'border-l-4 border-l-[#0f0f0f]'}`}></div>
      </div>
    </motion.div>
  );
}

function App() {
  // Add your photo (replace with your actual image path)
  const profileImg = '/profile.png'; // Place your image in public/profile.jpg
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Load slider images from public/slider folder
  useEffect(() => {
    // For now, we'll use placeholder images. In a real app, you'd need to:
    // 1. Either import images directly, or
    // 2. Use a backend API to get the list of images
    const images = [
      '/slider/slide-1.jpg',
      '/slider/slide-2.jpg', 
      '/slider/slide-3.jpg',
      '/slider/slide-4.jpg',
      '/slider/slide-5.jpg',
      '/slider/slide-6.jpg',
      '/slider/slide-7.jpg',
      '/slider/slide-8.jpg',
      '/slider/slide-9.jpg'
    ];
    setSliderImages(images);
  }, []);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using EmailJS or similar service would be better for production
      // For now, we'll use a simple mailto link as a fallback
      const mailtoLink = `mailto:priyanka.gusani@outlook.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
      window.open(mailtoLink);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-[#0f0f0f] text-[#f5f5f5] min-h-screen font-sans">
      {/* Hero Section */}
      <section id="hero" className="h-screen flex flex-col justify-center items-center text-center pb-4 md:pb-2 relative overflow-hidden">
        {/* Floating Icons - Left Side */}
        <FloatingIcon 
          icon={<SiPhp size={28} />} 
          name="PHP" 
          position="left" 
          delay={0} 
          top="top-12" 
          gradient="linear-gradient(135deg, #8993be 0%, #4F5B93 100%)"
        />
        <FloatingIcon 
          icon={<FaHtml5 size={28} />} 
          name="HTML5" 
          position="left" 
          delay={1.2} 
          top="top-32" 
          gradient="linear-gradient(135deg, #e34f26 0%, #f06529 100%)"
        />
        <FloatingIcon 
          icon={<FaCss3Alt size={28} />} 
          name="CSS3" 
          position="left" 
          delay={2.4} 
          top="top-56" 
          gradient="linear-gradient(135deg, #1572b6 0%, #33a9dc 100%)"
        />
        <FloatingIcon 
          icon={<SiJquery size={28} />} 
          name="jQuery" 
          position="left" 
          delay={3.6} 
          top="top-80" 
          gradient="linear-gradient(135deg, #0769ad 0%, #7acef4 100%)"
        />
        <FloatingIcon 
          icon={<SiMysql size={28} />} 
          name="MySQL" 
          position="left" 
          delay={4.8} 
          top="bottom-12" 
          gradient="linear-gradient(135deg, #00758f 0%, #f29111 100%)"
        />
        
        {/* Floating Icons - Right Side */}
        <FloatingIcon 
          icon={<FaWordpressSimple size={28} />} 
          name="WordPress" 
          position="right" 
          delay={0.6} 
          top="top-8" 
          gradient="linear-gradient(135deg, #21759b 0%, #00749C 100%)"
        />
        <FloatingIcon 
          icon={<FaShopify size={28} />} 
          name="Shopify" 
          position="right" 
          delay={1.8} 
          top="top-32" 
          gradient="linear-gradient(135deg, #96bf48 0%, #5e8e3e 100%)"
        />
        <FloatingIcon 
          icon={<SiN8N size={28} />} 
          name="n8n" 
          position="right" 
          delay={3.0} 
          top="top-56" 
          gradient="linear-gradient(135deg, #F36C21 0%, #F89C4B 100%)"
        />
        <FloatingIcon 
          icon={<FaJs size={28} />} 
          name="JavaScript" 
          position="right" 
          delay={4.2} 
          top="top-80" 
          gradient="linear-gradient(135deg, #f7df1e 0%, #f0db4f 100%)"
        />
        <FloatingIcon 
          icon={<SiGraphql size={28} />} 
          name="GraphQL" 
          position="right" 
          delay={2.4} 
          top="bottom-11" 
          gradient="linear-gradient(135deg, #e535ab 0%, #f6009b 100%)"
        />
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative z-10 max-w-6xl mx-auto px-4">
          {/* Profile Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-shrink-0 relative h-full flex items-end"
          >
            {/* Animated SVG Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80 z-0">
              <svg className="w-full h-full max-w-md max-h-md" viewBox="0 0 602 602" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.6">
                  <path fillRule="evenodd" clipRule="evenodd" d="M201.337 87.437C193.474 79.5738 180.725 79.5738 172.862 87.437L87.437 172.862C79.5739 180.725 79.5739 193.474 87.437 201.337L400.663 514.563C408.526 522.426 421.275 522.426 429.138 514.563L514.563 429.138C522.426 421.275 522.426 408.526 514.563 400.663L201.337 87.437ZM30.4869 115.912C-8.82897 155.228 -8.82897 218.972 30.4869 258.287L343.713 571.513C383.028 610.829 446.772 610.829 486.088 571.513L571.513 486.088C610.829 446.772 610.829 383.028 571.513 343.713L258.287 30.4869C218.972 -8.82896 155.228 -8.82896 115.912 30.4869L30.4869 115.912Z" stroke="url(#paint0_radial)" id="path_0"></path>
                  <path d="M514.563 201.337C522.426 193.474 522.426 180.725 514.563 172.862L429.138 87.437C421.275 79.5738 408.526 79.5739 400.663 87.437L358.098 130.002L301.148 73.0516L343.713 30.4869C383.028 -8.82896 446.772 -8.82896 486.088 30.4869L571.513 115.912C610.829 155.228 610.829 218.972 571.513 258.287L357.802 471.999L300.852 415.049L514.563 201.337Z" stroke="url(#paint1_radial)" id="path_1"></path>
                  <path d="M243.901 471.999L201.337 514.563C193.474 522.426 180.725 522.426 172.862 514.563L87.437 429.138C79.5739 421.275 79.5739 408.526 87.437 400.663L301.148 186.952L244.198 130.002L30.4869 343.713C-8.82897 383.028 -8.82897 446.772 30.4869 486.088L115.912 571.513C155.228 610.829 218.972 610.829 258.287 571.513L300.852 528.949L243.901 471.999Z" stroke="url(#paint2_radial)" id="path_2"></path>
                </g>
                <ellipse cx="295.027" cy="193.118" transform="translate(-295.027 -193.118)" rx="2" ry="2" fill="#cc5500" opacity="0.8">
                  <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_2"></mpath>
                  </animateMotion>
                </ellipse>
                <path d="M294.685 193.474L268.932 219.258" transform="translate(-294.685 -193.474) rotate(45 294.685 193.474)" stroke="url(#paint3_linear)">
                  <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_2"></mpath>
                  </animateMotion>
                </path>
                <ellipse cx="295.027" cy="193.118" transform="translate(-295.027 -193.118)" rx="2" ry="2" fill="#ff6600" opacity="0.8">
                  <animateMotion dur="5s" begin="1" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_2"></mpath>
                  </animateMotion>
                </ellipse>
                <path d="M294.685 193.474L268.932 219.258" transform="translate(-294.685 -193.474) rotate(45 294.685 193.474)" stroke="url(#paint7_linear)">
                  <animateMotion dur="5s" begin="1" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_2"></mpath>
                  </animateMotion>
                </path>
                <ellipse cx="476.525" cy="363.313" rx="2" ry="2" transform="translate(-476.525 -363.313) rotate(90 476.525 363.313)" fill="#cc5500" opacity="0.8">
                  <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_0"></mpath>
                  </animateMotion>
                </ellipse>
                <path d="M476.171 362.952L450.417 337.168" transform="translate(-476.525 -363.313) rotate(-45 476.171 362.952)" stroke="url(#paint4_linear)">
                  <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_0"></mpath>
                  </animateMotion>
                </path>
                <ellipse cx="382.164" cy="155.029" rx="2" ry="2" transform="translate(-382.164 -155.029) rotate(90 382.164 155.029)" fill="#ff6600" opacity="0.8">
                  <animateMotion dur="10s" begin="1" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_0"></mpath>
                  </animateMotion>
                </ellipse>
                <path d="M381.81 154.669L356.057 128.885" transform="translate(-381.81 -154.669) rotate(-45 381.81 154.669)" stroke="url(#paint5_linear)">
                  <animateMotion dur="10s" begin="1" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_0"></mpath>
                  </animateMotion>
                </path>
                <ellipse cx="333.324" cy="382.691" rx="2" ry="2" transform="translate(-333.324 -382.691) rotate(-180 333.324 382.691)" fill="#ff6600" opacity="0.8">
                  <animateMotion dur="5s" begin="0" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_1"></mpath>
                  </animateMotion>
                </ellipse>
                <path d="M333.667 382.335L359.42 356.551" transform="scale(-1 1) translate(-333.667 -382.335) rotate(45 333.667 382.335)" stroke="url(#paint6_linear)">
                  <animateMotion dur="5s" begin="0" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_1"></mpath>
                  </animateMotion>
                </path>
                <ellipse cx="165.524" cy="93.9596" rx="2" ry="2" transform="translate(-165.524 -93.9596)" fill="#ff6600" opacity="0.8">
                  <animateMotion dur="10s" begin="3" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_0"></mpath>
                  </animateMotion>
                </ellipse>
                <path d="M165.182 94.3159L139.429 120.1" transform="translate(-165.182 -94.3159) rotate(45 165.182 94.3159)" stroke="url(#paint7_linear)">
                  <animateMotion dur="10s" begin="3" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_0"></mpath>
                  </animateMotion>
                </path>
                <ellipse cx="476.525" cy="363.313" rx="2" ry="2" transform="translate(-476.525 -363.313) rotate(90 476.525 363.313)" fill="#e535ab" opacity="0.8">
                  <animateMotion dur="12s" begin="4" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_0"></mpath>
                  </animateMotion>
                </ellipse>
                <path d="M476.171 362.952L450.417 337.168" transform="translate(-476.525 -363.313) rotate(-45 476.171 362.952)" stroke="url(#paint11_linear)">
                  <animateMotion dur="12s" begin="4" repeatCount="indefinite" rotate="auto">
                    <mpath href="#path_0"></mpath>
                  </animateMotion>
                </path>
                <defs>
                  <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(301 301) rotate(90) scale(300)">
                    <stop offset="0.333333" stopColor="#cc5500"></stop>
                    <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                  </radialGradient>
                  <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(301 301) rotate(90) scale(300)">
                    <stop offset="0.333333" stopColor="#ff6600"></stop>
                    <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                  </radialGradient>
                  <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(301 301) rotate(90) scale(300)">
                    <stop offset="0.333333" stopColor="#e535ab"></stop>
                    <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                  </radialGradient>
                  <linearGradient id="paint3_linear" x1="295.043" y1="193.116" x2="269.975" y2="218.154" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#cc5500"></stop>
                    <stop offset="1" stopColor="#cc5500" stopOpacity="0"></stop>
                  </linearGradient>
                  <linearGradient id="paint4_linear" x1="476.529" y1="363.31" x2="451.461" y2="338.272" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#cc5500"></stop>
                    <stop offset="1" stopColor="#cc5500" stopOpacity="0"></stop>
                  </linearGradient>
                  <linearGradient id="paint5_linear" x1="382.168" y1="155.027" x2="357.1" y2="129.989" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff6600"></stop>
                    <stop offset="1" stopColor="#ff6600" stopOpacity="0"></stop>
                  </linearGradient>
                  <linearGradient id="paint6_linear" x1="333.309" y1="382.693" x2="358.376" y2="357.655" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff6600"></stop>
                    <stop offset="1" stopColor="#ff6600" stopOpacity="0"></stop>
                  </linearGradient>
                  <linearGradient id="paint7_linear" x1="165.54" y1="93.9578" x2="140.472" y2="118.996" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff6600"></stop>
                    <stop offset="1" stopColor="#ff6600" stopOpacity="0"></stop>
                  </linearGradient>
                  <linearGradient id="paint11_linear" x1="476.529" y1="363.31" x2="451.461" y2="338.272" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#e535ab"></stop>
                    <stop offset="1" stopColor="#e535ab" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <img src={profileImg} alt="Priyanka Gusani" className="w-68 h-74 md:w-83 md:h-[76vh] object-cover shadow-2xl relative z-10" />
            {/* Animated Line Below Image */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 z-20"
              animate={{
                background: [
                  'linear-gradient(90deg, #cc5500 0%, #ff6600 50%, #e535ab 100%)',
                  'linear-gradient(90deg, #e535ab 0%, #cc5500 50%, #ff6600 100%)',
                  'linear-gradient(90deg, #ff6600 0%, #e535ab 50%, #cc5500 100%)',
                  'linear-gradient(90deg, #cc5500 0%, #ff6600 50%, #e535ab 100%)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
          
          {/* Content - Right Side */}
          <div className="text-right max-w-2xl">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-[#cc5500] mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div>Priyanka</div>
              <div>Gusani</div>
            </motion.h1>
            <motion.h2
              className="text-xl md:text-2xl font-bold mb-4 text-[#f5f5f5]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div>Sr. WordPress Developer &</div>
              <div>Automation Specialist</div>
            </motion.h2>
            <motion.p
              className="text-base md:text-lg mb-8 text-[#f5f5f5]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
            >
              Building powerful WordPress solutions for the modern web
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3 }}
            >
              <a
                href="#contact"
                className="inline-block px-8 py-3 bg-[#cc5500] text-[#f5f5f5] font-bold rounded-lg shadow-lg hover:scale-105 hover:bg-[#ff6600] transition-all duration-300"
              >
                Hire Me
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Rocket Separator */}
      <div className="flex flex-col items-center -mt-8 mb-2">
        <div className="flex items-center justify-center">
          <span className="inline-block p-3 rounded-full border-2 border-dotted border-[#cc5500] bg-[#181818] text-[#cc5500] text-3xl shadow-md"><FaRocket /></span>
        </div>
        <div className="w-1 h-8 border-l-2 border-dotted border-[#cc5500] mx-auto" />
      </div>
      {/* About Section */}
      <section id="about" className="py-5 px-4 md:px-24 text-center">
        {sectionTitle('About Me')}
        <motion.p
          className="text-lg md:text-xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Enthusiast Engineer with 7+ years of industrial experience in Web development and Technical support. I am result-oriented, self-driven, and disciplined with strong fundamentals in web development. I believe in the power of consistent improvement and am always eager to learn something new every day.
        </motion.p>
      </section>
      {/* Skills Section */}
      <section id="skills" className="py-12 px-4 md:px-24">
        {sectionTitle('Skills')}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.title}
              className="bg-gradient-to-br from-[#181818] to-[#232323] rounded-2xl p-6 shadow-xl border border-[#232323] hover:shadow-2xl hover:from-[#232323] hover:to-[#cc5500]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 + idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #cc550099' }}
            >
              <h3 className="text-2xl font-bold mb-2 text-[#cc5500] text-center">{skill.title}</h3>
              <ul className="list-disc list-inside space-y-1">
                {skill.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Journey Section */}
      <section id="journey" className="py-16 px-4 md:px-24">
        {sectionTitle('My Journey')}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#cc5500] rounded-full -translate-x-1/2 z-10" />
          <div className="space-y-0 relative">
            {journey.map((item, idx) => (
              <motion.div
                key={item.title}
                className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 + idx * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Content Card */}
                <motion.div
                  className={`md:w-5/12 max-w-lg ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} relative`}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div 
                    className="relative p-[3px] rounded-xl"
                    animate={{
                      background: [
                        'linear-gradient(135deg, #cc5500 0%, #ff6600 50%, #e535ab 100%)',
                        'linear-gradient(135deg, #e535ab 0%, #cc5500 50%, #ff6600 100%)',
                        'linear-gradient(135deg, #ff6600 0%, #e535ab 50%, #cc5500 100%)',
                        'linear-gradient(135deg, #cc5500 0%, #ff6600 50%, #e535ab 100%)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        background: [
                          'linear-gradient(135deg, #cc5500 0%, #ff6600 50%, #e535ab 100%)',
                          'linear-gradient(135deg, #e535ab 0%, #cc5500 50%, #ff6600 100%)',
                          'linear-gradient(135deg, #ff6600 0%, #e535ab 50%, #cc5500 100%)',
                          'linear-gradient(135deg, #cc5500 0%, #ff6600 50%, #e535ab 100%)'
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        borderRadius: '12px',
                        zIndex: -1
                      }}
                    />
                    <div className="bg-gradient-to-br from-[#181818] to-[#232323] rounded-xl p-8 relative z-10">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <h3 className="text-xl font-bold text-[#cc5500]">{item.title}</h3>
                      </div>
                      <span className="block text-[#f5f5f5] mb-4 text-right text-sm font-medium">{item.company} | {item.year}</span>
                      <ul className="list-disc list-inside space-y-0 text-sm pl-4">
                        {item.details.map((d, i) => <li key={i} className="text-[#f5f5f5]">{d}</li>)}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-8 px-4 md:px-24">
        {sectionTitle('Projects')}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Gifting Plugin – WordPress',
              desc: 'Gift Cards (Gift Vouchers and Packages) – WooCommerce Supported',
              details: 'Created a plugin to generate and manage gift cards online/offline, with WooCommerce integration, order/redeem options, and admin tools.'
            },
            {
              title: 'Booster for WooCommerce',
              desc: '100+ sub modules for currency, discounts, crowdfunding, product addons, etc.',
              details: 'Led dev team, handled support, bug fixing, and feature updates for a major WooCommerce plugin.'
            },
            {
              title: 'Safe Update and Rollback – WordPress',
              desc: 'Automatic plugin/theme updates and rollback on error.',
              details: 'Built a plugin to automate updates and safely roll back on failure, with instant admin notifications.'
            },
            {
              title: 'Shopify Wholesale & Custom Integrations',
              desc: 'Wholesale, subscriptions, custom pages, GraphQL, Storefront API, PHP integration.',
              details: 'Converted HTML to Shopify themes, built custom features, and integrated PHP/Shopify for dynamic sites.'
            }
          ].map((proj, idx) => (
            <motion.div
              key={proj.title}
              className="bg-gradient-to-br from-[#181818] to-[#232323] rounded-2xl p-6 shadow-xl border border-[#232323] hover:shadow-2xl hover:from-[#232323] hover:to-[#cc5500]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 + idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #cc550099' }}
            >
              <h3 className="text-xl font-bold text-[#cc5500] mb-2">{proj.title}</h3>
              <p className="mb-2">{proj.desc}</p>
              <p className="text-sm">{proj.details}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
                  {/* Masonry Gallery Section */}
      <section className="py-5 px-4 md:px-24 bg-[#0f0f0f]">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {sliderImages.map((image, index) => (
            <motion.div
              key={index}
              className="break-inside-avoid mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative overflow-hidden rounded-xl p-[3px]"
                animate={{
                  background: [
                    'linear-gradient(135deg, #cc5500 0%, #ff6600 50%, #e535ab 100%)',
                    'linear-gradient(135deg, #e535ab 0%, #cc5500 50%, #ff6600 100%)',
                    'linear-gradient(135deg, #ff6600 0%, #e535ab 50%, #cc5500 100%)',
                    'linear-gradient(135deg, #cc5500 0%, #ff6600 50%, #e535ab 100%)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="bg-[#0f0f0f] rounded-xl overflow-hidden cursor-pointer">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/400/${300 + (index % 3) * 100}?random=${index}`;
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75 transition-all duration-300 z-10"
            >
              ×
            </button>
            
            {/* Lightbox Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={sliderImages[lightboxIndex]}
                alt={`Lightbox image ${lightboxIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/800/600?random=${lightboxIndex}`;
                }}
              />
            </motion.div>
            
            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % sliderImages.length);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
            >
              →
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              {lightboxIndex + 1} / {sliderImages.length}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Education Section */}
      <section id="education" className="py-10 px-4 md:px-24">
        {sectionTitle('Education')}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-gradient-to-br from-[#181818] to-[#232323] rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#cc5500] mb-2">B.E. in Computer Engineering</h3>
            <p className="mb-1">Gujarat Technological University</p>
            <p className="text-sm">2017 – 2020 | 7.7 CGPA</p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-[#181818] to-[#232323] rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#cc5500] mb-2">Diploma in Computer Engineering</h3>
            <p className="mb-1">Gujarat Technological University</p>
            <p className="text-sm">2014 – 2017 | 8.37 CGPA</p>
          </motion.div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-12 bg-[#0f0f0f]">
        {sectionTitle("Contact")}
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-[#f5f5f5] mb-6">Just say Hello</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-[#f5f5f5] placeholder-[#666] focus:outline-none focus:border-[#cc5500] transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-[#f5f5f5] placeholder-[#666] focus:outline-none focus:border-[#cc5500] transition-colors"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Your Subject"
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-[#f5f5f5] placeholder-[#666] focus:outline-none focus:border-[#cc5500] transition-colors"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-[#f5f5f5] placeholder-[#666] focus:outline-none focus:border-[#cc5500] transition-colors resize-none"
                ></textarea>
                
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-center py-2"
                  >
                    Message sent successfully! Check your email client.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-center py-2"
                  >
                    Error sending message. Please try again.
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-3 bg-[#ff6600] text-[#0f0f0f] font-bold rounded-lg shadow-lg hover:bg-[#cc5500] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-[#f5f5f5] mb-4">Contact Info</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-[#cc5500] text-xl" />
                  </div>
                  <div>
                    <h4 className="text-[#f5f5f5] font-bold mb-2">Email</h4>
                    <p className="text-[#999]">priyanka.gusani@outlook.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-[#cc5500] text-xl" />
                  </div>
                  <div>
                    <h4 className="text-[#f5f5f5] font-bold mb-2">Phone</h4>
                    <p className="text-[#999]">+91 87583 96841</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-[#cc5500] text-xl" />
                  </div>
                  <div>
                    <h4 className="text-[#f5f5f5] font-bold mb-2">Address</h4>
                    <p className="text-[#999]">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h4 className="text-[#999] font-medium mb-4">Visit my social profile and get connected</h4>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://www.linkedin.com/in/priyanka-gusani/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-full flex items-center justify-center text-[#f5f5f5] hover:border-[#cc5500] hover:text-[#cc5500] transition-all duration-300"
                  >
                    <FaLinkedin className="text-lg" />
                  </motion.a>
                  <motion.a
                    href="https://wa.me/918758396841"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-full flex items-center justify-center text-[#f5f5f5] hover:border-[#cc5500] hover:text-[#cc5500] transition-all duration-300"
                  >
                    <FaWhatsapp className="text-lg" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/PriyankaGusani"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-full flex items-center justify-center text-[#f5f5f5] hover:border-[#cc5500] hover:text-[#cc5500] transition-all duration-300"
                  >
                    <FaGithub className="text-lg" />
                  </motion.a>
                  <motion.a
                    href="https://profiles.wordpress.org/priyankagusani/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-full flex items-center justify-center text-[#f5f5f5] hover:border-[#cc5500] hover:text-[#cc5500] transition-all duration-300"
                  >
                    <FaWordpress className="text-lg" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
