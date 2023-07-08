const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = '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';

app.post('/chat', async (req, res) => {
  try {
    const { userInput } = req.body;

    // Prepare the request payload
    const payload = {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userInput }
      ],
      model: 'gpt-3.5-turbo'
    };

    // Make the API call to OpenAI
    const response = await axios.post(OPENAI_API_ENDPOINT, payload, {
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error making API call:', error.message);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

// Set up the server to listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
