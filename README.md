# OpenAI Chat Interface

A web-based interface for interacting with OpenAI's GPT-3.5-turbo model. This application provides a clean, modern UI for sending prompts to the AI and displaying responses along with token usage information.

## Features

- Modern web interface for interacting with GPT-3.5-turbo
- Real-time responses from the OpenAI API
- Token usage tracking
- Clean and responsive design
- Support for multi-line input
- Error handling and display

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual OpenAI API key.

## Running the Application

Start the server:
```bash
npm start
```

Then open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Type your message in the input area
2. Press Enter or click the Send button to submit
3. The AI's response will appear in the chat area
4. Token usage is displayed below each interaction

## Technical Details

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- API: OpenAI Chat Completions API
- Model: GPT-3.5-turbo