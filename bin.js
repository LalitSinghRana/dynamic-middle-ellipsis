#!/usr/bin/env node
const { exec } = require('node:child_process');
const readline = require('node:readline')
const download = require('download');
const decompress = require('decompress');

const packageName = '@lalit-rana/middle-ellipsis-react';

const getFiles = async () => {
    console.log("Downloading package from npm.js...");

    // Fetch the package data from the npm registry API
    const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`);
    const data = await response.json();

    // Get the tarball URL from the package data
    const tarballUrl = data.dist.tarball;
    console.log(`Downloading ${tarballUrl}...`);
    const compressedData = await download(tarballUrl);
    
    // Extract only the files under the src/ folder
    console.log(`Extracting ${packageName}...`);
    await decompress(compressedData, './MiddleEllipsis', {
        filter: file => file.path.startsWith('package/src/'),
        map: file => {
            // Remove 'package/src/' from the start of the file path
            file.path = file.path.replace('package/src/', '');
            return file;
        }
    });
    console.log(`${packageName} downloaded successfully!`);
};

const std =readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`
Starting: ${packageName}
`);

std.question(`You are currently in ${process.cwd()}. 
Do you want to download here? (y/n) `, (answer) => {
    if (answer.toLowerCase() !== 'y') {
        console.log('Aborted by the user.');
        std.close();
        process.exit(1);
    }

    // Continue with the rest of your script...
    exec('mkdir MiddleEllipsis');

    try {
        getFiles();
    } catch (error) {
        console.error(`Error: ${error}`);
    }

    std.close();
});
