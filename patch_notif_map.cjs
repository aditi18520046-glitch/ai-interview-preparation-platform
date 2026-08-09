const fs = require('fs');

let content = fs.readFileSync('src/pages/Notifications.tsx', 'utf8');

// The original file used n.isRead, n.title, n.time (or created_at), n.description (or message).
// In store we have: id, title, message, type, is_read, created_at
// Let's replace usages in Notifications.tsx
content = content.replace(/n\.isRead/g, "n.is_read");
content = content.replace(/n\.description/g, "n.message");
content = content.replace(/n\.category/g, "n.type");
content = content.replace(/n\.time/g, "new Date(n.created_at).toLocaleString()");
// And update markAsRead and deleteNotification if they exist.
// Let's also check if they are bound to buttons.
fs.writeFileSync('src/pages/Notifications.tsx', content);

