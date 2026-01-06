document.addEventListener("DOMContentLoaded", async () => {
  const courseSelect = document.getElementById("course");
  if (!courseSelect) return;

  try {
    const res = await fetch("/courses");
    const courses = await res.json();

    courseSelect.innerHTML = `<option value="">Select Course</option>`;

    courses.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.name;
      opt.textContent = `${c.name} (${c.duration})`;
      courseSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Course load error:", err);
  }
});

document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const course = document.getElementById("course").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, course })
  });

  const data = await res.json();
  alert(data.message);
});
