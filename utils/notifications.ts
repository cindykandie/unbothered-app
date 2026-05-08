import Constants from "expo-constants";

function isExpoGo(): boolean {
  return Constants.executionEnvironment === "storeClient";
}

export async function scheduleDailyReminder(): Promise<void> {
  if (isExpoGo()) return;

  try {
    // Dynamic require keeps expo-notifications from loading (and logging errors)
    // when running inside Expo Go.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Notifications = require("expo-notifications");

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Stay Unbothered ☁️",
        body: "Not everything deserves access to your nervous system today.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 7,
        minute: 30,
      },
    });
  } catch {
    // Silently skip — notifications unavailable in this environment
  }
}
