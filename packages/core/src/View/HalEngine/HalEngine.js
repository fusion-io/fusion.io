export default class HalEngine {
    render(firstStepView) {
        const HalTemplate = firstStepView.getView();

        return new HalTemplate().compile(firstStepView.getData());
    }
}
