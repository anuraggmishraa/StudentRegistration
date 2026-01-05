function login() {
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value.trim(),
      password: password.value.trim()
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success === true) {
      localStorage.setItem("userEmail", data.email)
      localStorage.setItem("userCourse", data.course)
      window.location.href = "courses.html"
    } else {
      alert(data.message)
    }
  })
}
