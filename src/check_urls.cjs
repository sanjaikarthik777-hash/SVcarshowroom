const fs = require('fs');
const path = require('path');
const https = require('https');

const dirsToCheck = [
  __dirname,
  path.join(__dirname, 'data'),
  path.join(__dirname, 'pages', 'services'),
];

const urls = new Set();
const fileUrlMap = {};

function extractUrls(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match https://images.unsplash.com/...
  const regex = /https:\/\/images\.unsplash\.com\/[^\s"'`)]+/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const url = match[0];
    urls.add(url);
    if (!fileUrlMap[url]) fileUrlMap[url] = [];
    fileUrlMap[url].push(filePath);
  }
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Don't recurse, we just check specific dirs
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      extractUrls(fullPath);
    }
  }
}

dirsToCheck.forEach(processDirectory);

console.log(`Found ${urls.size} unique Unsplash URLs.`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'ERROR', error: e.message });
    });
  });
}

async function main() {
  const results = [];
  const urlArray = Array.from(urls);
  
  // Checking in batches of 5 to not overwhelm
  for (let i = 0; i < urlArray.length; i += 5) {
    const batch = urlArray.slice(i, i + 5);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);
  }

  let broken = 0;
  for (const r of results) {
    if (r.status !== 200) {
      broken++;
      console.log(`[BROKEN] Status: ${r.status} - ${r.url}`);
      console.log(`         Found in: ${fileUrlMap[r.url].join(', ')}`);
    }
  }
  
  if (broken === 0) {
    console.log("All URLs are valid (200 OK)!");
  } else {
    console.log(`Found ${broken} broken URLs.`);
  }
}

main();
