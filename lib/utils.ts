import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  isToday,
  isYesterday,
  differenceInDays,
  isSameYear,
  format,
  parseISO,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatChatDate(dateString: string): string {
  const date = parseISO(dateString);
  const now = new Date();

  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else if (differenceInDays(now, date) < 7) {
    return "Previous 7 days";
  } else if (isSameYear(date, now)) {
    return format(date, "MMMM");
  } else {
    return format(date, "yyyy");
  }
}

export function groupAndSortChats(
  chats: {
    title: string;
    url: string;
    date: string;
  }[]
) {
  const groupedChats = chats.reduce(
    (groups, chat) => {
      const dateLabel = formatChatDate(chat.date);
      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(chat);
      return groups;
    },
    {} as Record<string, typeof chats>
  );

  return Object.entries(groupedChats)
    .map(([dateLabel, chatsInGroup]) => {
      const sortedChats = chatsInGroup.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      const mostRecentDate = new Date(sortedChats[0].date);

      return {
        dateLabel,
        chats: sortedChats,
        mostRecentDate,
      };
    })
    .sort((a, b) => b.mostRecentDate.getTime() - a.mostRecentDate.getTime());
}
