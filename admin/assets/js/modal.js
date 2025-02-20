// File Path: admin/assets/js/modal.js

function showModal(title, content) {
  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button onclick="closeModal(this)" class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

  document.body.appendChild(modal);
}

function closeModal(btn) {
  btn.closest(".modal").remove();
}
