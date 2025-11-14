/**
 * Utility functions for managing meta tags for SEO and social sharing
 */

/**
 * Get the base URL of the site
 */
const getBaseUrl = (): string => {
  if (typeof window === 'undefined') return '';
  return `${window.location.protocol}//${window.location.host}`;
};

/**
 * Ensure URL is absolute
 */
const getAbsoluteUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // If it starts with /, it's already relative to root
  if (url.startsWith('/')) {
    return `${getBaseUrl()}${url}`;
  }
  // Otherwise, add / before it
  return `${getBaseUrl()}/${url}`;
};

/**
 * Set or update a meta tag
 */
const setMetaTag = (property: string, content: string, isProperty: boolean = true): void => {
  if (typeof document === 'undefined') return;
  
  const attribute = isProperty ? 'property' : 'name';
  let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, property);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

/**
 * Remove a meta tag
 */
const removeMetaTag = (property: string, isProperty: boolean = true): void => {
  if (typeof document === 'undefined') return;
  
  const attribute = isProperty ? 'property' : 'name';
  const element = document.querySelector(`meta[${attribute}="${property}"]`);
  if (element) {
    element.remove();
  }
};

/**
 * Set Open Graph and Twitter Card meta tags for a blog post
 */
export const setBlogPostMetaTags = (blog: {
  title: string;
  excerpt: string;
  featuredImage: string;
  slug: string;
}): void => {
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/blog/${blog.slug}`;
  const imageUrl = getAbsoluteUrl(blog.featuredImage);
  
  // Open Graph tags
  setMetaTag('og:title', blog.title);
  setMetaTag('og:description', blog.excerpt);
  setMetaTag('og:image', imageUrl);
  setMetaTag('og:url', pageUrl);
  setMetaTag('og:type', 'article');
  
  // Twitter Card tags
  setMetaTag('twitter:card', 'summary_large_image', false);
  setMetaTag('twitter:title', blog.title, false);
  setMetaTag('twitter:description', blog.excerpt, false);
  setMetaTag('twitter:image', imageUrl, false);
  
  // Standard meta description
  setMetaTag('description', blog.excerpt, false);
};

/**
 * Set Open Graph and Twitter Card meta tags for the blog listing page
 */
export const setBlogListingMetaTags = (): void => {
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/blog`;
  
  const title = 'Blog | Priyanka Gusani';
  const description = 'Explore my latest thoughts on web development, WordPress, automation, and the digital world';
  
  // Open Graph tags
  setMetaTag('og:title', title);
  setMetaTag('og:description', description);
  setMetaTag('og:url', pageUrl);
  setMetaTag('og:type', 'website');
  
  // Twitter Card tags
  setMetaTag('twitter:card', 'summary', false);
  setMetaTag('twitter:title', title, false);
  setMetaTag('twitter:description', description, false);
  
  // Standard meta description
  setMetaTag('description', description, false);
};

/**
 * Clear Open Graph and Twitter Card meta tags (reset to defaults)
 */
export const clearBlogMetaTags = (): void => {
  const tagsToRemove = [
    { property: 'og:title', isProperty: true },
    { property: 'og:description', isProperty: true },
    { property: 'og:image', isProperty: true },
    { property: 'og:url', isProperty: true },
    { property: 'og:type', isProperty: true },
    { property: 'twitter:card', isProperty: false },
    { property: 'twitter:title', isProperty: false },
    { property: 'twitter:description', isProperty: false },
    { property: 'twitter:image', isProperty: false },
  ];
  
  tagsToRemove.forEach(({ property, isProperty }) => {
    removeMetaTag(property, isProperty);
  });
};

