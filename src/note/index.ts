//基础类型
//string number boolean symbol void null undefined

//对象类型
const Teacher: {
    teachAge: number
    teachName: string
} = {
    teachAge: 18,
    teachName: 'jack',
}
//函数类型
const getTotal: () => number = () => 123
const f1 = (str: string): number => parseInt(str, 10)
const f2: (str: string) => number = (str) => parseInt(str, 10)

//数组类型
const arrs: number[] = [1, 2, 3]
//函数返回值是number
function add(num1: number, num2: number): number {
    return num1 + num2
}
//没有返回值
function say(): void {
    console.log('hello')
}
//never不在往后执行
function error(): never {
    throw Error('error')
}
//参数是对象的类型约定
function add1({ num1, num2 }: { num1: number; num2: number }): number {
    return num1 + num2
}

interface Person {
    name: string
    age?: number
    [prop: string]: any //动态类型添加
    say(): string //函数类型返回string
}
//接口继承
interface Student extends Person {
    score: number
}
//接口定义函数
interface SayHi {
    //接收参数word类型是string返回string
    (word: string): string
}
const user1: Student = {
    name: 'jack',
    score: 11,
    say() {
        return 'hahah'
    },
}
//class继承implements
class User2 implements Person {
    name = 'jassica'
    say() {
        return 'haha'
    }
}
class Animal {
    name = 'animal'
    say() {
        return this.name
    }
}
class Cat extends Animal {
    age = 1
    eat() {
        return 'eat'
    }
    //子类重写父类方法,super调用父类方法
    say() {
        return super.say() + this.age
    }
}
const cat = new Cat()
// console.log(cat.say())
/* 
1 默认是public 类的内外都能访问
2 private只允许类内访问
3 protected允许类内和继承子类访问
 */

//创建class实例constructor立即执行
class Computer {
    //this.name = name
    constructor(public name: string) {}
}
// const game = new Computer('lol')
// console.log(game.name)

//子类继承父类都使用构造器super调用父类传入参数
class Keyboard extends Computer {
    constructor(public method: string) {
        super('player')
    }
}
const player = new Keyboard('you')
console.log(player.method)

//私有属性保护
class GetName {
    constructor(private _name: string) {}
    get name() {
        return this._name
    }
    set name(name: string) {
        this._name = name
    }
}
const real = new GetName('jack wu')
real.name = 'new jack'
console.log(real.name)

//抽象类 多个class拥有的共性 不能实例化只能继承
abstract class Geo {
    abstract getArea(): number
}
class Tringle extends Geo {
    getArea() {
        return 123
    }
}
// 函数泛型
function fn<T>(params: T) {
    return params
}

