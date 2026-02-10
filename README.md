# cloud-run-logging-mcp

Cloud Run の Cloud Logging を MCP 経由で取得するためのサーバです。

## Features

- Cloud Run サービスのログ取得
- フィルタ条件（severity / text / 時間範囲）対応
- MCP tool として `cloud_run_logs` を提供

## Requirements

- Docker
- サービスアカウントキー（JSON）

## Environment

- `GCP_SA_JSON_PATH` : サービスアカウント JSON の **ホスト側フルパス**
- `GCP_SA_JSON` : JSON文字列（フォールバック。通常は未使用）

## Build

```bash
docker build -t cloud-run-logging-mcp:local .
```

## Run (stdio)

```bash
export GCP_SA_JSON_PATH="/absolute/path/to/sa.json"

docker run --rm -i   -e GCP_SA_JSON_PATH=/secrets/key.json   -v "$GCP_SA_JSON_PATH":/secrets/key.json:ro   cloud-run-logging-mcp:local
```

## MCP tool

Tool name: `cloud_run_logs`

Input schema:

- `project_id` (string, required)
- `service_name` (string, required)
- `limit` (int, default 50, max 200)
- `severity` (string, optional)
- `text_filter` (string, optional)
- `start_time` (RFC3339, optional)
- `end_time` (RFC3339, optional)

Example call:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "cloud_run_logs",
    "arguments": {
      "project_id": "simple-alert-line-bot",
      "service_name": "simple-alert-line-bot",
      "limit": 5,
      "severity": "ERROR"
    }
  }
}
```

## Docs

- `docs/USAGE.md`
- `docs/CONFIG.md`
- `docs/TROUBLESHOOTING.md`
- `docs/DEVELOPMENT.md`
