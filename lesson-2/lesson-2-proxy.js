const getProxiedCookie = () => {

    const cookie = document.cookie
        .split(';')
        .reduce((acc, value) => ({
            ...acc,
            [value.substr(0, value.indexOf('=')).trim()]: value.substr(value.indexOf('=') + 1).trim()
        }), {})
    const setCookie = (name, value) => {
        document.cookie = `${name}=${value}`
    }
    const deleteCookie = name => document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT`

    return new Proxy(cookie, {
        set: (obj, prop, value) => {
            setCookie(prop, value)
            return Reflect.set(obj, prop, value)
        },
        deleteProperty(obj, prop) {
            deleteCookie(prop)
            return Reflect.deleteProperty(...arguments)
        }
    })
}

const cookie = getProxiedCookie()
cookie.a = 10
cookie.b = 20
console.log(document.cookie)
console.log(cookie)

delete cookie.a

console.log(document.cookie)
console.log(cookie)