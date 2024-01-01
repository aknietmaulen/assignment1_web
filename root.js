const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    // Serve the home page
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.route('/bmicalculator')
    .get((req, res) => {
        // Serve the BMI calculator page
        res.sendFile(path.join(__dirname, 'views', 'index.html'));
    })
    .post((req, res) => {
        // BMI calculation logic
        const { height, weight, age, gender, units } = req.body;

        // BMI calculation
        let bmi;
        if (units === 'Imperial') {
            // Convert Imperial units to metric
            const heightInMeters = height * 0.0254; // inches to meters
            const weightInKg = weight * 0.453592; // pounds to kilograms
            bmi = weightInKg / (heightInMeters * heightInMeters);
        } else {
            // Metric units
            bmi = weight / (height * height);
        }

        // Interpretation based on BMI categories
        let interpretation = '';
        if (bmi < 18.5) {
            interpretation = 'Underweight';
        } else if (bmi < 24.9) {
            interpretation = 'Normal Weight';
        } else if (bmi < 29.9) {
            interpretation = 'Overweight';
        } else {
            interpretation = 'Obese';
        }

        // Sending the BMI result along with appropriate messages
        res.json({ bmiResult: { bmi, interpretation } });
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


/*const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Import the calculateBMI function
const { calculateBMI } = require('/calculateBMI'); 

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.route('/bmicalculator')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'index.html'));
    })
    .post((req, res) => {
        // BMI calculation logic
        const { height, weight, age, gender, units } = req.body;
        const bmiResult = calculateBMI(height, weight, age, gender, units);

        // Sending the BMI result along with appropriate messages
        res.json({ bmiResult });
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function calculateBMI(height, weight, age, gender, units) {
    let bmi;

    // Convert units if needed
    if (units === 'imperial') {
        height *= 0.3048; // Convert feet to meters
        weight *= 0.453592; // Convert pounds to kilograms
    }

    // Calculate BMI
    bmi = weight / (height * height);

    // Round BMI to two decimal places
    const roundedBMI = Number(bmi.toFixed(2));

    // Interpretation based on BMI categories
    let interpretation = '';
    if (roundedBMI < 18.5) {
        interpretation = 'Underweight';
    } else if (roundedBMI < 24.9) {
        interpretation = 'Normal Weight';
    } else if (roundedBMI < 29.9) {
        interpretation = 'Overweight';
    } else {
        interpretation = 'Obese';
    }

    return { bmi: roundedBMI, interpretation };
}

module.exports = { calculateBMI };

*/