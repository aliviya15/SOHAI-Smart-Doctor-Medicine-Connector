
document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.querySelector(".prescription-upload-box");
    const fileInput = document.getElementById("rx-file");
    const previewContainer = document.querySelector(".file-preview-static");
    const uploadBtn = document.querySelector("button:not(.ghost)"); // The "Send" button

    // Add Toast Container (Reuse same logic or check if exists)
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }

    // Add Progress Bar dynamically
    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-container";
    progressContainer.innerHTML = '<div class="progress-bar"></div>';
    dropZone.insertBefore(progressContainer, uploadBtn);

    // Drag & Drop Events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('drag-active'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-active'), false);
    });

    dropZone.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFiles);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files: files } });
    }

    function handleFiles(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            showPreview(file);
            uploadBtn.disabled = false;
            showToast("File Selected", `Ready to upload: ${file.name}`, "info");
        }
    }

    function showPreview(file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                previewContainer.innerHTML = `
            <div style="display: flex; gap: 15px; align-items: center;">
                <img src="${reader.result}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">
                <div>
                    <p style="margin: 0; font-weight: 600;">${file.name}</p>
                    <p class="muted" style="margin: 0; font-size: 12px;">${(file.size / 1024).toFixed(1)} KB</p>
                </div>
            </div>`;
            }
        } else {
            previewContainer.innerHTML = `
            <div style="display: flex; gap: 15px; align-items: center;">
                <div style="font-size: 40px;">📄</div>
                <div>
                    <p style="margin: 0; font-weight: 600;">${file.name}</p>
                    <p class="muted" style="margin: 0; font-size: 12px;">${(file.size / 1024).toFixed(1)} KB</p>
                </div>
            </div>`;
        }
    }

    // Upload Simulation
    uploadBtn.addEventListener("click", () => {
        uploadBtn.disabled = true;
        uploadBtn.innerText = "Uploading...";
        progressContainer.style.display = "block";
        const progressBar = progressContainer.querySelector(".progress-bar");

        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                finishUpload();
            } else {
                width += Math.random() * 10;
                if (width > 100) width = 100;
                progressBar.style.width = width + "%";
            }
        }, 200);
    });

    function finishUpload() {
        // Success State
        uploadBtn.innerHTML = "Sent to Pharmacy! <span class='check-animation'>✓</span>";
        uploadBtn.style.background = "#059669";

        showToast("Uploaded Successfully", "Your prescription has been sent to nearby pharmacies.");

        // Reset after a few seconds
        setTimeout(() => {
            uploadBtn.innerText = "Send to Pharmacy (Demo)";
            uploadBtn.style.background = ""; // reset to CSS default
            uploadBtn.disabled = true; // wait for new file
            progressContainer.style.display = "none";
            progressContainer.querySelector(".progress-bar").style.width = "0%";
        }, 5000);
    }

    function showToast(title, message, type = "success") {
        // Check if handle by appointments.js's global container if present, 
        // but safer to implement local simple version or look for container.
        // Re-implementing simplified version to be safe:

        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        const icon = type === "success" ? "✅" : (type === "info" ? "ℹ️" : "⚠️");

        toast.innerHTML = `
         <div style="font-size: 20px;">${icon}</div>
         <div>
           <h4>${title}</h4>
           <p>${message}</p>
         </div>
       `;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = "slideOut 0.4s forwards";
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }
});
