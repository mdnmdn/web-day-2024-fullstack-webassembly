import init,{ greet, fibonacci } from './pkg/wasm_naked.js';

async function run() {
  await init();
  greet();


  // warmup
  fibonacci_wasm(10);
  fibonacci_js(10);

  const n = 40;
  const run = 5;
  benchmark(`WASM fibonacci(${n})`, () => fibonacci_wasm(n), run);

  benchmark(`JS fibonacci(${n})`, () => fibonacci_js(n), run);
}

export function fibonacci_wasm(n) {
  return fibonacci(n);
}

export function fibonacci_js(n) {
  if (n <= 1) return n;
  return fibonacci_js(n - 1) + fibonacci_js(n - 2);
}

const benchmark = (name, fn, run) => {
    if (!run) run = 1;
    const start = performance.now();
    for (let i = 0; i < run; i++) fn();
    const end = performance.now();
    const duration = (end - start).toFixed(2);
    console.log(`${name} (${run} run) took ${duration}ms`);
}


await run()

