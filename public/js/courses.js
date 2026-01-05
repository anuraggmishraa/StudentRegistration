const myCourse = localStorage.getItem("userCourse")
const myCourseDiv = document.getElementById("myCourse")

if (myCourse && myCourse !== "undefined") {
  myCourseDiv.innerText = myCourse
} else {
  myCourseDiv.innerText = "No course registered"
}

fetch("/users")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("userList")
    list.innerHTML = ""

    data.forEach(u => {
      if (u.course) {
        list.innerHTML += `<li>${u.email} - ${u.course}</li>`
      }
    })
  })

function logout() {
  localStorage.clear()
}
