import { closeWindowOnCompletion, onFdc3Ready } from './mock-functions'
import { DesktopAgent } from "fdc3_2_0/dist/api/DesktopAgent";
import { sendContextToTests } from '../v2.0/mock-functions';
import { wait, wrapPromise } from "../../utils";
import { IntentAppBContext } from "../../../src/test/v2.0/advanced/fdc3.raiseIntent";

declare let fdc3: DesktopAgent

let stats = document.getElementById("context");
stats.innerHTML = "I'm here/ ";

onFdc3Ready().then(async () => {
    await closeWindowOnCompletion();
    // fdc3.addIntentListener('bTestingIntent', async (context) => {
    //     return context;
    // });
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

    //broadcast that intent-a has opened
    await sendContextToTests({
        type: "fdc3-intent-b-opened"
    });
});
