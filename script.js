function convertToMeters(value, unit) {
  switch (unit) {
    case 'cm': return value / 100;
    case 'ft': return value * 0.3048;
    case 'in': return value * 0.0254;
    case 'm': 
    default: return value;
  }
}

function convertToKg(value, unit) {
  return unit === 'lb' ? value * 0.453592 : value;
}

function convertFromKg(value, unit) {
  return unit === 'lb' ? value / 0.453592 : value;
}

function calculateBMI() {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const weightUnit = document.getElementById('weightUnit').value;
  const heightUnit = document.getElementById('heightUnit').value;

  const resultBox = document.getElementById('result');
  const rangeBox = document.getElementById('range');
  resultBox.textContent = "";
  rangeBox.textContent = "";

  if (isNaN(weight) || isNaN(height) || height <= 0) {
    resultBox.textContent = "Please enter valid values.";
    return;
  }

  const weightInKg = convertToKg(weight, weightUnit);
  const heightInMeters = convertToMeters(height, heightUnit);

  const bmiValue = weightInKg / Math.pow(heightInMeters, 2);
  const roundedBMI = bmiValue.toFixed(2);

  let category = "";
  if (bmiValue < 18.5) category = "Underweight";
  else if (bmiValue < 25) category = "Normal weight";
  else if (bmiValue < 30) category = "Overweight";
  else category = "Obese";

  resultBox.textContent = `Your BMI is: ${roundedBMI} (${category})`;

  // Calculate normal weight range (18.5 - 24.9 BMI)
  const minWeightKg = 18.5 * Math.pow(heightInMeters, 2);
  const maxWeightKg = 24.9 * Math.pow(heightInMeters, 2);

  const minWeight = convertFromKg(minWeightKg, weightUnit).toFixed(1);
  const maxWeight = convertFromKg(maxWeightKg, weightUnit).toFixed(1);

  rangeBox.textContent = `Healthy weight range for your height: ${minWeight} - ${maxWeight} ${weightUnit}`;
}
