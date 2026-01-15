"use client";

import { Card, Statistic, Row, Col } from "antd";
import css from "./HistoryStats.module.css";

interface HistoryStatsProps {
  grandTotal: number;
}

export function HistoryStats({ grandTotal }: HistoryStatsProps) {
  return (
    <Row gutter={16} className={css.row}>
      <Col span={24}>
        <Card variant="outlined" className={css.card}>
          <Statistic
            title="Total Tracked Time"
            value={grandTotal}
            suffix="h"
            precision={1}
          />
        </Card>
      </Col>
    </Row>
  );
}
