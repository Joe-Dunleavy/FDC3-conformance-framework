import {
  ResolveError,
} from "fdc3_1_2";
import { assert, expect } from "chai";
import { DesktopAgent } from "fdc3_1_2/dist/api/DesktopAgent";
import { APIDocumentation1_2 } from "../apiDocuments-1.2";

declare let fdc3: DesktopAgent;
const raiseIntentDocs =
  "\r\nDocumentation: " + APIDocumentation1_2.raiseIntent + "\r\nCause";

/**
 * Details on the mock apps used in these tests can be found in /mock/README.md
 */
export default () =>
  describe("fdc3.raiseIntent (NoAppsFound)", () => {

    const test5 =
      "(FailedResolve1) Should fail to raise intent when targeted app intent-a, context 'testContextY' and intent 'aTestingIntent' do not correlate";
    it(test5, async () => {
      try {
        await fdc3.raiseIntent(
          "aTestingIntent",
          {
            type: "testContextY",
          },
          "IntentAppA"
        );
        assert.fail("Error was not thrown");
      } catch (ex) {
        expect(ex).to.have.property("message", ResolveError.NoAppsFound);
      }
    });
    const test6 =
      "(FailedResolve2) Should fail to raise intent when targeted app intent-a (name and appId), context 'testContextY' and intent 'aTestingIntent' do not correlate";
    it(test6, async () => {
      try {
        await fdc3.raiseIntent(
          "aTestingIntent",
          {
            type: "testContextY",
          },
          { name: "IntentAppA", appId: "IntentAppAId" }
        );
        assert.fail("Error was not thrown");
      } catch (ex) {
        expect(ex).to.have.property(
          "message",
          ResolveError.NoAppsFound,
          raiseIntentDocs
        );
      }
    });

    const test7 =
      "(FailedResolve3) Should fail to raise intent when targeted app intent-a (name), context 'testContextY' and intent 'aTestingIntent' do not correlate";
    it(test7, async () => {
      try {
        await fdc3.raiseIntent(
          "aTestingIntent",
          {
            type: "testContextY",
          },
          { name: "IntentAppA" }
        );
        assert.fail("Error was not thrown");
      } catch (ex) {
        expect(ex).to.have.property(
          "message",
          ResolveError.NoAppsFound,
          raiseIntentDocs
        );
      }
    });

    const test8 =
      "(FailedResolve4) Should fail to raise intent when targeted app intent-c, context 'testContextX' and intent 'aTestingIntent' do not correlate";
    it(test8, async () => {
      try {
        await fdc3.raiseIntent(
          "aTestingIntent",
          {
            type: "testContextX",
          },
          "IntentAppC"
        );
        assert.fail("Error was not thrown");
      } catch (ex) {
        expect(ex).to.have.property(
          "message",
          ResolveError.NoAppsFound,
          raiseIntentDocs
        );
      }
    });
  });
