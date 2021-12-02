import React, { useState } from 'react';
import SignUpModal from './sign-up-components/SignUpModal';

const SignUpButton = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return (
        <div className='lp-sub-main-div'>
            <a href="#" class="animated-button1" onClick={handleShow}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            Sign Up
            </a>
            <SignUpModal show={show} setShow={setShow}/>
        </div>
    );
};

export default SignUpButton;