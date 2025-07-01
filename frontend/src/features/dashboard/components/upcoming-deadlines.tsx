import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";

const deadlines = [
  {
    id: 1,
    title: "Submit quarterly report",
    dueDate: "2024-01-15",
    daysLeft: 2,
    priority: "High",
  },
  {
    id: 2,
    title: "Client presentation prep",
    dueDate: "2024-01-16",
    daysLeft: 3,
    priority: "Medium",
  },
  {
    id: 3,
    title: "Team meeting agenda",
    dueDate: "2024-01-18",
    daysLeft: 5,
    priority: "Low",
  },
  {
    id: 4,
    title: "Code review completion",
    dueDate: "2024-01-20",
    daysLeft: 7,
    priority: "Medium",
  },
];

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

export const UpcomingDeadlines = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="flex items-center justify-between p-3 border rounded"
            >
              <div className="flex-1">
                <h4 className="mb-1 font-normal">{deadline.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{deadline.dueDate}</span>
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
