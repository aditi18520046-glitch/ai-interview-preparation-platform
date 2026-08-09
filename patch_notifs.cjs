const fs = require('fs');

let content = fs.readFileSync('src/pages/Notifications.tsx', 'utf8');
content = content.replace(
  "export default function Notifications() {",
  `import { useNotificationStore } from '../store/notificationStore';
import { useEffect } from 'react';

export default function Notifications() {
  const { notifications, fetchNotifications, markAsRead, deleteNotification } = useNotificationStore();
  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);`
);
content = content.replace(
  "const [notifications, setNotifications] = useState<NotificationRecord[]>([]);",
  ""
);
content = content.replace(
  "const markAsRead = (id: string) => {",
  "const handleMarkAsRead = (id: string) => {\n markAsRead(id);\n/*"
);
content = content.replace(
  "setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));",
  "*/"
);

content = content.replace(
  "const deleteNotification = (id: string) => {",
  "const handleDeleteNotification = (id: string) => {\n deleteNotification(id);\n/*"
);
content = content.replace(
  "setNotifications(notifications.filter(n => n.id !== id));",
  "*/"
);

content = content.replace(/markAsRead\(/g, "handleMarkAsRead(");
content = content.replace(/deleteNotification\(/g, "handleDeleteNotification(");
// Ensure we don't accidentally replace the hook import variables
content = content.replace("const handleMarkAsRead = (id: string) => {\n handleMarkAsRead(id);", "const handleMarkAsRead = (id: string) => {\n markAsRead(id);");
content = content.replace("const handleDeleteNotification = (id: string) => {\n handleDeleteNotification(id);", "const handleDeleteNotification = (id: string) => {\n deleteNotification(id);");

fs.writeFileSync('src/pages/Notifications.tsx', content);

