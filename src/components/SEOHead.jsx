import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEOHead = ({ 
  title = "VibeCulture | Premium T-Shirts, Gym Tank Tops & Jeans for Men",
  description = "Shop premium quality men's T-shirts, gym tank tops, and jeans at VibeCulture. 240 GSM fabric, superior fit, fast delivery across India.",
  keywords = "men t-shirts, gym tank tops, premium jeans, men clothing, vibeculture, workout wear, casual wear India",
  image = "https://www.vibeculture.in/og-image.jpg",
  url = "https://www.vibeculture.in",
  type = "website",
  structuredData = null
}) => {
  
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "VibeCulture",
    "description": description,
    "url": url,
    "logo": "https://www.vibeculture.in/logo.png",
    "image": image,
    "telephone": "+91-1294044211",
    "email": "support@vibeculture.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Faridabad, Haryana",
      "addressLocality": "Faridabad",
      "addressRegion": "Haryana",
      "postalCode": "121001",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$-$$$",
    "paymentAccepted": ["Credit Card", "UPI", "Razorpay"],
    "currenciesAccepted": "INR"
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="VibeCulture" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="VibeCulture" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#111111" />
      <meta name="msapplication-TileColor" content="#111111" />
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