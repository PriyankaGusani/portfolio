import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing blog JSON files
const blogsDir = path.join(__dirname, '..', 'public', 'blogs');

// Read all JSON files in the blogs directory
const files = fs.readdirSync(blogsDir)
  .filter(file => file.endsWith('.json') && file.startsWith('post-'))
  .sort();

console.log(`📁 Found ${files.length} blog files to rename by ID:`);

const blogData = [];

// First, read all files and collect their data
files.forEach((file) => {
  const filePath = path.join(blogsDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const blog = JSON.parse(content);
    blogData.push({
      filename: file,
      id: parseInt(blog.id),
      slug: blog.slug,
      title: blog.title
    });
  } catch (error) {
    console.error(`❌ Error reading ${file}:`, error.message);
  }
});

// Sort by ID (highest first)
blogData.sort((a, b) => b.id - a.id);

console.log('\n📋 Blog data sorted by ID:');
blogData.forEach(blog => {
  console.log(`ID ${blog.id}: ${blog.title} (current: ${blog.filename})`);
});

// Rename files according to their ID
blogData.forEach((blog, index) => {
  const oldPath = path.join(blogsDir, blog.filename);
  const newPath = path.join(blogsDir, `post-${blog.id}.json`);
  
  try {
    // Only rename if the filename doesn't match the ID
    if (blog.filename !== `post-${blog.id}.json`) {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ ${blog.filename} → post-${blog.id}.json`);
    } else {
      console.log(`✓ ${blog.filename} already correctly named`);
    }
  } catch (error) {
    console.error(`❌ Error renaming ${blog.filename}:`, error.message);
  }
});

console.log(`\n🎉 Renaming complete!`);
console.log(`📝 Files are now named according to their ID numbers.`);
console.log(`🔗 URLs will use the 'slug' field from each JSON file.`);

