console.log('Starting')
let elapsedTime = 0;

const tick = time => console.log(`Elapsed: ${time + 1} second (-s)`)

const i = setInterval(() => {
    tick(elapsedTime)
    elapsedTime++
}, 1000)

const delayedS = (delay) => {
    let nDelay = 0;
    const delayedFun = [];

    const delayR = (delay, func, ...args) => {
        return new Promise(resolve => setTimeout(() => resolve(func(...args)), delay));
    }

    return func => async (...args) => {
        if (!nDelay) {
            nDelay = delay;
        }

        delayedFun.push(delayR(nDelay, func, ...args))
        nDelay += delay;

        return await Promise.all(delayedFun);
    }
}

const Fun = value => console.log(`Sample: ${value}`);

const delayH = delayedS(2000);

delayH(Fun)('1');
delayH(Fun)('2');


