import db from "../../utils/generatePrisma.js";
import checkAuth from '../../utils/check-auth.js';
import { handleRecipeOwnership } from '../../utils/handleDocumentOwnership.js'

export default {
	Query: {
		allRecipes: async (_, { published }, context) => {
            const user = await checkAuth(context)

			try {
				return await db.recipes.findMany({
                    where: {
                        published: published
                    },
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

        recipeById: async (_, { recipeId }) => {
            const user = await checkAuth(context)

            try {
                return await db.recipes.findUnique({
                    where: { id: recipeId },
                    include: { author: true, comments: { select: { author: true } } },
                })
            } catch (error) {
                throw new Error(error)
            }
        },
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
            const verified = await handleRecipeOwnership(user.id, recipeId) 
 
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
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        
        deleteRecipe: async (_, { recipeId }, context) => {
            const user = await checkAuth(context);
			const verified = await handleRecipeOwnership(user.id, recipeId);

            try {
                if (verified === true) {
                    return await db.recipes.delete({
                        where: {
                            id: recipeId
                        }
                    }) 
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};