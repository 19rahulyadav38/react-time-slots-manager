import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// // Function to generate time intervals of 15 minutes
export const generateTimeIntervalsForDayOnOverrides = (
  startDate = new Date()
) => {
  // Create a new Date object for 12 AM of the current day
  startDate.setHours(0, 0, 0, 0); // Set to 12 AM

  // Get the timestamp for the start time (12 AM)
  const startTime = startDate.getTime();

  // Calculate the timestamp for 24 hours later (12 AM the next day)
  const endTime = startTime + 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // 15 minutes in milliseconds
  const interval = 15 * 60 * 1000;

  // Function to generate time intervals of 15 minutes
  function generateTimeIntervals(start: number, end: number, interval: number) {
    const intervals = [];
    let currentTime = start;

    while (currentTime < end) {
      intervals.push(currentTime);
      currentTime += interval;
    }

    return intervals;
  }

  // Generate the time intervals
  return generateTimeIntervals(startTime, endTime, interval);
};

// Function to generate time intervals of 15 minutes
export const generateTimeIntervalsForDay = (startDate = new Date()) => {
  // Create a new Date object for 12 AM of the current day
  startDate.setHours(0, 0, 0, 0); // Set to 12 AM

  // Get the timestamp for the start time (12 AM)
  const startTime = startDate.getTime();

  // Calculate the timestamp for 24 hours later (12 AM the next day)
  const endTime = startTime + 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // 15 minutes in milliseconds
  const interval = 15 * 60 * 1000;

  // Function to generate time intervals of 15 minutes
  function generateTimeIntervals(start: number, end: number, interval: number) {
    const intervals = [];
    let currentTime = start;

    while (currentTime < end) {
      intervals.push(
        new Date(currentTime).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      currentTime += interval;
    }

    return intervals;
  }

  // Generate the time intervals
  return generateTimeIntervals(startTime, endTime, interval);
};

// formate timestamp to human readable form
export const formatTime = (timestamp: any) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0"); // Ensure two digits for hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

//initial weekdays
export const initializeWeekdaysForOverride = (
  timeSlots: any,
  numDays: number = 7
) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek.slice(0, numDays).map((day) => ({
    day,
    checked: true,
    slots: [
      {
        start: timeSlots[36],
        end: timeSlots[68],
        startTimeSlots: timeSlots,
        endTimeSlots: timeSlots,
      },
    ],
  }));
};

//initial weekdays for override
export const initializeWeekdays = (timeSlots: any, numDays: number = 7) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek.slice(0, numDays).map((day) => ({
    day,
    checked: !["Sunday", "Saturday"].includes(day),
    slots:
      day === "Sunday" || day === "Saturday"
        ? []
        : [
            {
              start: timeSlots[36],
              end: timeSlots[68],
              startTimeSlots: timeSlots,
              endTimeSlots: timeSlots,
            },
          ],
  }));
};

interface Event {
  start: any;
  end: any;
}

type DailySchedule = Event[];

type ScheduleData = DailySchedule[];

export const removeTimeSlotsStartAndEndTime = (
  scheduleData: ScheduleData
): ScheduleData => {
  const newSchedule = scheduleData?.map((dailySchedule) => {
    return dailySchedule.map((event) => {
      return {
        start: event.start,
        end: event.end,
      };
    });
  });

  return newSchedule;
};

// date to timestamp
export const dateToTimestamp = (dateString: any) => {
  // Parse the date string into a Date object
  const date = new Date(dateString);
  // Get the timestamp (milliseconds since epoch)
  const timestamp = date.getTime();
  return timestamp;
};

// Method to formate date to this June, 13, 2024
export const formatDate = (date: any) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

// method to generate new schedule data time stamp given date array and times array
export const generateTimestamps = (dates: any[], times: any[]) => {
  const timestamps: { start: number; end: number }[] = [];

  // Sort the dates in ascending order
  dates.sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  dates?.forEach((date) => {
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0); // Set hours and minutes to 0 to start at midnight

    times.forEach((time) => {
      let [startHours, startMinutes, startAmPm] = time.start.split(/:| /);
      startHours = parseInt(startHours, 10);
      if (startAmPm.toLowerCase() === "pm" && startHours !== 12) {
        startHours += 12;
      } else if (startAmPm.toLowerCase() === "am" && startHours === 12) {
        startHours = 0;
      }

      let [endHours, endMinutes, endAmPm] = time.end.split(/:| /);
      endHours = parseInt(endHours, 10);
      if (endAmPm.toLowerCase() === "pm" && endHours !== 12) {
        endHours += 12;
      } else if (endAmPm.toLowerCase() === "am" && endHours === 12) {
        endHours = 0;
      }

      let startDate = new Date(dateObj);
      startDate.setHours(startHours, startMinutes, 0, 0);

      let endDate = new Date(dateObj);
      endDate.setHours(endHours, endMinutes, 0, 0);

      const startTimestamp = Math.floor(startDate.getTime() / 1000) * 1000;
      const endTimestamp = Math.floor(endDate.getTime() / 1000) * 1000;

      const timeSlot = {
        start: startTimestamp,
        end: endTimestamp,
      };

      timestamps.push(timeSlot);
    });
  });

  return timestamps;
};

// method to add name in fallback image

export const getInitialName = (userName: string) => {
  // Extract initials from user name, ensuring a maximum of 2 letters
  const nameParts = userName.split(" ");
  let initials = nameParts[0][0].toUpperCase(); // First letter of the first word
  if (nameParts.length > 1) {
    initials += nameParts[1][0].toUpperCase(); // First letter of the second word
  } else if (nameParts[0].length > 1) {
    initials += nameParts[0][1].toUpperCase(); // Second letter of the first word if only one word is present
  }
  return initials.substring(0, 2); // Ensure only 2 characters max
};
export const capitalizeFirstLetter = (string: string) => {
  if (!string) return string; // Return if the string is empty or not provided
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// method to change the date "2024-06-14" into "2024-06-14T18:30:00.000Z":

export const changeDateFormat = (dateString: string) => {
  // Split the date string into year, month, and day
  const [year, month, day] = dateString
    .split("-")
    .map((part) => parseInt(part, 10));

  // Create a new Date object with the specified year, month, and day
  const date = new Date(year, month - 1, day);

  // Set the time to 18:30:00 and timezone to UTC
  date.setUTCHours(18, 30, 0, 0);

  // Return the date in ISO format
  return date.toISOString();
};


// method to extract full date from the override array
export const  extractFullDates = (data:any) => {
  // Initialize an empty array to store the full dates
  let fullDates = [];
  // Iterate through each item in the data array
  for (let item of data) {
      // Extract the fullDate from the first object in the nested array
      let date = item[1][0].fullDate;
      // Add the extracted fullDate to the fullDates array
      fullDates.push(new Date(date));
  }
  
  return fullDates;
}