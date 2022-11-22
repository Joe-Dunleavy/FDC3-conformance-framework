export declare function sleep(timeoutMs?: number): {
    promise: Promise<void>;
    timeout: any;
};
export declare function wait(timeoutMs?: number): Promise<void>;
export declare function wrapPromise(): {
    promise: Promise<void>;
    resolve: () => void;
    reject: (reason?: any) => void;
};
//# sourceMappingURL=utils.d.ts.map