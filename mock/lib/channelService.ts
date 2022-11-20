import { DesktopAgent as DesktopAgent_1_2 } from "fdc3_1_2";
import { DesktopAgent as DesktopAgent_2_0 } from "fdc3_2_0";
import { ChannelsAppConfig, Commands } from "../../tests/src/types";
import {
  IChannelsAppCommandExecutor,
  IChannelsAppCommander,
} from "../interfaces";
import { CommandExecutor_1_2 } from "../v1.2/channels/lib/command-executor-1_2";
import { CommandExecutor_2_0 } from "../v2.0/channels/lib/command-executor-2_0";

export class ChannelsAppCommander implements IChannelsAppCommander {
  private commandExecutor: IChannelsAppCommandExecutor;

  constructor(commandExecutor: IChannelsAppCommandExecutor) {
    this.commandExecutor = commandExecutor;
  }

  //execute commands in order
  async executeCommands(
    orderedCommands: Commands[],
    config: ChannelsAppConfig
  ) {
    let channel;

    //close ChannelsApp when test is complete
    await this.commandExecutor.closeWindowOnCompletion(config.testId);

    for (const command in orderedCommands) {
      switch (command) {
        case Commands.joinRetrievedUserChannel: {
          if (config.userChannelId)
            channel = await this.commandExecutor.joinRetrievedUserChannel(
              config.userChannelId
            );
          break;
        }
        case Commands.retrieveTestAppChannel: {
          channel = await this.commandExecutor.retrieveTestAppChannel();
          break;
        }
        case Commands.broadcastInstrumentContext: {
          if (channel)
            await this.commandExecutor.broadcastContextItem(
              "fdc3.instrument",
              config.testId,
              channel,
              config.historyItems
            );
          break;
        }
        case Commands.broadcastContactContext: {
          if (channel)
            await this.commandExecutor.broadcastContextItem(
              "fdc3.contact",
              config.testId,
              channel,
              config.historyItems
            );
          break;
        }
      }
    }

    //notify app A that ChannelsApp has finished executing
    if (config.notifyTestAppOnCompletion) {
      await this.commandExecutor.notifyTestAppOnCompletion(config.testId);
    }
  }

  async getCommandExecutor(
    fdc3: DesktopAgent_1_2 | DesktopAgent_2_0
  ): Promise<IChannelsAppCommandExecutor> {
    const fdc3Info = await fdc3.getInfo();
    if (fdc3Info.fdc3Version === "1.2") {
      return new CommandExecutor_1_2();
    } else if (fdc3Info.fdc3Version === "2.0") {
      return new CommandExecutor_2_0();
    } else {
      throw new Error("incompatible fdc3 version detected");
    }
  }
}
