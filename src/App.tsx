import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Slots from "./components/slots/Slots";
import {
  generateTimeIntervalsForDay,
  initializeWeekdaysForOverride,
} from "./lib/utils";

function App() {
  const timeSlots = generateTimeIntervalsForDay();
  const [weekdays, setWeekdays] = useState<any>(
    initializeWeekdaysForOverride(timeSlots, 3)
  );
  const [schedule, setSchedule] = useState<{ start: any; end: any }[][]>([]);

  {console.log("schedule :", schedule)}
  return (
    <div className="App">

      <Slots
        weekdays={weekdays}
        setWeekdays={setWeekdays}
        timeSlots={timeSlots}
        setSchedule={setSchedule}
        showDays={true}
        dateOverrideShow={false}
      />
    </div>
  );
}

export default App;
