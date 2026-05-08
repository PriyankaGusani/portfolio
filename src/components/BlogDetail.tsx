'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUser, FaArrowLeft, FaTag, FaShare, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  slug: string;
  metaDescription: string;
  show_image?: number;
}

interface BlogDetailProps {
  post: BlogPost;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderInlineStyles = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, partIndex) => {
      const isBold = partIndex % 2 === 1;
      
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const elements = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(part)) !== null) {
        if (match.index > lastIndex) {
          elements.push(part.substring(lastIndex, match.index));
        }
        elements.push(
          <a key={`${partIndex}-${match.index}`} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-[#cc5500] hover:text-[#ff6b35] hover:underline transition-colors duration-300">
            {match[1]}
          </a>
        );
        lastIndex = linkRegex.lastIndex;
      }

      if (lastIndex < part.length) {
        elements.push(part.substring(lastIndex));
      }

      if (isBold) {
        return <strong key={partIndex} className="font-semibold text-[#f5f5f5]">{elements}</strong>;
      }
      return <React.Fragment key={partIndex}>{elements}</React.Fragment>;
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return (
          <motion.h2
            key={index}
            className="text-2xl font-bold mt-8 mb-4 text-[#cc5500]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {line.replace('## ', '')}
          </motion.h2>
        );
      }
      if (line.startsWith('![')) {
        const altMatch = line.match(/!\[([^\]]*)\]/);
        const urlMatch = line.match(/\(([^)]+)\)/);
        if (altMatch && urlMatch) {
          return (
            <motion.div
              key={index}
              className="my-8 w-full flex justify-center rounded-xl overflow-hidden border border-gray-800 bg-[#242424] p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src={urlMatch[1]} 
                alt={altMatch[1] || 'Blog Image'} 
                className="max-w-full h-auto max-h-[500px] object-contain rounded-lg"
                loading="lazy"
              />
            </motion.div>
          );
        }
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <motion.li
            key={index}
            className="text-gray-300 mb-2 ml-6 list-disc"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {renderInlineStyles(line.replace(/^[-*]\s/, ''))}
          </motion.li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <motion.li
            key={index}
            className="text-gray-300 mb-2 ml-6 list-decimal"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {renderInlineStyles(line.replace(/^\d+\.\s/, ''))}
          </motion.li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <motion.p
          key={index}
          className="text-gray-300 mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {renderInlineStyles(line)}
        </motion.p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-12 px-4 md:px-24">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center space-x-2 text-[#cc5500] hover:text-[#ff6b35] transition-colors duration-300 mb-8 font-semibold">
          <FaArrowLeft />
          <span>Back to Portfolio</span>
        </Link>

        {/* Header Image/Gradient */}
        <div className="relative h-64 md:h-96 bg-gradient-to-br from-[#cc5500] to-[#ff6b35] rounded-2xl flex items-center justify-center mb-12 shadow-2xl overflow-hidden">
          {post.featuredImage && post.show_image !== 0 ? (
            <>
              <Image 
                src={post.featuredImage} 
                alt={post.title} 
                fill 
                className="object-cover" 
                priority 
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </>
          ) : (
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            </div>
          )}
          <div className="text-white text-center relative z-10 w-full px-8">
            {(post.show_image === 0 || !post.featuredImage) && <span className="text-6xl mb-4 block">📝</span>}
            <h1 className="text-3xl md:text-5xl font-bold">{post.title}</h1>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-[#1a1a1a] rounded-3xl p-8 md:p-12 shadow-xl">
          {/* Meta Information */}
          <motion.div
            className="flex flex-wrap items-center justify-between mb-8 p-6 bg-[#242424] rounded-2xl border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <FaUser className="text-[#cc5500]" />
                <span className="font-medium text-gray-200">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-[#cc5500]" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-[#cc5500]" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaShare className="text-[#cc5500] cursor-pointer hover:text-[#ff6b35] transition-colors duration-200" />
            </div>
          </motion.div>

          {/* Category and Tags */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#cc5500] to-[#ff6b35] text-white font-semibold rounded-full shadow-lg shadow-[#cc5500]/20">
                {post.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <FaTag className="text-[#cc5500] mt-1" />
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-[#cc5500] hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {formatContent(post.content)}
          </motion.div>
        </div>

        {/* Connect With Me Section */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-[#1a1a1a] to-[#242424] rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Enjoyed reading this?</h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              I love discussing WordPress, AI automation, and web development. If you have a project in mind or just want to chat, let&apos;s connect!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
              <a href="https://www.linkedin.com/in/priyanka-gusani/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 px-6 py-3 bg-[#0077b5]/10 text-[#0077b5] rounded-full hover:bg-[#0077b5] hover:text-white transition-all duration-300 border border-[#0077b5]/20 font-semibold">
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/PriyankaGusani" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 border border-white/20 font-semibold">
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <Link href="/#contact" className="flex items-center space-x-3 px-6 py-3 bg-[#cc5500]/10 text-[#cc5500] rounded-full hover:bg-[#cc5500] hover:text-white transition-all duration-300 border border-[#cc5500]/20 font-semibold">
                <FaEnvelope size={20} />
                <span>Email Me</span>
              </Link>
            </div>

            <div className="pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-500 mb-6">Want to dive deeper?</p>
              <Link href="/#book-appointment" className="inline-block px-10 py-4 bg-gradient-to-r from-[#cc5500] to-[#ff6b35] text-white font-bold rounded-full shadow-lg hover:shadow-[#cc5500]/40 transition-all duration-300 hover:scale-105">
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BlogDetail;
