const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    lastname: document.getElementById("lastname-input").value,
    firstname: document.getElementById("firstname-input").value,
    "post-number": document.getElementById("post-number-input").value,
    town: document.getElementById("town-input").value,
    address: document.getElementById("address-input").value,
    "phone-number": document.getElementById("phone-number-input").value,
    email: document.getElementById("email-input").value,
    password: document.getElementById("password-input").value
  };

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);

    if (res.ok) {
      window.location.href = "login.html";
    }
  } catch (err) {
    console.error(err);
    alert("Hiba történt a regisztráció során");
  }
});
