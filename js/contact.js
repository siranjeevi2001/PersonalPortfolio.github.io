const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMsg = document.getElementById("successMsg");
const submitBtn = document.getElementById("submitBtn");

// ---------- Load saved data on page load ----------
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("contactData"));

  if (saved) {
    nameInput.value = saved.name || "";
    emailInput.value = saved.email || "";
    messageInput.value = saved.message || "";
  }

  checkFormValidity(); // enable button if needed
});

// ---------- Auto-save to localStorage on input ----------
[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener("input", () => {           // Event remember this point 
    saveToLocalStorage();
    validateField(input);
    checkFormValidity();
  });
});

function saveToLocalStorage() {
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem("contactData", JSON.stringify(data));
}

// ---------- Form Submit ----------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid =
    validateField(nameInput) &&
    validateField(emailInput) &&
    validateField(messageInput);

  if (!isValid) return;

  successMsg.textContent = "Message sent successfully!";
  successMsg.classList.remove("hidden");

  form.reset();
  submitBtn.disabled = true;

  // Clear data after submit (your original logic)
  // localStorage.removeItem("contactData");
});

// ---------- Validation Logic ----------
function validateField(input) {
  let value = input.value.trim();
  let errorMessage = "";

  if (input.id === "name") {
    if (value.length < 3) errorMessage = "Name must be at least 3 characters";
  }

  if (input.id === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) errorMessage = "Enter a valid email";   
  }

  if (input.id === "message") {
    if (value.length < 10) errorMessage = "Message must be at least 10 characters";
  }

  const errorElement = input.parentElement.querySelector(".error");

  if (errorMessage) {
    errorElement.textContent = errorMessage;
    errorElement.classList.remove("hidden");
    return false;
  } else {
    errorElement.textContent = "";
    errorElement.classList.add("hidden");
    return true;
  }
}

// ---------- Disable Submit Button Until Valid ----------
function checkFormValidity() {
  const valid =
    nameInput.value.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()) &&
    messageInput.value.trim().length >= 10;

  submitBtn.disabled = !valid;
}
