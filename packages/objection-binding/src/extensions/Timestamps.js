export default ({createdAtColumn, updatedAtColumn}) => Base => {
    return class Timestamps extends Base {
        latest() {
            return this.orderBy(updatedAtColumn, 'desc');
        }

        newest() {
            return this.orderBy(createdAtColumn, 'desc');
        }

        oldest() {
            return this.orderBy(updatedAtColumn, 'asc');
        }

        earliest() {
            return this.orderBy(createdAtColumn, 'asc');
        }

        touch() {
            return this.patch({[updatedAtColumn]: new Date()});
        }
    }
}
