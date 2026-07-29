const https = require('https');
https.get('https://unsplash.com/photos/bouquet-of-pink-carnation-in-glass-vase-0utRJ1mZoZg', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?[^\"\\]+/);
    console.log(match ? match[0] : 'Not found');
  });
});
