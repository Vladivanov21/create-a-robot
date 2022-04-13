const message = ["Hello!", "Welcome to this website!", "Nice to see you!"];
let random = Math.floor(Math.random() * message.length);
alert(message[random]);

let received_messages_1 = [];
let received_messages_2 = [];


const robot1 = {
	name: "FirstRobot",
	color: "orange",
	type: "male",
	messages: received_messages_1
};

const robot2 = {
	name: "SecondRobot",
	color: "blue",
	type: "female",
	messages: received_messages_2
};


received_messages_2.push("Hello, " + robot2.name + "!");