
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const sendButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    sendButton.disabled = true;
    sendButton.textContent = "Sending...";

    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            formStatus.textContent =
                "Thank you! Your message has been sent successfully.";

            formStatus.classList.add("success");
            contactForm.reset();
        } else {
            formStatus.textContent =
                "Sorry, your message could not be sent. Please try again.";

            formStatus.classList.add("error");
        }
    } catch (error) {
        formStatus.textContent =
            "Something went wrong. Please check your connection and try again.";

        formStatus.classList.add("error");
    } finally {
        sendButton.disabled = false;
        sendButton.textContent = "Send Message";
    }
});
