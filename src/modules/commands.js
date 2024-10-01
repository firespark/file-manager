import { readdir } from 'node:fs/promises';
import { lstatSync } from 'node:fs';
import { join, dirname } from 'node:path';

import { currentDirectory, changeCurrentDirectory } from '../index.js';
import { colors } from './common.js';
import { printFilesAsTable } from './fileFunctions.js';


const ls = async (dir = currentDirectory) => {
    let files = await readdir(dir);

    printFilesAsTable(files, dir);
};

const up = async () => {
    let upDirectory = dirname(currentDirectory);
    changeCurrentDirectory(upDirectory);
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
    up
};
