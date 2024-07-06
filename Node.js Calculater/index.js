const crypto = require('crypto');

const args = process.argv.slice(2); 

const operation = args[0];
const numbers = args.slice(1).map(Number); 

switch (operation) {
    case 'add':
        if (numbers.length < 2) {
            console.log("Provide at least two numbers for addition.");
        } else {
            const result = numbers.reduce((acc, num) => acc + num, 0);
            console.log(result);
        }
        break;

    case 'sub':
        if (numbers.length < 2) {
            console.log("Provide at least two numbers for subtraction.");
        } else {
            const result = numbers.reduce((acc, num) => acc - num);
            console.log(result);
        }
        break;

    case 'mult':
        if (numbers.length < 2) {
            console.log("Provide at least two numbers for multiplication.");
        } else {
            const result = numbers.reduce((acc, num) => acc * num, 1);
            console.log(result);
        }
        break;

    case 'divide':
        if (numbers.length < 2) {
            console.log("Provide at least two numbers for division.");
        } else {
            const result = numbers.reduce((acc, num) => acc / num);
            console.log(result);
        }
        break;

    case 'sin':
        if (numbers.length !== 1) {
            console.log("Provide exactly one number for sine calculation.");
        } else {
            const result = Math.sin(numbers[0]);
            console.log(result);
        }
        break;

    case 'cos':
        if (numbers.length !== 1) {
            console.log("Provide exactly one number for cosine calculation.");
        } else {
            const result = Math.cos(numbers[0]);
            console.log(result);
        }
        break;

    case 'tan':
        if (numbers.length !== 1) {
            console.log("Provide exactly one number for tangent calculation.");
        } else {
            const result = Math.tan(numbers[0]);
            console.log(result);
        }
        break;

    case 'random':
        if (numbers.length !== 1) {
            console.log("Provide length for random number generation.");
        } else {
            const length = numbers[0];
            const randomNumber = crypto.randomBytes(length).toString('binary');
            console.log(randomNumber);
        }
        break;

    default:
        console.log("Invalid operation");
}

if (!operation) {
    console.log("No operation provided.");
} else if (['add', 'sub', 'mult', 'divide', 'sin', 'cos', 'tan', 'random'].includes(operation) && numbers.length === 0) {
    console.log("No numbers provided.");
}
