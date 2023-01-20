class CommentElements {
  constructor(commentText) {
    this.commentText = commentText;
  }

  createCommentContainer() {
    let container = document.createElement("div");
    container.setAttribute("id", crypto.randomUUID());
    container.classList.add("commentContainer");
    return container;
  }

  createCommentContents() {
    let replyText = document.createElement("p");
    let replyButton = document.createElement("b");
    let deleteButton = document.createElement("img");

    replyText.innerText = this.commentText;

    deleteButton.src = "./images/replyDeleteFilled.png";
    deleteButton.classList.add("icons");

    replyButton.classList.add("replyButton");
    replyButton.innerText = "reply";
    replyButton.appendChild(deleteButton);

    return {
      replyText,
      deleteButton,
      replyButton,
    };
  }
}

export default class NestedComments extends CommentElements {
  constructor(text, parent) {
    super();
    this.text = text;
    this.parent = parent;
  }

  addComment() {
    let root = document.getElementById("comments-section");
    let commentElementObject = new CommentElements();
    let replyDiv = commentElementObject.createCommentContainer();

    if (this.parent === undefined && this.text !== "") {
      this.parent = root;
      let obj = this.createElements(replyDiv);
      this.parent.appendChild(obj);
      this.parent = obj;
    } else {
      if (this.text !== "") {
        const comment = new NestedComments(this.text, this.parent);
        comment.parent.appendChild(this.createElements(replyDiv));
        this.parent.appendChild(comment.parent);
        this.parent = comment.parent;
      }
    }
  }

  createElements(replyDiv) {
    let commentElementObject = new CommentElements(this.text);
    let elements = commentElementObject.createCommentContents();

    let replyText = elements.replyText;
    let deleteButton = elements.deleteButton;
    let replyButton = elements.replyButton;

    replyButton.addEventListener("click", () => {
      this.text = prompt("Enter reply here");
      if (this.text !== "") {
        this.parent = replyDiv;
        this.addComment();
      }
    });

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const confirm = window.confirm("Are you sure to delete?");
      if (confirm) {
        replyDiv.remove();
      }
    });

    replyDiv.appendChild(replyText);
    replyDiv.appendChild(replyButton);

    return replyDiv;
  }
}
