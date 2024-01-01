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