// Contact Form Validation
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            const formMsg = document.getElementById("form-msg");

            if (!name || !email || !message) {
                formMsg.textContent = "Please fill all fields.";
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                formMsg.textContent = "Please enter a valid email address.";
                return;
            }
            formMsg.textContent = "Message sent successfully!";
            form.reset();
        });
    }
});

// Fetch GitHub Repositories
function fetchGitHubRepos(username = "siranjeevi2001") {
    const repoList = document.getElementById("repo-list");
    if (!repoList) return;

    repoList.innerHTML = "Loading...";

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => {
            if (!res.ok) throw new Error("User not found");
            return res.json();
        })
        .then(data => {
            repoList.innerHTML = "";
            data.forEach(repo => {
                const div = document.createElement("div");
                div.className = "repo";
                div.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
                repoList.appendChild(div);
            });
        })
        .catch(err => {
            repoList.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        });
}