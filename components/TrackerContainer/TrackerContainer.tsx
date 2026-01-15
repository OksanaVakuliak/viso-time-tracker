"use client";

import { useState } from "react";
import TimeEntryForm from "../TimeEntryForm/TimeEntryForm";
import EntryHistory from "../EntryHistory/EntryHistory";
import css from "./TrackerContainer.module.css";

export default function TrackerContainer() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEntryAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={css.mainWrapper}>
      <div className={css.formSection}>
        <TimeEntryForm onEntryAdded={handleEntryAdded} />
      </div>

      <EntryHistory key={refreshKey} />
    </div>
  );
}
