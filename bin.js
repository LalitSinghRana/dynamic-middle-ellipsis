#!/usr/bin/env node

import Chalk from 'chalk';
import decompress from 'decompress';
import download from 'download';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

const packageName = '@lalit-rana/middle-ellipsis-react';

const getFiles = async ({language, framework}) => {
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
        
        // Extract only the files under the 'package/${language}/' folder
        await decompress(compressedData, './MiddleEllipsis', {
            filter: file => file.path.startsWith(`package/${language}/${framework}`) 
            || file.path.startsWith(`package/${language}/truncate-text`) 
            || (file.path.startsWith(`package/${language}/`) && !file.path.substring(`package/${language}/`.length).includes('/')),
            map: file => {
                // Remove 'package/${language}/' from the start of the file path
                file.path = file.path.replace(`package/${language}/${framework}`, '');
                file.path = file.path.replace(`package/${language}/`, '');

                return file;
            }
        });
        console.log('Files extracted successfully!');

        spinner.success({
            text: Chalk.green(`Download Successful: Middle Ellipsis ${framework}`),
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
            name: 'language',
            type: 'list',
            message: 'Which language code do you want?',
            default: 'TypeScript',
            choices: [
                'TypeScript', 
                'JavaScript', 
            ],
        },
        {
            name: 'framework',
            type: 'list',
            message: 'Which framework version code do you want?',
            default: 'React',
            choices: [
                'React', 
                'Vanilla',
                { name: 'Svelte', disabled: 'Unavailable at this time' },
                { name: 'Vue', disabled: 'Unavailable at this time' },
                { name: 'Solid', disabled: 'Unavailable at this time' },
            ],
        },
    ]);

    await getFiles(libraryInquirer);
}

console.log(Chalk.bgMagenta('Welcome to Middle Ellipsis Downloader!\n'));

await inquireUser();

console.log(Chalk.bgGreen(`\nCode copied into ${process.cwd()}/MiddleEllipsis successfully!`));
