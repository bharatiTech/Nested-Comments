export class Comment {
  constructor() {
    this.content = "";
  }

  setText(text) {
    this.content = text;
  }

  addReply(topCommentId) {
    let replyDiv = document.createElement("div");
    let replyText = document.createElement("i");

    replyDiv.setAttribute(
      "id",
      `REPLY_${Math.random().toFixed(2)}_${topCommentId}`
    );
    replyDiv.setAttribute(
      "style",
      "display: flex; flex-direction: column; margin-left: 20px;"
    );
    replyText.innerText = this.content;
    let replyItems = this.createReplyInput(topCommentId, replyDiv);

    replyDiv.appendChild(replyText);
    replyDiv.appendChild(replyItems);
    return replyDiv;
  }
}

export default class RedditComment extends Comment {
  constructor(targetContainer) {
    super();
    this.targetContainer = targetContainer;
  }

  addComment(text) {
    let topCommentDiv = document.createElement("div");
    let topComment = document.createElement("i");

    topCommentDiv.setAttribute("class", "comment");

    topComment.innerText = text;
    topComment.setAttribute("id", `commentId_${Math.random().toFixed(5)}`);

    let replyItems = this.createReplyInput(topComment.id, topCommentDiv);

    topCommentDiv.appendChild(topComment);
    topCommentDiv.appendChild(replyItems);

    this.targetContainer.appendChild(topCommentDiv);
  }

  createReplyInput(commentId, target) {
    let replyInputDiv = document.createElement("div");
    let replyButton = document.createElement("small");
    let replyInput = document.createElement("input");
    let replySendButton = document.createElement("button");
    let deleteButton = document.createElement("img");

    replyInputDiv.setAttribute("style", "display: flex; flex-direction: row");

    replyInput.setAttribute("class", "displayNone");
    replyInput.onchange = (event) => {
      this.setText(event.target.value);
    };

    replyButton.innerText = "reply";
    replyButton.setAttribute("style", "cursor: pointer; color: lightgreen");
    replyButton.onclick = () => {
      replyInput.setAttribute("class", "displayBlock");
      replySendButton.setAttribute("class", "displayBlock");
    };

    replySendButton.setAttribute("class", "displayNone");
    replySendButton.innerText = "send";
    replySendButton.onclick = () => {
      let replyDiv = this.addReply(commentId);
      target.appendChild(replyDiv);
      replyInput.setAttribute("class", "displayNone");
      replySendButton.setAttribute("class", "displayNone");
    };

    deleteButton.src = "./images/replyDeleteFilled.png";
    deleteButton.classList.add("icons");
    deleteButton.addEventListener("click", () => {
      console.log("to delete: ", this.targetContainer, replyInputDiv);
    });

    replyInputDiv.appendChild(replyButton);
    replyInputDiv.appendChild(replyInput);
    replyInputDiv.appendChild(replySendButton);
    replyInputDiv.appendChild(deleteButton);

    return replyInputDiv;
  }
}
