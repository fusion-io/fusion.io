import bcrypt from 'bcrypt';

export default class BCryptHasher {

    setSaltRouds(rounds) {
        this.rounds = rounds;
        return this;
    }

    hash(string) {
        return bcrypt.hash(string, this.rounds);
    }

    async verify(string, hashed) {
        return bcrypt.compare(string, hashed);
    }
}
