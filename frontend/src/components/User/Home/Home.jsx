/* eslint-disable no-unused-vars */
import React from 'react'
import BookList from '../BookList/BookList'
import HeroSection from '../HeroSection/HeroSection'
import Recommend from '../Recommend/Recommend'

const Home = () => {
    return (
        <div className='home'>
            <HeroSection/>
            <Recommend/>
            {/* <BookList /> */}
        </div>
    )
}

export default Home
