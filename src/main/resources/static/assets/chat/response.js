/**
 * 
 */
function getRandomOption() {
    var randomNum = Math.floor(Math.random() * 3);
    var options = ["paper", "scissors", "rock"];
   	return options[randomNum];
}
function getBotResponse(input) {
   	//rock paper scissors
    if (input == "rock") {
        return getRandomOption();
    } else if (input == "paper") {
        return getRandomOption();
    } else if (input == "scissors") {
        return getRandomOption();
    }

    // Simple responses
    if (input == "hello") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else if (input == "firstTimeInput") {
        return "Thank you for contacting us. We are currently connecting you with one of our customer support representatives. Please hold on, we'll be with you shortly.";
	} else {
        return "Please provide an input.";
    }
}