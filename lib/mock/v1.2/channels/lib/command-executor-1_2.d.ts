import { Channel, Context } from "fdc3_1_2";
import { IChannelsAppCommandExecutor, IBroadcastService } from "../../../interfaces";
export declare class CommandExecutor_1_2 implements IChannelsAppCommandExecutor {
    joinRetrievedUserChannel(channelId: string): Promise<Channel | undefined>;
    retrieveTestAppChannel(): Promise<Channel | undefined>;
    broadcastContextItem(contextType: string, testId: string, channel: Channel, historyItems?: number): Promise<void>;
    broadcast: (contextConfig: ContextConfig, broadcast: Function) => void;
    getBroadcastService(currentChannelType: string): IBroadcastService;
    systemChannelBroadcastService: {
        broadcast: (context: Context) => void;
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
//# sourceMappingURL=command-executor-1_2.d.ts.map