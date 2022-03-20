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
	useThemeType
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
	const isElectron = typeof window !== 'undefined' && window.process && window.process.type === 'renderer'

	useEffect(() => {
		(async () => {
			if (isElectron) {
				try {
					const isConnected = await networkChannel.executeTask<{}, boolean>('isConnected', {});
					setAppReady(true)
				} catch {
					alert('You are not connected to the internet. Please connect to the internet and try again.');

				}
			} else {
				setAppReady(true);
			}
		})();
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
		</App>
	)
}
