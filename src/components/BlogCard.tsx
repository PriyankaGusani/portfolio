import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUser, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
         <motion.div
       className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
       whileHover={{ y: -10, scale: 1.02 }}
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6 }}
       viewport={{ once: true }}
       onClick={() => navigate(`/blog/${post.slug}`)}
     >
       {/* Gradient Border Animation */}
       <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#cc5500] via-[#ff6b35] to-[#cc5500] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
       
       {/* Content Container */}
       <div className="relative bg-[#1a1a1a] rounded-2xl p-4 md:p-6 m-1">
                 {/* Image Container */}
         <div className="relative overflow-hidden rounded-xl mb-4 md:mb-6 h-32 sm:h-40 md:h-48">
          <div className="absolute inset-0 bg-gradient-to-br from-[#cc5500]/20 to-[#ff6b35]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#cc5500] to-[#ff6b35] text-white text-xs font-semibold rounded-full">
            {post.category}
          </span>
        </div>

                 {/* Title */}
         <h3 className="text-lg md:text-xl font-bold text-[#f5f5f5] mb-2 md:mb-3 group-hover:text-[#cc5500] transition-colors duration-300 line-clamp-2">
           {post.title}
         </h3>

         {/* Excerpt */}
         <p className="text-gray-300 mb-3 md:mb-4 line-clamp-3 leading-relaxed text-sm md:text-base">
           {post.excerpt}
         </p>

                 {/* Meta Information */}
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs md:text-sm text-gray-400 mb-3 md:mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <FaUser className="text-[#cc5500]" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaCalendarAlt className="text-[#cc5500]" />
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <FaClock className="text-[#cc5500]" />
            <span>{post.readTime}</span>
          </div>
        </div>

                 {/* Tags */}
         <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                     {post.tags.slice(0, 3).map((tag, index) => (
             <span
               key={index}
               className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md hover:bg-[#cc5500] hover:text-white transition-colors duration-300"
             >
               {tag}
             </span>
           ))}
        </div>

        {/* Read More Button */}
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2 text-[#cc5500] font-semibold group-hover:text-[#ff6b35] transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            <span>Read More</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
