async function sendMessage() {

    const input = document.getElementById("messageInput");
    const chatBox = document.getElementById("chatBox");
    const language = document.getElementById("language").value;

    const message = input.value;

    if (!message) return;

    // Show user message
    chatBox.innerHTML += `
        <div class="message">
            <span class="user">You:</span> ${message}
        </div>
    `;

    input.value = "";

    try {
        const response = await fetch("http://localhost:8080/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                language: language
            })
        });

        const data = await response.json();

        // Show bot reply
        chatBox.innerHTML += `
            <div class="message">
                <span class="bot">AI:</span> ${data.reply}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        chatBox.innerHTML += `
            <div class="message">
                <span class="bot">Error:</span> Could not connect to server.
            </div>
        `;
    }
}
