let postWrapper = document.querySelector("#post-wrapper");
let postBox = [];
let firstPostBox = [];
let clearPost = document.querySelector(".clear-post");
let createPostForm = document.querySelector("#create-post-form");
let postTitle = document.querySelector("#post-title");
let postMessage = document.querySelector("#post-message");
let deletePost = document.querySelector("#delete-post");

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            postBox = data
            updateHTML(postBox);
        })  
}

getPosts();

createPostForm.addEventListener("submit", createPost);

function createPost(event) {
    event.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify({
            userId: 3,
            title: postTitle.value,
            body: postMessage.value
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.title !== "" && data.body !== "") {
                postBox.unshift(data);
            } 

            updateHTML(postBox);
        })
}

function deleteMyPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then(() => {
            postBox = postBox.filter(post => post.id !== id);

            updateHTML(postBox);
        })
}

function updateMyPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            userId: 3,
            title: postTitle.value,
            body: postMessage.value
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let postTitles = document.querySelectorAll(".post-title");
        let postMessages = document.querySelectorAll(".post-body");

        postTitles.forEach((postTitle, index) => {
            if (index + 1 === id) {
                if (data.title !== "") {
                    postTitle.innerHTML = data.title;
                }
            }
        })

        postMessages.forEach((postMessage, index) => {
            if (index + 1 === id) {
                if (data.body !== "") {
                    postMessage.innerHTML = data.body;
                }
            }
        })
    })
}

function viewMyPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem('viewedPost', JSON.stringify(data));
            window.location.href = 'single-post.html';
        })
}

function updateHTML (array) {
    let postHandler = '';

    array.forEach(post => {
        postHandler += `<div class="col-md-4 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <p>${post.id}</p>
                                    <h6 class="post-title">${post.title}</h6>
                                    <p class="post-body">${post.body}</p>
                                    <div class="d-flex justify-content-between">
                                        <button onclick="updateMyPost(${post.id})" class="btn btn-primary">Update</button>
                                        <button onclick="viewMyPost(${post.id})" class="btn btn-success">View</button>
                                        <button onclick="deleteMyPost(${post.id})" class="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>`
    });

    postWrapper.innerHTML = postHandler;
}

clearPost.addEventListener('submit', clearMyPost);

function clearMyPost(e) {
    e.preventDefault();

    clearPost.reset();
} 