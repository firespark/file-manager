import { createReadStream, createWriteStream } from 'fs';
import { existsSync } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { join, isAbsolute, parse } from 'node:path';

const compress = async (file, dest) => {

    try {
        const filePath = isAbsolute(file) ? file : join(currentDirectory, file);
        const destPath = isAbsolute(dest) ? dest : join(currentDirectory, dest);
        const archiveName = parse(filePath).base + '.br';
        const archivePath = join(destPath, archiveName);

        if (!existsSync(filePath)) {
            console.error(`File ${filePath} does not exist`);
            return;
        }
        if (!existsSync(destPath)) {
            console.error(`Folder ${destPath} does not exist`);
            return;
        }

        if (existsSync(archivePath)) {
            console.error(`File ${archivePath} already exists`);
            return;
        }

        const brotli = createBrotliCompress();
        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(archivePath);

        await readStream.pipe(brotli).pipe(writeStream);

        console.log(`${archiveName} created in ${destPath}`);

    }
    catch (error) {
        console.log(error);
        console.error('Could not compress a file');
    }


};

const decompress = async (file, dest) => {

    try {
        const archivePath = isAbsolute(file) ? file : join(currentDirectory, file);
        const destPath = isAbsolute(dest) ? dest : join(currentDirectory, dest);
        const archiveName = parse(archivePath).base;
        const fileName = archiveName.endsWith('.br') ? archiveName.slice(0, -3) : archiveName;
        const filePath = join(destPath, fileName);

        if (!existsSync(archivePath)) {
            console.error(`File ${archivePath} does not exist`);
            return;
        }
        if (!existsSync(destPath)) {
            console.error(`Folder ${destPath} does not exist`);
            return;
        }

        if (existsSync(filePath)) {
            console.error(`File ${filePath} already exists`);
            return;
        }

        const brotli = createBrotliDecompress();
        const readStream = createReadStream(archivePath);
        const writeStream = createWriteStream(filePath);

        await readStream.pipe(brotli).pipe(writeStream);

        console.log(`${archiveName} unpacked to ${destPath}`);

    }
    catch (error) {
        console.log(error);
        console.error('Could not compress a file');
    }


};

export {
    compress,
    decompress
}