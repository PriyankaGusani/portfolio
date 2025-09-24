import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing blog JSON files
const blogsDir = path.join(__dirname, '..', 'public', 'blogs');

// Read all JSON files in the blogs directory (excluding manifest.json)
const files = fs.readdirSync(blogsDir)
  .filter(file => file.endsWith('.json') && file !== 'manifest.json')
  .sort(); // Sort to maintain consistent order

console.log(`📁 Found ${files.length} blog files to rename:`);

// Rename files to post-1.json, post-2.json, etc.
files.forEach((file, index) => {
  const oldPath = path.join(blogsDir, file);
  const newPath = path.join(blogsDir, `post-${index + 1}.json`);
  
  try {
    // Read the content to get the slug
    const content = fs.readFileSync(oldPath, 'utf8');
    const blogData = JSON.parse(content);
    const slug = blogData.slug || file.replace('.json', '');
    
    // Rename the file
    fs.renameSync(oldPath, newPath);
    
    console.log(`✅ ${file} → post-${index + 1}.json (slug: ${slug})`);
  } catch (error) {
    console.error(`❌ Error renaming ${file}:`, error.message);
  }
});

console.log(`\n🎉 Renaming complete!`);
console.log(`📝 Your blog files are now numbered as post-1.json, post-2.json, etc.`);
console.log(`🔗 URLs will use the 'slug' field from each JSON file.`);

