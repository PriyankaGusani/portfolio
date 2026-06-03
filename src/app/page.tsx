import HomeClient from '@/components/HomeClient';
import { getLatestBlogPosts } from '@/lib/blog';

// Set page to revalidate periodically if using dynamic files, or keep it static
export const revalidate = 3600; // revalidate every hour

export default async function HomePage() {
  const latestBlogs = await getLatestBlogPosts(3);
  
  return <HomeClient initialBlogs={latestBlogs} />;
}
