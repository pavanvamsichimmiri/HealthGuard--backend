const router = require('express').Router();
const { SensorData } = require('../model/Schema');

// API route to save sensor data
router.post("/", async (req, res) => {
    try {
        const { temperature, heartbeat, spo2, fallDetected, severityLevel } = req.body;
        const sensorData = new SensorData({
            temperature,
            heartbeat,
            spo2,
            fallDetected,
            severityLevel
        });
        await sensorData.save();
        res.status(200).json({ message: 'Sensor data saved successfully' });
    } catch (error) {
        console.error('Error saving sensor data:', error);
        res.status(500).json({ error: 'Error saving sensor data' });
    }
});

module.exports = router;