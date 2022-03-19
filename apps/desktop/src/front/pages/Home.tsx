import React from 'react';
import TitleBarLightIcon from "../../../resources/icons/TitleBarLight-540x540.svg";
import TitleBarDarkIcon from "../../../resources/icons/TitleBarDark-540x540.svg";
import {useThemeType} from "@nexts-stack/desktop-uix";

/**
 * The app home page.
 * @returns The react home component.
 */
export default function Home() {
	const themeType = useThemeType();

	return (
		<>
			<div style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<img style={{
					maxWidth: '200px'
				}} src={themeType === 'light' ? TitleBarLightIcon : TitleBarDarkIcon} alt={''} />
			</div>

			<h1 style={{
				width: '100%',
				textAlign: 'center',
			}}>Skylix (Under Construction)</h1>
		</>
	)
}

