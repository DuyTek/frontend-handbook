// HARD EVENT LOOP QUIZ
// Write down the order 1-N for each exercise
// Submit your answers, I'll check

// ============================================
// EXERCISE 1: Promise chains + setTimeout
// ============================================
console.log('Q1-A');
setTimeout(() => console.log('Q1-B'), 0);
Promise.resolve()
  .then(() => {
    console.log('Q1-C');
    return Promise.resolve();
  })
  .then(() => console.log('Q1-D'));
console.log('Q1-E');

// Expected output order: ________


// ============================================
// EXERCISE 2: Nested promises + constructor
// ============================================
console.log('Q2-A');
new Promise(resolve => {
  console.log('Q2-B');
  Promise.resolve().then(() => console.log('Q2-C'));
  resolve();
}).then(() => console.log('Q2-D'));
console.log('Q2-E');

// Expected output order: ________


// ============================================
// EXERCISE 3: async/await deception
// ============================================
async function test() {
  console.log('Q3-A');
  await Promise.resolve();
  console.log('Q3-B');
}
console.log('Q3-C');
test();
Promise.resolve().then(() => console.log('Q3-D'));
console.log('Q3-E');

// Expected output order: ________


// ============================================
// EXERCISE 4: Chained setTimeout + Promise
// ============================================
setTimeout(() => {
  console.log('Q4-A');
  Promise.resolve().then(() => console.log('Q4-B'));
}, 0);
Promise.resolve().then(() => {
  console.log('Q4-C');
  setTimeout(() => console.log('Q4-D'), 0);
});
console.log('Q4-E');

// Expected output order: ________


// ============================================
// EXERCISE 5: Multiple awaits + sync
// ============================================
async function chain() {
  console.log('Q5-A');
  await Promise.resolve();
  console.log('Q5-B');
  await Promise.resolve();
  console.log('Q5-C');
}
console.log('Q5-D');
chain();
console.log('Q5-E');

// Expected output order: ________


// ============================================
// EXERCISE 6: The resolver trap
// ============================================
new Promise(resolve => {
  resolve(Promise.resolve());
}).then(() => console.log('Q6-A'));
Promise.resolve().then(() => console.log('Q6-B'));
console.log('Q6-C');

// Expected output order: ________


// ============================================
// EXERCISE 7: Nested async functions
// ============================================
async function outer() {
  console.log('Q7-A');
  inner();
  console.log('Q7-B');
}
async function inner() {
  await Promise.resolve();
  console.log('Q7-C');
}
console.log('Q7-D');
outer();
console.log('Q7-E');

// Expected output order: ________


// ============================================
// EXERCISE 8: Mixed macrotask timing
// ============================================
Promise.resolve().then(() => {
  console.log('Q8-A');
  setTimeout(() => console.log('Q8-B'), 0);
});
setTimeout(() => {
  console.log('Q8-C');
  Promise.resolve().then(() => console.log('Q8-D'));
  setTimeout(() => console.log('Q8-E'), 0);
}, 0);

// Expected output order: ________


// ============================================
// EXERCISE 9: BRUTAL - All together
// ============================================
async function brutal() {
  console.log('Q9-A');
  setTimeout(() => console.log('Q9-B'), 0);
  await Promise.resolve();
  console.log('Q9-C');
}
Promise.resolve().then(() => console.log('Q9-D'));
console.log('Q9-E');
brutal();
setTimeout(() => console.log('Q9-F'), 0);
console.log('Q9-G');
Promise.resolve()
  .then(() => {
    console.log('Q9-H');
    setTimeout(() => console.log('Q9-I'), 0);
  });

// Expected output order: ________