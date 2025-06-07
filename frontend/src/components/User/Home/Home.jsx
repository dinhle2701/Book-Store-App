import React from 'react'
import BookList from '../BookList/BookList'
import HeroSection from '../HeroSection/HeroSection'

const Home = () => {
    return (
        <div className='home'>
            <HeroSection/>
            <BookList />
        </div>
    )
}

export default Home
