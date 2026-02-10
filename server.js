import process from "node:process";
import { Logging } from "@google-cloud/logging";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { getEnv } from "./lib/config.js";
import { ensureCredentials } from "./lib/credentials.js";
import { buildFilter } from "./lib/filter.js";
import { CallToolRequestSchema, ListToolsRequestSchema, LogQuerySchema, listToolsResponse } from "./lib/tools.js";

const server = new Server(
  { name: "cloud-run-logging-mcp", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return listToolsResponse();
});

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name !== "cloud_run_logs") {
    throw new Error(`Unknown tool: ${req.params.name}`);
  }
  const args = LogQuerySchema.parse(req.params.arguments || {});
  const env = getEnv();
  ensureCredentials(env);

  const logging = new Logging({ projectId: args.project_id });
  const filter = buildFilter({
    projectId: args.project_id,
    serviceName: args.service_name,
    severity: args.severity,
    textFilter: args.text_filter,
    startTime: args.start_time,
    endTime: args.end_time,
  });

  const [entries] = await logging.getEntries({
    filter,
    pageSize: args.limit,
    orderBy: "timestamp desc",
  });

  const lines = entries.map((e) => {
    const ts = e.metadata.timestamp || e.metadata.receiveTimestamp || "";
    const sev = e.metadata.severity || "";
    const payload =
      typeof e.data === "string"
        ? e.data
        : e.data?.message ||
          e.data?.textPayload ||
          JSON.stringify(e.data || e.metadata, null, 2);
    return `${ts} ${sev} ${payload}`;
  });

  return {
    content: [
      {
        type: "text",
        text: lines.join("\n"),
      },
    ],
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
