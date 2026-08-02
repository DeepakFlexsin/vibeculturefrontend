const BACKEND = process.env.VITE_BACKEND_URL || process.env.BACKEND_URL || 'https://api.krivante.store'
const SITE = 'https://www.vibeculture.in'

const escapeHtml = (str = '') => String(str)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

/** WhatsApp needs a public HTTPS JPG/PNG; Cloudinary transforms help size/format. */
const toOgImage = (url) => {
  if (!url || typeof url !== 'string') return `${SITE}/logo.png`
  let src = url.trim()
  if (src.startsWith('//')) src = `https:${src}`
  if (src.startsWith('http://')) src = src.replace('http://', 'https://')
  if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
    // Avoid double-transform if already transformed
    if (!/\/upload\/[^/]*f_/.test(src)) {
      src = src.replace('/upload/', '/upload/f_jpg,w_1200,h_1200,c_fill,q_auto:good/')
    }
  }
  return src
}

export default async function handler(req, res) {
  try {
    const idOrSlug = String(req.query.idOrSlug || '').trim()
    if (!idOrSlug) {
      res.statusCode = 400
      res.end('Missing product id')
      return
    }

    const listRes = await fetch(`${BACKEND}/api/product/list`)
    const data = await listRes.json()
    const products = data?.products || []
    const product = products.find(
      (p) => String(p._id) === idOrSlug || p.seo?.slug === idOrSlug
    )

    if (!product) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end('<!DOCTYPE html><title>Not found</title><h1>Product not found</h1>')
      return
    }

    const slug = product.seo?.slug || String(product._id)
    const url = `${SITE}/product/${slug}`
    const title = escapeHtml(product.seo?.metaTitle || product.name)
    const plainDesc = String(product.description || '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    const description = escapeHtml(
      product.seo?.metaDescription ||
        plainDesc.slice(0, 160) ||
        `Buy ${product.name} for ₹${product.price} at VibeCulture`
    )
    // Prefer gallery image — seo.ogImage is often stale/404 in this catalog
    const image = escapeHtml(toOgImage(product.image?.[0] || product.seo?.ogImage))
    const price = product.price
    const name = escapeHtml(product.name)
    const inStock = Array.isArray(product.variants) && product.variants.length
      ? product.variants.some((v) => v.quantity > 0)
      : true
    const categoryName = product.category?.name || ''

    const html = `<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | VibeCulture</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VibeCulture" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:secure_url" content="${image}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="1200" />
  <meta property="og:image:alt" content="${name}" />
  <meta property="product:price:amount" content="${price}" />
  <meta property="product:price:currency" content="INR" />
  <meta property="product:availability" content="${inStock ? 'in stock' : 'out of stock'}" />
  <meta property="product:brand" content="VibeCulture" />
  ${categoryName ? `<meta property="product:category" content="${escapeHtml(categoryName)}" />` : ''}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
</head>
<body>
  <main style="font-family:system-ui,sans-serif;max-width:480px;margin:40px auto;padding:0 16px">
    <img src="${image}" alt="${name}" width="1200" height="1200" style="width:100%;border-radius:12px;aspect-ratio:1;object-fit:cover" />
    <h1 style="font-size:1.4rem;margin:16px 0 8px">${name}</h1>
    <p style="color:#555;margin:0 0 8px">${description}</p>
    <p style="font-size:1.25rem;font-weight:700;margin:0 0 16px">₹${price}</p>
    <a href="${url}" style="display:inline-block;background:#111;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none">View on VibeCulture</a>
  </main>
</body>
</html>`

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400')
    res.end(html)
  } catch (err) {
    console.error(err)
    res.statusCode = 500
    res.end('Error generating preview')
  }
}
