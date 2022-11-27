import {
  closeWindowOnCompletion,
  onFdc3Ready,
  sendContextToTests,
} from "./mock-functions";
import { Context, DesktopAgent } from "fdc3_2_0";
declare let fdc3: DesktopAgent;

let stats = document.getElementById("context");
stats.innerHTML = "I'm here/ ";

onFdc3Ready().then(async () => {
  await closeWindowOnCompletion();
  fdc3.addIntentListener("kTestingIntent", async (context) => {
    if (context.type != "testContextX") {
      throw new Error(
        `Wrong context received from test. Expected testContextX, got ${context.type}`
      );
    }

    const privChan = await fdc3.createPrivateChannel();

  const listener1 = await privChan.onAddContextListener(() => {});
  const listener2 = await privChan.onUnsubscribe(() => {});
  const listener3 = await privChan.onDisconnect(() => {});
  const listener4 = await privChan.addContextListener("testContextX", () => {});

    return privChan;
  });
});
