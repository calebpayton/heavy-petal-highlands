const form = document.querySelector(".contact-form");
const status = form.querySelector(".form-status");
const button = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  button.disabled = true;
  status.textContent = "Sending...";
  status.dataset.state = "";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Request failed");
    }

    form.reset();
    status.textContent = "Thanks! Your message has been sent.";
    status.dataset.state = "success";
  } catch (error) {
    status.textContent = "Sorry, something went wrong. Please try again.";
    status.dataset.state = "error";
  } finally {
    button.disabled = false;
  }
});
