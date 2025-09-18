const username = "SanjeetBalamurugan";

const profileImg = document.getElementById('profile-img');
const usernameEl = document.getElementById('username');
const repoTableBody = document.querySelector('#repo-table tbody');

// Fetch GitHub profile info
fetch(`https://api.github.com/users/${username}`)
  .then(res => res.json())
  .then(user => {
    profileImg.src = user.avatar_url;
    usernameEl.textContent = user.name || user.login;
  })
  .catch(err => console.error('Error fetching profile:', err));

// Fetch repositories
fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(repos => {
    if (!Array.isArray(repos)) return;
    repos.forEach(repo => {
      const tr = document.createElement('tr');

      // Repo Name
      const nameTd = document.createElement('td');
      const a = document.createElement('a');
      a.href = repo.html_url;
      a.textContent = repo.name;
      a.target = "_blank";
      a.classList.add('repo-name');
      nameTd.appendChild(a);

      // Description (truncated)
      const descTd = document.createElement('td');
      descTd.textContent = repo.description ? repo.description.substring(0, 80) : '';
      descTd.classList.add('repo-desc');

      // Stars
      const starsTd = document.createElement('td');
      starsTd.textContent = repo.stargazers_count;

      // Append columns to row
      tr.appendChild(nameTd);
      tr.appendChild(descTd);
      tr.appendChild(starsTd);

      // Append row to table body
      repoTableBody.appendChild(tr);
    });
  })
  .catch(err => console.error('Error fetching repos:', err));
