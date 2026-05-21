/**
 * TOPIC: Closures
 * Covers: lexical scope, closure definition, private state, the var-loop trap
 */

// ─────────────────────────────────────────────
// 1. WHAT IS A CLOSURE?
// ─────────────────────────────────────────────

// A closure is a function that retains access to its OUTER lexical scope
// even after that outer function has returned.

function outer() {
    const message = 'hello from outer';

    function inner() {
        console.log(message); // inner closes over `message`
    }

    return inner;
}

const fn = outer(); // outer() has returned, but...
fn();               // 'hello from outer' — `message` is still alive in the closure

// ─────────────────────────────────────────────
// 2. PRIVATE STATE — the module pattern
// ─────────────────────────────────────────────

// Each call to makeCounter() creates a SEPARATE closure with its own `count`.
function makeCounter() {
    let count = 0;

    return {
        increment() { count++; },
        decrement() { count--; },
        value()     { return count; },
    };
}

const a = makeCounter();
const b = makeCounter();

a.increment();
a.increment(); // count = 2 in a's closure
b.increment(); // count = 1 in b's closure — completely independent

console.log(a.value()); // 2
console.log(b.value()); // 1

// ─────────────────────────────────────────────
// 3. REFERENCE COPY — sharing the same closure
// ─────────────────────────────────────────────

const x = makeCounter();
const y = x;  // y is NOT a new counter — it points to the same object

x.increment();
x.increment();
y.increment(); // all three hit the same `count`

console.log(x.value()); // 3
console.log(y.value()); // 3 — same closure, same count

// ─────────────────────────────────────────────
// 4. THE var LOOP TRAP
// ─────────────────────────────────────────────

// ❌ Broken — all callbacks share the SAME var-scoped `i`
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('var:', i), 0);
}
// Prints: 3, 3, 3

// ✅ Fixed with let — each iteration gets its OWN block-scoped binding
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log('let:', j), 0);
}
// Prints: 0, 1, 2

// ✅ Alternative fix: IIFE (pre-ES6 approach)
for (var k = 0; k < 3; k++) {
    ((captured) => {
        setTimeout(() => console.log('iife:', captured), 0);
    })(k);
}
// Prints: 0, 1, 2

// ─────────────────────────────────────────────
// 5. PRACTICAL USE — memoization
// ─────────────────────────────────────────────

function memoize(fn) {
    const cache = new Map(); // cache lives in the closure

    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log('cache hit');
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const expensiveAdd = memoize((a, b) => {
    console.log('computing...');
    return a + b;
});

expensiveAdd(1, 2); // 'computing...' → 3
expensiveAdd(1, 2); // 'cache hit'    → 3

// ─────────────────────────────────────────────
// PRACTICE EXERCISES
// ─────────────────────────────────────────────

/**
 * Q1: What prints?
 *
 *   function outer() {
 *     let x = 10;
 *     return function() { return x++; };
 *   }
 *   const f = outer();
 *   console.log(f()); // ?
 *   console.log(f()); // ?
 *   console.log(f()); // ?
 *
 * Answer: 10, 11, 12 — each call reads then increments the SAME `x` in the closure.
 */

/**
 * Q2: How many `count` variables exist after running this?
 *
 *   const c1 = makeCounter();
 *   const c2 = makeCounter();
 *   const c3 = c1;
 *
 * Answer: 2 — c1 and c3 share one closure; c2 has its own.
 */