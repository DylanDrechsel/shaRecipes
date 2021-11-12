import db from "../../utils/generatePrisma.js";
import checkAuth from '../../utils/check-auth.js';
import { handleDocumentOwnership } from '../../utils/handleDocumentOwnership.js'
import { UserInputError } from "apollo-server-errors";

export default {
	Query: {
		/**
		 * @param {} _
		 * @param {Take: int, skip: int, myCursor: int} param1
		 * @returns
		 */
		allRecipes: async (_) => {
			try {
				return await db.recipes.findMany({
					include: {
						author: true,
						likes: {
                            include: {
                                author: true
                            }
                        },
						comments: {
							include: {
								author: true,
							},
						},
					},
				});
			} catch (error) {
				throw new Error(error);
			}
		},

        allPublishedRecipes: async (_) => {
            try {
                return await db.recipes.findMany({
                    where: {
                        published: true
                    },
                    include: {
                        author: true,
                        likes: true
                    }
                })
            } catch (error) {
                throw new Error(error);
            }
        },

        recipeById: async (_, { recipeId }) => {
            try {
                return await db.recipes.findUnique({
                    where: { id: recipeId },
                    include: { author: true, comments: { select: { author: true } } },
                })
            } catch (error) {
                throw new Error(error)
            }
        },

        allUsersPublishedRecipes: async (_, {}, context) => {
            const user = await checkAuth(context)

            try {
                return await db.recipes.findMany({
                    where: { authorId: user.id, published: true },
                })
            } catch (error) {
                throw new Error(error)
            }
        },

        allUsersUnpublishedRecipes: async (_, {}, context) => {
            const user = await checkAuth(context)

            try {
                return await db.recipes.findMany({ 
                    where: { authorId: user.id, published: false }
                })
            } catch (error) {
                throw new Error(error)
            }
        }
	},

    Mutation: {
        createRecipe: async (_, { recipeInput: { title, category, directions, content, ingredients, imageUrl, imageKey }}, context) => {
            const user = await checkAuth(context)

            try { 
                return await db.recipes.create({
                    data: {
                        title: title,
                        category: category,
                        directions: directions,
                        content: content,
                        ingredients: ingredients,
                        imageUrl: imageUrl,
                        imageKey: imageKey,
                        author: {
                            connect: {
                                id: user.id
                            }
                        }
                    }
                })
            }   catch (error) {
                throw new Error(error)
            } 
        },

        updateRecipe: async (_, {recipeId, updateRecipe: { title, category, directions, content, ingredients }}, context) => {
            const user = await checkAuth(context) 
            const verified = await handleDocumentOwnership(user.id, recipeId) 
 
            try {
                if (verified === true) {
                    return await db.recipes.update({
                        where: {
                            id: recipeId,
                        },
                        data: {
                            title: title,
                            category: category,
                            directions: directions,
                            content: content,
                            ingredients: ingredients
                        }
                    })
                } else {
                    throw new Error(`userId: ${user.id} --- does not equal document owner`)
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        
        deleteRecipe: async (_, { recipeId }, context) => {
            const user = await checkAuth(context);
			const verified = await handleDocumentOwnership(user.id, recipeId);

            try {
                if (verified === true) {
                    return await db.recipes.delete({
                        where: {
                            id: recipeId
                        }
                    }) 
                } else {
                    throw new Error(`userId: ${user.id} --- does not equal document owner`)
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};