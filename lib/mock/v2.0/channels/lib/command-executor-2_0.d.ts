import { Channel, Context } from "fdc3_2_0";
import { IChannelsAppCommandExecutor, IBroadcastService } from "../../../interfaces";
export declare class CommandExecutor_2_0 implements IChannelsAppCommandExecutor {
    joinRetrievedUserChannel(channelId: string): Promise<Channel | undefined>;
    retrieveTestAppChannel(): Promise<Channel | undefined>;
    broadcastContextItem(contextType: string, testId: string, channel: Channel, historyItems?: number): Promise<void>;
    broadcast: (contextConfig: ContextConfig, broadcast: Function) => Promise<void>;
    getBroadcastService(currentChannelType: string): IBroadcastService;
    systemChannelBroadcastService: {
        broadcast: (context: Context) => Promise<void>;
    };
    appChannelBroadcastService: IBroadcastService;
    notifyTestAppOnCompletion(testId: string): Promise<void>;
    closeWindowOnCompletion(testId: string): Promise<void>;
}
type ContextConfig = {
    contextType: string;
    historyItems: number;
    testId?: string;
    channel?: Channel;
};
export {};
//# sourceMappingURL=command-executor-2_0.d.ts.map