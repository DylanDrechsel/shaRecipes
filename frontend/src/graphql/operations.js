import { gql } from '@apollo/client';

/* ------------------------------ USERS ------------------------------ */

const SIGNUP = gql`
	mutation Mutation($signupUserSignupInput: SignupInput) {
		signupUser(signupInput: $signupUserSignupInput) {
			id
			firstname
			lastname
			username
			email
			token
		}
	}
`;

const LOGIN = gql`
	mutation Mutation($signinUserEmail: String!, $signinUserPassword: String!) {
		signinUser(email: $signinUserEmail, password: $signinUserPassword) {
			id
			token
			firstname
			lastname
			username
			email
		}
	}
`;

export { SIGNUP, LOGIN }