import fs from 'fs';
let code = fs.readFileSync('src/components/dashboard/Reminders.tsx', 'utf8');

code = code.replace(
  `import { useDashboardData } from '../../hooks/useDashboardData';`,
  `import { useDashboardData } from '../../hooks/useDashboardData';\nimport { useNotificationStore } from '../../store/notificationStore';\nimport { useEffect } from 'react';`
);

const fetchLogic = `
  const { hasData } = useDashboardData();
  const notifications = useNotificationStore(state => state.notifications);
  const fetchNotifications = useNotificationStore(state => state.fetchNotifications);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  
  const unreadCount = notifications.filter(n => !n.is_read).length;
  
  // Map notifications to reminders format
  const mappedReminders = notifications.slice(0, 5).map(n => ({
    id: n.id,
    title: n.title,
    time: new Date(n.created_at).toLocaleDateString(),
    type: n.type === 'info' ? 'goal' : n.type === 'warning' ? 'alert' : 'interview',
    priority: n.type === 'warning' ? 'High' : 'Medium',
    color: n.type === 'warning' ? 'from-orange-500 to-red-500' : 'from-blue-500 to-indigo-500'
  }));
`;

code = code.replace(
  `  const { hasData } = useDashboardData();`,
  fetchLogic
);

code = code.replace(
  `        {hasData && (
          <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-indigo-400">3</span>
          </div>
        )}`,
  `        {unreadCount > 0 && (
          <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center px-1.5">
            <span className="text-[10px] font-bold text-indigo-400">{unreadCount}</span>
          </div>
        )}`
);

code = code.replace(
  `        {true ? (`,
  `        {mappedReminders.length === 0 ? (`
);

code = code.replace(
  `          REMINDERS.map((reminder, idx) => (`,
  `          mappedReminders.map((reminder, idx) => (`
);

fs.writeFileSync('src/components/dashboard/Reminders.tsx', code);
