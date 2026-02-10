# Usage

## MCP tool: cloud_run_logs

### Required
- `project_id`
- `service_name`

### Optional
- `limit` (1-200)
- `severity` (e.g. `ERROR`, `WARNING`)
- `text_filter` (substring match in textPayload)
- `start_time` / `end_time` (RFC3339)

### Example
```json
{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"cloud_run_logs","arguments":{"project_id":"simple-alert-line-bot","service_name":"simple-alert-line-bot","limit":10,"severity":"ERROR","text_filter":"Traceback"}}}
```
