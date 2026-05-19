const commentForm = document.getElementById("comment-form");
const commentsContainer = document.getElementById("comments-container");

document.addEventListener("DOMContentLoaded", loadComments);

commentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("comment-name").value;
  const text = document.getElementById("comment-text").value;

  const comment = {
    name: name,
    text: text,
    date: new Date().toLocaleDateString(),
  };

  saveComment(comment);
  renderComment(comment);

  commentForm.reset();
});

function renderComment(comment) {
  const div = document.createElement("div");
  div.classList.add("comment");
  div.innerHTML = `
        <strong>${comment.name}</strong> 
        <small style="color: #777; margin-left: 10px;">${comment.date}</small>
        <p style="margin-top: 8px; color: #333; line-height: 1.4;">${comment.text}</p>
    `;
  commentsContainer.appendChild(div);
}

function saveComment(comment) {
  let comments = localStorage.getItem("alps-comments")
    ? JSON.parse(localStorage.getItem("alps-comments"))
    : [];
  comments.push(comment);
  localStorage.setItem("alps-comments", JSON.stringify(comments));
}

function loadComments() {
  let comments = localStorage.getItem("alps-comments")
    ? JSON.parse(localStorage.getItem("alps-comments"))
    : [];
  comments.forEach(renderComment);
}
