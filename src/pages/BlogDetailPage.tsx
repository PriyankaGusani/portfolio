import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Home, ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug } from '../services/blogService';

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = React.useState<any>(undefined);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadBlog = async () => {
      if (slug) {
        try {
          const blogData = await getBlogPostBySlug(slug);
          setBlog(blogData);
        } catch (error) {
          console.error('Error loading blog:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">⏳</div>
          <h1 className="text-3xl font-bold text-[#f5f5f5] mb-4">Loading Blog Post...</h1>
          <p className="text-[#ccc] mb-8">Please wait while we fetch the content.</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">📝</div>
          <h1 className="text-3xl font-bold text-[#f5f5f5] mb-4">Blog Post Not Found</h1>
          <p className="text-[#ccc] mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-block px-6 py-3 bg-[#cc5500] text-[#f5f5f5] font-semibold rounded-full hover:bg-[#ff6600] transition-colors duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
                to="/blog"
                className="flex items-center gap-2 text-[#cc5500] hover:text-[#ff6600] transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Blog</span>
              </Link>
              
                             {/* Logo/Name */}
               <Link 
                 to="/"
                 className="text-3xl font-extrabold text-[#cc5500] hover:text-[#ff6600] transition-colors duration-300 cursor-pointer"
               >
                 Priyanka Gusani
               </Link>
              
              <Link 
                to="/"
                className="flex items-center gap-2 text-[#cc5500] hover:text-[#ff6600] transition-colors duration-300"
              >
                <Home className="w-5 h-5" />
                <span className="font-semibold">Portfolio</span>
              </Link>
            </div>
        </div>
      </motion.header>

      <div className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Blog Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-[#cc5500] text-[#f5f5f5] text-sm font-semibold rounded-full">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#f5f5f5] mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-[#888] mb-8">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(blog.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl mb-8">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Excerpt */}
            <p className="text-xl text-[#ccc] leading-relaxed mb-8">
              {blog.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                             {blog.tags.map((tag: string, index: number) => (
                 <span
                   key={index}
                   className="px-3 py-1 bg-[#333] text-[#ccc] text-sm rounded-full hover:bg-[#cc5500] hover:text-[#f5f5f5] transition-colors duration-300"
                 >
                   {tag}
                 </span>
               ))}
            </div>
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="text-[#f5f5f5] leading-relaxed">
                             {blog.content.split('\n\n').map((paragraph: string, index: number) => {
                 if (paragraph.startsWith('## ')) {
                   // Handle headers
                   const headerText = paragraph.replace('## ', '');
                   return (
                     <h2 key={index} className="text-2xl font-bold text-[#cc5500] mt-8 mb-4">
                       {headerText}
                     </h2>
                   );
                 } else if (paragraph.startsWith('- **')) {
                   // Handle bullet points
                   const bulletText = paragraph.replace('- **', '').replace('**', '');
                   return (
                     <ul key={index} className="list-disc list-inside mb-4 space-y-2">
                       <li className="text-[#ccc]">{bulletText}</li>
                     </ul>
                   );
                 } else if (paragraph.startsWith('1. ')) {
                   // Handle numbered lists
                   const listText = paragraph.replace('1. ', '');
                   return (
                     <ol key={index} className="list-decimal list-inside mb-4 space-y-2">
                       <li className="text-[#ccc]">{listText}</li>
                     </ol>
                   );
                 } else if (paragraph.trim() === '') {
                   // Handle empty paragraphs
                   return <div key={index} className="h-4"></div>;
                 } else {
                   // Handle regular paragraphs
                   return (
                     <p key={index} className="text-[#ccc] mb-6 leading-relaxed">
                       {paragraph}
                     </p>
                   );
                 }
               })}
            </div>
          </motion.div>

          {/* Back to Blog Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Link
              to="/blog"
              className="inline-block px-8 py-4 bg-[#cc5500] text-[#f5f5f5] font-semibold rounded-full hover:bg-[#ff6600] transition-all duration-300 hover:scale-105"
            >
              ← Back to All Posts
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
