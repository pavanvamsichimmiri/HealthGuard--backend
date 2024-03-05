const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const user = require('./routes/user');
const sensorData = require('./routes/sensorData');
const { fetchSensorDataFromAPI } = require('./appUtils');

const app = express();
//to receive json data
app.use(express.json());
//initilze cors 
app.use(cors({
    origin: '*'
}));

//connect mongobd
mongoose.connect('mongodb+srv://Sravani:67331@cluster0.o26nd8w.mongodb.net/?retryWrites=true&w=majority').then(
    console.log("Db is connected")
);

//auth api's
app.use('/api/auth', auth);
//users api's
app.use('/api/user', user);
app.use('/api/sensor-data', sensorData); // Use the new sensorData route

// Function to periodically save sensor data (every 15 seconds)
const saveSensorData = async () => {
    try {
        // Fetch sensor data from your source (e.g., the API)
        const sensorData = await fetchSensorDataFromAPI();

        // Save data to MongoDB
        const { temperature, heartbeat, spo2, fallDetected, severityLevel } = sensorData;
        const dataToSave = new SensorData({
            temperature,
            heartbeat,
            spo2,
            fallDetected,
            severityLevel
        });
        await dataToSave.save();
        
        console.log('Sensor data saved successfully');
    } catch (error) {
        console.error('Error saving sensor data:', error);
    }
};

// Call saveSensorData every 15 seconds
setInterval(saveSensorData, 15000);

//run server
app.listen(3000, () => console.log('server is running'));