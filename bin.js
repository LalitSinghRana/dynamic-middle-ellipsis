#!/usr/bin/env node

import Chalk from 'chalk';
import decompress from 'decompress';
import download from 'download';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

const packageName = '@lalit-rana/middle-ellipsis-react';

const getFiles = async (type) => {
    const spinner = createSpinner('Downloading...:   ');

    try {
        spinner.start();
        // Fetch the package data from the npm registry API
        const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`);
        const data = await response.json();
        console.log('NPM package registry data fetched');

        // Get the tarball URL from the package data
        const tarballUrl = data.dist.tarball;
        const compressedData = await download(tarballUrl);
        console.log('Tarball file downloaded');
        
        // Extract only the files under the src/ folder
        await decompress(compressedData, './MiddleEllipsis', {
            filter: file => file.path.startsWith(`package/dist/${type}`),
            map: file => {
                // Remove 'package/src/' from the start of the file path
                file.path = file.path.replace(`package/dist/${type}`, '');
                return file;
            }
        });
        console.log('Files extracted successfully!');

        spinner.success({
            text: Chalk.green(`Download Successful: Middle Ellipsis ${type}`),
        });
    } catch (error) {
        spinner.error({
            text: Chalk.red(`Download Fail: ${error.message}`),
        });
    }
};

async function inquireUser() {
    const directoryInquirer = await inquirer.prompt([
        {
            type: 'list',
            name: 'directory',
            message: `Create "MiddleEllipsis" in ${process.cwd()}?`,
            choices: ['Yes', 'No'],
        },
    ]);

    if (directoryInquirer.directory === 'No') {
        console.log(Chalk.bgRed('\nAborted by the user.'));
        process.exit(0);
    }

    const libraryInquirer = await inquirer.prompt([
        {
            name: 'library',
            type: 'list',
            message: 'Which library version code do you want?',
            default: 'React (TypeScript)',
            choices: [
                'React-TS', 
                { name: 'React-JS', disabled: 'Unavailable at this time' },
                'Vanilla-TS', 
                { name: 'Vanilla-JS', disabled: 'Unavailable at this time' },
            ],
        },
    ]);

    await getFiles(libraryInquirer.library);
}

console.log(Chalk.bgMagenta('Welcome to Middle Ellipsis Downloader!\n'));

await inquireUser();

console.log(Chalk.bgGreen(`\nCode copied into ${process.cwd()}/MiddleEllipsis successfully!`));
