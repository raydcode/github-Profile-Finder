import * as v from './variables.js';

export async function getGithubUser(username) {
  const response = await fetch(v.apiUrl + username);
  const data = await response.json();

  if (!response.ok) {
    errorMessage('User not found, Try again');
  } else {
    displayUserData(data);
    getUserRepos(username);
  }
}

async function getUserRepos(username) {
  const response = await fetch(v.apiUrl + username + '/repos');
  const data = await response.json();

  displayRepos(data);
}

export function errorMessage(msg) {
  v.profile.innerHTML = '';
  document.querySelector('.hide').style.display = 'none';
  return (v.repos.innerHTML = `<p class="alert alert-danger">${msg}</p>`);
}

function displayUserData(data) {
  const template = `
      <img class="img-thumbnail rounded-circle" src="${data.avatar_url}" alt="${data.name}"/>
      <h2>${data.name}</h2>
      <p>${data.login}</p>
      <p>${data.bio}</p>
      <div class="d-grid">
      <a href="${data.html_url}" target="_blank" class="btn btn-outline-secondary">View Profile</a>
      </div>
      <p class="pt-2">
       <span>Followers: ${data.followers}</span>
       <span>Following: ${data.following}</span>
      </p>
      <p>Public Repos: ${data.public_repos}</p>
      <p><i class="fas fa-marker-alt"></i>${data.location}</p>
    `;

  v.profile.innerHTML = template;
}

function displayRepos(data) {
  let repo_data = data.map((repo) => {
    return `
         
         <span class="repo border border-rounded p-3>

         <a href="${repo.html_url}" target="_blank">${repo.name}</a>
         <p>
         <strong>⭐${repo.stargazers_count}</strong>
         <strong>👁️${repo.watchers_count}</strong>
         <strong>🫕${repo.forks_count}</strong>
         
         </p>
         
         
         
         </span>
        
        `;
  });

  v.repos.innerHTML = repo_data.slice(0, 8).join('');
  document.querySelector('.hide').style.display = 'block';
}
