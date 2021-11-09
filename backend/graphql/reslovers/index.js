import usersResolvers from './users.js';
import recipeResolvers from './recipes.js'
import GraphQLJSON from 'graphql-type-json';

export default {
	Query: {
		...usersResolvers.Query,
		...recipeResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...recipeResolvers.Mutation,
	},
	JSON: GraphQLJSON,
};