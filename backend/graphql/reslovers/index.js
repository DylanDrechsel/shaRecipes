import usersResolvers from './users.js';
import GraphQLJSON from 'graphql-type-json';

export default {
	Query: {
		...usersResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
	},
	JSON: GraphQLJSON,
};