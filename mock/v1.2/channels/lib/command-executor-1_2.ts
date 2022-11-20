import { Channel, Context, DesktopAgent } from "fdc3_1_2";
import { ChannelType } from "../../../../tests/src/types";
import {
  IChannelsAppCommandExecutor,
  IBroadcastService,
} from "../../../interfaces";

declare let fdc3: DesktopAgent;

export class CommandExecutor_1_2 implements IChannelsAppCommandExecutor {
  async joinRetrievedUserChannel(
    channelId: string
  ): Promise<Channel | undefined> {
    const systemChannels = await fdc3.getSystemChannels();
    const joinedChannel = systemChannels.find((c) => c.id === channelId);
    if (joinedChannel) {
      await fdc3.joinChannel(channelId);
    } else {
      console.log("unable to retrieve specified user channel");
    }
    return joinedChannel;
  }

  async retrieveTestAppChannel(): Promise<Channel | undefined> {
    return await fdc3.getOrCreateChannel("test-channel");
  }

  async broadcastContextItem(
    contextType: string,
    testId: string,
    channel: Channel,
    historyItems?: number
  ): Promise<void> {
    const contextConfig: ContextConfig = {
      contextType: contextType,
      historyItems: historyItems ?? 1,
      testId: testId,
      channel: channel,
    };

    let broadcastService = this.getBroadcastService(channel.type);
    this.broadcast(contextConfig, broadcastService.broadcast);
  }

  broadcast = (contextConfig: ContextConfig, broadcast: Function) => {
    for (let i = 0; i < contextConfig.historyItems; i++) {
      let context: AppControlContext = {
        type: contextConfig.contextType,
        name: `History-item-${i + 1}`,
      };

      if (contextConfig.testId) context.testId = contextConfig.testId;
      broadcast(context, contextConfig.channel);
    }
  };

  //get app/system channel broadcast service
  getBroadcastService(currentChannelType: string): IBroadcastService {
    if (currentChannelType === ChannelType.system) {
      return this.systemChannelBroadcastService;
    } else if (currentChannelType === ChannelType.app) {
      return this.appChannelBroadcastService;
    } else {
      throw new Error(`Unknown channel type detected: ${currentChannelType}`);
    }
  }

  //system channel broadcast service
  systemChannelBroadcastService = {
    broadcast: (context: Context) => {
      fdc3.broadcast(context);
    },
  };

  appChannelBroadcastService: IBroadcastService = {
    broadcast: (context: Context, channel?: Channel) => {
      if (channel !== undefined) {
        channel.broadcast(context);
      } else {
        throw new Error("Enable to broadcast to app channel: no channel found");
      }
    },
  };

  async notifyTestAppOnCompletion(testId: string) {
    const appControlChannel = await fdc3.getOrCreateChannel("app-control");
    let context: AppControlContext = {
      type: "executionComplete",
      testId: testId,
    };
    appControlChannel.broadcast(context);
  }

  async closeWindowOnCompletion(testId: string) {
    const appControlChannel = await fdc3.getOrCreateChannel("app-control");
    appControlChannel.addContextListener("closeWindow", async () => {
      let context: AppControlContext = {
        type: "windowClosed",
        testId: testId,
      };
      appControlChannel.broadcast(context);
      setTimeout(() => {
        //yield to make sure the broadcast gets out before we close
        window.close();
      }, 5);
    });
  }
}

interface AppControlContext extends Context {
  testId?: string;
}

type ContextConfig = {
  contextType: string;
  historyItems: number;
  testId?: string;
  channel?: Channel;
};
