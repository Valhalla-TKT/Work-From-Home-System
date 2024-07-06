document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");
    const connectingElement = document.querySelector('.connecting');

    const inputInitHeight = chatInput.scrollHeight;
    let stompClient = null;
    let username = 'Customer';

    const sessionId = `session-${Math.random().toString(36).substr(2, 9)}`;

    console.log("Generated session ID:", sessionId);

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ?
            `<p></p>` :
            `<span class="material-icons">support_agent</span><p></p>`;

        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    };

    const handleChat = () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        if (stompClient) {
            const chatMessage = {
                sender: username,
                content: userMessage,
                messageType: 'CHAT',
                sessionId: sessionId
            };
            console.log("Sending message:", chatMessage);
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        }
    };

    const connect = () => {
        const socket = new SockJS('/wfhs/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe('/topic/chat', onMessageReceived);
        stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, messageType: 'JOIN', sessionId: sessionId }));
        connectingElement.classList.add('hidden');
    };

    const onError = (error) => {
        connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
        connectingElement.style.color = 'red';
    };

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        console.log("Received message:", message);

        if (message.sessionId !== sessionId) {

            const messageElement = createChatLi(message.content, message.messageType === 'CHAT' ? 'incoming' : 'event-message');
            console.log(messageElement)
            if (message.messageType === 'JOIN' || message.messageType === 'LEAVE') {
                messageElement.querySelector('p').textContent = message.sender + (message.messageType === 'JOIN' ? ' joined!' : ' left!');
            } else {
                messageElement.querySelector('p').textContent = message.content;
            }

            chatbox.appendChild(messageElement);
            chatbox.scrollTo(0, chatbox.scrollHeight);
        } else {
            console.log("Ignored message from current session:", message);
        }
    };

    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

    connect();
});
