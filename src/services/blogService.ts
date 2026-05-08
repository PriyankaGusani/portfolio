export interface BlogPost {
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

export const calculateReadingTime = (content: string): string => {
  const textContent = content.replace(/<[^>]*>/g, '');
  const wordCount = textContent.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  
  if (minutes === 1) return '1 min read';
  if (minutes < 60) return `${minutes} min read`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes === 0 ? `${hours} hr read` : `${hours} hr ${remainingMinutes} min read`;
};

// Client-side fetching from public folder
export const getLatestBlogPostsClient = async (limit: number = 3): Promise<BlogPost[]> => {
  try {
    // This is tricky because we don't know the filenames on the client without an API
    // For now, let's assume we have an API route or just fetch a fixed list
    const response = await fetch('/api/blogs?limit=' + limit);
    return response.json();
  } catch (error) {
    console.error('Error fetching blogs on client:', error);
    return [];
  }
};
