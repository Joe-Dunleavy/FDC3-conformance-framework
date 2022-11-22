import mocha, { Suite } from "mocha";
import constants from "../constants";

import fdc3AddContextListener_1_2 from "./v1.2/basic/fdc3.addContextListener";
import fdc3AddIntentListener_1_2 from "./v1.2/basic/fdc3.addIntentListener";
import fdc3Broadcast_1_2 from "./v1.2/advanced/fdc3.broadcast";
import fdc3FindIntent_1_2 from "./v1.2/advanced/fdc3.findIntent";
import fdc3FindIntentsByContext_1_2 from "./v1.2/advanced/fdc3.findIntentsByContext";
import fdc3GetCurrentChannel_1_2 from "./v1.2/basic/fdc3.getCurrentChannel";
import fdc3GetInfo_1_2 from "./v1.2/basic/fdc3.getInfo";
import fdc3GetOrCreateChannel_1_2 from "./v1.2/basic/fdc3.getOrCreateChannel";
import fdc3GetSystemChannels_1_2 from "./v1.2/basic/fdc3.getSystemChannels";
import fdc3JoinChannel_1_2 from "./v1.2/basic/fdc3.joinChannel";
import fdc3LeaveCurrentChannel_1_2 from "./v1.2/basic/fdc3.leaveCurrentChannel";
import fdc3Open_1_2 from "./v1.2/advanced/fdc3.open";
import fdc3RaiseIntent_1_2 from "./v1.2/advanced/fdc3.raiseIntent";
import fdc3RaiseIntentForContext_1_2 from "./v1.2/basic/fdc3.raiseIntentForContext";
//import fdc3AddContextListener_2_0 from "./v2.0/fdc3.addContextListener";
// import fdc3AddIntentListener_2_0 from "./v2.0/fdc3.addIntentListener";
import fdc3Broadcast_2_0 from "./v2.0/advanced/fdc3.broadcast";
import fdc3FindIntent_2_0 from "./v2.0/advanced/fdc3.findIntent";
// import fdc3FindIntentsByContext_2_0 from "./v2.0/fdc3.findIntentsByContext";
// import fdc3GetCurrentChannel_2_0 from "./v2.0/fdc3.getCurrentChannel";
import fdc3GetInfo_2_0 from "./v2.0/advanced/fdc3.getInfo";
import fdc3GetInstances_2_0 from "./v2.0/advanced/fdc3.findInstances";
// import fdc3GetOrCreateChannel_2_0 from "./v2.0/fdc3.getOrCreateChannel";
import fdc3GetUserChannels_2_0 from "./v2.0/basic/fdc3.getUserChannels";
import fdc3getAppMetadata_2_0 from "./v2.0/advanced/fdc3.getAppMetadata";
// import fdc3JoinChannel_2_0 from "./v2.0/fdc3.joinChannel";
// import fdc3LeaveCurrentChannel_2_0 from "./v2.0/fdc3.leaveCurrentChannel";
// import fdc3Open_2_0 from "./v2.0/fdc3.open";
// import fdc3RaiseIntent_2_0 from "./v2.0/fdc3.raiseIntent";
// import fdc3RaiseIntentForContext_2_0 from "./v2.0/fdc3.raiseIntentForContext";

const basicSuite_1_2 = [
  fdc3AddContextListener_1_2,
  fdc3AddIntentListener_1_2,
  fdc3GetCurrentChannel_1_2,
  fdc3GetInfo_1_2,
  fdc3GetOrCreateChannel_1_2,
  fdc3GetSystemChannels_1_2,
  fdc3JoinChannel_1_2,
  fdc3LeaveCurrentChannel_1_2,
  fdc3RaiseIntentForContext_1_2,
];

const advancedSuite_1_2 = [
  fdc3Open_1_2,
  fdc3Broadcast_1_2,
  fdc3FindIntent_1_2,
  fdc3RaiseIntent_1_2,
  fdc3FindIntentsByContext_1_2,
];

const allSuites_1_2 = [...basicSuite_1_2, ...advancedSuite_1_2];

export const packs: { [index: string]: (() => Suite)[] } = {
  fdc3FindIntent_2_0: [fdc3FindIntent_2_0],
  "fdc3getAppMetadata 2.0": [fdc3getAppMetadata_2_0],
  "fdc3GetInfo 2.0": [fdc3GetInfo_2_0],
  "fdc3FindInstances 2.0": [fdc3GetInstances_2_0],
  "fdc3Broadcast 2.0": [fdc3Broadcast_2_0],
  "All 1.2": allSuites_1_2,
  "Basic 1.2": basicSuite_1_2,
  "Advanced 1.2": advancedSuite_1_2,
  "fdc3AddContextListener 1.2": [fdc3AddContextListener_1_2],
  "fdc3Broadcast 1.2": [fdc3Broadcast_1_2],
  "fdc3FindIntent 1.2": [fdc3FindIntent_1_2],
  "fdc3Open 1.2": [fdc3Open_1_2],
  "fdc3RaiseIntent 1.2": [fdc3RaiseIntent_1_2],
  "fdc3RaiseIntentForContext 1.2": [fdc3RaiseIntentForContext_1_2],
  "fdc3AddIntentListener 1.2": [fdc3AddIntentListener_1_2],
  "fdc3GetCurrentChannel 1.2": [fdc3GetCurrentChannel_1_2],
  "fdc3GetInfo 1.2": [fdc3GetInfo_1_2],
  "fdc3GetOrCreateChannel 1.2": [fdc3GetOrCreateChannel_1_2],
  "fdc3GetSystemChannels 1.2": [fdc3GetSystemChannels_1_2],
  "fdc3JoinChannel 1.2": [fdc3JoinChannel_1_2],
  "fdc3LeaveCurrentChannel 1.2": [fdc3LeaveCurrentChannel_1_2],
  "fdc3FindIntentsByContext 1.2": [fdc3FindIntentsByContext_1_2],
};

export function getPackNames(): string[] {
  return Object.keys(packs);
}

/**
 * Intended for running tests in container with results shown
 * in HTML page
 */
export const executeTestsInBrowser = (pack: string) => {
  (mocha as any).timeout(constants.TestTimeout);
  packs[pack].forEach((suite) => suite());
  mocha.run();
};
