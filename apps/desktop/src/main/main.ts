import {app, windowManager} from '@nexts-stack/desktop';
import dns from 'dns';

/**
 * Create the app window and connect the tasks, etc... to it.
 * @returns The window.
 */
function constructMainWindow() {
	const mainWindow = windowManager.create({});
	const networkChannel = mainWindow.channel('network');

	networkChannel.registerTask<{}, boolean>('isConnected', () => {
		return new Promise((resolve, reject) => {
			dns.lookup('skylix.net', (err) => {
				if (err) {
					reject(err);
					console.log("NO INTERNET")
				} else {
					resolve(true);
					console.log("INTERNET")
				}
			});
		});
	});

	mainWindow.on('ready', () => {
		console.log('Skylix is ready');
	});

	return mainWindow;
}

app.events.on('ready', constructMainWindow);
