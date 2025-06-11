require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const path = require('path');

const app = express();
const port = 3000;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// Define system prompt
const SYSTEM_PROMPT = "You are a helpful assistant who provides clear and concise responses.";

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for OpenAI chat
app.post('/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt }
            ]
        });

        res.json({
            response: completion.choices[0].message.content,
            tokens: completion.usage.total_tokens
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check if API key exists
if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY not found in environment variables');
    process.exit(1);
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 