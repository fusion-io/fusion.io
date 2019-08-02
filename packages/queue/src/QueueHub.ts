import { Hub } from "@fusion.io/bus";
import { singleton } from "@fusion.io/core";

/**
 * Queue is a special case of Hub. Where the message will run
 * in the FIFO order.
 */
@singleton()
export default class QueueHub extends Hub {

}
