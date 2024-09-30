import os from 'node:os';

let username = 'Sweetie';
const homeDirectory = os.homedir();

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i += 1) {
    const propArr = args[i].replace('--', '').split('=');
    if (propArr.length == 2 && propArr[0] == 'username') {
        username = propArr[1];
        break;
    }
}

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`Welcome to the File Manager, ${homeDirectory}!`);

process.stdin.on('data', (input) => {
    console.log(`Output: ${input}`);
});

process.on('SIGINT', function() {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});
