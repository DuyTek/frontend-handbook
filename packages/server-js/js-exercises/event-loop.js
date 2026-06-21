/**
 * TOPIC: Event Loop
 * Covers: call stack, Web APIs, microtask queue, macrotask queue, starvation
 */

// ─────────────────────────────────────────────
// EXECUTION ORDER RULE (memorise this)
// ─────────────────────────────────────────────
//
//  Per tick:
//  1. Run all synchronous code (call stack empties)
//  2. Drain the ENTIRE microtask queue (including newly added microtasks)
//  3. Pick ONE macrotask → run it → go back to step 2
//
// Microtask queue:  Promise.then / catch / finally, queueMicrotask()
// Macrotask queue:  setTimeout, setInterval, setImmediate, I/O callbacks

// ─────────────────────────────────────────────
// 1. BASIC ORDERING
// ─────────────────────────────────────────────

console.log('1');                              // sync  → call stack

setTimeout(() => console.log('2'), 0);        // macrotask → goes to Web API, then task queue

Promise.resolve().then(() => console.log('3')); // microtask → microtask queue

console.log('4');                              // sync  → call stack

// Output: 1, 4, 3, 2
// Why: sync first (1, 4) → microtask queue drained (3) → macrotask picked (2)

// ─────────────────────────────────────────────
// 2. MICROTASK CHAIN — all run before any macrotask
// ─────────────────────────────────────────────

setTimeout(() => console.log('macrotask'), 0);

Promise.resolve()
    .then(() => {
        console.log('microtask 1');
        return Promise.resolve();
    })
    .then(() => console.log('microtask 2')) // NEW microtask added during drain
    .then(() => console.log('microtask 3'));

// Output: microtask 1, microtask 2, microtask 3, macrotask
// The chain keeps adding microtasks — ALL drain before the setTimeout fires.

// ─────────────────────────────────────────────
// 3. MICROTASK STARVATION — a real danger
// ─────────────────────────────────────────────

// ❌ Infinite microtask chain — the macrotask queue NEVER gets processed.
// The browser cannot repaint, click handlers do not fire, the page freezes.
//
// function infiniteChain() {
//     Promise.resolve().then(infiniteChain);
// }
// infiniteChain(); // DO NOT run — page will hang

// ✅ Safe alternative for long async work: break it into macrotasks
function yieldToMacrotask() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

async function longTask() {
    for (let i = 0; i < 1000; i++) {
        doWork(i);
        if (i % 100 === 0) await yieldToMacrotask(); // give the browser a chance to breathe
    }
}

function doWork(i) { /* placeholder */ }

// ─────────────────────────────────────────────
// 4. async / await — syntactic sugar over Promises
// ─────────────────────────────────────────────

// Everything after `await` is a microtask callback under the hood.

async function example() {
    console.log('A');           // sync
    await Promise.resolve();    // suspends here → rest becomes a microtask
    console.log('B');           // microtask (runs before any macrotask)
}

example();
console.log('C');               // sync — runs before 'B'

// Output: A, C, B

// ─────────────────────────────────────────────
// 5. PREDICT THE OUTPUT — classic interview question
// ─────────────────────────────────────────────

console.log('start');

setTimeout(() => console.log('setTimeout 1'), 0);
setTimeout(() => console.log('setTimeout 2'), 0);

Promise.resolve()
    .then(() => console.log('promise 1'))
    .then(() => console.log('promise 2'));

console.log('end');

// Output:
// start
// end
// promise 1
// promise 2
// setTimeout 1
// setTimeout 2

// ─────────────────────────────────────────────
// PRACTICE EXERCISES
// ─────────────────────────────────────────────

/**
 * Q1: What is the output?
 *
 *   console.log('a');
 *   setTimeout(() => console.log('b'), 0);
 *   Promise.resolve().then(() => {
 *       console.log('c');
 *       Promise.resolve().then(() => console.log('d'));
 *   });
 *   console.log('e');
 *
 * Answer: a, e, c, d, b
 * Reason: sync (a, e) → microtask 1 fires (c) → microtask 1 adds new microtask (d) → d fires → macrotask (b)
 */

/**
 * Q2: Why does the browser freeze when you create an infinite microtask chain?
 *
 * Answer: The event loop drains the entire microtask queue before processing any macrotask.
 * Browser repaints and UI event callbacks are macrotasks — they never get a turn.
 * The page becomes completely unresponsive.
 */

/**
 * Q3: What queue does `queueMicrotask(() => ...)` go into?
 *
 * Answer: Microtask queue — same priority as Promise.then callbacks.
 */