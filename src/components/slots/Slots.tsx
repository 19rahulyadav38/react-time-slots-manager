"use client";
import React, { useEffect, useState } from "react";
// import { Label } from "@/src/components/ui/label";
import { Switch } from "../ui/switch";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AvailabilitySlotsProps, Slot } from "../../utils/interfaces";
// import { formatTime } from "@/src/lib/utils";
import { Label } from "../ui/label";
import { formatTime } from "../../lib/utils"; 

function Slots({
  weekdays,
  setWeekdays,
  timeSlots,
  setSchedule,
  showDays = true,
  dateOverrideShow = false,
}: AvailabilitySlotsProps) {
  useEffect(() => {
    const defaultSchedule = weekdays.map(({ checked, slots }) => {
      if (checked) {
        return slots.length > 0
          ? slots
          : [
              {
                start: timeSlots[36],
                end: timeSlots[68],
                startTimeSlots: timeSlots,
                endTimeSlots: timeSlots,
              },
            ];
      }
      return [];
    });

    setSchedule(defaultSchedule);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekdays]);

  const handleSwitchChange = async (index: any) => {
    const updatedWeekdays = [...weekdays];
    updatedWeekdays[index] = {
      ...updatedWeekdays[index],
      checked: !updatedWeekdays[index].checked,
      slots: !updatedWeekdays[index].checked
        ? [
            {
              start: timeSlots[36],
              end: timeSlots[68],
              startTimeSlots: timeSlots,
              endTimeSlots: timeSlots,
            },
          ]
        : [],
    };
    const newSchedule = await updatedWeekdays.map(({ checked, slots }, i) => {
      if (checked) {
        return slots;
      }
      return [];
    });
    setSchedule(newSchedule);
    setWeekdays(updatedWeekdays);
  };
  const addMoreSlots = (index: number) => {
    const updatedWeekdays = [...weekdays];
    const lastSlot =
      updatedWeekdays[index].slots[updatedWeekdays[index].slots.length - 1];

    // Determine the new start time options
    let newStartTimeSlots = timeSlots;
    if (lastSlot) {
      const lastEndTimeIndex = timeSlots.indexOf(lastSlot.end);
      if (lastEndTimeIndex !== -1 && lastEndTimeIndex < timeSlots.length - 1) {
        newStartTimeSlots = timeSlots.slice(lastEndTimeIndex + 1);
      }
    }

    const defaultStart =
      newStartTimeSlots.length > 0 ? newStartTimeSlots[0] : timeSlots[0];

    // Determine the new end time options
    let newEndTimeSlots = timeSlots;
    const defaultStartIndex = timeSlots.indexOf(defaultStart);
    if (defaultStartIndex !== -1 && defaultStartIndex < timeSlots.length - 1) {
      newEndTimeSlots = timeSlots.slice(defaultStartIndex + 1);
    }

    const defaultEnd =
      newEndTimeSlots.length > 0
        ? newEndTimeSlots[0]
        : timeSlots[timeSlots.length - 1];

    updatedWeekdays[index] = {
      ...updatedWeekdays[index],
      slots: [
        ...updatedWeekdays[index].slots,
        {
          start: defaultStart,
          end: defaultEnd,
          startTimeSlots: newStartTimeSlots,
          endTimeSlots: newEndTimeSlots,
        },
      ],
    };
    const newSchedule = updatedWeekdays.map(({ checked, slots }) => {
      return checked ? slots : [];
    });
    setSchedule(newSchedule);
    setWeekdays(updatedWeekdays);
  };

  const removeSingleSlot = (index: any, slotIndex: any) => {
    const updatedWeekdays = [...weekdays];
    const slots = [...updatedWeekdays[index].slots];
    slots.splice(slotIndex, 1);
    updatedWeekdays[index] = {
      ...updatedWeekdays[index],
      slots: slots,
    };
    const newSchedule = updatedWeekdays.map(({ checked, slots }) => {
      return checked ? slots : [];
    });
    setSchedule(newSchedule);
    setWeekdays(updatedWeekdays);
  };

  const handleSlotTimeChange = (
    e: string,
    index: number,
    slotIndex: number,
    boxtype: string
  ) => {
    const updatedWeekdays = [...weekdays];
    const slots = [...updatedWeekdays[index].slots];
    if (boxtype === "start") {
      slots[slotIndex] = {
        ...slots[slotIndex],
        start: String(e),
      };
      const endIndex = timeSlots.indexOf(String(e));
      if (endIndex !== -1) {
        const newSlots = timeSlots.slice(endIndex + 1); // Slice from the index of e to the end
        slots[slotIndex].endTimeSlots = newSlots;
      }
    } else {
      slots[slotIndex] = {
        ...slots[slotIndex],
        end: String(e),
      };
      const endIndex = timeSlots.lastIndexOf(String(e));
      if (endIndex !== -1) {
        const newSlots = timeSlots.slice(0, endIndex); // Slice from the start to the last index of e
        slots[slotIndex].startTimeSlots = newSlots;
      }
    }

    updatedWeekdays[index] = {
      ...updatedWeekdays[index],
      slots: slots,
    };
    const newSchedule = updatedWeekdays.map(({ checked, slots }) => {
      return checked ? slots : [];
    });
    setSchedule(newSchedule);
    setWeekdays(updatedWeekdays);
  };

  return (
    <>
      {weekdays?.map(({ day, slots, checked }, index) =>
        !dateOverrideShow ? (
          <div key={index} className="timeAvailability">
            <div className={`days ${showDays ? "block" : "hidden"}`}>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`airplane-mode-${index}`}
                  checked={checked}
                  onCheckedChange={() => handleSwitchChange(index)}
                  className=""
                />
                <Label className="sm:text-sm text-xs" htmlFor={`airplane-mode-${index}`}>{day}</Label>
              </div>
            </div>
            <div className="timeAvailability-slots">
              {slots?.map((slot, slotIndex) => (
                <div key={slotIndex} className="d-setCenter">
                  <div>
                    <Select
                      onValueChange={(e) =>
                        handleSlotTimeChange(e, index, slotIndex, "start")
                      }
                      defaultValue={slot?.start}
                      value={slot?.start}
                    >
                      <SelectTrigger className="sm:w-[110px] w-[90px] sm:py-2 py-1 sm:px-3 px-1">
                        <SelectValue className="text-xs sm:text-sm" placeholder={slot?.start} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {slot.startTimeSlots?.map((val, index) => (
                            <SelectItem key={index} value={String(val)}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>-</div>
                  <div>
                    <Select
                      onValueChange={(e) =>
                        handleSlotTimeChange(e, index, slotIndex, "end")
                      }
                      defaultValue={slot?.end}
                      value={slot?.end}
                    >
                      <SelectTrigger className="sm:w-[110px] w-[90px] sm:py-2 py-1 sm:px-3 px-1">
                        <SelectValue className="text-xs sm:text-sm" placeholder={slot?.end} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {slot.endTimeSlots?.map((val, index) => (
                            <SelectItem key={index} value={String(val)}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {slotIndex === 0 && (
                    <IoAdd
                      className="cursor-pointer"
                      onClick={() => addMoreSlots(index)}
                    />
                  )}
                  {slotIndex > 0 && (
                    <IoTrashOutline
                      className="cursor-pointer"
                      onClick={() => removeSingleSlot(index, slotIndex)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div key={index} className="timeAvailability">
            <div className={`days ${showDays ? "block" : "hidden"}`}>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`airplane-mode-${index}`}
                  checked={checked}
                  onCheckedChange={() => handleSwitchChange(index)}
                />
                <Label htmlFor={`airplane-mode-${index}`}>{day}</Label>
              </div>
            </div>
            <div className="timeAvailability-slots">
              {slots?.map((slot, slotIndex) => (
                <div key={slotIndex} className="d-setCenter">
                  <div>
                    <Select
                      onValueChange={(e) =>
                        handleSlotTimeChange(e, index, slotIndex, "start")
                      }
                      // defaultValue={formatTime(slot?.start)}
                      // value={formatTime(slot?.start)}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder={formatTime(slot?.start)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {slot.startTimeSlots?.map((val, index) => (
                            <SelectItem key={index} value={String(val)}>
                              {formatTime(val)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>-</div>
                  <div>
                    <Select
                      onValueChange={(e) =>
                        handleSlotTimeChange(e, index, slotIndex, "end")
                      }
                      // defaultValue={formatTime(slot?.end)}
                      // value={formatTime(slot?.end)}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder={formatTime(slot?.end)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {slot.endTimeSlots?.map((val, index) => (
                            <SelectItem key={index} value={String(val)}>
                              {formatTime(val)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {slotIndex === 0 && (
                    <IoAdd
                      className="cursor-pointer"
                      onClick={() => addMoreSlots(index)}
                    />
                  )}
                  {slotIndex > 0 && (
                    <IoTrashOutline
                      className="cursor-pointer"
                      onClick={() => removeSingleSlot(index, slotIndex)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Slots;
