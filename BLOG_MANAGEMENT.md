# Blog Management System

This portfolio now has a fully automatic blog discovery system that detects and displays new blog posts without requiring any commands or manual intervention.

## How It Works

1. **Automatic Discovery**: The system automatically scans for numbered blog files (post-1.json, post-2.json, etc.)
2. **Dynamic Loading**: New blog posts are detected automatically when the page loads
3. **No Commands Needed**: No need to run any scripts or click refresh buttons
4. **Automatic Reading Time**: Reading time is calculated automatically based on content length

## Adding a New Blog Post

### Step 1: Create the Blog Post
1. Create a new JSON file in `public/blogs/` folder
2. Name it with the next available number: `post-8.json`, `post-9.json`, etc.
3. Use the same format as existing blog posts
4. **Important**: The `slug` field in your JSON will be used for the URL, not the filename

### Step 2: That's It!
The blog post will automatically appear on your website when you refresh the page. No commands needed!

## Blog Post JSON Format

```json
{
  "id": "unique-id",
  "title": "Your Blog Title",
  "excerpt": "Short description of the blog post",
  "content": "Full HTML content of the blog post",
  "author": "Priyanka Gusani",
  "date": "2024-12-19",
  "readTime": "5 min read",
  "category": "Development",
  "tags": ["wordpress", "development"],
  "featuredImage": "https://images.unsplash.com/photo-...",
  "slug": "your-blog-slug",
  "metaDescription": "SEO description for search engines"
}
```

## Important Notes

- **Filename**: Use `post-X.json` where X matches the ID number in your JSON file
- **Slug Field**: The `slug` field in your JSON will be used for the URL (e.g., `/blog/your-blog-slug`)
- **Reading Time**: Leave `readTime` field empty - it's calculated automatically
- **Date Format**: Use "YYYY-MM-DD" format
- **Sorting**: Posts are automatically sorted by ID (highest ID first)
- **Home Page**: Shows the latest 3 posts
- **Blog Listing**: Shows all posts

## File Naming Examples

- `post-7.json` (ID: 7) → URL: `/blog/agentic-ai-next-evolution-of-automation`
- `post-6.json` (ID: 6) → URL: `/blog/build-AI-powered-social-media-empire-with-n8n`
- `post-5.json` (ID: 5) → URL: `/blog/css-grid-flexbox-layouts`
- `post-8.json` (ID: 8) → URL: `/blog/your-new-blog-slug`

## Troubleshooting

If a new blog post doesn't appear:
1. Check that your JSON file is valid
2. Verify the filename follows the `post-X.json` pattern
3. Make sure the `slug` field is set correctly
4. Refresh the browser page
