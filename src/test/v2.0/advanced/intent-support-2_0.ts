import { assert, expect } from "chai";
import { AppIdentifier, Channel, IntentResolution, Listener } from "fdc3_2_0";
import { Context, DesktopAgent, getOrCreateChannel } from "fdc3_2_0";
import APIDocumentation from "../../../apiDocuments";
import constants from "../../../constants";
import { sleep, wait } from "../../../utils";
import { AppControlContext } from "../../common/channel-control";

declare let fdc3: DesktopAgent;
const raiseIntentDocs =
  "\r\nDocumentation: " + APIDocumentation.raiseIntent2_0 + "\r\nCause";

export class IntentControl2_0 {
  async receiveContext(contextType: string) {
    let timeout;
    const appControlChannel = await getOrCreateChannel("app-control");
    const messageReceived = new Promise<Context>(async (resolve, reject) => {
      const listener = await appControlChannel.addContextListener(
        contextType,
        (context) => {
          resolve(context);
          clearTimeout(timeout);
          listener.unsubscribe();
        }
      );

      //if no context received reject promise
      const { promise: sleepPromise, timeout: theTimeout } = sleep();
      timeout = theTimeout;
      await sleepPromise;
      reject(new Error("No context received from app B"));
    });

    return messageReceived;
  }

  async raiseIntent(
    intent: string,
    contextType: string,
    appId?: string,
    delayBeforeReturn?: number
  ): Promise<IntentResolution> {
    let context;
    if(delayBeforeReturn){
      context = {
        type: contextType,
        delayBeforeReturn: delayBeforeReturn
      }
    }

    if(appId){
      return await fdc3.raiseIntent(intent, context, {appId: appId});
    }else{
      return await fdc3.raiseIntent(intent, context);
    }
  }

  validateIntentResolution = (
    appId: string,
    intentResolution: IntentResolution
  ) => {
    if (typeof intentResolution.source === "object") {
      expect(intentResolution.source as AppIdentifier).to.have.property("appId");
      expect(intentResolution.source as AppIdentifier).to.have.property(
        "instanceId"
      );
      expect(typeof intentResolution.source.instanceId).to.be.equal("string");
      expect(intentResolution.source.instanceId).to.not.be.equal("");
      expect((intentResolution.source as AppIdentifier).appId).to.eq(
        appId,
        raiseIntentDocs
      );
    } else assert.fail("Invalid intent resolution object");
  };
  
  async listenForError(){
    const appControlChannel = await getOrCreateChannel("app-control");
    appControlChannel.addContextListener("error", (context: contextWithErrorMessage) => {
      assert.fail(context.errorMessage);
    });
  }

  async closeIntentAppWindow(testId) {
    await broadcastCloseWindow(testId);
    const appControlChannel = await fdc3.getOrCreateChannel("app-control");
    await waitForContext("windowClosed", testId, appControlChannel);
    await wait(constants.WindowCloseWaitTime);
  }
}

const broadcastCloseWindow = async (currentTest) => {
  const appControlChannel = await fdc3.getOrCreateChannel("app-control");
  appControlChannel.broadcast({
    type: "closeWindow",
    testId: currentTest,
  } as AppControlContext);
};

const waitForContext = (
  contextType: string,
  testId: string,
  channel?: Channel
): Promise<Context> => {
  let executionListener: Listener;
  return new Promise<Context>(async (resolve) => {
    console.log(
      Date.now() +
        ` Waiting for type: "${contextType}", on channel: "${channel.id}" in test: "${testId}"`
    );

    const handler = (context: AppControlContext) => {
      if (testId) {
        if (testId == context.testId) {
          console.log(
            Date.now() + ` Received ${contextType} for test: ${testId}`
          );
          resolve(context);
          if (executionListener) executionListener.unsubscribe();
        } else {
          console.warn(
            Date.now() +
              ` Ignoring "${contextType}" context due to mismatched testId (expected: "${testId}", got "${context.testId}")`
          );
        }
      } else {
        console.log(
          Date.now() +
            ` Received (without testId) "${contextType}" for test: "${testId}"`
        );
        resolve(context);
        if (executionListener) executionListener.unsubscribe();
      }
    };

    if (channel === undefined) {
      executionListener = await fdc3.addContextListener(contextType, handler);
    } else {
      executionListener = await channel.addContextListener(
        contextType,
        handler
      );
      //App channels do not auto-broadcast current context when you start listening, so retrieve current context to avoid races
      const ccHandler = async (context: AppControlContext) => {
        if (context) {
          if (testId) {
            if (testId == context?.testId && context?.type == contextType) {
              console.log(
                Date.now() +
                  ` Received "${contextType}" (from current context) for test: "${testId}"`
              );
              if (executionListener) executionListener.unsubscribe();
              resolve(context);
            } //do not warn as it will be ignoring mismatches which will be common
            else {
              console.log(
                Date.now() +
                  ` CHecking for current context of type "${contextType}" for test: "${testId}" Current context did ${
                    context ? "" : "NOT "
                  } exist, 
had testId: "${context?.testId}" (${
                    testId == context?.testId ? "did match" : "did NOT match"
                  }) 
and type "${context?.type}" (${
                    context?.type == contextType ? "did match" : "did NOT match"
                  })`
              );
            }
          } else {
            console.log(
              Date.now() +
                ` Received "${contextType}" (from current context) for an unspecified test`
            );
            if (executionListener) executionListener.unsubscribe();
            resolve(context);
          }
        }
      };
      channel.getCurrentContext().then(ccHandler);
    }
  });
};

export interface contextWithErrorMessage extends Context {
    errorMessage?: string;
  }
  
  export interface IntentAppBContext extends Context {
    delayBeforeReturn: number;
  }
  
