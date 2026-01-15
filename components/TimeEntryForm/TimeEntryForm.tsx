"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { timeEntrySchema, type TimeEntryFormValues } from "@/lib/validations";
import { useState } from "react";
import { Form, Button, Card, Alert, Typography, message } from "antd";
import dayjs from "dayjs";
import { FormFields } from "../FormFields/FormFields";
import css from "./TimeEntryForm.module.css";
import { useRouter } from "next/navigation";

const { Title } = Typography;

interface TimeEntryFormProps {
  onEntryAdded?: () => void;
}

export default function TimeEntryForm({ onEntryAdded }: TimeEntryFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TimeEntryFormValues>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      date: dayjs().format("YYYY-MM-DD"),
      project: "",
      hours: 0,
      description: "",
    },
  });

  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (data: TimeEntryFormValues) => {
    try {
      setServerError(null);
      await axios.post("/api/entries", data);
      setTimeout(() => {
        messageApi.success("Time entry saved successfully!");
      }, 0);
      reset({
        date: dayjs().format("YYYY-MM-DD"),
        project: "",
        hours: 0,
        description: "",
      });
      if (onEntryAdded) {
        onEntryAdded();
      }
      setTimeout(() => {
        router.push("/history");
        router.refresh();
      }, 1500);
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : "An unexpected error occurred";
      setServerError(message || "Error saving entry");
    }
  };

  return (
    <>
      {contextHolder}

      <Card variant="outlined" className={css.card}>
        <Title level={4} className={css.title}>
          Add Time Entry
        </Title>

        {serverError && (
          <Alert
            title={serverError}
            type="error"
            showIcon
            className={css.alert}
          />
        )}

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <FormFields control={control} errors={errors} />
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            block
            size="large"
          >
            Save Entry
          </Button>
        </Form>
      </Card>
    </>
  );
}
