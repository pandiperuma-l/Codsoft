document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("userInput");
    const chat = document.getElementById("chat");
    const sendButton = document.getElementById("sendButton");

    function appendMessage(sender, message) {
        const chatMessage = document.createElement("div");
        chatMessage.className = "chat";
        chatMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chat.appendChild(chatMessage);
    }

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage !== "") {
            appendMessage("You", userMessage);
            const botResponse = simple_chatbot(userMessage);
            appendMessage("Chatbot", botResponse);
            userInput.value = "";
            chat.scrollTop = chat.scrollHeight;
        }
    }

    function simple_chatbot(user_input) {
        user_input = user_input.toLowerCase();

        if (user_input.includes("hi") || user_input.includes("hello") || user_input.includes("hey")) {
            return "Hello! How can I help you today?";
        } else if (user_input.includes("how are you") || user_input.includes("how's it going")) {
            return "I'm just a computer program, but thanks for asking!";
        } else if (user_input.includes("bye") || user_input.includes("goodbye")) {
            return "Goodbye! Have a great day.";
        } else if (user_input.includes("thank you") || user_input.includes("thanks")) {
            return "You're welcome! If you have any more questions, feel free to ask.";
        } else {
            return "I'm sorry, I don't understand that. Can you please ask another way?";
        }
    }

    sendButton.addEventListener("click", sendMessage);

    userInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
