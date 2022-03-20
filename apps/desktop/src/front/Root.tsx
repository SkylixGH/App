import TitleBarLightIcon from '../../resources/icons/TitleBarLight-540x540.svg';
import TitleBarDarkIcon from '../../resources/icons/TitleBarDark-540x540.svg';
import React, {useEffect} from 'react';
import {
	NavigationView,
	RouterView,
	useAppURL,
	useChannel,
	App,
	useRouter,
	useThemeType, useAppWindow
} from "@nexts-stack/desktop-uix";
import Home from "./pages/Home";
import AppInfo from "./pages/AppInfo";

/**
 * The root app component.
 * @returns The app.
 */
export default function Root() {
	const url = useAppURL();
	const router = useRouter(url);
	const themeType = useThemeType();
	const networkChannel = useChannel('network');
	const [appReady, setAppReady] = React.useState(false);
	const app = useAppWindow();

	useEffect(() => {
		(async () => {
			if (app.isDesktop) {
				try {
					const isConnected = await networkChannel.executeTask<{}, boolean>('isConnected', {});
					setAppReady(true)
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
		router.addRoute('/', <Home />)
		router.addRoute('/appInfo', <AppInfo />)

		return () => {
			router.removeRoute('/');
			router.removeRoute('/appInfo');
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
