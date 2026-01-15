"use client";

import { Card, Table, Typography } from "antd";
import dayjs from "dayjs";
import { TimeEntry } from "@/types/entry";
import css from "./DayCard.module.css";

const { Text } = Typography;

interface DayCardProps {
  date: string;
  entries: TimeEntry[];
  dayTotal: number;
}

const columns = [
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
    render: (text: string) => <Text strong>{text}</Text>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Hours",
    dataIndex: "hours",
    key: "hours",
    align: "right" as const,
    render: (hours: number) => <Text>{hours} h</Text>,
  },
];

export function DayCard({ date, entries, dayTotal }: DayCardProps) {
  return (
    <Card
      variant="outlined"
      title={dayjs(date).format("DD MMMM YYYY")}
      extra={
        <Text strong className={css.totalHours}>
          Day Total: {dayTotal} h
        </Text>
      }
      className={css.card}
      hoverable
    >
      <Table
        dataSource={entries}
        columns={columns}
        rowKey="id"
        pagination={false}
        size="small"
      />
    </Card>
  );
}
