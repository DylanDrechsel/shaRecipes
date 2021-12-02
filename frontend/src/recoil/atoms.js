import { atom } from 'recoil';

export const userState = atom({
	key: 'userState',
	default: false,
});

export const websiteState = atom({
	key: 'website',
	default: 'landing',
});