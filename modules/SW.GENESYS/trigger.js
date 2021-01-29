const { dice, readData } = require('../');
const main = require('../../index');

const trigger = async (client, message, type) => {
    let characterStatus = await readData(client, message, 'characterStatus');
    let list = [];
    if (Object.keys(characterStatus).length === 0) {
        main.sendMessage(message, 'No characters found please use !char to setup');
        return;
    }
    Object.keys(characterStatus).forEach(characterName => {
        if (characterStatus[characterName][type]) {
            Object.keys(characterStatus[characterName][type]).forEach(name => {
                list.push({
                    name: characterName,
                    [type]: name,
                    value: characterStatus[characterName][type][name]
                });
            });
        }
    });
    list.sort((a, b) => a.value - b.value);
    let roll = dice(100);
    let target = 0;
    let total = 0;
    list.forEach(name => total += name.value);

    if (type.name === `Morality`) {
        main.sendMessage(message, `The ${type} roll is ${roll}.`);

        for(let i = 0; i < list.length; i++) {
            if (i = 0) {
                target = Math.abs(list[i].value - roll)
                targetName = list[i].name;
            }
            else if (target > Math.abs(list[i].value - roll)) {
                target = Math.abs(list[i].value - roll)
                targetName = list[i].name
            }
        }
        main.sendMessage(message, `${targetName}'s Morality has been triggered.`)
    } else {
        main.sendMessage(message, `The total group ${type} is ${total}. The ${type} roll is ${roll}.`);

        if (roll > total) {
            main.sendMessage(message, `No ${type} triggered`);
            return;
        }

        for(let i = 0; i < list.length; i++) {
            target += list[i].value;
            if (target > roll) {
                main.sendMessage(message, `${list[i].name}'s ${list[i][type]} ${type} has been triggered.`)
                    .catch(console.error);
                break;
            }
        }
    }
};

exports.trigger = trigger;
