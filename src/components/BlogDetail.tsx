'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUser, FaArrowLeft, FaTag, FaShare } from 'react-icons/fa';
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
      if (line.startsWith('- ')) {
        return (
          <motion.li
            key={index}
            className="text-gray-300 mb-2 ml-6 list-disc"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {line.replace('- ', '')}
          </motion.li>
        );
      }
      if (line.startsWith('1. ')) {
        return (
          <motion.li
            key={index}
            className="text-gray-300 mb-2 ml-6 list-decimal"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {line.replace(/^\d+\.\s/, '')}
          </motion.li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      if (line.includes('**') && line.includes('**')) {
        const parts = line.split('**');
        return (
          <motion.p
            key={index}
            className="text-gray-300 mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {parts.map((part, partIndex) => 
              partIndex % 2 === 1 ? (
                <strong key={partIndex} className="font-semibold text-[#f5f5f5]">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </motion.p>
        );
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
          {line}
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
          {post.featuredImage ? (
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
            {!post.featuredImage && <span className="text-6xl mb-4 block">📝</span>}
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
      </motion.div>
    </div>
  );
};

export default BlogDetail;
