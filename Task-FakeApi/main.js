let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

function getRepos() {
  fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => response.json())

    .then((posts) => {
      reposData.innerHTML = "";
      posts.forEach((post) => {
        let mainDiv = document.createElement("div");
        let postID = document.createTextNode(post.id);
        mainDiv.appendChild(postID);
        reposData.appendChild(mainDiv);

        let userId = document.createElement("span");
        let userIdText = document.createTextNode(`UserId: ${post.userId}`);
        userId.appendChild(userIdText);
        reposData.appendChild(userId);

        let titleSpan = document.createElement("span");
        let titleSpanText = document.createTextNode(`Title: ${post.title}`);
        titleSpan.appendChild(titleSpanText);
        reposData.appendChild(titleSpan);

        let bodySpan = document.createElement("span");
        let bodySpanText = document.createTextNode(`Body: ${post.body}`);
        bodySpan.appendChild(bodySpanText);
        reposData.appendChild(bodySpan);
        mainDiv.className = "repo-box";
        mainDiv.appendChild(userId);
        mainDiv.appendChild(titleSpan);
        mainDiv.appendChild(bodySpan);
      });
    });
}
