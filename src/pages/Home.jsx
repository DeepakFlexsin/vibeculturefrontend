import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import CategorySlider from '../components/CategorySlider'
import FlashSale from '../components/FlashSale'
import LatestCollection from '../components/LatestCollection'
import StyleQuiz from '../components/StyleQuiz'
import BestSeller from '../components/BestSeller'
import SpinWheel from '../components/SpinWheel'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Krivante | Premium Kitchen Utensils, Dry Fruits & Spices</title>
        <meta name="description" content="Shop premium kitchen utensils, pure dry fruits, dates, nuts & hand-picked spices at Krivante. Quality products, great prices, fast delivery across India." />
        <link rel="canonical" href="https://www.krivante.store/" />
      </Helmet>
      <Hero />
      <CategorySlider />
      <FlashSale />
      <LatestCollection/>
      <StyleQuiz />
      <BestSeller/>
      <SpinWheel />
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
