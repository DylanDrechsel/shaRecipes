import usersResolvers from './users.js';
import recipeResolvers from './recipes.js'
import likesResolvers from './likes.js'
import commentsResolvers from './comments.js'
import profileResolvers from './profile.js';
import chatroomResolvers from './chatroom.js'
import GraphQLJSON from 'graphql-type-json';

export default {
	Query: {
		...usersResolvers.Query,
		...recipeResolvers.Query,
		...likesResolvers.Query,
		...commentsResolvers.Query,
		...profileResolvers.Query,
		...chatroomResolvers.Query
	},
	Mutation: {
		...usersResolvers.Mutation,
		...recipeResolvers.Mutation,
		...likesResolvers.Mutation,
		...commentsResolvers.Mutation,
		...profileResolvers.Mutation,
		...chatroomResolvers.Mutation
	},
	JSON: GraphQLJSON,
};