import {app, windowManager} from '@nexts-stack/desktop';

function constructMainWindow() {
	const mainWindow = windowManager.create({});
}

app.events.on('ready', constructMainWindow);
