import React, {useEffect, useState} from 'react';
import {
	NavigationView,
	RouterView,
	useAppURL,
	useChannel,
	App,
	useRouter,
	useThemeType,
	useAppWindow
} from "@nexts-stack/desktop-uix";
import Home from "./pages/Home";
import AppInfo from "./pages/AppInfo";
import Login from "./pages/Login";
import global from "./global";

/**
 * The root app component.
 * @returns The app.
 */
export default function Root() {
	const url = useAppURL();
	const router = useRouter(url);
	const themeType = useThemeType();
	const networkChannel = useChannel('network');
	const [appReady, setAppReady] = useState(false);
	const [routerDone, setRouterDone] = useState(false);
	const app = useAppWindow();

	global.router = router;

	useEffect(() => {
		(async () => {
			if (app.isDesktop) {
				try {
					const isConnected = await networkChannel.executeTask<{}, boolean>('isConnected', {});

					if (isConnected) {
						setAppReady(true)
					} else {
						alert('You are not connected to the internet. Please connect to the internet and try again.');
					}
				} catch {
					alert('You are not connected to the internet. Please connect to the internet and try again.');
				}
			} else if (window.navigator.onLine) {
				setAppReady(true);
			} else {
				alert('You are not connected to the internet. Please connect to the internet and try again.');
			}
		})();

		const connectListener = () => {
			setAppReady(true);
		};

		const disconnectListener = () => {
			setAppReady(false);
		};

		window.addEventListener('online', connectListener);
		window.addEventListener('offline', disconnectListener);

		return () => {
			window.removeEventListener('online', connectListener);
			window.removeEventListener('offline', disconnectListener);
		};
	}, []);

	useEffect(() => {
		if (routerDone) return;

		router.addRoute('/', <Home />)
		router.addRoute('/appInfo', <AppInfo />)
		router.addRoute('/login', <Login />);

		setRouterDone(true);

		return () => {
			router.removeRoute('/');
			router.removeRoute('/appInfo');
			router.removeRoute('/login');
		}
	}, [])

	return (
		<App appReady={appReady}>
			<NavigationView sideRail={[
				{
					icon: {
						src: 'fluent:home-16-regular',
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
		</App>
	)
}
