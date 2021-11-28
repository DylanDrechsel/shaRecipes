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
		comments: [Comments]
		likes: [Likes]
		chatrooms: [Chatrooms]
		messages: [Messages]
		favoriteRecipes: [FavoriteRecipes]
		followedUsers: [FollowedUsers]
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
		comments: [Comments]
		favoriteRecipes: [FavoriteRecipes] 
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

	type Comments {
		id: ID
		createdAt: Date
		content: String
		author: User
		recipe: Recipes
	}

	type Chatrooms {
  		id: ID
		createdAt: Date
  		guests: [String]
		author: User
		chatroom: Chatrooms
		messages: [Messages]
	}
	
	type Messages {
		id: ID
		createdAt: Date
		content: String
		author: User
		chatroom: Chatrooms
	}

	type FavoriteRecipes {
		id: ID
		createdAt: Date
		author: User
		recipes: [Recipes]
	}

	type FollowedUsers {
		id: ID
		createdAt: Date
		followedUsername: String
		followedUserId:	Int
		author: User
	}


	# ---------------------------------------- END SCHEMAS ----------------------------------------

	type Query {
		# USER QUERIES
		getUser: User

		# RECIPES QUERIES
		allRecipes(published: Boolean): [Recipes]
		recipeById(recipeId: Int): Recipes

		# CHATROOM QUERIES
		getChatroomWithMessages(chatroomId: Int): Chatrooms
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

		# COMMENT MUTATIONS
		createComment(recipeId: Int, content: String): Comments
		updateComment(commentId: Int, content: String): Comments
		deleteComment(commentId: Int): Comments

		# PROFILE MUTATIONS
		createProfile(profileInput: ProfileInput): Profile
		updateProfile(profileId: Int, profileInput: ProfileInput): Profile
		deleteProfile(profileId: Int): Profile

		# CHATROOM MUTATIONS
		createChatroom(guests: [String]): Chatrooms
		updateChatroom(chatroomId: Int, guests: [String]): Chatrooms
		deleteChatroom(chatroomId: Int): Chatrooms

		# MESSAGES MUTATIONS
		createMessage(chatroomId: Int, content: String): Messages
		deleteMessage(messageId: Int): Messages

		# FAVORITERECIPES MUTATIONS
		createFavoriteRecipe(recipeId: Int): FavoriteRecipes
		deleteFavoriteRecipe(favoriteRecipeId: Int): FavoriteRecipes

		# FOLLOWEDUSERS MUTATION
		createFollowedUser(followedUserId: Int, followedUsername: String): FollowedUsers
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