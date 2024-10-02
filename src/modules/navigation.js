import { readdir } from 'node:fs/promises';
import { lstat } from 'node:fs/promises';
import { join, dirname, isAbsolute } from 'node:path';

import { currentDirectory, changeCurrentDirectory } from '../index.js';
import { colors, isValidDir } from './common.js';
import { printFilesAsTable } from './fileFunctions.js';


const ls = async (dir = currentDirectory) => {
    if (await isValidDir(dir)) {
        let files = await readdir(dir);

        await printFilesAsTable(files, dir);
    }
    else {
        console.error('Not a valid directory');
    }
};

const up = async () => {

    let upDirectory = dirname(currentDirectory);
    if (await isValidDir(upDirectory)) {
        changeCurrentDirectory(upDirectory);
    }
    else {
        console.error('Not a valid directory');
    }
};

const cd = async (dir) => {
    try {
        const targetDir = isAbsolute(dir) ? dir : join(currentDirectory, dir);

        if (await isValidDir(targetDir)) {
            changeCurrentDirectory(targetDir);
            console.log(`Changed directory to: ${targetDir}`);
        }
        else {
            console.error('Not a valid directory');
        }
    }
    catch (error) {
        console.error('An error occurred while changing the directory:', error.message);
    }
};


const stat = async (file) => {
    if (!file) {
        console.error(`${colors.red}Specify filename to proceed${colors.reset}`)
        return;
    }
    try {
        const stats = await lstat(join(currentDirectory, file));
        console.log(stats)
    }
    catch {
        console.error(`${colors.red}File is protected${colors.reset}`);
        return;
    };
};

export {
    ls,
    stat,
    up,
    cd
};
