
/* ---------- Local Project Data ---------- */
const projectData = [
    {
    title: "CLI-based TODO List Manager",
    desc: "CRUD To-Do list application using Python.",
    link: "#"
  },
    {
    title: "Shell Script",
    desc: "System Log Analyzer & Backup Script",
    link: "#"
  },
  {
    title: "HTTP Request Tracer & Documentation",
    desc: "equest flow: Browser → DNS → Server →Response.",
    link: "#"
  }
];

/* ---------- Render Local Projects ---------- */
function loadProjects() {
  const container = document.getElementById("projects-container");

  container.innerHTML = projectData.map(project => `
      <div class="project-card">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <a href="${project.link}" target="_blank">View Project →</a>
      </div>
    `)
    .join("");
}

loadProjects();


/* ---------- Fetch GitHub Repositories ---------- */
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

fetchGitHubRepos();
