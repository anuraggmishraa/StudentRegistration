document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    // 🔥 THIS WAS MISSING
    localStorage.setItem("userCourse", data.course);
    window.location.href = "courses.html";
  } else {
    alert(data.message);
  }
});
