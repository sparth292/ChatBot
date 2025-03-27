require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

const API_KEY = process.env.API_KEY;

// Proxy route to hide API key
app.post('/chatbot', async (req, res) => {
    try {
        const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/ai', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Chatbot API Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
