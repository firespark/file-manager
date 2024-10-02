import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';

import { currentDirectory } from '../index.js';
import { isValidFile } from './common.js';

const hash = async (file) => {

    const fileHash = dirname(file) == '' ? file : join(currentDirectory, file);
    
    
    if (isValidFile(fileHash)) {
        const hash = createHash('sha256');
        const stream = await createReadStream(fileHash);

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            console.log(hash.digest('hex'));
        });

        stream.on('error', (err) => {
            console.error(`Error reading file: ${err.message}`);
        });

    }

    else {
        console.error("Invalid file");
    }

};

export { hash }