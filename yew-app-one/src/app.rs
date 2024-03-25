use yew::prelude::*;

#[function_component(App)]
pub fn app() -> Html {

    let onclick = Callback::from(|_| {
        web_sys::window()
            .unwrap()
            .alert_with_message("Hello!");
    });

    html! {
        <main>
            <img class="logo" src="https://yew.rs/img/logo.png" alt="Yew logo" />
            <h1>{ "Hello World!" }</h1>
            <span class="subtitle" >{ "from Yew with " }<i class="heart" /></span>

            <button {onclick}>{ "Say hello!" }</button>

        </main>
    }
}


