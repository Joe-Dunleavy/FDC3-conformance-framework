import { Channel as Channel_1_2, Context as Context_1_2 } from "fdc3_1_2";
import { Channel as Channel_2_0, Context as Context_2_0 } from "fdc3_2_0";
import { ChannelsAppConfig, Commands } from "../tests/src/types";
export interface IChannelsAppCommandExecutor {
    joinRetrievedUserChannel: (channelId: string) => Promise<Channel_1_2 | Channel_2_0 | undefined>;
    retrieveTestAppChannel: () => Promise<Channel_1_2 | Channel_2_0 | undefined>;
    broadcastContextItem: (contextType: string, testId: string, channel: any, historyItems?: number) => Promise<void>;
    closeWindowOnCompletion: (testId: string) => void;
    notifyTestAppOnCompletion: (testId: string) => void;
}
export interface IBroadcastService {
    broadcast: (context: Context_1_2 | Context_2_0, Channel?: any) => void;
}
export interface IChannelsAppCommander {
    executeCommands: (orderedCommands: Commands[], config: ChannelsAppConfig) => void;
}
//# sourceMappingURL=interfaces.d.ts.map