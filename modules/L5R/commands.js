const functions = require('./');

async function commands(client, message, params, command, desc, channelEmoji, prefix) {
	switch (command) {
		case 'roll':
		case 'r':
			await functions.roll(params, message, client, desc, channelEmoji);
			break;
		case 'keep':
		case 'k':
			await functions.keep(params, message, client, desc, channelEmoji);
			break;
		case 'add':
			await functions.roll(params, message, client, desc, channelEmoji, 'add');
			break;
		case 'reroll':
		case 'rr':
			await functions.keep(params, message, client, desc, channelEmoji, 'reroll');
			break;
		case 'help':
		case 'h':
			functions.help(params[0], message, prefix);
			break;
		default:
			break;
	}
}

exports.commands = commands;
