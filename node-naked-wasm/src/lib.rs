#[no_mangle]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

#[no_mangle]
pub fn random_range(input: i32) -> i32 {
    unsafe {
        random(input * 2) - input
    }
}


#[link(wasm_import_module = "utils")]
extern {
    // from JS
    fn random(input: i32) -> i32;
}

//
// #[no_mangle]
// pub fn write_log(s: &str) {
//     unsafe {
//         log(s);
//     }
// }
//
// extern {
//     // Use `js_namespace` here to bind `console.log(..)` instead of just
//     // `log(..)`
//     fn log(s: &str);
//
//
// }
