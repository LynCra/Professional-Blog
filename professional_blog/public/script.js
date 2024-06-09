document.addEventListener('DOMContentLoaded', () => {
    const postsList = document.getElementById('posts-list');
    const addPostForm = document.getElementById('add-post-form');

    const fetchPosts = async () => {
        const response = await fetch('/api/posts');
        const posts = await response.json();
        postsList.innerHTML = '';
        posts.forEach(post => {
            const postItem = document.createElement('li');
            postItem.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button onclick="deletePost('${post.id}')">Delete</button>
            `;
            postsList.appendChild(postItem);
        });
    };

    addPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
            fetchPosts();
        } else {
            alert('Failed to add post.');
        }
    });

    window.deletePost = async (id) => {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchPosts();
        } else {
            alert('Failed to delete post.');
        }
    };

    fetchPosts();
});
