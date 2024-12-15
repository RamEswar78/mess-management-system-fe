import { useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  useEffect(() => {
    // Register for push notifications if not on web
    if (Device.osName !== "Web") {
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );
    } else {
      console.log("Push notifications are not supported on the web platform.");
    }

    // Add notification listeners
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => setNotification(notification)
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log("User interacted with the notification:", response)
      );

    // Clean up listeners on unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};

async function registerForPushNotificationsAsync() {
  let token;
  try {
    if (Device.isDevice) {
      // Check existing permissions
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Request permissions if not already granted
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notifications");
        return;
      }

      // Get the push token
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Push notifications require a physical device.");
    }
  } catch (error) {
    console.error("Error registering for push notifications:", error);
  }

  return token;
}
