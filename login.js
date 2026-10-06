
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const message = document.getElementById("message");

    const users = JSON.parse(localStorage.getItem("quizVerseUsers") || "[]");

    const user = users.find(function (item) {
        return item.email === email &&
            item.password === password &&
            item.role === role;
    });

    if (!user) {
        message.style.color = "red";
        message.textContent = "Invalid email, password, or role.";
        return;
    }

    localStorage.setItem("quizVerseCurrentUser", JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role
    }));

    message.style.color = "green";
    message.textContent = "Login successful!";

    setTimeout(function () {
        if (user.role === "Teacher") {
            window.location.href = "teacher-dashboard.html";
        } else {
            window.location.href = "student-dashboard.html";
        }
    }, 700);
});