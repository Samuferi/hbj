document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    lastname: document.getElementById("lastname").value,
    firstname: document.getElementById("firstname").value,
    email: document.getElementById("email").value,
    "post-number": document.getElementById("post-number").value,
    town: document.getElementById("town").value,
    address: document.getElementById("address").value,
    "phone-number": document.getElementById("phone-number").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Sikeres regisztráció!");
      window.location.href = "/login";
    } else {
      alert("❌ Hiba: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("⚠️ Hálózati hiba!");
  }
});
