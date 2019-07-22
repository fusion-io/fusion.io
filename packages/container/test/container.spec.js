const Container = require('./../Container');
const chai      = require('chai');
const assert    = chai.assert;

class Foo {
    method(parameter = '') {
        return 'bar' + parameter;
    }
}

class SymbolWithMeta {
    constructor(foo) {
        this.foo = foo;
    }

    getFoo() {
        return this.foo;
    }

    static get dependencies() {
        return ['foo'];
    }
}

class Abstract {

}

class Concrete {
    static get dependencies() {
        return [];
    }
}

describe('Container tests suite', () => {

    let container = null;

    beforeEach(() => {
        container = new Container();
    });

    describe('binding a dependency', () => {

        it('should return bounded dependency', () => {
            container.bind('foo', () => 'bar');

            let resolved = container.make('foo');

            assert.equal(resolved, 'bar');
        });

        it('should return a new reference of dependency for each time resolve', () => {
            container.bind('ref', () => ({}));

            let ref1 = container.make('ref');
            let ref2 = container.make('ref');


            assert.notStrictEqual(ref1, ref2);
        });

        it('should throw binding exception when resolving not existed dependency', () => {
            assert.throw(() => {
                container.make('notExisted')
            }, 'E_BINDING: Could not resolve dependency [notExisted]');
        });

        it('can resolve dependency deeply', () => {
            container.bind('foo', () => 'foo-dep');
            container.bind('bar', (c) => {
                return {foo: c.make('foo')};
            });


            let bar = container.make('bar');

            assert.deepEqual(bar, {foo: 'foo-dep'});
        });

        it('can resolve dependency deeply regardless of binding order', () => {

            container.bind('bar', (c) => {
                return {foo: c.make('foo')};
            });

            container.bind('foo', () => 'foo-dep');

            let bar = container.make('bar');

            assert.deepEqual(bar, {foo: 'foo-dep'});
        });
    });

    describe('binding a dependency as a singleton', () => {
        it('always return a single instance', () => {
            container.singleton('ref', () => {
                return {};
            });

            let ref1 = container.make('ref');
            let ref2 = container.make('ref');

            assert.strictEqual(ref1, ref2);
        });
    });

    describe('binding a dependency as a value', () => {
        it('don\'t need to resolve', () => {
            container.value('foo', 'bar');

            assert.equal(container.make('foo'), 'bar');
        });
    });

    describe('binding a dependency by a Symbol', () => {

        it('can bind a Symbol easily', () => {
            container.bind(Foo, () => 'bar');

            assert.equal(container.make(Foo), 'bar');
        });

        it('should bind by Symbol, not the stringified Symbol', () => {
            container.bind(Foo, () => 'bar');
            container.bind(Foo.toString(), () => 'bar2');

            assert.equal(container.make(Foo), 'bar');
        });

        it('can bind a Symbol with meta dependencies',  () => {

            container.value('foo', 'bar');
            container.autoBind(SymbolWithMeta);

            let instance = container.make(SymbolWithMeta);

            assert.equal(instance.getFoo(), 'bar');
        });

        it('can bind a singleton Symbol with #dependencies metadata',  () => {

            container.value('foo', 'bar');
            container.autoSingleton(SymbolWithMeta);

            let instance = container.make(SymbolWithMeta);

            assert.equal(instance.getFoo(), 'bar');
        });

        it('can register an inversion version of a Symbol', () => {
            container.bindInversion(Abstract, Concrete);

            const instance = container.make(Abstract);
            const instance2 = container.make(Abstract);


            assert.instanceOf(instance, Concrete);
            assert.notStrictEqual(instance, instance2);
        });

        it('can register an inversion version of a Symbol as a singleton', () => {
            container.singletonInversion(Abstract, Concrete);

            const instance = container.make(Abstract);
            const instance2 = container.make(Abstract);

            assert.instanceOf(instance, Concrete);
            assert.strictEqual(instance, instance2);
        });
    });

    describe('invoking a dependency method', () => {
        it('can invoke a dependency method', () => {
            container.bind(Foo, () => new Foo());

            assert.equal(container.invoke(Foo, 'method'), 'bar');
            assert.equal(container.invoke(Foo, 'method', '2'), 'bar2');
        });
    });
});
