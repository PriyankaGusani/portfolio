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
}

/**
 * Calculate reading time based on content
 */
const calculateReadingTime = (content: string): string => {
  // Remove HTML tags and count words
  const textContent = content.replace(/<[^>]*>/g, '');
  const wordCount = textContent.trim().split(/\s+/).length;
  
  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(wordCount / 200);
  
  if (minutes === 1) {
    return '1 min read';
  } else if (minutes < 60) {
    return `${minutes} min read`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hr read`;
    } else {
      return `${hours} hr ${remainingMinutes} min read`;
    }
  }
};

// Cache for loaded blog posts
let blogCache: BlogPost[] | null = null;
let blogSlugsCache: string[] | null = null;

/**
 * Discover available blog files automatically by trying numbered files
 */
const discoverBlogFiles = async (): Promise<string[]> => {
  // Return cached slugs if available
  if (blogSlugsCache) {
    return blogSlugsCache;
  }

  const foundSlugs: string[] = [];
  let postNumber = 1;
  let consecutiveFailures = 0;
  const maxConsecutiveFailures = 5; // Stop after 5 consecutive missing files

  // Try to load post-1.json, post-2.json, etc. until we find no more files
  while (consecutiveFailures < maxConsecutiveFailures) {
    try {
      const response = await fetch(`/blogs/post-${postNumber}.json`);
      if (response.ok) {
        const blog = await response.json();
        // Use the slug from the JSON file, or fallback to filename
        const slug = blog.slug || `post-${postNumber}`;
        foundSlugs.push(slug);
        consecutiveFailures = 0; // Reset failure counter
      } else {
        consecutiveFailures++;
      }
    } catch (error) {
      consecutiveFailures++;
    }
    postNumber++;
  }

  blogSlugsCache = foundSlugs;
  return foundSlugs;
};

/**
 * Load a single blog post by slug (searches through numbered files)
 */
export const loadBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    // First try to find the post by searching through numbered files
    let postNumber = 1;
    let consecutiveFailures = 0;
    const maxConsecutiveFailures = 10;

    while (consecutiveFailures < maxConsecutiveFailures) {
      try {
        const response = await fetch(`/blogs/post-${postNumber}.json`);
        if (response.ok) {
          const blog = await response.json();
          // Check if this is the post we're looking for
          if (blog.slug === slug || blog.slug === `post-${postNumber}`) {
            // Calculate reading time automatically
            blog.readTime = calculateReadingTime(blog.content);
            return blog;
          }
          consecutiveFailures = 0; // Reset failure counter
        } else {
          consecutiveFailures++;
        }
      } catch (error) {
        consecutiveFailures++;
      }
      postNumber++;
    }

    return null;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
};

/**
 * Load all blog posts
 */
export const loadAllBlogPosts = async (): Promise<BlogPost[]> => {
  // Return cached posts if available
  if (blogCache) {
    return blogCache;
  }

  try {
    // Discover available blog files dynamically
    const blogSlugs = await discoverBlogFiles();
    const blogPromises = blogSlugs.map(slug => loadBlogPost(slug));
    const blogs = await Promise.all(blogPromises);
    
    // Filter out null values and sort by date (latest first)
    const validBlogs = blogs.filter((blog): blog is BlogPost => blog !== null);
    
    // Calculate reading time for all blogs
    const blogsWithReadingTime = validBlogs.map(blog => ({
      ...blog,
      readTime: calculateReadingTime(blog.content)
    }));
    
    const sortedBlogs = blogsWithReadingTime.sort((a, b) => 
      parseInt(b.id) - parseInt(a.id)
    );
    
    // Cache the results
    blogCache = sortedBlogs;
    return sortedBlogs;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};

/**
 * Get latest blog posts (limited count)
 */
export const getLatestBlogPosts = async (limit: number = 3): Promise<BlogPost[]> => {
  const allBlogs = await loadAllBlogPosts();
  return allBlogs.slice(0, limit);
};

/**
 * Get blog post by slug
 */
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  return await loadBlogPost(slug);
};

/**
 * Clear the blog cache (useful for development)
 */
export const clearBlogCache = (): void => {
  blogCache = null;
  blogSlugsCache = null;
};

/**
 * Refresh blog data (clears cache and reloads)
 */
export const refreshBlogData = async (): Promise<BlogPost[]> => {
  clearBlogCache();
  return await loadAllBlogPosts();
};
