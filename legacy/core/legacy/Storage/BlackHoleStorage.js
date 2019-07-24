export default class BlackHoleStorage {

    async store(key, value, options = {}) {
    }

    async touch(key) {

    }

    async get(key) {
        return null;
    }

    async remove(key) {
    }

    async flush() {
    }

    async cleanUp() {
    }

    async getByTag(tag) {
        return [];
    }

    static install() {
        return new BlackHoleStorage();
    }
}
