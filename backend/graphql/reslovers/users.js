import bcrypt from 'bcryptjs';
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

				const salt = await bcrypt.genSalt(10);
				const hash = await bcrypt.hash(password, salt);
				password = hash;

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

		updateUser: async (_, { firstname, lastname, email, username }, context) => {
			const user = checkAuth(context);
			
            try {
				if (!user) {
					errors.general = 'User not found';
					throw new UserInputError('User not found', { errors });
				}

				const newUser = await db.user.update({
					where: { id: user.id },
					data: {
						firstname: firstname,
						lastname: lastname,
						email: email,
						username: username,
					},
				});

				return newUser;

			} catch (error) {
				throw new Error(error);
			}
		},

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