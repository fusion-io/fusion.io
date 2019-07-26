import {Tokamak, Kernel, Router, container, plasma, renderable} from "./index";

import {Context} from "koa";

const app = new Tokamak({
    http: {
        keys: []
    },
    view: process.cwd() + '/view'
});

@renderable('renderable')
class RenderableModel {
    constructor(private content: string) { }

    getContent() {
        return this.content;
    }

    render() {
        return `<h1>${this.content}</h1>`;
    }
}

app
    .fuse(plasma)
    .fuse({
        compose: () => {},
        boot: () => {
            const kernel = container.make<Kernel>(Kernel);
            const router = container.make<Router>(Router);

            router.get('/', (context: Context) => {
                context.render('test', {model: new RenderableModel('Some Content')});
            });

            kernel.use(router.routes());
            kernel.listen(2512);
        }
    })
.start();




