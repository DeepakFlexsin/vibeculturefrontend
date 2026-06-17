// Run: node generate-sitemap.js
// Add to package.json scripts: "sitemap": "node generate-sitemap.js"
import fetch from 'node-fetch'
import fs from 'fs'

const BASE_URL = 'https://www.vibeculture.in'
const BACKEND_URL = process.env.VITE_BACKEND_URL || 'https://api.vibeculture.in'

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/collection', priority: '0.9', changefreq: 'daily' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.6', changefreq: 'monthly' },
]

async function generateSitemap() {
  let productUrls = []

  try {
    const res = await fetch(`${BACKEND_URL}/api/product/list`)
    const data = await res.json()
    if (data.success) {
      productUrls = data.products.map(p => ({
        url: `/product/${p.seo?.slug || p._id}`,
        priority: '0.8',
        changefreq: 'weekly',
        image: p.image?.[0],
        title: p.name,
      }))
    }
  } catch (e) {
    console.error('Failed to fetch products:', e.message)
  }

  const allRoutes = [...staticRoutes, ...productUrls]
  const today = new Date().toISOString().split('T')[0]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allRoutes.map(r => `  <url>
    <loc>${BASE_URL}${r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>${r.image ? `
    <image:image>
      <image:loc>${r.image}</image:loc>
      <image:title>${(r.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</image:title>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>`

  fs.writeFileSync('./public/sitemap.xml', xml)
  console.log(`✅ Sitemap generated with ${allRoutes.length} URLs → public/sitemap.xml`)
}

generateSitemap()
