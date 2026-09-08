// EVENT LOOP QUIZ #2
// Write down the order 1-N for each exercise
// Submit your answers, I'll check

// ============================================
// EXERCISE 1: warm-up (sync vs macrotask)
// ============================================
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');



// ============================================
// EXERCISE 2: macrotask vs microtask
// ============================================
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');



// ============================================
// EXERCISE 3: microtask queue draining fully before next macrotask
// ============================================
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve()
  .then(() => console.log('C'))
  .then(() => console.log('D'));

setTimeout(() => console.log('E'), 0);

console.log('F');


// ============================================
// EXERCISE 4: async/await pausing a function mid-execution
// ============================================
async function foo() {
  console.log('A');
  await null;
  console.log('B');
}

console.log('start');
setTimeout(() => console.log('timeout'), 0);
foo();
Promise.resolve().then(() => console.log('promise'));
console.log('end');



// ============================================
// EXERCISE 5: process.nextTick vs Promise microtasks vs macrotasks (Node)
// ============================================
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => {
  console.log('3');
  process.nextTick(() => console.log('4'));
});

process.nextTick(() => {
  console.log('5');
  Promise.resolve().then(() => console.log('6'));
});

setTimeout(() => console.log('7'), 0);

console.log('8');

