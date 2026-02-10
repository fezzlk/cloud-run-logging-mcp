import process from "node:process";

export const CONFIG = {
  defaultLimit: 50,
  maxLimit: 200,
};

export function getEnv() {
  return {
    gcpSaJson: process.env.GCP_SA_JSON || "",
    gcpSaJsonPath: process.env.GCP_SA_JSON_PATH || "",
  };
}
