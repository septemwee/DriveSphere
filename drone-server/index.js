require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const { CONFIG_URL, LOG_URL, LOG_API_TOKEN } = process.env;


app.get('/configs/:droneId', async (req, res) => {
    const droneId = parseInt(req.params.droneId, 10);
    try {
        const response = await fetch(CONFIG_URL);
        
        if(!response.ok) {
            throw new Error('Failed to fetch config');
        }

        const fullResponse = await response.json();
        const droneConfig = fullResponse.data.find(drone => drone.drone_id === droneId);
        if (!droneConfig) {
            return res.status(404).json({ message: `Drone with ID ${droneId} not found.` });
        }

        const filteredConfig = {
            drone_id: droneConfig.drone_id,
            drone_name: droneConfig.drone_name,
            light: droneConfig.light,
            country: droneConfig.country,
            weight: droneConfig.weight
        };

        res.json(filteredConfig);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
});


app.get('/status/:droneId', async (req, res) => {
    const droneId = parseInt(req.params.droneId, 10);
    try {
        const response = await fetch(CONFIG_URL);

        if(!response.ok) {
            throw new Error('Failed to fetch config');
        }

        const fullResponse = await response.json();
        const droneConfig = fullResponse.data.find(drone => String(drone.drone_id) === String(droneId));

        if (!droneConfig) {
            return res.status(404).json({ message: `Drone with ID ${droneId} not found.` });
        }

        res.json({ condition: droneConfig.condition });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Get Drone Log
app.get('/logs/:droneId', async (req,res) => {
    const {droneId} = req.params;
    const page = req.query.page || 1;

    const url = new URL(LOG_URL)
    url.searchParams.append('perPage', '12');
    url.searchParams.append('sort', '-created');
    url.searchParams.append('filter', `drone_id = "${droneId}"`);
    url.searchParams.append('page', page);
    
    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${LOG_API_TOKEN}` },
        });

        if(!response.ok) {
            throw new Error('Failed to fetch config');
        }

        const data = await response.json();
        const filteredLogs = data.items.map(item => ({
            drone_id: item.drone_id,
            drone_name: item.drone_name,
            created: item.created,
            country: item.country,
            celsius: item.celsius,
        }));

        res.json(filteredLogs);

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
})


app.get('/logs-paginated/:droneId', async (req, res) => {
    const { droneId } = req.params;
    const page = req.query.page || 1;

    const url = new URL(LOG_URL);
    url.searchParams.append('perPage', '12');
    url.searchParams.append('sort', '-created');
    url.searchParams.append('filter', `drone_id = "${droneId}"`);
    url.searchParams.append('page', page);

    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${LOG_API_TOKEN}` },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch paginated logs');
        }

        const data = await response.json();
        
        res.json(data);

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/logs', async (req,res) => {
    try {
        const { drone_id, drone_name, country, celsius } = req.body;
        if (!drone_id || !drone_name || !country || celsius === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const payload = { drone_id, drone_name, country, celsius };


        const response = await fetch(LOG_URL, {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${LOG_API_TOKEN}`,
                'Content-Type' : 'application/json' 
            },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to create log. Status: ${response.status}. Body: ${errorBody}`);
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.listen(port, () => {
  console.log(`API Server is running at http://localhost:${port}`);
})