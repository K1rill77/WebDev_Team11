function toggleOtherGender(show) {
  document.getElementById("otherGenderField").style.display = show
    ? "block"
    : "none";
}

function handleSubmit() {
  if (!confirm("Do you confirm all the information entered is correct?")) {
    return false;
  }

  const fullName = document.getElementById("fullName").value;
  const con = document.getElementById("con").value;
  const email = document.getElementById("email").value;
  const genderRadios = document.getElementsByName("gender");
  let gender = "";
  for (let radio of genderRadios) {
    if (radio.checked) {
      gender = radio.value;
      break;
    }
  }
  if (gender === "Other") {
    gender = document.getElementById("otherGenderText").value || "Other";
  }

  const destination = document.getElementById("destination").value;
  const vaccinationStatus = document.getElementById("vaccinationStatus").value;
  const additionalSymptoms = document.getElementById("healthNotes").value || "None";
  const symptomCheckboxes = document.getElementsByName("symptoms");
  const symptoms = [];
  for (let box of symptomCheckboxes) {
    if (box.checked) symptoms.push(box.value);
  }

  if (symptoms[0] == null) symptoms[0] = "None";

  let reservationstatus =
    vaccinationStatus === "Unvaccinated" ? "Declined" : "Approved";

  document.getElementById("tableBody").innerHTML = `
    <tr>
      <td>${fullName}</td>
      <td>${email}</td>
      <td>${con}</td>
      <td>${gender}</td>
      <td>${destination}</td>
      <td>${vaccinationStatus}</td>
      <td>${symptoms.join(", ")}</td>
      <td>${additionalSymptoms}</td>
      <td>${reservationstatus}</td>
    </tr>
  `;


document.getElementById('book-form').classList.add('hidden');

document.getElementById('thankYouContainer').classList.remove('hidden');

document.getElementById('tableContainer').classList.remove('hidden');

document.getElementById('thankYouContainer').scrollIntoView({ behavior: 'smooth' });

  document.getElementById("resultTable").style.display = "table";
  return false;
}

//Check all symptoms
function uncheckSymptoms() {
    var symptoms = document.getElementByName("symptoms");
    symptoms.checked = false;
}



