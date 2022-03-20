import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./Root";
import {themePacks, Theme} from '@nexts-stack/desktop-uix';
import './global.css';

const theme = new Theme(themePacks.darkTheme);
theme.load();

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
  	document.getElementById('app')
);
