import React from 'react';
import packageJSON from '../../../package.json';

/**
 * The application info page.
 * @returns The application info page component.
 */
export default function AppInfo() {
	return (
		<>
			<h1 style={{
				width: '100%',
				textAlign: 'center',
			}}>App Info</h1>

			<p>
				<strong>Version:</strong> {packageJSON.version}
			</p>
		</>
	);
}
