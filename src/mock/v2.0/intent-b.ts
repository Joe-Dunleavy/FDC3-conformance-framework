import {
  closeWindowOnCompletion,
  onFdc3Ready,
  sendContextToTests,
} from "./mock-functions";
import { Context, DesktopAgent } from "fdc3_2_0";
import { ContextToSend } from "./general";
import { wait, wrapPromise } from "../../utils";
import { IntentAppBContext } from "../../../src/test/v2.0/advanced/fdc3.raiseIntent";

declare let fdc3: DesktopAgent;
let stats = document.getElementById("context");
stats.innerHTML = "I'm here/ ";

onFdc3Ready().then(async () => {
  await closeWindowOnCompletion();
  // await fdc3.addIntentListener('bTestingIntent', async (context) => {
  //     return context;
  // });

  //broadcast that intent-a has opened
  await sendContextToTests({
    type: "fdc3-intent-b-opened",
  });

  const wrapper = wrapPromise();

  let receivedContext: IntentAppBContext;
  await fdc3.addIntentListener(
    "sharedTestingIntent1",
    (context: IntentAppBContext) => {
        stats.innerHTML += `context received: ${context.delayBeforeReturn}/ `;
      receivedContext = context;
      wrapper.resolve();
    }
  );

    await wrapper.promise;

    stats.innerHTML += "after promise/ ";
    stats.innerHTML += `${receivedContext.delayBeforeReturn}/ `;
  if (receivedContext) {
    stats.innerHTML += "receivedContet after timeout/ ";
    await wait(receivedContext.delayBeforeReturn);
    await sendContextToTests(receivedContext);
    if(receivedContext.type === "testContextY"){
      return;
    }else if(receivedContext.type === "testContextX"){
      return receivedContext;
    }
    
  }
});
