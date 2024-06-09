// app.js

// Fetch posts when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchPosts();
});

// Function to fetch posts from the API
function fetchPosts() {
    fetch('http://127.0.0.1:8080/posts')
    .then(response => response.json())
    .then(data => {
        const postsContainer = document.getElementById('posts');
        data.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('Error fetching posts:', error));
}

// Function to create HTML element for a post
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>${new Date(post.date).toLocaleDateString()}</small>
        <button onclick="deletePost('${post.id}')">Delete</button>
    `;
    return postElement;
}

// Function to add a new post
function addPost(title, content) {
    const postData = { title, content };

    fetch('http://127.0.0.1:8080/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    .then(response => response.json())
    .then(data => {
        const postsContainer = document.getElementById('posts');
        const postElement = createPostElement(data);
        postsContainer.appendChild(postElement);
    })
    .catch(error => console.error('Error adding post:', error));
}

// Function to delete a post 
function deletePost(id) {
    fetch(`http://127.0.0.1:8080/posts/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            const postElement = document.querySelector(`.post[data-id="${id}"]`);
            if (postElement) {
                postElement.remove();
            }
        } else {
            console.error('Failed to delete post');
        }
    })
    .catch(error => console.error('Error deleting post:', error));
}
