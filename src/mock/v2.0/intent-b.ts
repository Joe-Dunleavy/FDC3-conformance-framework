import {
    closeWindowOnCompletion,
    onFdc3Ready,
    sendContextToTests,
  } from "./mock-functions";
  import { DesktopAgent } from "fdc3_2_0";
  declare let fdc3: DesktopAgent;
  
  onFdc3Ready().then(async () => {
    await closeWindowOnCompletion();
    fdc3.addIntentListener('bTestingIntent', async (context) => {
        return context;
    });
    fdc3.addIntentListener('sharedTestingIntent1', async (context) => {
        return context;
    });

    //broadcast that intent-a has opened
    await sendContextToTests({
        type: "fdc3-intent-b-opened"
    });
});
