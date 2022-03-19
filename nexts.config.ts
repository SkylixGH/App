import {defineConfig} from '@nexts-stack/cli-service';
import {readFileSync} from 'fs';
import path from "path";
import {fileURLToPath} from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// We used ../ because the config will execute from the ./.nexts/config/ folder
const pkg = JSON.parse(readFileSync(path.join(dirname, '../../', 'package.json'), 'utf8'));

export default defineConfig({
	version: '1.0.0-dev.1',
	author: 'SkylixGH',
	typescript: true,
	node: {
		minVersion: '17.0.0',
		maxVersion: process.versions.node,
	},
	apps: [
		{
			name: 'server',
			path: './apps/server',
			main: './src/main.ts',
			type: 'node',
			id: 'net.skylix.app.server',
			displayName: 'Skylix API Server',
			description: 'The centeral Skylix API server',
			dependencies: {
				'@nexts-stack/logger': pkg.devDependencies['@nexts-stack/cli-service'],
			}
		}
	]
})
