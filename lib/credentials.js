import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

export function ensureCredentials({ gcpSaJsonPath, gcpSaJson }) {
  if (gcpSaJsonPath) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = gcpSaJsonPath;
    return { source: "path", value: gcpSaJsonPath };
  }
  if (!gcpSaJson) {
    throw new Error("GCP_SA_JSON_PATH or GCP_SA_JSON is required");
  }
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "gcp-sa-"));
  const keyPath = path.join(tmpDir, "key.json");
  fs.writeFileSync(keyPath, gcpSaJson, { encoding: "utf8", mode: 0o600 });
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
  return { source: "inline", value: keyPath };
}
