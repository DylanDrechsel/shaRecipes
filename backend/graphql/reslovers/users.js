import bcrypt from 'bcryptjs';
import hashPassword from '../../utils/passwordHashing.js';
import generateToken from '../../utils/generateToken.js';
import checkAuth from '../../utils/check-auth.js';
import { UserInputError } from 'apollo-server-errors';
import {
	validateRegisterInput,
	validateLoginInput,
} from '../../utils/validators.js';
import db from '../../utils/generatePrisma.js';

export default {
	Query: {
		getUser: async (_, {}, context) => {
			const user = await checkAuth(context)

			try {
				return await db.user.findUnique({
					where: {
						id: user.id
					},
					include: {
						recipes: true,
						profile: true,
						comments: true,
						likes: true,
						chatrooms: true,
						messages: {
							include: {
								chatroom: true
							}
						},
						favoriteRecipes: {
							include: {
								recipes: true
							}
						},
						followedUsers: true
					}
				})
			} catch (error) {
				throw new Error(error)
			}
		},

		getUserById: async (_, { userId }, context) => {
			const user = await checkAuth(context)

			try {
				return await db.user.findUnique({
					where: {
						id: userId
					},
					include: {
						recipes: true,
						profile: true,
						comments: true,
						likes: true,
						chatrooms: true,
						messages: {
							include: {
								chatroom: true
							}
						},
						favoriteRecipes: {
							include: {
								recipes: true
							}
						},
						followedUsers: true
					}
				})
			} catch (error) {
				throw new Error(error)
			}
		}
	},

	Mutation: {
		/**
		 *
		 * @param {_} parent
		 * @param { email, password, username } param1
		 * @returns Signed up user in DB
		 */

		signupUser: async (_, { signupInput: { email, password, username } }) => {
			try {
				const { valid, errors } = validateRegisterInput(
					username,
					email,
					password
				);

				if (!valid) {
					throw new userInputError('Errors', { errors });
				}

				const user = await db.user.findUnique({
					where: {
						email,
					},
				});

				if (user) {
					throw new UserInputError('email is taken', {
						errors: {
							email: 'Email is already taken',
						},
					});
				}

				const checkUsername = await db.user.findUnique({
					where: {
						username
					},
				});

				if (checkUsername) {
					throw new UserInputError('username is taken', {
						errors: {
							email: 'Username is already taken',
						},
					});
				}

				password = await hashPassword(password)

				return db.user.create({
					data: {
						email: email,
						username: username,
						password: password,
					},
				});
			} catch (error) {
				throw new Error(error);
			}
		},

		signinUser: async (_, { email, password }, { req }) => {
			const { errors, valid } = validateLoginInput(email, password);

			if (!valid) {
				throw new userInputError('Errors', { errors });
			}

			const foundUser = await db.user.findUnique({
				where: {
					email,
				},
			});

			if (!foundUser) {
				errors.general = 'User not found';
				throw new UserInputError('Incorrect Email', { errors });
			}

			const isValid = await bcrypt.compare(password, foundUser.password);

			if (!isValid) {
				errors.general = 'Incorrect Password';
				throw new UserInputError('Incorrect Password', { errors });
			}

			const token = await generateToken(foundUser.id);

			req.session = { token: `Bearer ${token}` };

			return { ...foundUser, token: token };
		},

		/* ADD PASSWORD HASHING FOR WHEN A USER UPDATES THEIR PASSWORD ALSO */
		updateUser: async (_, { updateUser: { email, username, firstname, lastname, password } }, context) => {
			const user = await checkAuth(context);
			
			if (password !== undefined || password !== null) {
				password = await hashPassword(password)
			}
			
            try {
				if (!user) {
					errors.general = 'User not found';
					throw new UserInputError('User not found', { errors });
				}

				const newUser = await db.user.update({
					where: { id: user.id },
					data: {
						email: email,
						username: username,
						firstname: firstname,
						lastname: lastname,
						password: password
					}
				});

				return newUser;

			} catch (error) {
				throw new Error(error);
			}
		},

		/* DOESNT WORK ---- GOING TO FIX ONCE ALL OTHER ROUTES ARE DONE */
		/* NEED TO ADD --- CHATROOMS --- MESSAGES --- */
		deleteUser: async (_, {}, context) => {
			const user = await checkAuth(context);
			const userInformation = await db.user.findUnique({
				where: {
					id: user.id,
				},
				include: {
					recipes: true,
					profile: true,
					comments: true,
					likes: true
				},
			});

			await console.log(userInformation)

			try {
				if (userInformation.likes) {
					await db.likes.deleteMany({
						where: {
							authorId: user.id
						}
					})
				}

				if (userInformation.comments.id) {
					await db.comment.deleteMany({
						where: {
							authorId: user.id
						}
					})
				}

				if (userInformation.profile !== null) {
					await db.profile.delete({
						where: {
							authorId: user.id
						}
					})
				}
				
				if (userInformation.recipes) {
					await db.recipes.deleteMany({
						where: {
							authorId: user.id,
						}
					});
				}
				
				/* Add delete all users likes from the database. Deleting them here wont change the TotalLikeValue on the recope schema */
				const deletedUser = await db.user.delete({
					where: {
						id: user.id,
					},
				})

				return deletedUser
			} catch (error) {
				console.log(error)
				throw new Error(error);
			}
		}
	},
};