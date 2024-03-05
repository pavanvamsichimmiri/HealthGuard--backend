const axios = require('axios');

const fetchSensorDataFromAPI = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/sensor-data');
    return response.data.result; // Assuming the sensor data is nested under 'result'
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

module.exports = { fetchSensorDataFromAPI };
