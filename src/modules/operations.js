import { createReadStream, existsSync } from 'node:fs';
import { join } from 'node:path';
import { writeFile, rename } from 'node:fs/promises';

import { currentDirectory } from '../index.js';
import { isValidFile } from './common.js';


const cat = async (file) => {
    const fileRead = join(currentDirectory, file);
    if (isValidFile(fileRead)) {
        const stream = await createReadStream(fileRead);

        stream.on('data', (chunk) => {
            process.stdout.write(`${chunk}\n`);
        });

        stream.on('error', (err) => {
            console.error(`Error reading file: ${err.message}`);
        });
    }
};

const add = async (fileName) => {
    try {
        const fileAdd = join(currentDirectory, fileName);

        if (existsSync(fileAdd)) throw ('File already exists');

        await writeFile(fileAdd, '');
    }
    catch (error) {
        console.error('Could not create a file');
    }

};

const rn = async (oldName, newName) => {
    try {
        const oldFile = join(currentDirectory, oldName);
        const newFile = join(currentDirectory, newName);

        if (!existsSync(oldFile)) throw (`File ${oldName} does not exist`);
        if (existsSync(newFile)) throw (`File ${newName} already exists`);

        await rename(oldFile, newFile);
    }
    catch (error) {
        //console.log(error);
        console.error('Could not rename a file');
    }

};

export {
    cat,
    add,
    rn
}
