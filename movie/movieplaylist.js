const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let movies = []; // Array to store movie names
let priorities = []; // Array to store movie priorities

// Function to display the menu and handle user input
function showMenu() {
    console.log('\nMovie Playlist Manager');
    console.log('1. Add Movie');
    console.log('2. View Movies');
    console.log('3. Exit');
    rl.question('Please choose an option (1-3): ', handleMenuChoice);
}

// Function to handle menu choice
function handleMenuChoice(choice) {
    switch(choice) {
        case '1':
            addMovie();
            break;
        case '2':
            viewMovies();
            break;
        case '3':
            rl.close();
            break;
        default:
            console.log('Invalid choice, please try again.');
            showMenu();
            break;
    }
}

// Function to add a movie to the list
function addMovie() {
    rl.question('Enter Movie Name: ', (movieName) => {
        rl.question('Enter Priority (1 for low, 2 for medium, 3 for high): ', (priority) => {
            if (movieName.trim() === '' || !['1', '2', '3'].includes(priority)) {
                console.log('Invalid input. Please enter a valid movie name and priority (1, 2, or 3).');
                addMovie();
            } else {
                movies.push(movieName.trim());
                priorities.push(parseInt(priority));
                console.log(`Movie "${movieName}" added with priority ${priority}.`);
                showMenu();
            }
        });
    });
}

// Function to view all movies in the list
function viewMovies() {
    if (movies.length === 0) {
        console.log('No movies added yet.');
    } else {
        console.log('\nMovie List:');
        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            const priority = priorities[i];
            let priorityLabel = '';
            if (priority === 1) priorityLabel = 'Low';
            if (priority === 2) priorityLabel = 'Medium';
            if (priority === 3) priorityLabel = 'High';
            console.log(`${i + 1}. ${movie} - Priority: ${priorityLabel}`);
        }
    }
    showMenu();
}

// Start the program
showMenu();
