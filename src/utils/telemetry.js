/**
 * Collect client telemetry data for security/analytics
 */
export function collectTelemetry() {
  return {
    // Timezone
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    // Platform/OS
    platform: navigator.platform,

    // Network information
    network: {
      effectiveType: navigator.connection?.effectiveType || null,
      downlink: navigator.connection?.downlink || null,
      rtt: navigator.connection?.rtt || null,
      saveData: navigator.connection?.saveData || false,
    },
  }
}
