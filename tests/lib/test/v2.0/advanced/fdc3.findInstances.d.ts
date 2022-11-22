import { Context, ContextMetadata, ImplementationMetadata } from "fdc3_2_0";
declare const _default: () => Mocha.Suite;
export default _default;
export interface MetadataContext extends Context {
    implMetadata?: ImplementationMetadata;
    contextMetadata?: ContextMetadata;
}
export interface MetadataAppCommandContext extends Context {
    command: string;
}
export declare enum MetadataAppCommand {
    sendGetInfoMetadataToTests = "sendGetInfoMetadataToTests",
    confirmRaisedIntentReceived = "confirmRaisedIntentReceived"
}
//# sourceMappingURL=fdc3.findInstances.d.ts.map