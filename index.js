const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 
const fs = require('fs'); 
const path = require('path');
const inquirer = require('inquirer');
const teamArray = []; 
const idArray = [];
const generateHTML = require('./src/generateHtml.js');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'index.html');


console.log(
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '\n\tWelcome To Team Profile Generator. Please Enter the following information.',
    '\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
);
function profileGenerator() {
    function addManager() {
        return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager of this team?', 
            validate: nameInput => {
                if (nameInput !== '') {
                    return true;
                } else {
                    return console.log ("\nPlease Enter a valid Manager's Name!");
                }
            },
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the manager's ID.",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("\nPlease Enter the manager's ID, not a Letter.")
                    return false; 
                } else {
                    return true;
                }
            },
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the manager's email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('\nPlease include an email suffix!')
                    return false; 
                }
            },
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('\nPlease enter an office number!')
                    return false; 
                } else {
                    return true;
                }
            },
        },
    ])
        .then((managerInput) => {
            const manager = new Manager (managerInput.name, managerInput.id, managerInput.email, managerInput.officeNumber);
            teamArray.push(manager);
            idArray.push(managerInput.managerId);
            console.log(manager);
            addMembers();
        });
}

function addMembers() {
    console.log(`
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    \tAdd Members to the team
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    `);
    inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Please choose your employee's role",
            choices: ['Engineer', 'Intern', 'I already have a promising team'],
        },
    ])
    .then((userChoice) => {
        switch (userChoice.role) {
            case 'Engineer':
                addEmployee();
                break;
            case 'Intern':
                addEmployee();
                break;
            default:
                createTeam();
        }
    });
}


function addEmployee() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "What's the name of the employee?", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("\nPlease enter an employee's name!");
                    return false; 
                }
            },
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID.",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("\nPlease enter the employee's ID!")
                    return false; 
                } else {
                    return true;
                }
            },
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('\nPlease enter an email!')
                    return false; 
                }
            },
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the employee's github username.",
            when: (list) => list.role === "Engineer",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ("\nPlease enter the employee's github username!")
                }
            },
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the intern's school",
            when: (list) => list.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("\nPlease enter the intern's school!")
                }
            },
        },
        {
            type: 'confirm',
            name: 'addMoreMember',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then((teamData) => {
        const { name, id, email, role, github, school, addMoreMember } = teamData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);
            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);
            console.log(employee);
        }

        teamArray.push(employee); 
        if (addMoreMember) {
            return addMembers(teamArray); 
        } else {
            createTeam();
        }
        
    });
    
};


function createTeam() {
    console.log(
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
        "\n\tThe Team's Profile is now Generated. Please check out the index.html inside the dist folder.",
        "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
        );
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
      }
      fs.writeFileSync(distPath, generateHTML(teamArray), 'utf-8');
}



// const createFile = data => {
//     fs.writeFileSync('./dist/index.html', data, err => {
//         if (err) {
//             console.log(err);
//             return;
//         } else {
//             console.log("The Team's Profile is now Generated. Please check out the index.html inside the dist folder.")
//         }
//     })
// }; 

    addManager();
}

profileGenerator();