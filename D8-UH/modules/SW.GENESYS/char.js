const functions = require('./');
const { readData, writeData } = require('../data');
const main = require('../../index');
const { indexOf, upperFirst } = require('lodash');

const char = async (client, message, params, channelEmoji) => {
    //setting the channel specific variables
    let characterStatus = await readData(client, message, 'characterStatus');
    let characterName, character, modifier = 0, command = 'list';

    if (params[0]) command = params[0];
    if (params[1]) characterName = params[1].toUpperCase();
    if (params[2] && +params[2]) modifier = +params[2];

    if (characterName && characterStatus[characterName]) character = { ...characterStatus[characterName] };
    if (!character && command !== 'list' && command !== 'reset') {
        if (command === 'setup' || command === 'add') {
            if (!characterName) {
                main.sendMessage(message, 'No characterName, !help char for more information');
                return;
            }
        } else {
            main.sendMessage(message, `${characterName} has not been set up.  Please use !char setup characterName [maxWound] [maxStrain] [credits] to complete setup.`);
            return;
        }
    }
    let text = '', name = '', type = '';
    switch(command) {
        case 'setup':
        case 'add':
            if (character) {
                text += `${characterName} already exists!`;
                break;
            }
            //init the new characters stats
            character = {
                maxWound: 0,
                maxStrain: 0,
                currentWound: 0,
                currentStrain: 0,
                credits: 0,
                unspentXP: 0,
                spentXP: 0,
                crit: [],
                obligation: {},
                duty: {},
                morality: {}
            };
            if (params[2]) character.maxWound = +params[2].replace(/\D/g, '');
            if (params[3]) character.maxStrain = +params[3].replace(/\D/g, '');
            if (params[4]) character.credits = +params[4].replace(/\D/g, '');
            text += buildCharacterStatus(characterName, character);
            break;

        case 'wound':
        case 'w':
            if (modifier) {
                character.currentWound = +character.currentWound + modifier;
                if (modifier > 0) text += `${characterName} takes ${modifier} wounds`;
                if (modifier < 0) text += `${characterName} recovers from ${-modifier} wounds.`;
            }
            if (+character.currentWound < 0) character.currentWound = 0;
            if (+character.currentWound > 2 * +character.maxWound) character.currentWound = 2 * +character.maxWound;
            text += `\nWounds: \`${character.currentWound} / ${character.maxWound}\``;
            if (+character.currentWound > +character.maxWound) text += `\n${characterName} is incapacitated.`;
            break;

        case 'strain':
        case 's':
            if (modifier) {
                character.currentStrain = +character.currentStrain + modifier;
                if (modifier > 0) text += `${characterName} takes ${modifier} strain`;
                else if (modifier < 0) text += `${characterName} recovers from ${-modifier} strain.`;
            }
            if (+character.currentStrain < 0) character.currentStrain = 0;
            if (+character.currentStrain > 1 + +character.maxStrain) character.currentStrain = 1 + +character.maxStrain;
            text += `\nStrain: \`${character.currentStrain} / ${character.maxStrain}\``;
            if (+character.currentStrain > +character.maxStrain) text += `\n${characterName} is incapacitated.`;
            break;

        case 'crit':
            if (!character.crit) character.crit = [];
            if (modifier) {
                if (modifier > 0) {
                    character.crit.push(modifier);
                    text += `${characterName} has added Crit:${modifier} to their Critical Injuries.\n`;
                } else if (modifier < 0) {
                    let index = indexOf(character.crit, -modifier);
                    if (index > -1) {
                        character.crit.splice(index, 1);
                        text += `${characterName} has removed Crit:${-modifier} from their Critical Injuries.\n`;
                    } else text += `${characterName} does not have Crit:${-modifier} in their Critical Injuries.\n`;
                }
            }
            if (character.crit.length > 0) {
                text += `${characterName} has the following Critical Injuries.`;
                character.crit.sort()
                         .forEach(crit => text += `\nCrit ${crit}: ${functions.textCrit(crit, channelEmoji)}`);
            } else text += `${characterName} has no Critical Injuries.`;
            break;

        case 'obligation':
        case 'o':
        case 'd':
        case 'duty':
        case 'inventory':
        case 'i':
        case 'misc':
            if (command === 'o' || command === 'obligation') type = 'obligation';
            if (command === 'd' || command === 'duty') type = 'duty';
            if (command === 'i' || command === 'inventory') type = 'inventory';
            if (command === 'misc') type = 'misc';
            if (!character[type]) character[type] = {};
            if (params[3]) name = params[3].toUpperCase();
            if (!name) {
                text += `No ${type} name was entered.`;
                break;
            }
            if (modifier > 0) {
                if (character[type] === '') character[type] = {};
                if (!character[type][name]) character[type][name] = 0;
                character[type][name] += modifier;
                text += `${characterName} has added ${modifier} to their ${name} ${type}, for a total of ${character[type][name]}`;
                //subtraction modifier
            } else if (modifier < 0) {
                if (!character[type][name]) text += `${characterName} does not currently have any ${name} ${type}.`;
                else {
                    character[type][name] += modifier;
                    if (character[type][name] <= 0) {
                        text += `${characterName} has removed all of their ${name} ${type}.`;
                        delete character[type][name];
                    }
                    text += `${characterName} has removed ${modifier} from their ${name} ${type}, for a total of ${character[type][name]}`;
                }
            }
            if (Object.keys(character[type]).length === 0) text += `\n${characterName} has no ${type}.`;
            else {
                text += `\n${characterName} has the following ${type}.`;
                Object.keys(character[type]).forEach(key => text += `\n${key}: ${character[type][key]}`);
            }
            break;

        case 'credit':
        case 'credits':
        case 'c':
            if (modifier > 0 || +character.credits >= -modifier) {
                character.credits = +character.credits + modifier;
                if (modifier > 0) text += `${characterName} gets ${modifier} credits`;
                else if (modifier < 0) text += `${characterName} pays ${-modifier} credits.`;
            } else text += `${characterName} does not have ${-modifier} credits!`;
            text += `\n${characterName} has ${character.credits} credits.`;
            break;

        case 'morality':
        case 'm':
            if (modifier > 0 || +character.morality >= -modifier) {
                character.morality = +character.morality + modifier;
                if (modifier > 0) text += `${characterName} has increased their Morality by ${modifier}.`;
                else if (modifier < 0) text += `${characterName} has decreased their Morality by ${-modifier}.`;
            } else text += `${characterName} cannot decrease their Morality any further!`
            text += `\n${characterName} has a Morality of ${character.morality}.`;
            break;
        
        case 'unspentXP':
        case 'availableXP':
        case 'uXP':
        case 'aXP':
            if (modifier > 0 || +character.unspentXP >= -modifier) {
                character.unspentXP = +character.unspentXP + modifier;
                if (modifier > 0) text += `${characterName} gained ${modifier} XP`;
                else if (modifier < 0) character.spentXP = +character.spentXP - modifier;
                text += `${characterName} spent ${-modifier} XP.`;
                text += `\n${characterName} has now spent a total of ${character.spentXP} XP.`;
            } else text += `${characterName} does not have ${-modifier} XP!`;
            text += `\n${characterName} has ${character.unspentXP} XP available to spend.`;
            break;

        case 'spentXP':
        case 'sXP':
            if (modifier > 0 || +character.spentXP >= -modifier) {
                character.spentXP = +character.spentXP + modifier;
                text += `${characterName} modified their spent XP by ${modifier} .`;
            } else text += `${characterName} does not have ${-modifier} spent XP!`;
            text += `\n${characterName} has ${character.spentXP} spent XP.`;
            break;

        case 'status':
            text += buildCharacterStatus(characterName, character);
            break;

        case 'modify':
            let stat;
            if (params[3] === 'maxstrain') stat = 'maxStrain';
            else if (params[3] === 'maxwounds') stat = 'maxWound';

            if (!stat || !modifier) {
                text += 'Bad Command, !help char for more information';
                break;
            }
            character[stat] = +character[stat] + modifier;
            if (character[stat] < 0) character[stat] = 0;
            text += `${characterName}'s ${stat} is modified to ${character[stat]}`;
            break;

        case 'reset':
            text = 'Deleting all the characters.';
            characterStatus = false;
            character = false;
            break;

        case 'remove':
            character = false;
            delete characterStatus[characterName];
            text += `${characterName} has been removed.`;
            break;

        case 'list':
            if (Object.keys(characterStatus).length < 1) text += 'No characters.';
            else Object.keys(characterStatus).sort()
                       .forEach(name => text += `${buildCharacterStatus(name, characterStatus[name])}\n\n`);
            break;
        default:
            text += `Command:**${command}** not recognized`;

    }
    if (character) characterStatus[characterName] = { ...character };
    main.sendMessage(message, text);
    writeData(client, message, 'characterStatus', characterStatus);
};

const buildCharacterStatus = (name, character) => {
    let text = `__**${name}**__`;
    if (character.maxWound > 0) text += `\nWounds: \`${character.currentWound} / ${character.maxWound}\``;
    if (character.maxStrain > 0) text += `\nStrain: \`${character.currentStrain} / ${character.maxStrain}\``;
    if (character.credits > 0) text += `\nCredits: \`${character.credits}\``;
    if (character.crit.length > 0) text += `\nCrits: \`${character.crit}\``;
    if (character.unspentXP > 0) text += `\nUnspent XP: \`${character.unspentXP}\``;
    if (character.spentXP > 0) text += `\nSpent XP: \`${character.spentXP}\``;
    ['obligation', 'duty', 'morality', 'inventory', 'misc'].forEach(type => {
        if (character[type]) {
            if (Object.keys(character[type]).length > 0) {
                text += `\n${upperFirst(type)}: \``;
                Object.keys(character[type]).forEach(name => {
                    text += `${name}: ${character[type][name]}  `;
                });
                text += '\`';
            }
        }
    });
    if ((character.maxWound < character.currentWound && character.maxWound > 0) ||
        (character.maxStrain < character.currentStrain && character.maxStrain)) {
        text += `\n\`INCAPACITATED\``;
    }
    return text;
};

exports.char = char;
