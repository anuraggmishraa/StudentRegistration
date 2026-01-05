function register() {
  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      course: course.value
    })
  })
  .then(res => res.json())
  .then(() => alert("Registered Successfully"))
}
