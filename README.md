# Professional-Blog
This project is a simple and professional blogging platform built using Rust (with Actix-Web for the backend) and a basic HTML frontend. It allows users to view, add, and delete blog posts. This application demonstrates how to create a basic RESTful API and integrate it with a static HTML frontend.
Features:
View Posts: Users can view a list of blog posts.
Add Posts: Users can add new blog posts through a form.
Delete Posts: Users can delete existing blog posts.
Technologies Used:
Rust: The core application is built using the Rust programming language for performance and safety.
Actix-Web: A powerful, pragmatic, and extremely fast web framework for Rust.
UUID: Used for generating unique identifiers for each blog post.
HTML/CSS: The frontend is built using standard HTML and CSS for a professional look and feel.
JavaScript: Enhances the user experience with dynamic content updates.
Getting Started
To get started with this project, follow the steps below.

Prerequisites
Ensure you have the following installed:

Rust: Follow the installation guide on Rust's official website.
Git: Follow the installation guide on Git's official website.
Installation
Clone the Repository:
sh
Copy code
git clone https://github.com/your-username/professional_blog.git
Navigate to the Project Directory:
sh
Copy code
cd professional_blog
Build the Project:
sh
Copy code
cargo build
Run the Server:
sh
Copy code
cargo run
Open Your Browser:
Navigate to http://127.0.0.1:8080 to view the blog.
Usage
Viewing Posts: Access the homepage to see all posts.
Adding a Post: Use the "Add Post" form to create a new blog post.
Deleting a Post: Click the delete button next to a post to remove it.
Project Structure
src/main.rs: The main entry point of the application, containing all route definitions and handlers.
static/index.html: The HTML file serving the frontend of the blog.
static/style.css: The CSS file for styling the frontend.
static/script.js: JavaScript file for frontend interactivity.
Contributing
Contributions are welcome! Please create an issue to discuss any changes or features you would like to see.

License
This project is licensed under the MIT License. See the LICENSE file for more details.
