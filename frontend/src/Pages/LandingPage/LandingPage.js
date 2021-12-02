import React from 'react';
import './landing-page.css'
import PictureRow from './components/PictureRow';
import SignUpButton from './components/SignUpButton';
import SignInButton from './components/SignInButton';

const LandingPage = () => {
    return (
        <div className='lp-main-div'>
            <h1 className='lp-title'> <b> shaRecipes </b> </h1>
            <PictureRow />
            <SignInButton />
            <SignUpButton />
        </div>
    );
};

export default LandingPage;