import { assert, expect } from "chai";
import APIDocumentation from "../../../apiDocuments";
import { DesktopAgent } from "fdc3_2_0/dist/api/DesktopAgent";

declare let fdc3 : DesktopAgent
const getCurrentChannelDocs =
  "\r\nDocumentation: " + APIDocumentation.getCurrentChannel + "\r\nCause";

export default () =>
  describe("fdc3.getCurrentChannel", () => {
    it("(UCCurrentChannel1) The channel returned when running getCurrentChannel() should match the joined channel", async () => {
      const errorMessage = `\r\nSteps to reproduce:\r\n- App A gets user channels\r\n- App A joins user channel 3\r\n- App A gets current channel${getCurrentChannelDocs}`;

      //Join user channel 1
      const channels = await fdc3.getUserChannels();
      if (channels.length > 0) {
        await fdc3.joinUserChannel(channels[2].id);
      } else {
        assert.fail("No system channels available for app A");
      }
      const joinedChannel = await fdc3.getCurrentChannel();
      expect(joinedChannel.id).to.be.equals("3", errorMessage);
    });

    it("(UCCurrentChannel2) getCurrentChannel() should return null if no channel has been joined", async () => {
      const errorMessage = `\r\nSteps to reproduce:\r\n- App A runs getCurrentChannel()${getCurrentChannelDocs}`;
      const joinedChannel = await fdc3.getCurrentChannel();
      expect(joinedChannel).to.be.equals(null, errorMessage);
    });
  });
