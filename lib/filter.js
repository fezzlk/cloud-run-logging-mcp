export function buildFilter({
  projectId,
  serviceName,
  severity,
  textFilter,
  startTime,
  endTime,
}) {
  const parts = [
    `resource.type="cloud_run_revision"`,
    `resource.labels.project_id="${projectId}"`,
    `resource.labels.service_name="${serviceName}"`,
  ];
  if (severity) {
    parts.push(`severity>=${severity}`);
  }
  if (textFilter) {
    parts.push(`textPayload:"${textFilter}"`);
  }
  if (startTime) {
    parts.push(`timestamp>="${startTime}"`);
  }
  if (endTime) {
    parts.push(`timestamp<="${endTime}"`);
  }
  return parts.join(" AND ");
}
