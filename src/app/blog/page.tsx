import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog | Priyanka Gusani',
  description: 'Explore my latest thoughts on web development, WordPress, automation, and the digital world',
  openGraph: {
    title: 'Blog | Priyanka Gusani',
    description: 'Explore my latest thoughts on web development, WordPress, automation, and the digital world',
    type: 'website',
  },
};

export default async function BlogListingPage() {
  const blogs = await getAllBlogPosts();

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Navigation Header */}
      <header className="bg-[#1a1a1a] border-b border-[#333] py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="flex items-center gap-2 text-[#cc5500] hover:text-[#ff6600] transition-colors duration-300"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold hidden sm:inline">Back to Portfolio</span>
            </Link>
            
            <Link 
              href="/"
              className="text-2xl sm:text-3xl font-extrabold text-[#cc5500] hover:text-[#ff6600] transition-colors duration-300"
            >
              Priyanka Gusani
            </Link>
            
            <h1 className="text-xl sm:text-2xl font-bold text-[#f5f5f5] hidden md:block">Blog Posts</h1>
          </div>
        </div>
      </header>

      <div className="py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
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
          </div>

          {/* Blog Grid */}
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} post={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4">
                No Blog Posts Yet
              </h3>
              <p className="text-[#ccc] max-w-md mx-auto">
                I'm working on some great content. Check back soon for the latest articles!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
