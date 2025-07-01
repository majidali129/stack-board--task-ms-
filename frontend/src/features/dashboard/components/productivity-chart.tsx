import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", completed: 12, created: 15 },
  { name: "Tue", completed: 19, created: 18 },
  { name: "Wed", completed: 15, created: 12 },
  { name: "Thu", completed: 22, created: 20 },
  { name: "Fri", completed: 18, created: 16 },
  { name: "Sat", completed: 8, created: 5 },
  { name: "Sun", completed: 6, created: 4 },
];

export const ProductivityChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Productivity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#8884d8"
              strokeWidth={2}
              name="Completed Tasks"
            />
            <Line
              type="monotone"
              dataKey="created"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Created Tasks"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
