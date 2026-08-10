var user = {
    name: 'James',
    greet(anothername) {
        console.log('Hello', this.name, 'and', anothername);
    },
    greeting() {
        return function() { // Cái này trả về function, phải gọi thì mới chạy console.log được
            console.log('Hello', this.name)
        }
    },
    greetReturn() {
        this.greet();

        return function () {
            greeting();
        }
    }
}

var bot = { name: 'Claude'}

const greet = user.greet.bind(user, 'Janette');
const greeting = user.greeting().bind(user, 'Janette');
const greetReturn = user.greeting.apply(bot);

greet()