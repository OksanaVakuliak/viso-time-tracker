import EntryHistory from "@/components/EntryHistory/EntryHistory";
import css from "./HistoryPage.module.css";

export const metadata = {
  title: "History",
};

export default function HistoryPage() {
  return (
    <div className={css.container}>
      <EntryHistory />
    </div>
  );
}
