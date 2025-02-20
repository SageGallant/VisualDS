// File Path: admin/assets/js/validation.js

function validateLoginForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter both username and password");
    return false;
  }

  return true;
}

function validateUserForm() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirm_password")
    .value.trim();

  if (!username || !email) {
    alert("Please fill in all required fields");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return false;
  }

  return true;
}
