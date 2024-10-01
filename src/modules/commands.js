import { readdir } from 'node:fs/promises';
import { lstatSync } from 'node:fs';
import { join, dirname } from 'node:path';

import { currentDirectory, changeCurrentDirectory } from '../index.js';
import { colors, isValidDir } from './common.js';
import { printFilesAsTable } from './fileFunctions.js';


const ls = async (dir = currentDirectory) => {
    if (isValidDir(dir)) {
        let files = await readdir(dir);

        printFilesAsTable(files, dir);
    }
};

const up = async () => {
    
    let upDirectory = dirname(currentDirectory);
    if (isValidDir(upDirectory)) {
        changeCurrentDirectory(upDirectory);
    }
    
};

const cd = async (dir) => {
    
    if (isValidDir(dir)) {
        changeCurrentDirectory(dir);
    }
    
};

const stat = async (file) => {
    if (!file) {
        console.error(`${colors.red}Specify filename to proceed${colors.reset}`)
        return;
    }
    try {
        const stats = lstatSync(join(currentDirectory, file));
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
