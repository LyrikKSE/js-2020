'use strict'

const getLazy = (obj) => {
    const iterator = typeof obj.next === 'function'
        ? obj
        : obj[Symbol.iterator]()

    return new Proxy(
        obj,
        {
            get(_, prop) {
                switch (prop) {
                    case 'map':
                        return predicate => getLazy({
                            [Symbol.iterator]() {
                                return this
                            },
                            index: 0,
                            next() {
                                const {value, done} = iterator.next()
                                if (done) {
                                    return {done}
                                } else {
                                    return {done, value: predicate(value, this.index++)}
                                }
                            }
                        })
                    case 'take':
                        return (count) => getLazy({
                            [Symbol.iterator]() {
                                return this
                            },
                            next() {
                                return count-- ? iterator.next() : {done: true}
                            }
                        })
                    default:
                        return Reflect.get(...arguments)
                }
            }
        }
    )
}

const list = [1, 2, 3, 4, 5]
const lazyIterator = getLazy(list)
    .map(x => {
        console.log('map 1');
        return x + 10
    })
    .map(x => console.log('map 2') || (x + 1))
    .map((x, i) => {
        if (i == 3) {
            throw 'Oops!!'
        } else return x
    })
    .take(3)
    .map(x => (console.log('map 3'), x ** 2))

console.log(...lazyIterator)

function* generator() {
    yield 1
    yield 2
    yield 3
}

const generatorObject = generator()


const endlessIterator = {
    value: 0,
    next() {
        return {value: this.value++, done: false}
    }
}
console.log(...getLazy(endlessIterator).map(x => x ** 2).take(10))