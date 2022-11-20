import { DesktopAgent as DesktopAgent_1_2 } from "fdc3_1_2";
import { DesktopAgent as DesktopAgent_2_0 } from "fdc3_2_0";
import { ChannelsAppConfig, Commands } from "../../tests/src/types";
import { IChannelsAppCommandExecutor, IChannelsAppCommander } from "../interfaces";
export declare class ChannelsAppCommander implements IChannelsAppCommander {
    private commandExecutor;
    constructor(commandExecutor: IChannelsAppCommandExecutor);
    executeCommands(orderedCommands: Commands[], config: ChannelsAppConfig): Promise<void>;
    getCommandExecutor(fdc3: DesktopAgent_1_2 | DesktopAgent_2_0): Promise<IChannelsAppCommandExecutor>;
}
//# sourceMappingURL=channelService.d.ts.map