let postWrapper = document.querySelector("#post-wrapper");
let postBox = [];
let firstPostBox = [];
let createPostForm = document.querySelector("#create-post-form");
let postTitle = document.querySelector("#post-title");
let postMessage = document.querySelector("#post-message");
let deletePost = document.querySelector("#delete-post");

function getPosts () {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            postBox = data;
            // console.log(postBox);
            firstPostBox = postBox.slice(0, 9);
            let postHandler = '';

            firstPostBox.forEach(post => {
                postHandler += `<div class="col-lg-4">
                                    <div class="card mb-4">
                                        <div class="card-title">
                                            <div class="index">
                                                <p>${post.id}</p>
                                            </div>
                                            <p>${post.title}</p>
                                        </div>
                                        <div class="card-body px-0">
                                            <p>${post.body}</p>
                                        </div>
                                        <div class="card-buttons mt-3 d-flex justify-content-end">
                                            <div class="update-button">
                                                <button type="submit" class="btn btn-success me-2">Update</button>
                                            </div>
                                            <div class="delete-features-button" id="delete-post">
                                                <button type="submit" onclick="deleteMyPost(${post.id})" class="btn btn-danger">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                                        `
            });

            postWrapper.innerHTML = postHandler;
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
            console.log(postBox);
            postBox.unshift(data);
            let postHandler = '';

            postBox.forEach(post => {
                postHandler += `<div class="col-lg-4">
                                    <div class="card mb-4">
                                        <div class="card-title">
                                            <div class="index">
                                                <p>${post.id}</p>
                                            </div>
                                            <p>${post.title}</p>
                                        </div>
                                        <div class="card-body px-0">
                                            <p>${post.body}</p>
                                        </div>
                                        <div class="card-buttons mt-3 d-flex justify-content-end">
                                            <div class="update-button">
                                                <button type="submit" class="btn btn-success me-2">Update</button>
                                            </div>
                                            <div class="delete-features-button" id="delete-post">
                                                <button type="submit" onclick="deleteMyPost(${post.id})" class="btn btn-danger">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                                        `
            });

            postWrapper.innerHTML = postHandler;
        })   
}

function deleteMyPost(id) {
    fetch('https://jsonplaceholder.typicode.com/posts' + "/" + id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        postBox.shift(data);
        console.log(postBox);

        let postHandler = '';
        postBox.forEach(post => {
            postHandler += `<div class="col-lg-4">
                                    <div class="card mb-4">
                                        <div class="card-title">
                                            <div class="index">
                                                <p>${post.id}</p>
                                            </div>
                                            <p>${post.title}</p>
                                        </div>
                                        <div class="card-body px-0">
                                            <p>${post.body}</p>
                                        </div>
                                        <div class="card-buttons mt-3 d-flex justify-content-end">
                                            <div class="update-button">
                                                <button type="submit" class="btn btn-success me-2">Update</button>
                                            </div>
                                            <div class="delete-features-button" id="delete-post">
                                                <button type="submit" onclick="deleteMyPost(${post.id})" class="btn btn-danger">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                                        `
        })
        postWrapper.innerHTML = postHandler;
    })

}

