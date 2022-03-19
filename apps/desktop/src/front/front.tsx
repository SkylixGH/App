import React from 'react';
import ReactDOM from 'react-dom';
import RootApp from "./App";
import {App, themePacks, Theme} from '@nexts-stack/desktop-uix';
import './global.css';

const theme = new Theme(themePacks.darkTheme);
theme.load();

ReactDOM.render(
	<React.StrictMode>
		<App appReady={true}>
			<RootApp/>
		</App>
	</React.StrictMode>,
  	document.getElementById('app')
);
