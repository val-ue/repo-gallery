const profile = document.querySelector(".overview");
//where profile information will appear
const username = "val-ue";
//github username
const repoList = document.querySelector(".repo-list");

const gitInfo = async function () {
    const infoRequest = await fetch(`https://api.github.com/users/${username}`);
    const info = await infoRequest.json();
    displayData(info);
};

gitInfo();

const displayData = function (info) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${info.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${info.name}</p>
            <p><strong>Bio:</strong> ${info.bio}</p>
            <p><strong>Location:</strong> ${info.location}</p>
            <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
        </div>
    `;
    profile.append(div);
    getRepos();
};

const getRepos = async function () {
    const gitRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repodata = await gitRepos.json();
    getRepoInfo(repodata);
};

const getRepoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};