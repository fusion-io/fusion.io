import DatabaseManager from "./DatabaseManager";
export { DatabaseManager };
export declare const plasma: {
    dependencies: (string | typeof DatabaseManager)[];
    bootstrapper: () => void;
};
