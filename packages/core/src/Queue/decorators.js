import {Queue} from "../Contracts";
import {container} from "@fusion.io/container";

export const job = (toPayload, fromPayload) => {
    return (Target) => {
        return class extends Target {
            constructor(...parameters) {
                super(...parameters);
            }
            toPayload() {
                return toPayload(this);
            }

            static fromPayload(payload) {
                return fromPayload(payload);
            }

            dispatch(onQueue = null) {
                return container.make(Queue).enqueue(this, null, onQueue);
            }
        }
    }
};
