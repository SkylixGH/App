import React from 'react'
import {AppProps} from "next/app";
import '../styles/globals.css'

function MyApp(props: AppProps) {
	const {Component, pageProps} = props

	// if (typeof window !== 'undefined') {
	// 	document.body.style.background = 'var(--layerSolid1)';
	// }

	return <Component {...pageProps} />
}

export default MyApp
