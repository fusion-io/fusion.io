import {Router} from "@fusion.io/http";
import HelloController from "./controllers/HelloController";
import FooBarForm from "./FooBarForm";
import {Validator} from "@fusion.io/validation";

export const plasma = {
    dependencies: [Router, Validator],
    bootstrapper: (router: Router, validator: Validator) => {
        router.controller(HelloController);


        const form = new FooBarForm();

        form.assign({
            name: 'foo',
            value: 'bar'
        });

        form.validate(validator).then(result => {
            console.log(result.toJSON(), result.valid());
        })
    }
};
