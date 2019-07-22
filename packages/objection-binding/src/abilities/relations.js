import {Model} from "objection";
import camelcase from "lodash.camelcase";
import pluralize from "pluralize";

/**
 *
 * @param Target
 * @param relationship
 * @param join
 * @return {function(*): {relationMappings: *, new(): {}, prototype: {}}}
 */
export const hasOne = (Target, relationship = null, join = null) => Source => {
    return class extends Source {
        static get relationMappings() {
            Target = Target();
            return {
                ...Source.relationMappings,
                [relationship || camelcase(Target.name)]: {
                    relation: Model.HasOneRelation,
                    modelClass: Target,
                    join: join || {
                        from: `${Source.tableName}.${Source.idColumn}`,
                        to: `${Target.tableName}.${camelcase(Source.name + '_' + Source.idColumn)}`
                    }
                }
            }
        }
    }
};

/**
 *
 * @param Target
 * @param relationship
 * @param join
 * @return {function(*): {relationMappings: *, new(): {}, prototype: {}}}
 */
export const hasMany = (Target, relationship = null, join = null) => Source => {
    return class extends Source {
        static get relationMappings() {
            Target = Target();
            return {
                ...Source.relationMappings,
                [relationship || pluralize(camelcase(Target.name))]: {
                    relation: Model.HasManyRelation,
                    modelClass: Target,
                    join: join || {
                        from: `${Source.tableName}.${Source.idColumn}`,
                        to: `${Target.tableName}.${camelcase(Source.name + '_' + Source.idColumn)}`
                    }
                }
            }
        }
    }
};

/**
 *
 * @param Target
 * @param relationship
 * @param join
 * @return {function(*): {relationMappings: *, new(): {}, prototype: {}}}
 */
export const belongsTo = (Target, relationship = null, join = null) => Source => {
    return class extends Source {
        static get relationMappings() {
            Target = Target();
            return {
                ...Source.relationMappings,
                [relationship || camelcase(Target.name)]: {
                    relation: Model.BelongsToOneRelation,
                    modelClass: Target,
                    join: join || {
                        from: `${Source.tableName}.${camelcase(Target.name + '_' + Target.idColumn)}`,
                        to: `${Target.tableName}.${Target.idColumn}`
                    }
                }
            }
        }
    }
};

/**
 *
 * @param Target
 * @param relationship
 * @param pivot
 * @param join
 * @return {function(*): {relationMappings: *, new(): {}, prototype: {}}}
 */
export const manyToMany = (Target, relationship = null, pivot = null, join = null) => Source => {
    return class extends Source {
        static get relationMappings() {
            Target = Target();
            pivot  = pivot || [Source.tableName, Target.tableName].sort().join('_');
            return {
                ...Source.relationMappings,
                [relationship || pluralize(camelcase(Target.name))]: {
                    relation: Model.ManyToManyRelation,
                    modelClass: Target,
                    join: join || {
                        from: `${Source.tableName}.${Source.idColumn}`,
                        through: {
                            from: `${pivot}.${camelcase(Source.name + '_' + Source.idColumn)}`,
                            to: `${pivot}.${camelcase(Target.name + '_' + Target.idColumn)}`,
                        },
                        to: `${Target.tableName}.${Target.idColumn}`
                    }
                }
            }
        }
    }
};

/**
 *
 * @param Target
 * @param relationship
 * @param pivot
 * @param join
 * @return {function(*): {relationMappings: *, new(): {}, prototype: {}}}
 */
export const hasOneThrough = (Target, relationship = null, pivot = null, join = null)  => Source => {
    return class extends Source {
        static get relationMappings() {
            Target = Target();
            pivot  = pivot || [Source.tableName, Target.tableName].sort().join('_');
            return {
                ...Source.relationMappings,
                [relationship || camelcase(Target.name)]: {
                    relation: Model.HasOneThroughRelation,
                    modelClass: Target,
                    join: join || {
                        from: `${Source.tableName}.${Source.idColumn}`,
                        through: {
                            from: `${pivot}.${camelcase(Source.name + '_' + Source.idColumn)}`,
                            to: `${pivot}.${camelcase(Target.name + '_' + Target.idColumn)}`,
                        },
                        to: `${Target.tableName}.${Target.idColumn}`
                    }
                }
            }
        }
    }
};
