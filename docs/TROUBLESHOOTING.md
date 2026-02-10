# Troubleshooting

## GCP_SA_JSON_PATH not set
- `GCP_SA_JSON_PATH` が空、またはファイルが存在しない

## Permission denied
- サービスアカウントに `logging.viewer` が不足

## Empty result
- `service_name` が Cloud Run サービス名と一致しているか確認
- `project_id` が正しいか確認
