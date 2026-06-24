import ScheduleList from "./components/core/ScheduleList";
import Sidebar from "./components/core/Sidebar";

export default function App() {
  return (
    <main className="bg-gray-800 flex gap-6 min-h-screen p-8">
      <Sidebar
        onSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
        disabledTimes={[]}
      />
      <ScheduleList
        appointments={[]}
        onDelete={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </main>
  );
}
