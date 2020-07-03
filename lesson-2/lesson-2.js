// let numbers = [0, 1, 2];
// numbers = new Proxy(numbers, {
//     get(target, prop) {
//         if (prop in target) {
//             return target[prop];
//         } else {
//             return 0; // значение по умолчанию
//         }
//     }
// });
// console.log(numbers[1]); // 1
// console.log(numbers[123]); // 0 (нет такого элемента)

// let user = {
//     name: "Вася",
// };
// user = new Proxy(user, {
//     get(target, prop, receiver) {
//         alert(`GET ${prop}`);
//         return Reflect.get(target, prop, receiver); // (1)
//     },
//     set(target, prop, val, receiver) {
//         alert(`SET ${prop}=${val}`);
//         return Reflect.set(target, prop, val, receiver); // (2)
//     }
// });
// let name = user.name; // выводит "GET name"
// user.name = "Имя"; // выводит "SET name=Имя"


const setProxy = object => {

    return new Proxy(object,
        {
        get(target, key)
        {
            if (key === 'toJSON') {

return Reflect.get(target, key);}

const v = Reflect.get(target, key);
        if (v === undefined) {
        Reflect.set(target, key, setProxy({}));
                return Reflect.get(target, key);
            }
return v
        }
    })
}
const myUtility = {x: 10};
const finalProxy = setProxy(myUtility);
finalProxy.a = 1;
finalProxy.b.c.d = 2;
finalProxy.b.c.e = 9;
console.log(JSON.stringify(finalProxy));


// const ProxiedObject = yourUtility({ x: 10 })
// ProxiedObject.a = 1
// ProxiedObject: { a: 1, x: 10 }
// ProxiedObject.b.c.d = 2
// ProxiedObject: { a: 1, b: { c: { d: 2 } }, x: 10 }
// console.log(JSON.stringify(ProxiedObject))
// out: {"a":1,"b":{"c":{"d":2}},"x":10}
