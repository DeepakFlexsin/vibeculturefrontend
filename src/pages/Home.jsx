import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import CategorySlider from '../components/CategorySlider'
import FlashSale from '../components/FlashSale'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import { ReviewTicker } from '../components/SocialProof'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>VibeCulture | Premium T-Shirts, Gym Tank Tops & Jeans for Men</title>
        <meta name="description" content="Shop premium men's T-shirts, gym tank tops and jeans at VibeCulture. 240 GSM fabric, superior fit and style. Fast delivery across India." />
        <link rel="canonical" href="https://www.vibeculture.in/" />
      </Helmet>
      <Hero />
      <CategorySlider />
      <FlashSale />
      <LatestCollection />
      <BestSeller />
      <ReviewTicker />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
