import RedditComment from "./script.js";
import NestedComments from "./redditComments.js";

// Previous working code
// ------------------------------------
const container = document.getElementById("container");
const inputComment = document.getElementById("inputComment");
const postCommentButton = document.getElementById("postCommentButton");
let rootComment = "";

// inputComment.onchange = (event) => {
//   rootComment = event.target.value;
// };

// postCommentButton.addEventListener("click", () => {
//   if (rootComment !== "") {
//     const object = new RedditComment(container);
//     object.addComment(rootComment);
//   }
// });
// -------------------------------------

const commentSection = document.getElementById("comments-section");
const commentTextInput = document.getElementById("input-field");
const commentSaveButton = document.getElementById("submit-button");

let commentContent = "";
commentTextInput.addEventListener("change", (event) => {
  commentContent = event.target.value;
});

commentSaveButton.addEventListener("click", () => {
  const object = new NestedComments(commentContent);
  object.addComment();
});

