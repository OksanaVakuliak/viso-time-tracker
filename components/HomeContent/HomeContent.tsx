"use client";

import { Typography, Row, Col, Card } from "antd";
import {
  ClockCircleOutlined,
  HistoryOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import css from "./HomeContent.module.css";

const { Title, Paragraph, Text } = Typography;

export default function HomeContent() {
  return (
    <div className={css.homeContainer}>
      <Row gutter={[32, 32]} align="middle">
        <Col span={24} className={css.centerText}>
          <Title>Welcome to VISO Time Tracker</Title>
          <Paragraph className={css.subTitle}>
            A simple and efficient tool to manage your work hours, projects, and
            daily tasks.
          </Paragraph>

          <div className={css.buttonGroup}>
            <Link href="/add" className={css.primaryButton}>
              <PlusCircleOutlined />
              <span>Start Tracking</span>
            </Link>
            <Link href="/history" className={css.secondaryButton}>
              <HistoryOutlined />
              <span>View History</span>
            </Link>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <Card variant="outlined" className={css.infoCard}>
            <ClockCircleOutlined className={css.icon} />
            <Title level={4}>Real-time</Title>
            <Text>Log your hours immediately after finishing tasks.</Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card variant="outlined" className={css.infoCard}>
            <PlusCircleOutlined className={css.icon} />
            <Title level={4}>Project Based</Title>
            <Text>Organize your time by selecting specific projects.</Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card variant="outlined" className={css.infoCard}>
            <HistoryOutlined className={css.icon} />
            <Title level={4}>History</Title>
            <Text>Keep track of all your past activities in one place.</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
