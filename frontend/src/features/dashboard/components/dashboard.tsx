import { ProductivityChart } from "./productivity-chart";
import { RecentTasks } from "./recent-tasks";
import { TaskStats } from "./task-stats";
import { UpcomingDeadlines } from "./upcoming-deadlines";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="opacity-90">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's your productivity overview.
        </p>
      </div>
      <TaskStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductivityChart />
        <UpcomingDeadlines />
      </div>

      <RecentTasks />
    </div>
  );
};
