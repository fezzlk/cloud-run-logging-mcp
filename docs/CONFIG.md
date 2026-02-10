# Configuration

## Environment Variables
- `GCP_SA_JSON_PATH` (recommended)
- `GCP_SA_JSON` (fallback)

## IAM
Service Account には最低限以下が必要です。
- `roles/logging.viewer` もしくは
- `roles/logging.logViewer`

## Project Selection
`project_id` は tool 呼び出しの引数で指定します。
