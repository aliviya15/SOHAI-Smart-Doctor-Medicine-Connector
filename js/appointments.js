


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-area");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, select, textarea");
    let valid = true;
    let firstError = null;

    inputs.forEach(input => {
      
      input.style.borderColor = "#cbd5e1";

 
      if (input.type === "submit") return;

     
      if (input.value.trim() === "") {
        input.style.borderColor = "red";
        valid = false;
        if (!firstError) firstError = input;
      }
    });

    if (!valid) {
      alert("Please fill all required fields.");
      if (firstError) firstError.focus();
      return;
    }


    alert("Appointment request submitted (demo).");
    form.reset();

   
    inputs.forEach(input => {
      input.style.borderColor = "#cbd5e1";
    });
  });
});
