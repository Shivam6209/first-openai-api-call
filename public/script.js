document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('prompt-input');
    const sendButton = document.getElementById('send-button');
    const responseArea = document.getElementById('response-area');
    const tokenCounter = document.getElementById('token-counter');
    const totalTokens = document.getElementById('total-tokens');

    let isProcessing = false;
    let totalTokenCount = 0;

    const createMessageElement = (text, isError = false, isUser = false, tokens = null) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isError ? 'error' : ''} ${isUser ? 'user-message' : 'assistant-message'}`;
        
        // Main message text
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        messageDiv.appendChild(textSpan);

        // Add token info if available
        if (tokens !== null && !isError) {
            const tokenInfo = document.createElement('div');
            tokenInfo.className = 'token-info';
            tokenInfo.textContent = `Tokens: ${tokens}`;
            messageDiv.appendChild(tokenInfo);
        }

        return messageDiv;
    };

    const setLoading = (loading) => {
        sendButton.disabled = loading;
        promptInput.disabled = loading;
        sendButton.className = loading ? 'loading' : '';
    };

    const updateTokenCounters = (newTokens) => {
        totalTokenCount += newTokens;
        tokenCounter.textContent = `Tokens this message: ${newTokens}`;
        totalTokens.textContent = `Total tokens: ${totalTokenCount}`;
    };

    const handleSubmit = async () => {
        const prompt = promptInput.value.trim();
        if (!prompt || isProcessing) return;

        isProcessing = true;
        setLoading(true);

        // Clear welcome message if it exists
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            responseArea.removeChild(welcomeMessage);
        }

        // Add user's message
        responseArea.appendChild(createMessageElement(prompt, false, true));
        promptInput.value = '';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            // Add AI's response with token count
            responseArea.appendChild(
                createMessageElement(data.response, false, false, data.tokens)
            );
            
            // Update token counters
            updateTokenCounters(data.tokens);

            // Scroll to bottom
            responseArea.scrollTop = responseArea.scrollHeight;

        } catch (error) {
            responseArea.appendChild(createMessageElement(error.message, true));
        } finally {
            isProcessing = false;
            setLoading(false);
            promptInput.focus();
        }
    };

    // Event listeners
    sendButton.addEventListener('click', handleSubmit);
    
    promptInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    });

    // Auto-resize textarea
    promptInput.addEventListener('input', () => {
        promptInput.style.height = 'auto';
        promptInput.style.height = (promptInput.scrollHeight) + 'px';
    });

    // Focus input on load
    promptInput.focus();
}); 