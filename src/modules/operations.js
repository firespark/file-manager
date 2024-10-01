import { createReadStream, existsSync } from 'node:fs';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';

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
        console.log(error);
    }

};

export {
    cat,
    add
}
