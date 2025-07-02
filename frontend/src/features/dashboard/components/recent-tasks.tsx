import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Clock } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { format } from "date-fns";
import { priorityColors, statusColors } from "@/lib/constants/colors";

export const RecentTasks = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const now = new Date();
  const prev7Days = new Date(now);
  prev7Days.setDate(now.getDate() - 7);

  const recentTasks = tasks.filter((task) => {
    const created = task.createdAt;

    return created >= prev7Days && created <= now;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border rounded"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-normal">{task.title}</h4>
                  <Badge
                    variant="outline"
                    className={
                      priorityColors[
                        task.priority as keyof typeof priorityColors
                      ]
                    }
                  >
                    {task.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      statusColors[task.status as keyof typeof statusColors]
                    }
                  >
                    {task.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{task.project}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(task.dueDate!, "dd MM yyyy")}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={task.assignee || "/placeholder.svg"} />
                  <AvatarFallback>
                    {task.assignee.split(" ")[0][0]}
                    {task.assignee.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
