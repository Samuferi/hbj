const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    lastname: document.getElementById("lastname").value,
    firstname: document.getElementById("firstname").value,
    "post-number": document.getElementById("post-number").value,
    town: document.getElementById("town").value,
    address: document.getElementById("address").value,
    "phone-number": document.getElementById("phone-number").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
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
      window.location.href = "/login";
    }
  } catch (err) {
    console.error(err);
    alert("Hiba történt a regisztráció során");
  }
});
