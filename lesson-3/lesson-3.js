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
                            [Symbol.iterator]() { return this },
                            index: 0,
                            next() {
                                const { value, done } = iterator.next()
                                if (done) {
                                    return { done }
                                }

                                return { done, value: predicate(value, this.index++) }
                            }
                        })
                    case 'filter':
                        return predicate => getLazy({
                            [Symbol.iterator]() { return this },
                            index: 0,
                            next() {
                                while (true) {
                                    let { done, value } = iterator.next();

                                    if (done) {
                                        return { done };
                                    }

                                    if (predicate(value, this.index++)) {
                                        return { done, value };
                                    }
                                }
                            }
                        })
                    case 'take':
                        return (count) => getLazy({
                            [Symbol.iterator]() { return this },
                            next() {
                                return count-- ? iterator.next() : { done: true }
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
    .map(x => { console.log('map 1'); return x + 10 })
    .filter((value, key) => value > 12)

console.log(...lazyIterator)
