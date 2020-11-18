const arrow = () => {
    console.log('es6 => es5')
}

class User {
    constructor(name) {
        this.name = name
    }
}
const xm = new User('xm')
console.log(xm)
function init() {
    if (this.name) {
        console.log(this.name)
    } else {
        throw new Error('no this name')
    }
}
