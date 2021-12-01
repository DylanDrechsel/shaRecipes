import { atom } from 'recoil';

export const websiteState = atom({
	key: 'website',
	default: 'landing',
});