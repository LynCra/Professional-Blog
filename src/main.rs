use actix_files as fs;
use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use env_logger::Env;
use log::info;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use std::sync::Mutex;

#[derive(Debug, Deserialize, Serialize, Clone)]
struct Post {
    id: Uuid,
    title: String,
    content: String,
}

struct AppState {
    posts: Mutex<Vec<Post>>,
}

async fn get_posts(data: web::Data<AppState>) -> impl Responder {
    let posts = data.posts.lock().unwrap();
    HttpResponse::Ok().json(posts.clone())
}

async fn get_post(path: web::Path<Uuid>, data: web::Data<AppState>) -> impl Responder {
    let id = path.into_inner();
    info!("Retrieving post with id: {}", id);
    let posts = data.posts.lock().unwrap();
    if let Some(post) = posts.iter().find(|p| p.id == id) {
        HttpResponse::Ok().json(post)
    } else {
        HttpResponse::NotFound().finish()
    }
}

async fn create_post(post: web::Json<Post>, data: web::Data<AppState>) -> impl Responder {
    let mut posts = data.posts.lock().unwrap();
    let new_post = Post {
        id: Uuid::new_v4(),
        title: post.title.clone(),
        content: post.content.clone(),
    };
    posts.push(new_post.clone());
    HttpResponse::Ok().json(new_post)
}

async fn update_post(path: web::Path<Uuid>, post: web::Json<Post>, data: web::Data<AppState>) -> impl Responder {
    let id = path.into_inner();
    info!("Updating post with id: {}", id);
    let mut posts = data.posts.lock().unwrap();
    if let Some(existing_post) = posts.iter_mut().find(|p| p.id == id) {
        existing_post.title = post.title.clone();
        existing_post.content = post.content.clone();
        HttpResponse::Ok().json(existing_post.clone())
    } else {
        HttpResponse::NotFound().finish()
    }
}

async fn delete_post(path: web::Path<Uuid>, data: web::Data<AppState>) -> impl Responder {
    let id = path.into_inner();
    info!("Deleting post with id: {}", id);
    let mut posts = data.posts.lock().unwrap();
    if let Some(pos) = posts.iter().position(|p| p.id == id) {
        posts.remove(pos);
        HttpResponse::Ok().body(format!("Post with id {} deleted", id))
    } else {
        HttpResponse::NotFound().finish()
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();

    let app_state = web::Data::new(AppState {
        posts: Mutex::new(vec![]),
    });

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .route("/posts", web::get().to(get_posts))
            .route("/posts/{id}", web::get().to(get_post))
            .route("/posts", web::post().to(create_post))
            .route("/posts/{id}", web::put().to(update_post))
            .route("/posts/{id}", web::delete().to(delete_post))
            .service(fs::Files::new("/", "./static").index_file("index.html"))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
