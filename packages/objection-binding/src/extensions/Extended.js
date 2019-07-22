import { NotFoundError } from "objection";

export default () => Base => {
    return class Extended extends Base {

        constructor(...args) {
            super(...args);

            this.applyFindMethods();
        }

        /**
         *
         */
        applyFindMethods() {
            this.runAfter(async (models, queryBuilder) => {
                const { findOrFail, findOrNew } = this.context();

                if (findOrFail && queryBuilder.isFind() && !models.length) {
                    throw findOrFail;
                }

                if (findOrNew && queryBuilder.isFind() && !models.length) {
                    return await this.insert(findOrNew);
                }

                return models;
            })
        }

        /**
         * Update or Insert
         *
         * @param model
         * @return {*}
         */
        upsert(model) {
            return model.id ?
                this.update(model).where(model.constructor.idColumn, model.id) :
                this.insert(model) ;
        }

        /**
         * Alias of upsert
         *
         * @param model
         * @return {*}
         */
        save(model) {
            return this.upsert(model);
        }

        /**
         *
         * @return {Extended}
         */
        orFail(customError = new NotFoundError("Model is not found")) {
            this.mergeContext({findOrFail: customError});

            return this;
        }

        /**
         *
         * @return {Extended}
         */
        orNew(jsonOrModel) {
            this.mergeContext({findOrNew: jsonOrModel});

            return this;
        }
    }
}
