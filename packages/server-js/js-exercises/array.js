/** Array methods */
/** forEach: mutates the items of the given array directly, */
const items = [
    { title: 'Item 1', price: 10 },
    { title: 'Item 2', price: 20 },
    { title: 'Item 3', price: 30 },
    { title: 'Item 4', price: 40 },
];

console.log('Original items:', items);

items.forEach(item => {
    item.price += 5; // Increase price by 5
});

console.log('Updated items:', items);

/** ------------------- */
/** Find an item in array */

const foundItem = items.find(item => item.title === 'Item 2');

console.log('Found item:', foundItem);

/** ------------------- */
/** reduce */
// Reduce lets you accumulate a single value from an array. In this case, we are calculating the total price of all items.
// The second argument to reduce is the initial value of the accumulator (0 in this case).
const totalPrice = items.reduce((total, item) => total + item.price, 0);
console.log('Total price:', totalPrice);


/** --------BOOLEAN RETURN TYPES METHODS----------- */
/** some: returns true if there is at least 1 element that satisfies the predicate */
/** every: returns true if all elements satisfy the predicate */
/** includes: returns true if the array contains the specified element */