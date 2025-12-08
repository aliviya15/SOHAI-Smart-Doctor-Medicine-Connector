
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-area");
  if (!form) return;

  // Add Toast Container
  const toastContainer = document.createElement("div");
  toastContainer.className = "toast-container";
  document.body.appendChild(toastContainer);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, select, textarea");
    let valid = true;
    let firstError = null;

    inputs.forEach(input => {
      // Reset styles
      input.style.borderColor = "#cbd5e1";
      input.style.transition = "0.2s";

      // Simple check: required validation logic
      if (input.type !== "submit" && input.value.trim() === "") {
        input.style.borderColor = "#ef4444";

        // Shake effect
        input.animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(-5px)' },
          { transform: 'translateX(5px)' },
          { transform: 'translateX(0)' }
        ], { duration: 300 });

        valid = false;
        if (!firstError) firstError = input;
      } else {
        input.style.borderColor = "#00BFA6";
      }
    });

    if (!valid) {
      showToast("Missing Information", "Please fill in all required fields to proceed.", "error");
      if (firstError) firstError.focus();
      return;
    }

    // Simulate API call
    const btn = form.querySelector("button");
    const originalText = btn.innerText;
    btn.innerText = "Booking...";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    setTimeout(() => {
      showToast("Success!", "Appointment booked successfully. We will call you shortly.");
      form.reset();

      // Reset button
      btn.innerText = originalText;
      btn.disabled = false;
      btn.style.opacity = "1";

      // Reset borders
      inputs.forEach(i => i.style.borderColor = "#cbd5e1");

    }, 1500);
  });

  /**
   * Show a beautiful toast notification
   */
  function showToast(title, message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icon = type === "success" ? "✅" : "⚠️";

    toast.innerHTML = `
        <div style="font-size: 20px;">${icon}</div>
        <div>
          <h4>${title}</h4>
          <p>${message}</p>
        </div>
      `;

    toastContainer.appendChild(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
      toast.style.animation = "slideOut 0.4s forwards";
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
});

