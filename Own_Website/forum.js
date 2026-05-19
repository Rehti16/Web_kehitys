const forumForm = document.getElementById("forum-form");
const threadsContainer = document.getElementById("forum-threads-container");

document.addEventListener("DOMContentLoaded", loadForumPosts);

forumForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("forum-title").value;
  const author = document.getElementById("forum-author").value;
  const content = document.getElementById("forum-content").value;

  const newPost = {
    title: title,
    author: author,
    content: content,
    date: new Date().toLocaleDateString(),
  };

  saveForumPost(newPost);
  renderForumPost(newPost);

  forumForm.reset();
});

function renderForumPost(post) {
  const postCard = document.createElement("div");
  postCard.classList.add("forum-post");

  postCard.innerHTML = `
        <h4>${post.title}</h4>
        <div class="meta-data">Posted by <strong>${post.author}</strong> on ${post.date}</div>
        <p>${post.content}</p>
    `;

  threadsContainer.insertBefore(postCard, threadsContainer.firstChild);
}

function saveForumPost(post) {
  let posts = localStorage.getItem("global-forum-posts")
    ? JSON.parse(localStorage.getItem("global-forum-posts"))
    : [];
  posts.push(post);
  localStorage.setItem("global-forum-posts", JSON.stringify(posts));
}

function loadForumPosts() {
  let posts = localStorage.getItem("global-forum-posts")
    ? JSON.parse(localStorage.getItem("global-forum-posts"))
    : [];

  posts.forEach(renderForumPost);
}
