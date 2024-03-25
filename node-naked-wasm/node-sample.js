const fs = require('node:fs/promises');

const l = console.log.bind(console);

const wasmFile = './target/wasm32-unknown-unknown/debug/node_naked_wasm.wasm';
// const wasmFile = './target/wasm32-wasi/debug/node_naked_wasm.wasm';

const benchmark = (name, fn, run) => {
    if (!run) run = 1;
    const start = performance.now();
    for (let i = 0; i < run; i++) fn();
    const end = performance.now();
    const duration = (end - start).toFixed(2);
    console.log(`${name} (${run} run) took ${duration}ms`);
}

function fibonacci_js(n) {
    if (n <= 1) return n;
    return fibonacci_js(n - 1) + fibonacci_js(n - 2);
}

(async () => {
    const wasmBuffer = await fs.readFile(wasmFile);

    const wasmModule = await WebAssembly.instantiate(wasmBuffer, {
        log: l,

        utils: {
            random: (n) => Math.round(Math.random() * n)
        }
    });
    let { instance } = wasmModule;

    const { fibonacci: fibonacci_wasm,  random_range: randomRange } = instance.exports;

    const result = fibonacci_wasm(5 );
    l(result);

    l(randomRange(4));

    l('-------- perfs --------')

    const n = 40;
    const run = 5;
    benchmark(`WASM fibonacci(${n})`, () => fibonacci_wasm(n), run);

    benchmark(`JS fibonacci(${n})`, () => fibonacci_js(n), run);

})();

