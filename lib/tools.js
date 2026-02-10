import { z } from "zod";
import { CONFIG } from "./config.js";

export const ListToolsRequestSchema = z.object({
  method: z.literal("tools/list"),
  params: z.any().optional(),
  id: z.any().optional(),
  jsonrpc: z.any().optional(),
});

export const CallToolRequestSchema = z.object({
  method: z.literal("tools/call"),
  params: z.object({
    name: z.string(),
    arguments: z.any().optional(),
  }),
  id: z.any().optional(),
  jsonrpc: z.any().optional(),
});

export const LogQuerySchema = z.object({
  project_id: z.string(),
  service_name: z.string(),
  limit: z.number().int().min(1).max(CONFIG.maxLimit).default(CONFIG.defaultLimit),
  severity: z.string().optional(),
  text_filter: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
});

export function listToolsResponse() {
  return {
    tools: [
      {
        name: "cloud_run_logs",
        description: "Fetch Cloud Run logs from Cloud Logging for a given service.",
        inputSchema: {
          type: "object",
          properties: {
            project_id: { type: "string" },
            service_name: { type: "string" },
            limit: { type: "integer", minimum: 1, maximum: CONFIG.maxLimit, default: CONFIG.defaultLimit },
            severity: { type: "string" },
            text_filter: { type: "string" },
            start_time: { type: "string", description: "RFC3339 timestamp" },
            end_time: { type: "string", description: "RFC3339 timestamp" },
          },
          required: ["project_id", "service_name"],
        },
      },
    ],
  };
}
