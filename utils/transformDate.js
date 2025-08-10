import {
  differenceInMinutes,
  differenceInHours,
  differenceInCalendarDays,
} from "date-fns";

export const transformDate = (date) => {
  const minutesDifference = differenceInMinutes(new Date(), new Date(date));

  if (minutesDifference === 0) {
    return "Just now";
  } else if (minutesDifference < 60) {
    return `${minutesDifference} mins ago`;
  } else if (minutesDifference < 1440) {
    const hoursDifference = differenceInHours(new Date(), new Date(date));
    return `${hoursDifference} ${hoursDifference === 1 ? "hr" : "hrs"} ago`;
  } else {
    const daysDifference = differenceInCalendarDays(new Date(), new Date(date));
    return `${daysDifference} days ago`;
  }
};
