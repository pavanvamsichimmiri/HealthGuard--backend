const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

const sensorDataSchema = new mongoose.Schema({
    temperature: { type: Number, required: true },
    heartbeat: { type: Number, required: true },
    spo2: { type: Number, required: true },
    fallDetected: { type: Boolean, required: true },
    severityLevel: { type: String, required: true }
}, {
    timestamps: true,
});

const SensorData = mongoose.model("SensorData", sensorDataSchema);


module.exports = { User, SensorData};

