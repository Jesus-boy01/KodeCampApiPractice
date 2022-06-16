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
            let postHolder = '';
            postBox.forEach(post => {
                postHolder += `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <p>${post.id}</p>
                                <h6 id="post-title">${post.title}</h6>
                                <p id="post-body">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-primary">Update</button>
                                    <button class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div> `
            });
            postWrapper.innerHTML = postHolder;
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
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            postBox.unshift(data);
            console.log(postBox);
            let postHandler = '';

            postBox.forEach(post => {
                postHandler += `<div class="col-md-4 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <p>${post.id}</p>
                                            <h6 id="post-title">${post.title}</h6>
                                            <p id="post-body">${post.body}</p>
                                            <div class="d-flex justify-content-between">
                                                <button class="btn btn-primary">Update</button>
                                                <button onclick="deleteMyPost(${post.id})" class="btn btn-danger">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
            });

            postWrapper.innerHTML = postHandler;
        })   
}

function deleteMyPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            postBox = postBox.filter(post => post.id !== id);
            console.log(postBox);

            let postHandler = '';

            postBox.forEach(post => {
                postHandler += `<div class="col-md-4 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <p>${post.id}</p>
                                            <h6 id="post-title">${post.title}</h6>
                                            <p id="post-body">${post.body}</p>
                                            <div class="d-flex justify-content-between">
                                                <button class="btn btn-primary">Update</button>
                                                <button onclick="deleteMyPost(${post.id})" class="btn btn-danger">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
            });

            postWrapper.innerHTML = postHandler;
        })
}

clearPost.addEventListener('submit', clearMyPost);

function clearMyPost(e) {
    e.preventDefault();

    clearPost.reset();
} 