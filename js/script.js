const profile = document.querySelector(".overview");
//where profile information will appear
const username = "val-ue";

const gitInfo = async function () {
    const infoRequest = await fetch(`https://api.github.com/users/${username}`);
    const info = await infoRequest.json();
    console.log(info);
    displayData(info);
};

gitInfo();

const displayData = function (info) {
    const div = document.createElement("div");
     div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${info.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${info.name}</p>
            <p><strong>Bio:</strong> ${info.bio}</p>
            <p><strong>Location:</strong> ${info.location}</p>
            <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
        </div>`;
    profile.append(div);
 };