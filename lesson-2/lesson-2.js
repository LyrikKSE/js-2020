const ProxiedObject = yourUtility({ x: 10 })


JSON.stringify({x:10})

ProxiedObject.a = 1
// ProxiedObject: { a: 1, x: 10 }

JSON.stringify({b:{c:{d:2}})

ProxiedObject.b.c.d = 2
// ProxiedObject: { a: 1, b: { c: { d: 2 } }, x: 10 }

console.log(JSON.stringify(ProxiedObject))
// out: {"a":1,"b":{"c":{"d":2}},"x":10}
