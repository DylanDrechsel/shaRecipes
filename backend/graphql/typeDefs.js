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

	# ---------------------------------------- END SCHEMAS ----------------------------------------

	type Query {
		# USER QUERIES
		getUser: User
		allUsersPublishedRecipes: [Recipes]
		allUsersUnpublishedRecipes: [Recipes]

		# RECIPES QUERIES
		allRecipes: [Recipes]
		allPublishedRecipes: [Recipes]
		recipeById(recipeId: Int): Recipes

		# PROFILE QUERIES
		getUsersProfile: Profile
	}

	type Mutation {
		# USER MUTATIONS
		signupUser(signupInput: SignupInput): User!
		signinUser(email: String!, password: String!): User!
		updateUser(updateUser: UpdateUser): User!
		deleteUser: User!

		# RECIPES MUTATIONS
		createRecipe(recipeInput: RecipeInput): Recipes
		updateRecipe(recipeInput: RecipeInput, recipeId: Int): Recipes
		deleteRecipe(recipeId: Int): Recipes

		# LIKES MUTATIONS
		createLike(recipeId: Int): Likes
		updateLike(likeId: Int): Likes

		# COMMENT MUTATION
		createComment(recipeId: Int, content: String): Comment
		updateComment(commentId: Int, content: String): Comment
		deleteComment(commentId: Int): Comment

		# PROFILE MUTATION
		createProfile(profileInput: ProfileInput): Profile
		
	}

	# ---------------------------------------- END QUERY & MUTATIONS ----------------------------------------

	input SignupInput {
		email: String!
		username: String!
		firstname: String
		lastname: String
		password: String!
	}

	input UpdateUser {
		email: String
		username: String
		firstname: String
		lastname: String
	}

	input RecipeInput {
		title: String!
		category: String!
		content: String
		directions: JSON!
		ingredients: JSON!
		imageUrl: String
		imageKey: String
	}

	input UpdateRecipe {
		title: String
		category: String
		content: String
		directions: JSON
		ingredients: JSON
		imageUrl: String
		imageKey: String
	}

	input ProfileInput {
		created: Boolean
		bio: String
		imageUrl: String
		imageKey: String
	}
`;

  export default typeDefs;