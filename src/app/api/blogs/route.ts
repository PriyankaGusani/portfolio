import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  
  let blogs = await getAllBlogPosts();
  
  if (limit) {
    blogs = blogs.slice(0, parseInt(limit));
  }
  
  return NextResponse.json(blogs);
}
