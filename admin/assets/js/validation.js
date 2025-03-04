function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.getElementsByTagName("input");
  let isValid = true;

  for (let input of inputs) {
    if (!input.value.trim()) {
      isValid = false;
      alert("All fields are required!");
      break;
    }
  }

  return isValid;
}
