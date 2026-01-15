"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { TimeEntryFormValues } from "@/lib/validations";
import css from "./FormFields.module.css";

const { TextArea } = Input;

const PROJECTS = [
  "Viso Internal",
  "Client A",
  "Client B",
  "Personal Development",
];

interface FormFieldsProps {
  control: Control<TimeEntryFormValues>;
  errors: FieldErrors<TimeEntryFormValues>;
}

export function FormFields({ control, errors }: FormFieldsProps) {
  return (
    <>
      <Form.Item
        label="Date"
        validateStatus={errors.date ? "error" : ""}
        help={errors.date?.message}
      >
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              className={css.fullWidth}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.format("YYYY-MM-DD") : "")
              }
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Project"
        validateStatus={errors.project ? "error" : ""}
        help={errors.project?.message}
      >
        <Controller
          name="project"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder="Select a project">
              {PROJECTS.map((p) => (
                <Select.Option key={p} value={p}>
                  {p}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item
        label="Hours"
        validateStatus={errors.hours ? "error" : ""}
        help={errors.hours?.message}
      >
        <Controller
          name="hours"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              style={{ width: "100%" }}
              min={0}
              step={0.5}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        validateStatus={errors.description ? "error" : ""}
        help={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea {...field} rows={4} placeholder="What did you work on?" />
          )}
        />
      </Form.Item>
    </>
  );
}
