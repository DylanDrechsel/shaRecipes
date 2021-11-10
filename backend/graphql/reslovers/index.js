import usersResolvers from './users.js';
import recipeResolvers from './recipes.js'
import likesResolvers from './likes.js'
import GraphQLJSON from 'graphql-type-json';

export default {
	Query: {
		...usersResolvers.Query,
		...recipeResolvers.Query,
		...likesResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...recipeResolvers.Mutation,
		...likesResolvers.Mutation,
	},
	JSON: GraphQLJSON,
};