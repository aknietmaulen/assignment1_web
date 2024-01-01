const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const router = express.Router();
const bmiResults = [];

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));
router.use(express.json());

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath);
});

router.post('/', (req, res) => {
    const params = req.body;

    const age = params.age;
    const unit = params.unit;
    const gender = params.gender;
    const bmi = calculateBMI(params.height, params.weight, unit);
    const category = getBMICategory(bmi);
    const time = params.time;

    bmiResults.push({
        age: age,
        height: params.height,
        weight: params.weight,
        bmi: bmi,
        category: category,
        unit: unit,
        gender: gender,
        time: time
    });

    res.send({
        age: age,
        height: params.height,
        weight: params.weight,
        bmi: bmi,
        category: category,
        unit: unit,
        gender: gender,
        time: time
    });

    res.status(200).end();
});

router.get('/results', (req, res) => {
    res.send(bmiResults);
});

router.get('/history', (req, res) => {
    const filePath = path.join(__dirname, '../public/history.html');
    res.sendFile(filePath);
});

router.get('/about', (req, res) => {
    const filePath = path.join(__dirname, '../public/about.html');
    res.sendFile(filePath);
});

router.get('/historyResults', (req, res) => {
    res.send(bmiResults);
});


function calculateBMI(height, weight, unit) {
    if (unit == "metric") {
        height = height / 100;
    }
    let bmi = weight / (height * height);
    if (unit == "imperial") {
        bmi = bmi * 703;
    }
    return bmi;
}

function getBMICategory(bmi) {

    if (bmi <= 16) {
        return "Severe Thinness";
    } else if (bmi <= 17) {
        return "Moderate Thinness";
    } else if (bmi <= 18.5) {
        return "Mild Thinness";
    } else if (bmi <= 25) {
        return "Normal";
    } else if (bmi <= 30) {
        return "Overweight";
    } else if (bmi <= 35) {
        return "Obese Class I";
    } else if (bmi <= 40) {
        return "Obese Class II";
    } else if (bmi >= 40) {
        return "Obese Class III";
    }
}

module.exports = router;
