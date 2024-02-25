import { SayHelloProps } from "./types";

export function sayHello({ firstName, lastName, age }: SayHelloProps) {
	console.log(`Hello, ${firstName}!`);

	if (lastName) {
		console.log(`Your last name is ${lastName}`);
	}

	if (age) {
		console.log(`You are ${age} years old`);
	}
}
