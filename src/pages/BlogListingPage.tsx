import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

import { loadAllBlogPosts } from '../services/blogService';

const BlogListingPage: React.FC = () => {
  const [blogs, setBlogs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadBlogs = async () => {
      try {
        const allBlogs = await loadAllBlogPosts();
        setBlogs(allBlogs);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Sort blogs by date (latest first)
  const sortedBlogs = [...blogs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1a1a] border-b border-[#333] py-4 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4">
                      <div className="flex justify-between items-center">
              <Link 
                to="/"
                className="flex items-center gap-2 text-[#cc5500] hover:text-[#ff6600] transition-colors duration-300"
              >
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Portfolio</span>
              </Link>
              
                             {/* Logo/Name */}
               <Link 
                 to="/"
                 className="text-3xl font-extrabold text-[#cc5500] hover:text-[#ff6600] transition-colors duration-300 cursor-pointer"
               >
                 Priyanka Gusani
               </Link>
              
              <h1 className="text-2xl font-bold text-[#f5f5f5]">Blog Posts</h1>
            </div>
        </div>
      </motion.header>

      <div className="py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#cc5500] mb-6">
              Blog Posts
            </h1>
            <p className="text-xl text-[#f5f5f5] max-w-3xl mx-auto">
              Explore my latest thoughts on web development, WordPress, automation, and the digital world
            </p>
            <div className="mt-8">
              <span className="inline-block px-6 py-2 bg-[#cc5500] text-[#f5f5f5] font-semibold rounded-full">
                {blogs.length} Articles
              </span>
            </div>
          </motion.div>

          {/* Blog Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">⏳</div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4">
                Loading Blog Posts...
              </h3>
              <p className="text-[#ccc]">Please wait while we fetch the latest content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#cc5500]/20 transition-all duration-300 hover:scale-105 group"
              >
                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#cc5500] text-[#f5f5f5] text-sm font-semibold rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-[#888] mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blog.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#f5f5f5] mb-3 group-hover:text-[#cc5500] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#ccc] mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Read More Button */}
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="flex items-center gap-2 text-[#cc5500] font-semibold hover:text-[#ff6600] transition-colors duration-300 group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
            </div>
          )}

          {/* Empty State */}
          {blogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4">
                No Blog Posts Yet
              </h3>
              <p className="text-[#ccc] max-w-md mx-auto">
                I'm working on some great content. Check back soon for the latest articles!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogListingPage;
