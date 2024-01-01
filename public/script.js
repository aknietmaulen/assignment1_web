function changeUnits() {
    const selectedUnit = document.getElementById('units').value;
    const heightUnitLabel = document.getElementById('height').nextElementSibling;
    const weightUnitLabel = document.getElementById('weight').nextElementSibling;

    if (selectedUnit === 'metric') {
        heightUnitLabel.textContent = 'cm';
        weightUnitLabel.textContent = 'kg';
    } else {
        heightUnitLabel.textContent = 'ft';
        weightUnitLabel.textContent = 'lb';
    }
};

function calculateBMI() {
    // Assuming you have variables like height, weight, age, gender, and units defined
    const data = { height, weight, age, gender, units };

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        // Assuming you have elements with ids 'bmiResult' and 'interpretation'
        document.getElementById('bmiResult').textContent = result.bmiResult.bmi;
        document.getElementById('interpretation').textContent = result.bmiResult.interpretation;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
