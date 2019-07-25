/**
 * The Monad interface
 */
export interface Monad<T> {

    /**
     * Monad is nothing special but a class that can execute
     *
     * @param args
     */
    execute(...args: any[]): Promise<any>
}

/**
 * Monad always needs an execution
 */
export type MonadConstructor<T> = {
    new(execution: T): Monad<T>
}

/**
 * A simple monad that just executes the given execution
 */
export class SillyMonad implements Monad<Function> {

    /**
     *
     * @param execution
     */
    constructor(private execution: Function) {}

    /**
     * Execute this monad with given arguments
     *
     * @param args
     */
    async execute (...args: any[]): Promise<any> {

        return await this.execution(...args);
    };
}

/**
 * Composing a Monad by nesting other Monads
 *
 * @param initial
 * @param monads
 */
export const compose = (initial: Function, ...monads: MonadConstructor<Function>[]): Monad<Function> => {

    return monads.reduce((composed: Monad<Function>, Current: MonadConstructor<Function>) => {

        return new Current((...args: any[]) => composed.execute(...args));
    }, new SillyMonad(initial));
};
