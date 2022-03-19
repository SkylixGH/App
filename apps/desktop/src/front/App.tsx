import TitleBarLightIcon from '../../resources/icons/TitleBarLight-540x540.svg';
import TitleBarDarkIcon from '../../resources/icons/TitleBarDark-540x540.svg';
import React, {useEffect} from 'react';
import {NavigationView, RouterView, useAppURL, useMenu, useRouter, useThemeType} from "@nexts-stack/desktop-uix";
import Home from "./pages/Home";
import AppInfo from "./pages/AppInfo";

/**
 * The root app component.
 * @returns The app.
 */
export default function App() {
	const url = useAppURL();
	const router = useRouter(url);
	const themeType = useThemeType();

	useEffect(() => {
		router.addRoute('/', <Home />)
		router.addRoute('/appInfo', <AppInfo />)

		return () => {
			router.removeRoute('/');
			router.removeRoute('/appInfo');
		}
	}, [])

	return (
		<NavigationView sideRail={[
			{
				icon: {
					src: themeType === 'light' ? TitleBarLightIcon : TitleBarDarkIcon,
					type: 'image'
				},
				active: '/',
				action: () => router.navigate('/'),
			},
			{
				icon: {
					src: 'fluent:info-16-regular'
				},
				active: '/appInfo',
				action: () => router.navigate('/appInfo'),
			}
		]} router={router}>
			<RouterView router={router} />
		</NavigationView>
	)
}
