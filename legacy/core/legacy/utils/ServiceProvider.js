export default class ServiceProvider {

    constructor(container) {
        this.container = container;
    }

    register() {
        throw new Error('Sub class must implement the #register() method');
    }

    boot() {
        //
    }
}
