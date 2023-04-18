const profile = document.querySelector(".overview");
//where profile information will appear
const username = "val-ue";
//github username
const repoList = document.querySelector(".repo-list");
//shows list of repos
const clickRepo = document.querySelector(".repos");
//section where repo information appears
const soloRepo = document.querySelector(".repo-data");
//where individual repo data appears

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

repoList.addEventListener("click", function (e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificInfo(repoName);
    }
});

const specificInfo = async function(repoName) {
    const grabSpecifics = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await grabSpecifics.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    //list of languages
    const languages = [];

    for (const language in languageData) {
        languages.push(language);
    }

    displaySpecificInfo(repoInfo, languages);
};

const displaySpecificInfo = function (repoInfo, languages) {
    soloRepo.innerHTML = "";
    soloRepo.classList.remove("hide");
    clickRepo.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    soloRepo.append(div);
};