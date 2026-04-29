import fs from 'fs';
import path from 'path';
import { BlogPost, calculateReadingTime } from '@/services/blogService';

const BLOGS_DIR = path.join(process.cwd(), 'public', 'blogs');

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    if (!fs.existsSync(BLOGS_DIR)) return [];
    
    const files = fs.readdirSync(BLOGS_DIR);
    const blogFiles = files.filter(file => file.endsWith('.json'));
    
    const blogs = blogFiles.map(file => {
      const filePath = path.join(BLOGS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const blog = JSON.parse(content) as BlogPost;
      blog.readTime = calculateReadingTime(blog.content);
      return blog;
    });

    return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts from filesystem:', error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const allBlogs = await getAllBlogPosts();
  return allBlogs.find(blog => blog.slug.toLowerCase() === slug.toLowerCase()) || null;
};

export const getLatestBlogPosts = async (limit: number = 3): Promise<BlogPost[]> => {
  const allBlogs = await getAllBlogPosts();
  return allBlogs.slice(0, limit);
};
