let form = document.querySelector("#form");
let title = document.querySelector("#title");
let body = document.querySelector("#body");
let posts = document.querySelector(".posts");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (title.value === "" || body.value === "") {
    alert("All fields are mandatory!");
  } else {
    acceptData();
  }
};

let data = [];
let acceptData = () => {
  data.push({
    postTitle: title.value,
    postBody: body.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  createPosts();
};

let createPosts = () => {
  posts.innerHTML = "";
  data.map((x, y) => {
    return (posts.innerHTML += `
      <div class="post container border py-3 px-4 my-3" id=${y}>
        <h3>${x.postTitle}</h3>
        <p>${x.postBody}</p>
        <span class="options">
            <i onClick="editPost(this)" class="fa-solid fa-pen"></i>
            &nbsp;&nbsp;
            <i onClick="deletePost(this)" class="fa-solid fa-trash"></i>
        </span>
      </div>
    `);
  });
  resetForm();
};

let resetForm = () => {
  title.value = "";
  body.value = "";
};

let deletePost = (e) => {
  let sure = confirm("Are you sure you want to delete this post?");
  if (!sure) {
    return;
  } else {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
  }
};

let editPost = (e) => {
  let selectedPost = e.parentElement.parentElement;
  title.value = selectedPost.children[0].innerHTML;
  body.value = selectedPost.children[1].innerHTML;
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createPosts();
})();
