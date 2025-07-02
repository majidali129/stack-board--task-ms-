import { Badge } from "@/components/ui/badge";
import type { Status } from "@/features/tasks/task-slice";
export const renderStatus = (status: Status) => {
  if (status === "done")
    return <Badge className="bg-green-100 text-green-700">Done</Badge>;
  if (status === "progress")
    return <Badge className="bg-blue-100 text-blue-700">In-progress</Badge>;
  if (status === "review")
    return <Badge className="bg-teal-100 text-teal-700">Review</Badge>;
  if (status === "todo")
    return <Badge className="bg-gray-100 text-gray-700">Todo</Badge>;
};
