'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { 
  FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaGithub, FaWordpress, 
  FaWordpressSimple, FaShopify, FaRocket, FaHtml5, FaCss3Alt, FaJs, FaCheck,
  FaArrowRight, FaUser, FaCalendarAlt, FaClock, FaShare, FaTag, FaCode, FaCamera
} from 'react-icons/fa';
import { MdTranslate } from 'react-icons/md';
import { SiPhp, SiN8N, SiJquery, SiMysql, SiGraphql } from 'react-icons/si';
import BlogCard from '@/components/BlogCard';
import { getLatestBlogPostsClient } from '@/services/blogService';
import emailjs from '@emailjs/browser';

// Declare Calendly global object
declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill: any;
        utm: any;
        pageSettings?: {
          backgroundColor: string;
          hideEventTypeDetails: boolean;
          hideLandingPageDetails: boolean;
          primaryColor: string;
          textColor: string;
        };
      }) => void;
    };
    gtag: (...args: any[]) => void;
  }
}

const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

const sectionTitle = (title: string, customShadowClass?: string) => (
  <motion.div
    className="relative text-center mb-10"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    {/* Background Text */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span className={`${customShadowClass || 'text-6xl md:text-7xl lg:text-8xl'} font-black font-serif text-[#333] opacity-30 uppercase tracking-wider`}>
        {title}
      </span>
    </div>
    
    {/* Main Title */}
    <motion.h2
      className="text-4xl font-bold font-serif text-[#cc5500] relative z-10"
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

const ContributionHistory = ({ align = 'center' }: { align?: 'left' | 'center' | 'right' }) => (
  <div className={`w-full mb-3 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
    <h3 className="text-sm font-bold text-gray-300 mb-3 tracking-wide font-serif">Contribution History</h3>
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 w-fit ${align === 'center' ? 'mx-auto text-left' : align === 'right' ? 'ml-auto' : 'mr-auto text-left'}`}>
      <div className={`flex items-center gap-2.5 ${align === 'right' ? 'justify-end' : ''}`} title="Core AI Contributor">
        <div className="w-8 h-8 shrink-0 rounded-full border-[1.5px] border-[#761CB9] flex items-center justify-center text-[#761CB9] bg-transparent">
          <FaCode size={13} />
        </div>
        <span className="text-xs text-gray-300 font-medium whitespace-nowrap">Core AI Contributor</span>
      </div>
      <div className={`flex items-center gap-2.5 ${align === 'right' ? 'justify-end' : ''}`} title="Photo Contributor">
        <div className="w-8 h-8 shrink-0 rounded-full border-[1.5px] border-[#B4009E] flex items-center justify-center text-[#B4009E] bg-transparent">
          <FaCamera size={13} />
        </div>
        <span className="text-xs text-gray-300 font-medium whitespace-nowrap">Photo Contributor</span>
      </div>
      <div className={`flex items-center gap-2.5 ${align === 'right' ? 'justify-end' : ''}`} title="Translation Contributor">
        <div className="w-8 h-8 shrink-0 rounded-full border-[1.5px] border-[#A8106D] flex items-center justify-center text-[#A8106D] bg-transparent">
          <MdTranslate size={13} />
        </div>
        <span className="text-xs text-gray-300 font-medium whitespace-nowrap">Translation Contributor</span>
      </div>
      <div className={`flex items-center gap-2.5 ${align === 'right' ? 'justify-end' : ''}`} title="Translation Editor">
        <div className="w-8 h-8 shrink-0 rounded-full border-[1.5px] border-[#8B1A4F] flex items-center justify-center text-[#8B1A4F] bg-transparent">
          <MdTranslate size={13} />
        </div>
        <span className="text-xs text-gray-300 font-medium whitespace-nowrap">Translation Editor</span>
      </div>
    </div>
  </div>
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
      className={`absolute ${position === 'left' ? 'left-2 sm:left-4 md:left-16' : 'right-2 sm:right-4 md:right-16'} ${top} w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full p-2 md:p-3 shadow-lg flex items-center justify-center group cursor-pointer opacity-40 sm:opacity-60 md:opacity-100 z-0`}
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
      <div className="text-white flex items-center justify-center w-full h-full">
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

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
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
  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [availabilityText, setAvailabilityText] = useState('');
  
  const profileImg = '/profile.png';

  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setAvailabilityText(`${monthNames[date.getMonth()]} ${date.getFullYear()}`);
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadLatestBlogs = async () => {
      try {
        const blogs = await getLatestBlogPostsClient(3);
        setLatestBlogs(blogs);
      } catch (error) {
        console.error('Error loading latest blogs:', error);
      } finally {
        setBlogsLoading(false);
      }
    };
    loadLatestBlogs();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await emailjs.send(
        'service_iegl9vd',
        'template_btqgm3i',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'efKjhR1aC7qhfaB4Y'
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
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
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive" 
      />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center pb-12 md:pb-2 relative overflow-hidden">
        {/* Floating Icons - Left Side */}
        <FloatingIcon icon={<SiPhp size={20} className="md:w-7 md:h-7" />} name="PHP" position="left" delay={0} top="top-8 md:top-12" gradient="linear-gradient(135deg, #8993be 0%, #4F5B93 100%)" />
        <FloatingIcon icon={<FaHtml5 size={20} className="md:w-7 md:h-7" />} name="HTML5" position="left" delay={1.2} top="top-24 md:top-32" gradient="linear-gradient(135deg, #e34f26 0%, #f06529 100%)" />
        <FloatingIcon icon={<FaCss3Alt size={20} className="md:w-7 md:h-7" />} name="CSS3" position="left" delay={2.4} top="top-44 md:top-56" gradient="linear-gradient(135deg, #1572b6 0%, #33a9dc 100%)" />
        <FloatingIcon icon={<SiJquery size={20} className="md:w-7 md:h-7" />} name="jQuery" position="left" delay={3.6} top="top-64 md:top-80" gradient="linear-gradient(135deg, #0769ad 0%, #7acef4 100%)" />
        <FloatingIcon icon={<SiMysql size={20} className="md:w-7 md:h-7" />} name="MySQL" position="left" delay={4.8} top="bottom-4 md:bottom-12" gradient="linear-gradient(135deg, #00758f 0%, #f29111 100%)" />
        
        {/* Floating Icons - Right Side */}
        <FloatingIcon icon={<FaWordpressSimple size={20} className="md:w-7 md:h-7" />} name="WordPress" position="right" delay={0.6} top="top-6 md:top-8" gradient="linear-gradient(135deg, #21759b 0%, #00749C 100%)" />
        <FloatingIcon icon={<FaShopify size={20} className="md:w-7 md:h-7" />} name="Shopify" position="right" delay={1.8} top="top-24 md:top-32" gradient="linear-gradient(135deg, #96bf48 0%, #5e8e3e 100%)" />
        <FloatingIcon icon={<SiN8N size={20} className="md:w-7 md:h-7" />} name="n8n" position="right" delay={3.0} top="top-44 md:top-56" gradient="linear-gradient(135deg, #F36C21 0%, #F89C4B 100%)" />
        <FloatingIcon icon={<FaJs size={20} className="md:w-7 md:h-7" />} name="JavaScript" position="right" delay={4.2} top="top-64 md:top-80" gradient="linear-gradient(135deg, #f7df1e 0%, #f0db4f 100%)" />
        <FloatingIcon icon={<SiGraphql size={20} className="md:w-7 md:h-7" />} name="GraphQL" position="right" delay={2.4} top="bottom-4 md:bottom-11" gradient="linear-gradient(135deg, #e535ab 0%, #f6009b 100%)" />
        
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center justify-center gap-6 relative z-20 max-w-5xl mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-shrink-0 relative flex items-end"
          >
            <Image src={profileImg} alt="Priyanka Gusani" width={192} height={224} className="object-cover shadow-2xl relative z-20" priority />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px z-20"
              animate={{
                background: [
                  'linear-gradient(90deg, #cc5500 0%, #ff6600 50%, #e535ab 100%)',
                  'linear-gradient(90deg, #e535ab 0%, #cc5500 50%, #ff6600 100%)',
                  'linear-gradient(90deg, #ff6600 0%, #e535ab 50%, #cc5500 100%)',
                  'linear-gradient(90deg, #cc5500 0%, #ff6600 50%, #e535ab 100%)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <div className="text-center max-w-xl relative z-20">
            <motion.h1 className="text-2xl font-extrabold font-serif text-[#cc5500] mb-3" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div>Priyanka</div>
              <div>Gusani</div>
            </motion.h1>
            <motion.h2 className="text-base font-bold mb-3 text-[#f5f5f5]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <div>Sr. WordPress Developer &</div>
              <div>Automation Specialist</div>
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3 }} className="flex flex-col items-center gap-4">
              <ContributionHistory align="center" />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {availabilityText && (
                  <div className="flex items-center gap-2 text-xs text-gray-300 bg-[#1a1a1a] px-4 py-3 rounded-full border border-gray-800 shadow-lg max-w-full overflow-hidden">
                    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="truncate">Available for new projects — {availabilityText}</span>
                  </div>
                )}
                <a href="#contact" className="inline-block px-6 py-2.5 bg-[#cc5500] text-[#f5f5f5] font-bold rounded-full shadow-lg hover:scale-105 hover:bg-[#ff6600] transition-all duration-300 text-sm">
                  Hire Me
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row items-center justify-center gap-12 relative z-10 max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-shrink-0 relative flex items-end">
            <Image src={profileImg} alt="Priyanka Gusani" width={332} height={600} className="h-[76vh] w-auto object-cover shadow-2xl relative z-10" priority />
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
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <div className="text-right max-w-2xl">
            <motion.h1 className="text-6xl font-extrabold font-serif text-[#cc5500] mb-4" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div>Priyanka</div>
              <div>Gusani</div>
            </motion.h1>
            <motion.h2 className="text-2xl font-bold mb-4 text-[#f5f5f5]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <div>Sr. WordPress Developer &</div>
              <div>Automation Specialist</div>
            </motion.h2>
            <motion.p className="text-lg mb-8 text-[#f5f5f5]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
              I build fast, custom WordPress sites that help<br />agencies & businesses win more clients.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3 }} className="flex flex-col items-end gap-4 mt-2">
              <ContributionHistory align="right" />
              <div className="flex flex-row items-center gap-4">
                {availabilityText && (
                  <div className="flex items-center gap-2 text-sm text-gray-300 bg-[#1a1a1a] px-5 py-3 rounded-full border border-gray-800 shadow-lg">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span>Available for new projects — {availabilityText}</span>
                  </div>
                )}
                <a href="#contact" className="inline-block px-8 py-3 bg-[#cc5500] text-[#f5f5f5] font-bold rounded-full shadow-lg hover:scale-105 hover:bg-[#ff6600] transition-all duration-300">
                  Hire Me
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rocket Separator */}
      <div className="flex flex-col items-center -mt-4 mb-2 relative z-10">
        <div className="flex items-center justify-center">
          <span className="inline-block p-3 rounded-full border-2 border-dotted border-[#cc5500] bg-[#181818] text-[#cc5500] text-3xl shadow-md"><FaRocket /></span>
        </div>
        <div className="w-1 h-8 border-l-2 border-dotted border-[#cc5500] mx-auto" />
      </div>

      {/* About Section */}
      <section id="about" className="py-16 px-4 md:px-24">
        {sectionTitle('About Me')}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <motion.div className="text-left" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <motion.p className="text-lg md:text-xl leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}>
              Hi, I&apos;m Priyanka.<br />
              I help businesses grow their digital presence through custom web development, automation, and strategic consultation — so they can scale efficiently without getting stuck in tech.
            </motion.p>
            <motion.div className="mt-8 space-y-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} viewport={{ once: true }}>
              {[
                '⚡ Web Development — Design to Deployment',
                '🔧 WordPress & Shopify — Custom & E-Commerce',
                '🤖 Automation & Integration — Save Time, Cut Costs',
                '🛡️ Technical Support — Proactive & Reliable'
              ].map((text, i) => (
                <div key={i} className="text-[#f5f5f5] text-lg">
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="flex justify-center lg:justify-end" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <div className="relative w-full max-w-lg">
              <div className="bg-gradient-to-br from-[#181818] to-[#232323] rounded-2xl p-2 relative z-10 border border-gray-800">
                <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    src="https://www.youtube.com/embed/zezc4FSFEkY?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&showinfo=0"
                    title="Introduction Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-[#cc5500] font-medium">Introduction Video</p>
                <p className="text-xs text-[#888] mt-1">Get to know me better</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 px-4 md:px-24">
        {sectionTitle('What I can build for you', 'text-4xl md:text-5xl lg:text-6xl')}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, idx) => (
            <motion.div key={skill.title} className="bg-[#181818] rounded-2xl p-6 border border-[#232323] hover:border-[#cc5500] transition-colors duration-300" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 + idx * 0.2 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold mb-4 text-[#cc5500]">{skill.title}</h3>
              <ul className="space-y-3">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheck className="text-[#cc5500] mt-1 flex-shrink-0" size={14} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-16 px-4 md:px-24">
        {sectionTitle('My Journey')}
        <div className="relative max-w-4xl mx-auto mt-20">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2 z-0" />
          <div className="space-y-12">
            {journey.map((item, idx) => (
              <motion.div key={item.title} className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="pl-12 md:pl-0 w-full md:w-1/2">
                  <div className="bg-[#1a1a1a] p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-[#cc5500] transition-colors duration-500 relative z-10">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{item.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-[#cc5500]">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.company} | {item.year}</p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                      {item.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="absolute left-4 top-10 md:relative md:left-auto md:top-auto flex items-center justify-center z-20 -translate-x-1/2 md:translate-x-0">
                   <div className="w-4 h-4 bg-[#cc5500] rounded-full ring-4 ring-[#cc5500]/20" />
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 md:px-24">
        {sectionTitle('Gallery')}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mt-12">
          {sliderImages.map((image, index) => (
            <motion.div key={index} className="break-inside-avoid mb-4 relative group overflow-hidden rounded-xl cursor-pointer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}>
              <Image src={image} alt={`Gallery ${index}`} width={400} height={300} className="w-full h-auto transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold">View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
           <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
              <button className="absolute top-4 right-4 text-white text-4xl hover:text-[#cc5500]" onClick={() => setLightboxOpen(false)}>×</button>
              <Image src={sliderImages[lightboxIndex]} alt="Lightbox" width={1200} height={800} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl" onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length); }}>‹</button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl" onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % sliderImages.length); }}>›</button>
           </div>
        </div>
      )}

      {/* Blog Section */}
      <section id="blog" className="py-16 px-4 md:px-24">
        {sectionTitle('Latest Blog Posts')}
        <div className="mt-12">
          {blogsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cc5500] mx-auto mb-4"></div>
              <p className="text-gray-400">Loading blog posts...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestBlogs.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/blog" className="inline-block px-8 py-3 border-2 border-[#cc5500] text-[#cc5500] font-bold rounded-full hover:bg-[#cc5500] hover:text-white transition-all duration-300">
                  View All Posts
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Appointment Section */}
      <section id="book-appointment" className="pt-16 pb-8 px-4 md:px-24 bg-[#111]">
        {sectionTitle('Book Appointment')}
        <div className="mt-12 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/priyanka-gusani"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-12 pb-20 px-4 md:px-24">
        {sectionTitle('Contact')}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 mt-12">
           <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Get In Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required className="w-full px-4 py-2.5 md:px-5 md:py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl focus:border-[#cc5500] outline-none text-sm md:text-base" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="w-full px-4 py-2.5 md:px-5 md:py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl focus:border-[#cc5500] outline-none text-sm md:text-base" />
                <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" required className="w-full px-4 py-2.5 md:px-5 md:py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl focus:border-[#cc5500] outline-none text-sm md:text-base" />
                <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Message" rows={4} required className="w-full px-4 py-2.5 md:px-5 md:py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl focus:border-[#cc5500] outline-none resize-none text-sm md:text-base" />
                <button type="submit" disabled={isSubmitting} className="w-full py-2.5 md:py-3 bg-[#cc5500] text-white font-bold rounded-xl hover:bg-[#ff6b35] transition-colors disabled:opacity-50 text-sm md:text-base">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && <p className="text-green-500 text-center text-sm md:text-base">Message sent successfully!</p>}
              </form>
           </motion.div>
           <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Contact Info</h3>
              <div className="space-y-6 md:space-y-8">
                 <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-[#1a1a1a] rounded-full flex items-center justify-center text-[#cc5500] text-xl md:text-2xl shadow-lg shadow-[#cc5500]/10">
                       <FaEnvelope />
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-gray-400 text-xs md:text-sm">Email</p>
                       <p className="text-sm sm:text-base md:text-lg font-bold break-all">priyanka.gusani@outlook.com</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-[#1a1a1a] rounded-full flex items-center justify-center text-[#cc5500] text-xl md:text-2xl shadow-lg shadow-[#cc5500]/10">
                       <FaMapMarkerAlt />
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-gray-400 text-xs md:text-sm">Address</p>
                       <p className="text-sm sm:text-base md:text-lg font-bold break-words">Ahmedabad, Gujarat, India</p>
                    </div>
                 </div>
              </div>
              <div className="mt-12 pt-12 border-t border-gray-800">
                 <p className="text-gray-400 mb-6">Connect with me</p>
                 <div className="flex space-x-4">
                    {[
                      { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/priyanka-gusani/' },
                      { icon: <FaGithub />, href: 'https://github.com/PriyankaGusani' },
                      { icon: <FaWordpress />, href: 'https://profiles.wordpress.org/priyankagusani/' }
                    ].map((social, i) => (
                      <a key={i} href={social.href} target="_blank" className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-xl hover:bg-[#cc5500] hover:text-white transition-all">
                        {social.icon}
                      </a>
                    ))}
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 text-center">
         <p className="text-gray-400">© {new Date().getFullYear()} Priyanka Gusani. All rights reserved.</p>
      </footer>

      {/* Scroll to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 right-8 w-14 h-14 bg-[#cc5500] rounded-full flex items-center justify-center text-white text-2xl shadow-2xl transition-all duration-300 ${scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
         ↑
      </button>
    </div>
  );
}
