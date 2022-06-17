function renderSelectedPost() {
    let viewPostObject = localStorage.getItem('viewedPost');
    let viewMyPost = JSON.parse(viewPostObject);
    // console.log(viewMyPost.body);
    document.querySelector("#view-post-id").innerHTML = viewMyPost.id;
    document.querySelector("#view-post-title").innerHTML = viewMyPost.title;
    document.querySelector("#view-post-body").innerHTML = viewMyPost.body;
}

renderSelectedPost();

function previousPage () {
    window.location.href = 'index.html';
}