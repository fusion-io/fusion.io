export default class ViewEngineNunjucks {

    constructor(nunjucks) {
        this.nunjucks = nunjucks;
    }

    /**
     *
     * @return {nunjucks.Environment}
     */
    getEnv() {
        return this.nunjucks;
    }

    /**
     *
     * @param {FirstStepView} firstStepView
     */
    render(firstStepView) {
        return new Promise((resolve, reject) => {
            this.nunjucks.render(
                this.resolveSecondStepViewName(firstStepView.getView()),
                firstStepView.getData(),
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                }
            )
        });
    }

    resolveSecondStepViewName(firstStepViewName) {
        return (firstStepViewName.split('.').join('/')) + '.njk.html';
    }
}
