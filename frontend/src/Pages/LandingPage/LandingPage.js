import React from 'react';
import './landing-page.css'
import PictureRow from './components/PictureRow';

const LandingPage = () => {
    return (
        <div className='lp-main-div'>
            <h1 className='lp-title'> <b> shaRecipes </b> </h1>
            <PictureRow />
        </div>
    );
};

export default LandingPage;