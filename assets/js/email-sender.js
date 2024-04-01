(function () {
  "use strict";

  var form = document.getElementById("email-form");

  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    this.querySelector(".loading").classList.add("d-block");
    status.innerHTML = "";
    var data = new FormData(event.target);
    data.append("source", "rjeprasad.com");
    data.append("receiver", "rjeprasad@gmail.com");
    data.append("receiverName", "Rajeev Prasad");

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          this.querySelector(".loading").classList.remove("d-block");
          status.innerHTML =
            '<p style="color:green;">Your message has been sent. Thank you!</p>';
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              this.querySelector(".loading").classList.remove("d-block");
              status.innerHTML =
                '<p style="color:red;">Oops! There was a problem sending this email.</p>';
            }
          });
        }
      })
      .catch((error) => {
        this.querySelector(".loading").classList.remove("d-block");
        status.innerHTML =
          '<p style="color:red;">Oops! There was a problem sending this email.</p>';
      });
  }
  form.addEventListener("submit", handleSubmit);
})();
