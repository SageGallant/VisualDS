// File Path: admin/assets/js/main.js

function showModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function hideModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function searchUsers() {
  const searchValue = document.getElementById("searchInput").value;
  const filterValue = document.getElementById("filterSelect").value;
  window.location.href = `?search=${encodeURIComponent(
    searchValue
  )}&filter=${encodeURIComponent(filterValue)}`;
}

function filterUsers() {
  const searchValue = document.getElementById("searchInput").value;
  const filterValue = document.getElementById("filterSelect").value;
  window.location.href = `?search=${encodeURIComponent(
    searchValue
  )}&filter=${encodeURIComponent(filterValue)}`;
}

function editUser(userId) {
  // Fetch user data using simple AJAX
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `get_user.php?id=${userId}`, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const user = JSON.parse(xhr.responseText);
      document.getElementById("editUserId").value = user.id;
      document.getElementById("editUserEmail").value = user.email;
      document.getElementById("editUserStatus").value = user.status;
      document.getElementById("editUserRole").value = user.role;
      showModal("editUserModal");
    }
  };
  xhr.send();
}

function deleteUser(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    const form = document.createElement("form");
    form.method = "POST";
    form.innerHTML = `
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="user_id" value="${userId}">
        `;
    document.body.appendChild(form);
    form.submit();
  }
}

function exportUsers() {
  window.location.href = "export_users.php";
}

// Simple form validation
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.onsubmit = function (e) {
      const requiredFields = form.querySelectorAll("[required]");
      let valid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });

      return valid;
    };
  });
});
