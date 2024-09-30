import * as commands from './modules/commands.js'; 

const checkCommand = (command) => {
    switch (command) {
        case 'list':

            break;

        case 'exit':
            process.exit(0);
            break;

        default:
            console.log(`Unknown command ${command}`);
            break;
    }
};

export {
    checkCommand
}