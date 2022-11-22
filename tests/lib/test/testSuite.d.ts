type testSet = {
    [key: string]: (() => void)[];
};
export declare const allTests: testSet;
export declare const packs: {
    [index: string]: string[];
};
export declare function getPackNames(): string[];
export declare function getPackMembers(packName: string): string[];
/**
 * Intended for running tests in container with results shown
 * in HTML page
 */
export declare const executeTestsInBrowser: (pack: string) => void;
export {};
//# sourceMappingURL=testSuite.d.ts.map