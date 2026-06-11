import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEOHead = ({ 
  title = "Krivante | Shop Fashion, Accessories & More",
  description = "Discover curated collections of fashion, accessories, lifestyle products & more at Krivante. Unique finds, great prices, fast delivery.",
  keywords = "online shopping, fashion, accessories, lifestyle, trending products, krivante, clothing store",
  image = "https://www.krivante.store/og-image.jpg",
  url = "https://www.krivante.store",
  type = "website",
  structuredData = null
}) => {
  
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": "Krivante",
    "description": description,
    "url": url,
    "logo": "https://www.krivante.store/logo.png",
    "image": image,
    "telephone": "+91-1294044211",
    "email": "support@krivante.store",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Faridabad, Haryana",
      "addressLocality": "Faridabad",
      "addressRegion": "Haryana",
      "postalCode": "121001",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$-$$$$",
    "paymentAccepted": ["Credit Card", "PayPal", "Apple Pay", "Google Pay"],
    "currenciesAccepted": "USD"
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Krivante" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Krivante" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#d4af37" />
      <meta name="msapplication-TileColor" content="#d4af37" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  )
}

export default SEOHead