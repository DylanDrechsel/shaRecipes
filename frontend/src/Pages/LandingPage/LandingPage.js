import React from 'react';
import './landing-page.css'
import PictureRow from './components/PictureRow';
import SignUpButton from './components/SignUpButton';

const LandingPage = () => {
    return (
        <div className='lp-main-div'>
            <h1 className='lp-title'> <b> shaRecipes </b> </h1>
            <PictureRow />
            <SignUpButton />
        </div>
    );
};

export default LandingPage;