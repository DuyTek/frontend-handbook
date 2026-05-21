/**
 * TOPIC: Variables & Scope
 * Covers: var / let / const, hoisting, Temporal Dead Zone (TDZ), block scope
 */

// ─────────────────────────────────────────────
// 1. REASSIGNMENT
// ─────────────────────────────────────────────

var a = 1;
a = 2; // ✅ allowed

let b = 1;
b = 2; // ✅ allowed

const c = 1;
// c = 2; // ❌ TypeError: Assignment to constant variable

// ─────────────────────────────────────────────
// 2. HOISTING & TEMPORAL DEAD ZONE (TDZ)
// ─────────────────────────────────────────────

// var is hoisted AND initialised to undefined
console.log(hoistedVar); // undefined  (not a ReferenceError)
var hoistedVar = 'hello';

// let IS hoisted but NOT initialised → lives in the TDZ until the declaration line
// console.log(hoistedLet); // ❌ ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = 'hello';

// const behaves identically to let in this regard
// console.log(hoistedConst); // ❌ ReferenceError
const hoistedConst = 'hello';

// ─────────────────────────────────────────────
// 3. TDZ INSIDE A BLOCK — the classic trap
// ─────────────────────────────────────────────

let x = 'global';

function testTDZ() {
    // The engine already knows about the inner `x` (it's hoisted),
    // but it's in the TDZ until line 41 → ReferenceError, NOT 'global'
    // console.log(x); // ❌ ReferenceError
    let x = 'local';
    console.log(x); // 'local'
}
testTDZ();

// ─────────────────────────────────────────────
// 4. BLOCK SCOPE vs FUNCTION SCOPE
// ─────────────────────────────────────────────

{
    var leaksOut = 'I escape the block'; // var is function-scoped
    let staysIn  = 'I am block-scoped';
    const alsoStaysIn = 'me too';
}

console.log(leaksOut);    // ✅ 'I escape the block'
// console.log(staysIn);  // ❌ ReferenceError

// ─────────────────────────────────────────────
// 5. const PROTECTS THE BINDING, NOT THE VALUE
// ─────────────────────────────────────────────

// Primitive — the value itself cannot change
const score = 100;
// score = 200; // ❌ TypeError

// Object — the reference (pointer) is constant, but the heap object is mutable
const user = { name: 'Alice' };
user.name = 'Bob';           // ✅ mutating the object is fine
console.log(user.name);      // 'Bob'
// user = { name: 'Charlie' }; // ❌ TypeError — reassigning the binding

// Array — same rule
const nums = [1, 2, 3];
nums.push(4);                // ✅ mutating the array
console.log(nums);           // [1, 2, 3, 4]
// nums = [];                // ❌ TypeError

// ─────────────────────────────────────────────
// PRACTICE EXERCISES
// ─────────────────────────────────────────────

/**
 * Q1: What does this print?
 *
 *   for (var i = 0; i < 3; i++) {
 *     setTimeout(() => console.log(i), 0);
 *   }
 *
 * Answer: 3, 3, 3 — all callbacks share the same var-scoped `i`, which is 3 after the loop.
 * Fix: replace `var` with `let` → prints 0, 1, 2 (each iteration gets its own binding).
 */

/**
 * Q2: Will this throw? Why?
 *
 *   const obj = Object.freeze({ count: 0 });
 *   obj.count = 99;
 *   console.log(obj.count);
 *
 * Answer: No throw in non-strict mode (silently ignored), but count stays 0.
 * Object.freeze makes the object itself immutable, not just the binding.
 */