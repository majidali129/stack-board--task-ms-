import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  List,
  LayoutGrid,
  Calendar,
  BarChart3,
  Table,
  GitBranch,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { ResuableDialog } from "@/components/reusable-dialog";
import { CreateNewTaskForm } from "./create-task-form";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAppSelector } from "@/store/hooks";
import { TaskListView } from "./task-list-view";
import { TaskBoardView } from "./task-board-view";

const viewTypes = [
  { id: "list", name: "List", icon: List },
  { id: "board", name: "Board", icon: LayoutGrid },
  { id: "calendar", name: "Calendar", icon: Calendar },
  { id: "timeline", name: "Timeline", icon: BarChart3 },
  { id: "table", name: "Table", icon: Table },
  { id: "mindmap", name: "Mind Map", icon: GitBranch },
];

export function TaskViews() {
  const [currentView, setCurrentView] = useState("list");
  const tasks = useAppSelector((state) => state.tasks.tasks);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Tasks <span className="opacity-80">({tasks.length})</span>
          </h1>
          <p className="text-muted-foreground">
            Manage and organize your tasks efficiently
          </p>
        </div>
        <ResuableDialog
          trigger={
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </DialogTrigger>
          }
          title="Create New Task"
          children={<CreateNewTaskForm />}
        />
      </div>

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {viewTypes.map((view) => (
            <Button
              key={view.id}
              variant={currentView === view.id ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView(view.id)}
            >
              <view.icon className="h-4 w-4 mr-2" />
              {view.name}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-8 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Task Views */}
      {currentView === "list" && <TaskListView tasks={tasks} />}
      {currentView === "board" && <TaskBoardView tasks={tasks} />}
      {currentView === "calendar" && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
          <p className="text-muted-foreground">
            Calendar view would be implemented here
          </p>
        </div>
      )}
      {(currentView === "timeline" ||
        currentView === "table" ||
        currentView === "mindmap") && (
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {viewTypes.find((v) => v.id === currentView)?.name} View
          </h3>
          <p className="text-muted-foreground">
            This view would be implemented here
          </p>
        </div>
      )}
    </div>
  );
}
