import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, isAbsolute } from 'node:path';

import { currentDirectory } from '../index.js';
import { isValidFile } from './common.js';

const hash = async (file) => {

    const fileHash = isAbsolute(file) ? file : join(currentDirectory, file);
    
    if (isValidFile(fileHash)) {
        const hash = createHash('sha256');
        const stream = await createReadStream(fileHash);

        for await (const chunk of stream) {
            hash.update(chunk);
        }

        console.log(hash.digest('hex'));

        stream.on('error', (err) => {
            console.error(`Error reading file: ${err.message}`);
        });

    }

    else {
        console.error(`Invalid file ${fileHash}`);
    }

};

export { hash }