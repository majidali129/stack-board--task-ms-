import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Plus } from "lucide-react";
import { type Task } from "../task-slice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { priorityColors } from "@/lib/constants/colors";
import { renderStatus } from "@/lib/helpers";

type TaskListViewProps = {
  tasks: Task[];
};

const getColumns = (tasks: Task[]) => {
  return [
    {
      id: "todo",
      title: "To Do",
      tasks: tasks.filter((t) => t.status === "todo"),
    },
    {
      id: "progress",
      title: "In Progress",
      tasks: tasks.filter((t) => t.status === "progress"),
    },
    {
      id: "review",
      title: "Review",
      tasks: tasks.filter((t) => t.status === "review"),
    },
    {
      id: "done",
      title: "Done",
      tasks: tasks.filter((task) => task.status === "done"),
    },
  ];
};

export const TaskBoardView = ({ tasks }: TaskListViewProps) => {
  const columns = getColumns(tasks);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{column.title}</h4>
            <Badge variant="secondary">{column.tasks.length}</Badge>
          </div>
          <div className="space-y-3">
            {column.tasks.map((task) => (
              <Card
                key={task.id}
                className="cursor-pointer min-h-[195px] max-h-[195px] hover:shadow-md transition-shadow"
              >
                <CardContent className="p-3 relative">
                  <h4 className="font-medium mb-2 line-clamp-1">
                    {task.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between">
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
                    <div className="absolute -top-3.5 right-1">
                      {renderStatus(task.status)}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={task.assignee || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {task.assignee}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {task.dueDate?.toISOString().split("T")[0]}
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add task
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
