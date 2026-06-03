const urls = [
  'https://youtu.be/R1TRpT99PSo',
  'https://youtu.be/_dOINxqAbEs',
  'https://youtu.be/tmeP2RHBEPc',
  'https://youtu.be/WDOoDxy8HSE',
  'https://youtu.be/CACIU-fwaXk',
  'https://youtu.be/ueOpj2f-IGU'
];

async function fetchTitles() {
  for (const url of urls) {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
      if (response.ok) {
        const data = await response.json();
        const idMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        const id = idMatch ? idMatch[1] : '';
        console.log(`{ title: ${JSON.stringify(data.title)}, image: 'https://img.youtube.com/vi/${id}/hqdefault.jpg', year: '2024', description: 'Listen to this podcast episode.', link: '${url}' },`);
      } else {
        console.log(`Failed for ${url}`);
      }
    } catch (e) {
      console.log(`Error for ${url}:`, e.message);
    }
  }
}

fetchTitles();
