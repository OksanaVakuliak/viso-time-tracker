import TimeEntryForm from "@/components/TimeEntryForm/TimeEntryForm";
import css from "./AddPage.module.css";

export const metadata = {
  title: "Add New Entry",
};

export default function AddEntryPage() {
  return (
    <div className={css.container}>
      <TimeEntryForm />
    </div>
  );
}
