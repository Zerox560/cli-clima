const inquirer = require("inquirer");

const options = [
    {
        type: "list",
        name: "option",
        message: "Choose one of the next options",
        choices: [
            {
                value: 1,
                name: `${"1.".green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${"2".green}. Historial`
            },
            {
                value: 0,
                name: `${"0".green}. Salir`
            }
        ]
    }
];

async function inquirerMenu() {
    console.clear();
    console.log("===========================".green);
    console.log("   Clima App   ".cyan.bold);
    console.log("===========================".green);

    const { option } = await inquirer.prompt(options);
    return option;
};

async function pause() {

    console.log("\n");

    await inquirer.prompt([{ type: "input", name: "pause", message: `Presiona ${"ENTER".green} para continuar...` }]);
};

async function readInput(message) {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Please, enter a value...";
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

async function listPlaces(places = []) {
    const choices = places.map((place, i) => {
        let index = `${i + 1}`.green;

        return {
            value: place.id,
            name: `${index} ${"-".green} ${place.name}`
        }
    });

    choices.unshift({ value: "0", name: "0 - ".green + "Exit" });

    const opt = [
        {
            type: "list",
            name: "id",
            message: "Seleccione lugar",
            choices
        }
    ];

    const { id } = await inquirer.prompt(opt);
    return id;
};

async function confirm(message) {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};

async function markTaskList(tasks = []) {
    const choices = tasks.map((task, i) => {
        let index = `${i + 1}`.green;

        return {
            value: task.id,
            name: `${index} ${"-".green} ${task.description}`,
            checked: task.completedAt ? true : false
        }
    });

    choices.unshift({ value: "0", name: "0 - ".green + "Exit" });

    const question = [
        {
            type: "checkbox",
            name: "ids",
            message: "Mark as completed",
            choices
        }
    ];

    const { ids } = await inquirer.prompt(question);

    return ids;
};

module.exports = { inquirerMenu, pause, readInput, listPlaces, confirm, markTaskList };