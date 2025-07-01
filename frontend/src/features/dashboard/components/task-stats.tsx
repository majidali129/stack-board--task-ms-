import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertTriangle, Users } from "lucide-react";

const stats = [
  {
    title: "Total Tasks",
    value: "142",
    change: "+12%",
    icon: CheckCircle,
    color: "text-blue-600",
  },
  {
    title: "In Progress",
    value: "28",
    change: "+5%",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Overdue",
    value: "3",
    change: "-2%",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Team Members",
    value: "12",
    change: "+1",
    icon: Users,
    color: "text-green-600",
  },
];

export const TaskStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="gap-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[1rem] font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> from last
              month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
