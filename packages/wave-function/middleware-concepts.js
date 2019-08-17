class MiddlewareStack {
    constructor(stacks = []) {
        this.stacks = stacks;
    }

    use(middleware) {
        this.push()
    }
}

let stack = [];

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

stack.push(async (next) => {
    console.log('mw1');
    await wait();
    await next();
});

stack.push(async (next) => {
    console.log('mw2');
    await wait();
    throw new Error('oops');
    await next();
});

stack.push(async (next) => {
    await next();
    await wait();
    console.log('mw3');
});

stack.push(async  (next) => {
    console.log('mw4');
});

let composed = stack.reduceRight((composed, current) => {
    return () => current(composed)
}, () => {});

composed().catch(e => {
    console.log(e);
}) ;
