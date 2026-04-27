import en from '../locales/en.json';
import zh from '../locales/zh.json';

const localeMap = { en, zh };

export function t(key) {
	const lang = window.localStorage.getItem('language') || 'en';
	const locale = localeMap[lang] || localeMap[lang.split('-')[0]] || localeMap['en'];
	return locale[key] || en[key] || key;
}
