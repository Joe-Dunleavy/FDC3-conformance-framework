import {
    closeWindowOnCompletion,
    onFdc3Ready,
    sendContextToTests,
  } from "./mock-functions";
  import { Context, DesktopAgent } from "fdc3_2_0";
  declare let fdc3: DesktopAgent;
  
  onFdc3Ready().then(async () => {
    await closeWindowOnCompletion();
    fdc3.addIntentListener("sharedTestingIntent2", async (context) => {
      return context;
    });
  });
  