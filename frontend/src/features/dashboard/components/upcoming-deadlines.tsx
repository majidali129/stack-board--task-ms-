import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { format } from "date-fns";
import { priorityColors } from "@/lib/constants/colors";

export const UpcomingDeadlines = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const now = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(now.getDate() + 7);
  const dueWithin7Days = tasks
    .filter((task) => {
      const due = new Date(task.dueDate!);
      return due > now && due <= sevenDaysFromNow && task.status !== "done";
    })
    .map((task) => {
      const due = new Date(task.dueDate!);
      const timeDiff = due.getTime() - now.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      return {
        ...task,
        daysLeft,
      };
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[22.5rem] overflow-y-auto">
        <div className="space-y-3">
          {dueWithin7Days.map((deadline) => (
            <div
              key={deadline.id}
              className="flex items-center justify-between p-3 border rounded"
            >
              <div className="flex-1">
                <h4 className="mb-1 font-normal">{deadline.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{format(deadline.dueDate!, "dd MM yyyy")}</span>
                  {deadline.daysLeft <= 3 && (
                    <div className="flex items-center gap-1 text-red-600">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Due soon</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={
                    priorityColors[
                      deadline.priority as keyof typeof priorityColors
                    ]
                  }
                >
                  {deadline.priority}
                </Badge>
                <span className="text-sm font-medium">
                  {deadline.daysLeft}d
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
