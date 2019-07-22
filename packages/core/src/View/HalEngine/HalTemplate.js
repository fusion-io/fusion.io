export default class HalTemplate {

    constructor() {
        this.payload = { };
    }

    /**
     * Compile a data
     *
     * @param data
     * @param format
     */
    compile(data, format = 'json') {
        this.payload = {
            "_links" : {
                "self": this.constructor.generateSelfLink(data)
            }
        };

        this.render(data);

        return this.payload;
    }

    /**
     *
     * @param propertyName
     * @param state
     * @return {HalTemplate}
     */
    state(propertyName, state) {
        this.payload[propertyName] = state;

        return this;
    }

    /**
     *
     * @param relationship
     * @param OtherTemplate
     * @param refData
     * @return {HalTemplate}
     */
    relate(relationship, OtherTemplate, refData) {
        this.payload['_links'][relationship] = OtherTemplate.generateSelfLink(refData);

        return this;
    }

    /**
     *
     * @param relationship
     * @param OtherTemplate
     * @param refData
     * @return {HalTemplate}
     */
    relates(relationship, OtherTemplate, refData) {
        this.payload['_links'][relationship] = refData.map(d => OtherTemplate.generateSelfLink(d));

        this.payload['_links'][relationship].push(OtherTemplate.generateSelfLink(refData));

        return this;
    }

    /**
     *
     * @param property
     * @param OtherTemplate
     * @param data
     * @return {HalTemplate}
     */
    embed(property, OtherTemplate, data) {
        if (!this.payload['_embedded']) {
            this.payload['_embedded'] = {};
        }

        this.payload['_embedded'][property] = (new OtherTemplate().compile(data));

        return this;
    }

    /**
     * @abstract
     *
     * @param referenceData
     */
    static generateSelfLink(referenceData) {

    }

    /**
     * @abstract
     * @param data
     */
    render(data) {

    }
}
