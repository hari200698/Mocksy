/**
 * Server-only telemetry helper
 * Logs events for monitoring and analytics
 */
export function logEvent(name: string, props?: Record<string, any>): void {
  console.log({
    name,
    ...props,
    ts: new Date().toISOString(),
  });
}




