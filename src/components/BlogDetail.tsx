import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUser, FaArrowLeft, FaTag, FaShare } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

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
  onClose: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, onClose }) => {
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
            className="text-2xl font-bold text-[#0f0f0f] mt-8 mb-4 text-[#cc5500]"
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
            className="text-gray-700 mb-2 ml-6 list-disc"
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
            className="text-gray-700 mb-2 ml-6 list-decimal"
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
            className="text-gray-700 mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {parts.map((part, partIndex) => 
              partIndex % 2 === 1 ? (
                <strong key={partIndex} className="font-semibold text-[#0f0f0f]">
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
          className="text-gray-700 mb-4 leading-relaxed"
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
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <IoMdClose className="text-2xl text-gray-600" />
        </button>

        {/* Header Image */}
        <div className="relative h-64 bg-gradient-to-br from-[#cc5500] to-[#ff6b35] rounded-t-2xl flex items-center justify-center">
          <div className="text-white text-center">
            <span className="text-6xl mb-4 block">📝</span>
            <h1 className="text-3xl font-bold px-8">{post.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Meta Information */}
          <motion.div
            className="flex flex-wrap items-center justify-between mb-8 p-4 bg-gray-50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <FaUser className="text-[#cc5500]" />
                <span className="font-medium">{post.author}</span>
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
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#cc5500] to-[#ff6b35] text-white font-semibold rounded-full">
                {post.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <FaTag className="text-[#cc5500] mt-1" />
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#cc5500] hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {formatContent(post.content)}
          </motion.div>

          {/* Back Button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={onClose}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#cc5500] text-white rounded-full hover:bg-[#ff6b35] transition-colors duration-300 font-semibold"
            >
              <FaArrowLeft />
              <span>Back to Portfolio</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogDetail;
