import { AuthenticationError } from 'apollo-server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const checkAuth = (context) => {
	// console.log(context.req.headers.authorization)
	// const authHeader =
	// 	context.req.session.token || context.req.headers.authorization;
	const authHeader = context.req.headers.authorization
	
	if (authHeader) {
		// const token = authHeader.split(' ')[1];
		const token = authHeader;
		if (token) {
			try {
				const user = jwt.verify(token, process.env.JWT_SECRET);
				return user;
			} catch (err) {
				throw new AuthenticationError('Invalid token');
			}
		}
		throw new Error('Invalid Header, check header contents');
	}
	throw new Error('No Auth header found');
};

export default checkAuth;