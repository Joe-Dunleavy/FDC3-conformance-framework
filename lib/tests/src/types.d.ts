export declare enum Commands {
    joinRetrievedUserChannel = "joinRetrievedUserChannel",
    retrieveTestAppChannel = "retrieveTestAppChannel",
    broadcastInstrumentContext = "broadcastInstrumentContext",
    broadcastContactContext = "broadcastContactContext"
}
export declare enum ChannelType {
    app = "app",
    system = "system"
}
export type ChannelsAppConfig = {
    fdc3ApiVersion: string;
    testId: string;
    userChannelId?: string;
    notifyTestAppOnCompletion?: boolean;
    historyItems?: number;
};
//# sourceMappingURL=types.d.ts.map