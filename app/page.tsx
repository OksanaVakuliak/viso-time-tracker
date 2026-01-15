import TrackerContainer from "@/components/TrackerContainer/TrackerContainer";
import css from "./page.module.css";

export default function Home() {
  return (
    <main className={css.main}>
      <TrackerContainer />
    </main>
  );
}
