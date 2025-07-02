import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Clock } from "lucide-react";
import { deleteTask, updateStatus, updateTask, type Task } from "../task-slice";
import { useAppDispatch } from "@/store/hooks";
import { priorityColors } from "@/lib/constants/colors";
import { renderStatus } from "@/lib/helpers";

type TaskListViewProps = {
  tasks: Task[];
};

export const TaskListView = ({ tasks }: TaskListViewProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{task.title}</h4>
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
                  {renderStatus(task.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {task.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium">
                    {/* {
                      projects.find((project) => project.value === task.project)
                        ?.label
                    } */}
                    {task.project}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {task.dueDate?.toISOString().split("T")[0]}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Est: {task.estimatedTime}</span>
                    <span>Actual: {task.actualTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {task.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* <Avatar className="h-8 w-8">
                  <AvatarImage src={task.assignee || "/placeholder.svg"} />
                  <AvatarFallback>{task.assignee}</AvatarFallback>
                </Avatar> */}
                {/* <ReusableSelect
                  options={status}
                  value={currentStatus}
                  onChange={(value) => setCurrentStatus(value as Status)}
                  label="Toggle status"
                /> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Update status</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() =>
                        dispatch(
                          updateStatus({
                            id: task.id as string,
                            status: "progress",
                          })
                        )
                      }
                    >
                      In-Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:!bg-red-100"
                      onClick={() =>
                        dispatch(
                          updateStatus({
                            id: task.id as string,
                            status: "review",
                          })
                        )
                      }
                    >
                      Review
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:!bg-red-100"
                      onClick={() =>
                        dispatch(
                          updateStatus({
                            id: task.id as string,
                            status: "done",
                          })
                        )
                      }
                    >
                      Done
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => dispatch(updateTask(task))}
                    >
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:!bg-red-100"
                      onClick={() => dispatch(deleteTask(task.id as string))}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
