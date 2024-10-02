import { username } from '../index.js';
import { colors } from '../modules/common.js';

  
process.on('SIGINT', function () {
    process.exit(0);
});

process.on('exit', function() {
    console.log(`\n${colors.yellow}Thank you for using File Manager, ${username}, goodbye!${colors.reset}`);
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    console.error(`\n${colors.red}We are so sorry, ${username}, but we encountered this error: \n${err.message} ${colors.reset}\n`);
    //console.error(`\n${colors.red}We are so sorry, ${username}, but the program crashed!\nHere's more data about it:${colors.reset}\n`);
    //console.error(err);
    //process.exit(1);
});
