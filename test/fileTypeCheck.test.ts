import path from "node:path";
import { assert } from "chai";
import fileTypeCheck from "../lib/file-type-check";

const invalidFile = path.join(__dirname, "assets", "invalid.ts");
const validFile = path.join(__dirname, "assets", "valid.ts");

describe("Types check for files input", () => {
  it("Should fail when invalid file", () =>
    fileTypeCheck([invalidFile]).then((exitCode) =>
      assert.notEqual(exitCode, 0)
    ));

  it("Should fail when includes invalid file", () =>
    fileTypeCheck([invalidFile, validFile]).then((exitCode) =>
      assert.notEqual(exitCode, 0)
    ));

  it("Should pass when valid file", () =>
    fileTypeCheck([validFile]).then((exitCode) => assert.equal(exitCode, 0)));
});
