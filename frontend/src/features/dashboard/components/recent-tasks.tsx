import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Clock, MessageSquare, Paperclip } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Design new landing page",
    project: "Website Redesign",
    priority: "High",
    dueDate: "2024-01-15",
    assignee: {
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    comments: 3,
    attachments: 2,
    status: "In Progress",
  },
  {
    id: 2,
    title: "Implement user authentication",
    project: "Mobile App",
    priority: "Medium",
    dueDate: "2024-01-18",
    assignee: {
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "BS",
    },
    comments: 1,
    attachments: 0,
    status: "Todo",
  },
  {
    id: 3,
    title: "Write blog post about productivity",
    project: "Marketing Campaign",
    priority: "Low",
    dueDate: "2024-01-20",
    assignee: {
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "CD",
    },
    comments: 0,
    attachments: 1,
    status: "Review",
  },
];

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

const statusColors = {
  Todo: "bg-gray-100 text-gray-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Review: "bg-purple-100 text-purple-800",
  Done: "bg-green-100 text-green-800",
};
export const RecentTasks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
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
                    {task.dueDate}
                  </div>
                  {task.comments > 0 && (
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {task.comments}
                    </div>
                  )}
                  {task.attachments > 0 && (
                    <div className="flex items-center gap-1">
                      <Paperclip className="h-3 w-3" />
                      {task.attachments}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={task.assignee.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>{task.assignee.initials}</AvatarFallback>
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
