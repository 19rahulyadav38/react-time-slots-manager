interface ScheduleItem {
    start: number;
    end: number;
  }
  
  export interface Schedule {
    schedule: ScheduleItem[][];
    timeZone: string;
  }
  
 export interface ScheduleCreate {
    schedule: ScheduleItem[][];
    name: string;
    timeZone: string;
  }
  
  interface OverrideDate {
    start: number;
    end: number;
  }
  
 export interface UpdateSchedule {
    schedule: ScheduleItem[][];
    scheduleId: string;
    timeZone: string;
    overrideDate: OverrideDate[];
    name: string;
  }


export interface GetAvailabilitySlots {
  [x: string]: any;
  eventId: string,
  scheduleId: string,
  year:string,
  month?: string
}

// Define types for props
export interface Slot {
  startTimeSlots: string[];
  endTimeSlots: string[];
  start: string;
  end: string;
}

export interface Weekday {
  day: string;
  checked: boolean;
  slots: Slot[];
}

export interface AvailabilitySlotsProps {
  weekdays: Weekday[];
  setWeekdays: React.Dispatch<React.SetStateAction<Weekday[]>>;
  timeSlots: string[];
  setSchedule: any;
  showDays: boolean;
  dateOverrideShow: boolean;
}

export interface SchedulesProps {
  scheduleId: string;
  scheduleName: string;
  availability: string[];
  timeZone: string;
  isDefaultSchedule: boolean;

}

export interface MineAvailabilityProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

export interface TeamMemberAvailabilityProps {
  scheduleId: string;
  showScheduleSidebar: boolean;
  setShowScheduleSidebar: (value: boolean) => void;
  fetchTeamMemberAvailability: any;
}
export interface TeamAvailability {
  availabilityStartDate: string;
  availabilityEndDate: string;
}

export interface AvailabilityData {
  scheduleName: string;
  scheduleTimeZone: string;
  scheduleUniqueId: string;
  CurrentTimeWithTimeZone: string;
  userName: string;
  availabilityTime: TeamAvailability[];
}

// Example props interface if needed
export interface Props {
  teamAvailabilityData?: AvailabilityData[];
}
