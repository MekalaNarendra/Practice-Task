function searchCompany(companyName) {
  if (companyName.length >= 3) {
    fetch('companies.json')
      .then(response => response.json())
      .then(data => {
        const matchingCompanies = data.filter(company => company.toLowerCase().startsWith(companyName.toLowerCase()));
        displayMatchingCompanies(matchingCompanies);
      })
      .catch(error => console.error('Error fetching companies:', error));
  } else {
    document.getElementById('companyListContainer').innerHTML = '';
  }
}

function displayMatchingCompanies(companies) {
  const companyListContainer = document.getElementById('companyListContainer');
  companyListContainer.innerHTML = '';

  if (companies.length === 0) {
    companyListContainer.innerHTML = '<div class="autocomplete-item">No matching companies found.</div>';
    return;
  }

  companies.forEach(company => {
    const item = document.createElement('div');
    item.textContent = company;
    item.classList.add('autocomplete-item');
    item.addEventListener('click', () => selectCompany(company));
    companyListContainer.appendChild(item);
  });
}

function selectCompany(companyName) {
  document.getElementById('company').value = companyName;
  document.getElementById('companyListContainer').innerHTML = '';
}

function previewPhoto(input) {
  const photoPreview = document.getElementById('photoPreview');
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoPreview.src = e.target.result;
      photoPreview.style.display = 'block';
    }
    reader.readAsDataURL(input.files[0]);
  } else {
    photoPreview.src = '#';
    photoPreview.style.display = 'none';
  }
}

document.getElementById('experienced').addEventListener('click', function () {
  document.getElementById('experienceBox').style.display = 'block';
});

document.getElementById('fresher').addEventListener('click', function () {
  document.getElementById('experienceBox').style.display = 'none';
});

function previewForm() {
  const form = document.querySelector('form');
  const formData = new FormData(form);

  // Create HTML for preview
  let previewHTML = '';
  formData.forEach((value, key) => {
    console.log("key is " + key);
    if (key == "resume")
      previewHTML += `<strong>${key}:</strong> ${value.name}<br>`;
    if (key != "photo" && key != "resume" && key != "address" && key != "address2")
      previewHTML += `<strong>${key}:</strong> ${value}<br>`;

    if(key == "address")
    {
      // Add the Address Preview
  var addressLine1 = document.getElementById("addressline1").value;
  var addressLine2 = document.getElementById("addressline2").value;
  var address = addressLine1 + ", "+ addressLine2;
      previewHTML += `<strong>Address: </strong>${address}<br>`;
    }
  });


  
 
  // Add photo preview
  const photoInput = document.getElementById('photo');
  const photoFile = photoInput.files[0];
  if (photoFile) {
    previewHTML += `<strong>Photo:</strong><br><img src="${URL.createObjectURL(photoFile)}" style="max-width: 100%; max-height: 200px;"><br>`;
  }

  // Add Submit and Cancel buttons
  previewHTML += `<button onclick="submitForm()">Submit</button>&nbsp`;
  previewHTML += `<button onclick="closePreview()">Cancel</button>`;

  // Display preview in dialog box
  const previewContent = document.getElementById('previewContent');
  previewContent.innerHTML = previewHTML;
  document.getElementById('previewDialog').style.display = 'block';

  return false;
}

function submitForm() {
  // Handle form submission here
  

  setTimeout(function(){
    alert('Form submitted successfully!');
    document.getElementById('previewDialog').style.display = 'none';
  },100);
  window.location.reload();
}

function closePreview() {
  document.getElementById('previewDialog').style.display = 'none';
}

//  Form Validtions from here

function validationForm() {
  var fullName = document.getElementById("fullname").value;
  var Address1 = document.getElementById("addressline1").value;
  var Address2 = document.getElementById("addressline2").value;
  var gender = document.getElementById("Gender").value;
  var companyName = document.getElementById("company").value;
  var Status = document.querySelector('input[name="status"]:checked');
  var Exp1 = document.getElementById("experience1").value;
  var Phone = document.getElementById("contact").value;
  var Photo = document.getElementById("photo").value;
  var Resume = document.getElementById("resume").value;
  var isValid = true;
  clearErrorMessages();

  if (fullName.trim() === "") {
    document.getElementById("full-name-error").innerHTML = "Please enter the Full Name.";
    isValid = false;
  }
  if (Address1.trim() === "") {
    document.getElementById("address1-error").innerHTML = "Please enter the Address line1.";
    isValid = false;
  }
  if (Address2.trim() === "") {
    document.getElementById("address2-error").innerHTML = "Please enter the Address line2.";
     isValid = false;
  }
  if (gender === "") {
    document.getElementById("Gender-error").innerHTML = "Please Select the Gender.";
     isValid = false;
  }
  if (companyName.trim() === "") {
    document.getElementById("company-error").innerHTML = "Please fill the Comapny Name.";
    isValid = false;
  }
  if (!Status) {
    document.getElementById("status-error").innerHTML = "Please select the Status.";
    isValid = false;
  }
  if (Exp1.trim() === "" ||(!(/^\d+$/.test(Exp1.trim())))) {
    document.getElementById("experience1-error").innerHTML = "Please enter the experience in digits.";
     isValid = false;
  }
  if (!isValidPhone(Phone.trim())) {
    document.getElementById("contact-error").innerHTML = "Please enter the correct Contact Number.";
    isValid = false;
  }
  if (Photo.trim() === "") {
    document.getElementById("photo-error").innerHTML = "Please upload the photo.";
    isValid = false;
  }
  if (Resume.trim() === "") {
    document.getElementById("resume-error").innerHTML = "Please upload your Resume.";
    isValid = false;
  }
  // console.log(isValid);
  return isValid;
}


function clearErrorMessages() {
  var errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function (element){
  element.innerHTML = "";
  });
}

//Add event listeners to clear error messages on input change
document.getElementById("fullname").addEventListener("input", clearErrorMessages); 
document.getElementById("addressline1").addEventListener("input", clearErrorMessages); 
document.getElementById("addressline2").addEventListener("input", clearErrorMessages); 
document.getElementById("Gender").addEventListener("change", clearErrorMessages); 
document.getElementById("company").addEventListener("input", clearErrorMessages); 
document.querySelectorAll('input[name="status"]').forEach(function(radio) { 
  radio.addEventListener("change", clearErrorMessages); 
}); 
document.getElementById("experience1").addEventListener("input", clearErrorMessages);
document.getElementById("contact").addEventListener("input", clearErrorMessages); 
document.getElementById("photo").addEventListener("input", clearErrorMessages); 
document.getElementById("resume").addEventListener("input", clearErrorMessages);

function isValidPhone(Phone) {
  var phonePattern = /^\d{10}$/;
  return phonePattern.test(Phone);
}

function onclickPreview() {
  if (validationForm()) {
    previewForm();
  }
}

function setExpToZero()
{

  var YearsOfExpInput = document.getElementById("experience1");
  var fresherRadioButton = document.getElementById("fresher");

  if(fresherRadioButton.checked)
  {
    YearsOfExpInput.value="0";
    YearsOfExpInput.disabled = true;
  }
  else{
    YearsOfExpInput.value = "";
    YearsOfExpInput.disabled = false;
  }
  
}
