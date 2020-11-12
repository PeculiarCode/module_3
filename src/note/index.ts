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
    name: 'jassica'
    say() {
        return 'haha'
    }
}
class Animal {
    name = 'dog'
    say() {
        return this.name
    }
}
const dog = new Animal()
console.log(dog.say())
