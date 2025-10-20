class UserData {
    constructor(name, age) {
        console.log('Calling UserData constructor. Arguments:', name, age);
        this.name = name;
        this.age = age;
    }

    go() {
        console.log('Calling go() in UserData. My name is', this.name);
    }

    stay = () => {
        console.log('Calling stay() in UserData. My name is', this.name);
    }
}

class SpecialUserData extends UserData {
    constructor(name, age) {
        console.log('Calling SuperUserData constructor, before super. Arguments:', name, age)
        super(name, age);
        console.log('Calling SuperUserData constructor, after super. Arguments:', name, age)
        this.name = name.toUpperCase();
    }

    go() {
        console.log('Calling go() in SpecialUserData. My name is', this.name);
    }
}

const userDataAlex = new UserData('Alex', 20);
const userDataGeorge = new SpecialUserData('George', 15);

userDataAlex.go();
userDataGeorge.go();

const lonelyGo = userDataAlex.go.bind(userDataGeorge);

lonelyGo();

userDataAlex.go.call(userDataGeorge);
userDataAlex.go.apply(userDataGeorge);

const lonelyStay = userDataAlex.stay;



console.log(lonelyGo);
console.log(lonelyStay);

lonelyStay();
