const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

// Function to add messages to chat window
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user' : 'bot');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to handle sending messages
async function handleSendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    addMessage(message, true); // Display user message
    messageInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/chatbot', {  // Proxy to backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{
                    role: 'user',
                    content: [{ type: 'text', text: message }]
                }]
            })
        });

        const data = await response.json();
        addMessage(data.message || "I couldn't process that. Try again.");
    } catch (error) {
        addMessage("Error connecting to the chatbot API.");
        console.error("Chatbot API Error:", error);
    }
}

// Event listeners
sendMessage.addEventListener('click', handleSendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});
