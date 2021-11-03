import { gql } from 'apollo-server';
import GraphQLJSON from 'graphql-type-json';

const typeDefs = gql`
	scalar Date
	scalar JSON

	type User {
		id: ID
		firstname: String
		lastname: String
		username: String
		email: String
		token: String
		password: String
		recipes: [Recipes]
		profile: Profile
		comments: [Comment]
		likes: [Likes]
	}

	type Recipes {
		id: ID
		createdAt: Date
		updatedAt: Date
		title: String
		totalLikeValue: Int
		content: String
		directions: JSON
		ingredients: JSON
		published: Boolean
		category: String
		author: User
		likes: [Likes]
		comments: [Comment] 
	}

	type Likes {
		id: ID
		createdAt: Date
		updatedAt: Date
		like: Boolean
		author: User
		recipe: Recipes
	}

	type Profile {
		id: ID
		created: Boolean
		bio: String
		imageUrl: String
		imageKey: String
		author: User
	}

	type Comment {
		id: ID
		createdAt: Date
		content: String
		author: User
		recipe: Recipes
	}

	type Query {
		# USER QUERIES
		getUser: User
		allUsersPublishedRecipes: [Recipes]
		allUsersUnpublishedRecipes: [Recipes]
	}
	type Mutation {
		# USER MUTATIONS
		signupUser(signupInput: SignupInput): User!
		signinUser(email: String!, password: String!): User!
		updateUser(signupInput: SignupInput): User!
		deleteUser: User!
	}

	input SignupInput {
		email: String!
		username: String!
		firstname: String
		lastname: String
		password: String!
	}
`;

  export default typeDefs;