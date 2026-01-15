"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Typography, Spin, Alert } from "antd";
import dayjs from "dayjs";
import { TimeEntry } from "@/types/entry";
import { HistoryStats } from "../HistoryStats/HistoryStats";
import { DayCard } from "../DayCard/DayCard";
import css from "./EntryHistory.module.css";

const { Title, Text } = Typography;

interface GroupedData {
  [date: string]: {
    entries: TimeEntry[];
    dayTotal: number;
  };
}

export default function EntryHistory() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<TimeEntry[]>("/api/entries");
      setEntries(response.data);
      setError(null);
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.error
        : "An unexpected error occurred";
      setError(message || "Failed to fetch entries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const { groupedData, grandTotal } = useMemo(() => {
    const grouped = entries.reduce((acc: GroupedData, entry) => {
      const dateKey = dayjs(entry.date).format("YYYY-MM-DD");
      if (!acc[dateKey]) {
        acc[dateKey] = { entries: [], dayTotal: 0 };
      }
      acc[dateKey].entries.push(entry);
      acc[dateKey].dayTotal += entry.hours;
      return acc;
    }, {});

    const total = entries.reduce((sum, entry) => sum + entry.hours, 0);

    return { groupedData: grouped, grandTotal: total };
  }, [entries]);

  if (loading) {
    return (
      <div className={css.loaderContainer}>
        <Spin size="large">
          <div className={css.loaderText}>Loading history...</div>
        </Spin>
      </div>
    );
  }

  if (error) {
    return <Alert title="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className={css.container}>
      <HistoryStats grandTotal={grandTotal} />

      <Title level={3} className={css.title}>
        Entry History
      </Title>

      {Object.keys(groupedData).length === 0 ? (
        <Text type="secondary" className={css.emptyText}>
          No entries found. Add your first time entry!
        </Text>
      ) : (
        Object.entries(groupedData)
          .sort(([dateA], [dateB]) => dayjs(dateB).unix() - dayjs(dateA).unix())
          .map(([date, data]) => (
            <DayCard
              key={date}
              date={date}
              entries={data.entries}
              dayTotal={data.dayTotal}
            />
          ))
      )}
    </div>
  );
}
