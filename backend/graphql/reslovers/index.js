import usersResolvers from './users.js';
import recipeResolvers from './recipes.js'
import likesResolvers from './likes.js'
import commentsResolvers from './comments.js'
import profileResolvers from './profile.js';
import chatroomsResolvers from './chatrooms.js'
import messagesResolvers from './messages.js'
import favoriteRecipes from './favoriteRecipes.js';
import followedUsers from './followedUsers.js';
import GraphQLJSON from 'graphql-type-json';

export default {
	Query: {
		...usersResolvers.Query,
		...recipeResolvers.Query,
		...likesResolvers.Query,
		...commentsResolvers.Query,
		...profileResolvers.Query,
		...chatroomsResolvers.Query,
		...messagesResolvers.Query,
		...favoriteRecipes.Query,
		...followedUsers.Query
	},
	Mutation: {
		...usersResolvers.Mutation,
		...recipeResolvers.Mutation,
		...likesResolvers.Mutation,
		...commentsResolvers.Mutation,
		...profileResolvers.Mutation,
		...chatroomsResolvers.Mutation,
		...messagesResolvers.Mutation,
		...favoriteRecipes.Mutation,
		...followedUsers.Mutation
	},
	JSON: GraphQLJSON,
};