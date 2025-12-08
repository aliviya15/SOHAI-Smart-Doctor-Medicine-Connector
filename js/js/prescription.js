

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.querySelector('input[type="file"]');
  const previewBox = document.getElementById("prescriptionPreview");
  const sendBtn = document.getElementById("sendPrescriptionBtn");

  let selectedFile = null;

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      selectedFile = this.files[0];

      if (selectedFile && previewBox) {
        previewBox.innerHTML = `
          <p><strong>Selected File:</strong> ${selectedFile.name}</p>
          <p class="muted">(Demo preview only)</p>
        `;
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      if (!selectedFile) {
        alert("Please upload a prescription first.");
        return;
      }

      alert("📨 Prescription sent to pharmacies!\n(Demo version)");
    });
  }
});
