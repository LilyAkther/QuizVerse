
const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const role = document.getElementById("role").value;
    const message = document.getElementById("message");

    if (password.length < 6) {
        message.style.color = "red";
        message.textContent = "Password must contain at least 6 characters.";
        return;
    }

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("quizVerseUsers") || "[]");

    const existingUser = users.find(function (user) {
        return user.email === email;
    });

    if (existingUser) {
        message.style.color = "red";
        message.textContent = "Email already registered. Please login.";
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password,
        role: role
    });

    localStorage.setItem("quizVerseUsers", JSON.stringify(users));

    message.style.color = "green";
    message.textContent = "Account created successfully! Please login.";

    signupForm.reset();

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1000);
});