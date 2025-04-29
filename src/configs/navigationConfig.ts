import i18n from '@i18n';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18n.addResourceBundle('en', 'navigation', en);
i18n.addResourceBundle('tr', 'navigation', tr);
i18n.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'example-component',
		title: 'Example',
		translate: 'EXAMPLE',
		type: 'item',
		icon: 'heroicons-outline:star',
		url: 'example'
	},
	{
		id: 'admin-dashboard',
		title: '회비 대시보드',
		type: 'item',
		icon: 'heroicons-outline:currency-dollar',
		url: '/admin/dashboard',
	},
	{
		id: 'admin-members',
		title: '회원 관리',
		type: 'item',
		icon: 'heroicons-outline:currency-dollar',
		url: '/admin/members',
	},
];

export default navigationConfig;
