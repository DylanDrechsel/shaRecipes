import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'

const SignUpModal = ({ show, setShow }) => {
    const handleClose = () => setShow(false);
    const [userData, setUserData] = useState({});

    const handleInput = (event) => {
		const input = { ...userData };
		input[event.target.id] = event.target.value;
		setUserData(input);
	};
    
    return (
    <>
        <Modal
            className='lp-sub-modal-div'
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
        <Modal.Header closeButton style={{ backgroundColor: 'black'}}>
          <Modal.Title ><h1 style={{ color: 'white' }}> Sign Up!</h1></Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{ backgroundColor: 'black', color: 'white' }}>
                    <Form>
						<Form.Group controlId='email' onChange={handleInput} className='lp-sub-form'>
							<Form.Control
								type='email'
								placeholder='Email'
								style={{
									textAlign: 'center',
									backgroundColor: 'white',
									border: '1px black',
									color: 'black',
								}}
							/>
						</Form.Group>

						<Form.Group controlId='username' onChange={handleInput} className='lp-sub-form'>
							<Form.Control
								type='username'
								placeholder='Username'
								style={{
									textAlign: 'center',
									backgroundColor: 'white',
									border: '1px black',
									color: 'black',
								}}
							/>
						</Form.Group>

						<Form.Group controlId='password' onChange={handleInput} className='lp-sub-form'>
							<Form.Control
								type='password'
								placeholder='Password'
								style={{
									textAlign: 'center',
									backgroundColor: 'white',
									border: '1px black',
									color: 'black',
								}}
							/>
						</Form.Group>

						<Form.Group
							controlId='confirmPassword'
                            className='lp-sub-form'
							onChange={handleInput}>
							<Form.Control
								type='password'
								placeholder='Confirm Password'
								style={{
									textAlign: 'center',
									backgroundColor: 'white',
									border: '1px black',
									color: 'black',
								}}
							/>
						</Form.Group>
					</Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'black'}}>
          <Button variant="outline-light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-light">Sign Up</Button>
        </Modal.Footer>
      </Modal>
    </>
    );
};

export default SignUpModal;