const obj = {
  name: 'Duy',
  greet: function() {
    console.log(this.name);
  }
};

const groceries = {
  storeName: 'Walmart',
  roll: function(speed) {
    console.log('Rolling in ' + this.storeName + ' at the speed ' + speed)
  }
}

const fn = obj.greet.bind(obj)
fn();
console.log('----------')

const rolling = groceries.roll.bind(groceries)
rolling('5km')