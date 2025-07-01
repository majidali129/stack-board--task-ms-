"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const productivityData = [
  { name: "Mon", completed: 12, created: 15, timeSpent: 8.5 },
  { name: "Tue", completed: 19, created: 18, timeSpent: 9.2 },
  { name: "Wed", completed: 15, created: 12, timeSpent: 7.8 },
  { name: "Thu", completed: 22, created: 20, timeSpent: 10.1 },
  { name: "Fri", completed: 18, created: 16, timeSpent: 8.9 },
  { name: "Sat", completed: 8, created: 5, timeSpent: 4.2 },
  { name: "Sun", completed: 6, created: 4, timeSpent: 3.1 },
];

const priorityData = [
  { name: "High", value: 35, color: "#ef4444" },
  { name: "Medium", value: 45, color: "#f59e0b" },
  { name: "Low", value: 20, color: "#10b981" },
];

const projectData = [
  { name: "Website Redesign", completed: 75, total: 100 },
  { name: "Mobile App", completed: 45, total: 80 },
  { name: "Marketing Campaign", completed: 30, total: 50 },
  { name: "API Development", completed: 60, total: 90 },
];

const timeTrackingData = [
  { project: "Website Redesign", thisWeek: 32, lastWeek: 28 },
  { project: "Mobile App", thisWeek: 24, lastWeek: 30 },
  { project: "Marketing Campaign", thisWeek: 16, lastWeek: 12 },
  { project: "API Development", thisWeek: 20, lastWeek: 18 },
];

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track your productivity and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gap-4">
          <CardHeader className="pb-0.5">
            <CardTitle className="text-[1rem]  font-medium">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card className="gap-4">
          <CardHeader className="pb-0.5">
            <CardTitle className="text-sm font-medium">
              Avg. Time per Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              -0.3h from last week
            </p>
          </CardContent>
        </Card>
        <Card className="gap-4">
          <CardHeader className="pb-0.5">
            <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
            <p className="text-xs text-muted-foreground">+8 from last week</p>
          </CardContent>
        </Card>
        <Card className="gap-4">
          <CardHeader className="pb-0.5">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Personal best!</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#8884d8" name="Completed" />
                <Bar dataKey="created" fill="#82ca9d" name="Created" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent! * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectData.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{project.name}</span>
                  <Badge variant="outline">
                    {project.completed}/{project.total} tasks
                  </Badge>
                </div>
                <Progress
                  value={(project.completed / project.total) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Time Spent (Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="timeSpent"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Hours Worked"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Allocation by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeTrackingData.map((item) => (
                <div key={item.project} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.project}</span>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">This week:</span>
                      <span className="font-medium">{item.thisWeek}h</span>
                      <span className="text-muted-foreground">Last week:</span>
                      <span className="font-medium">{item.lastWeek}h</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Progress
                        value={(item.thisWeek / 40) * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="flex-1">
                      <Progress
                        value={(item.lastWeek / 40) * 100}
                        className="h-2 opacity-50"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Most Productive Day</h4>
              <p className="text-2xl font-bold text-green-600">Thursday</p>
              <p className="text-sm text-muted-foreground">
                22 tasks completed
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Peak Hours</h4>
              <p className="text-2xl font-bold text-blue-600">9-11 AM</p>
              <p className="text-sm text-muted-foreground">
                Highest completion rate
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Improvement Area</h4>
              <p className="text-2xl font-bold text-orange-600">Estimation</p>
              <p className="text-sm text-muted-foreground">
                Tasks take 20% longer
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
