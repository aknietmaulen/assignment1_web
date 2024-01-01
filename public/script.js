const radioMetric = document.getElementById('unitRadioDefault1');
const radioImperial = document.getElementById('unitRadioDefault2');
const inputField = document.getElementById('inputField'); 


const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight')

radioMetric.addEventListener('change', function() {
    if (this.checked) {
        heightInput.placeholder = 'Enter your height in cm';
        weightInput.placeholder = 'Enter your weight in kg';
    }
});

radioImperial.addEventListener('change', function() {
    if (this.checked) {
        heightInput.placeholder = 'Enter your height in inches';
        weightInput.placeholder = 'Enter your weight in pounds';
    }
});


//----------------------------------------------



const ageInput = document.getElementById('age');

ageInput.addEventListener('input', validateNumberInput);
heightInput.addEventListener('input', validateNumberInput);
weightInput.addEventListener('input', validateNumberInput);

function validateNumberInput(event) {
    const inputElement = event.target;
    const inputValue = inputElement.value.trim();

    if (!isValidNumber(inputValue)) {
        inputElement.classList.add('is-invalid');
    } else {
        inputElement.classList.remove('is-invalid');
    }
}

function isValidNumber(value) {
    return !isNaN(value) && value !== '' && value !== null && Number.isFinite(Number(value));
}

//*----------------------------------------------


const form = document.getElementById("calcForm");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  if (!isValidNumber(ageInput.value) || !isValidNumber(heightInput.value) || !isValidNumber(weightInput.value)) {
    // Display an error message or prevent form submission
    alert("Please enter valid numeric values for age, height, and weight.");
    return;
}

  const unitRadio = document.querySelector('input[name="unitRadioDefault"]:checked');
  const genderRadio = document.querySelector('input[name="flexRadioDefault"]:checked');
  console.log(unitRadio.value);
  console.log(genderRadio.value);  


    
  const response = await fetch("/", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      height: document.getElementById("height").value,
      weight: document.getElementById("weight").value,
      gender: genderRadio.value,
      age: document.getElementById("age").value,
      unit: unitRadio.value,
      time: new Date().toLocaleString()
    })
   });

  const bmi = await response.json();
  console.log(bmi)
    let weightUnit = "None";
    let heightUnit = "None";
    if (bmi.unit == "imperial") {
        weightUnit = "pounds";
        heightUnit = "inches";
    }else if(bmi.unit == "metric"){
        weightUnit = "kg";
        heightUnit = "cm";
    }   

//   document.getElementById('result').innerHTML = `<p>Your BMI score is: ${bmi.answer} and conclusion is ${bmi.conclusion}</p>`;
  document.getElementById('result').innerHTML = `
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Your BMI</h5>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <p class="card-text">Age: ${bmi.age}</p>
                                <p class="card-text">Weight: ${bmi.weight} ${weightUnit}</p>
                                <p class="card-text">Height: ${bmi.height} ${heightUnit}</p>
                                <p class="card-text">Sex: ${bmi.gender}</p>
                            </div>
                            <div class="result w-50 text-center mx-auto"> 
                                <p class="card-text">BMI: ${bmi.bmi}</p>
                                <p class="card-text">Category: ${bmi.category}</p>
                                <p class="card-text">Time: ${bmi.time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  `;


//   const resultsResponse = await fetch("/results");
//   const results = await resultsResponse.json();

//   const resultsContainer = document.getElementById('result');
//   resultsContainer.innerHTML = "";

//   results.forEach(bmi => {
//     let weightUnit = "None";
//     let heightUnit = "None";
//     if (bmi.unit == "imperial") {
//         weightUnit = "pounds";
//         heightUnit = "inches";
//     }else if(bmi.unit == "metric"){
//         weightUnit = "kg";
//         heightUnit = "cm";
//     }
//       resultsContainer.innerHTML += `
//       <div class="col">
//           <div class="card h-100">
//               <div class="card-body">
//                   <h5 class="card-title">BMI</h5>
//                   <div class="d-flex justify-content-between align-items-center">
//                       <div>
//                           <p class="card-text">Age: ${bmi.age}</p>
//                           <p class="card-text">Weight: ${bmi.weight} ${weightUnit}</p>
//                           <p class="card-text">Height: ${bmi.height} ${heightUnit}</p>
//                           <p class="card-text">Sex: ${bmi.gender}</p>
//                       </div>
//                       <div class="result w-50 text-center mx-auto"> 
//                           <p class="card-text">BMI: ${bmi.bmi}</p>
//                           <p class="card-text">Category: ${bmi.category}</p>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </div>
// `;
//   });
});

