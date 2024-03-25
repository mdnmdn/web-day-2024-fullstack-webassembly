use serde_json::json;
use spin_sdk::http::{IntoResponse, Request, IncomingRequest};
use spin_sdk::http_component;

/// A simple Spin HTTP component.
#[http_component]
fn handle_wasm_web_app(req: Request) -> anyhow::Result<impl IntoResponse> {
    println!("Handling request to {:?}", req.header("spin-full-url"));

    let response = json!({
        "message": "Hello, I'm wasm!"
    });
    Ok(http::Response::builder()
        .status(200)
        .header("content-type", "application/json")
        .body(response.to_string())?)
}
