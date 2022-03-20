const fs = require('fs');
const path = require("path");

let buildMJS = fs.readFileSync(path.join(__dirname, "../node_modules/@nexts-stack/desktop-uix/build/module.mjs"), "utf8");
const importRegExp = /^import (.*?) from (\"|\')(.*?)(\"|\');/;
const importsMatches = buildMJS.replace(/\r\n/, '\n').split('\n').map((line) => importRegExp.exec(line)).filter((match) => match !== null);
const imports = [];
const iconifyImports = [];
const iconifyJSImports = [];

importsMatches.forEach(match => {
    imports.push({
        importName: match[1],
        importPath: match[3],
        importPathClone: match[3],
    });
});

imports.forEach((module) => {
    if (module.importPath.startsWith('@iconify-icons/') && !module.importPath.endsWith('.js')) {
        iconifyImports.push(module);
    }
});

iconifyImports.forEach((module) => {
    const newImport = {...module};
    newImport.importPath += '.js';

    iconifyJSImports.push(newImport);
});

iconifyJSImports.forEach((module) => {
    const newImport = `import ${module.importName} from "${module.importPath}";`;
    const importMatch = new RegExp(`${'^'}import ${module.importName} from "${module.importPathClone}";`, 'g');

    const buildResult = [];
    const buildLines = buildMJS.replace(/\r\n/, '\n').split('\n');

    console.log('<>', module.importPathClone, '->> ->> ->>', module.importPath);

    buildLines.forEach((line) => {
        buildResult.push(line.replace(importMatch, newImport));
    });

    buildMJS = buildResult.join('\n');
});

fs.writeFileSync(path.join(__dirname, '../node_modules/@nexts-stack/desktop-uix/build/module.mjs'), buildMJS);
