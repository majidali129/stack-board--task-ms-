import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "@/features/tasks/task-slice";
import { useAppSelector } from "@/store/hooks";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

const isOverDue = (task: Task) => {
  return (
    task.dueDate !== null &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done"
  );
};

// Get current and previous month dates
const getMonthRange = () => {
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  return { currentMonthStart, currentMonthEnd, lastMonthStart, lastMonthEnd };
};

// Filter tasks by date range
const filterTasksByDate = (tasks: Task[], startDate: Date, endDate: Date) => {
  return tasks.filter((task) => {
    const taskDate = new Date(task.dueDate!);
    return taskDate >= startDate && taskDate <= endDate;
  });
};

// Calculate percentage change
const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
};
const calculateTaskStatistics = (allTasks: Task[]) => {
  const { currentMonthStart, currentMonthEnd, lastMonthStart, lastMonthEnd } =
    getMonthRange();

  // Current month tasks
  const currentMonthTasks = filterTasksByDate(
    allTasks,
    currentMonthStart,
    currentMonthEnd
  );
  // Last month tasks
  const lastMonthTasks = filterTasksByDate(
    allTasks,
    lastMonthStart,
    lastMonthEnd
  );

  // Current month stats
  const currentTotal = currentMonthTasks.length;
  const currentInProgress = currentMonthTasks.filter(
    (task) => task.status === "progress"
  ).length;
  const currentOverdue = currentMonthTasks.filter(isOverDue).length;

  // Last month stats
  const lastTotal = lastMonthTasks.length;
  const lastInProgress = lastMonthTasks.filter(
    (task) => task.status === "progress"
  ).length;
  const lastOverdue = lastMonthTasks.filter(isOverDue).length;

  // Calculate percentage changes
  const totalChange = calculatePercentageChange(currentTotal, lastTotal);
  const inProgressChange = calculatePercentageChange(
    currentInProgress,
    lastInProgress
  );
  const overdueChange = calculatePercentageChange(currentOverdue, lastOverdue);

  return [
    {
      count: currentTotal,
      change: totalChange,
      title: "Total Tasks",
      icon: CheckCircle,
      color: "text-blue-600",
    },
    {
      count: currentInProgress,
      change: inProgressChange,
      title: "In Progress",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      count: currentOverdue,
      change: overdueChange,
      title: "Overdue",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];
};
const formatChange = (change: number) => {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(0)}%`;
};
export const TaskStats = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const taskStas = calculateTaskStatistics(tasks);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {taskStas.map((stat) => (
        <Card key={stat.title} className="gap-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[1rem] font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.count}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">
                {formatChange(stat.change)}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
