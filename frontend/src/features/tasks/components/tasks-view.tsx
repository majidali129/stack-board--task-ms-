import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  MoreHorizontal,
  Clock,
  MessageSquare,
  Paperclip,
} from "lucide-react";

const viewTypes = [
  { id: "list", name: "List", icon: List },
  { id: "board", name: "Board", icon: LayoutGrid },
  { id: "calendar", name: "Calendar", icon: Calendar },
  { id: "timeline", name: "Timeline", icon: BarChart3 },
  { id: "table", name: "Table", icon: Table },
  { id: "mindmap", name: "Mind Map", icon: GitBranch },
];
const tasks = [
  {
    id: 1,
    title: "Design new landing page",
    description:
      "Create a modern, responsive landing page for the new product launch",
    project: "Website Redesign",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-01-15",
    assignee: {
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    comments: 3,
    attachments: 2,
    tags: ["Design", "Frontend"],
    estimatedTime: "8h",
    actualTime: "6h",
  },
  {
    id: 2,
    title: "Implement user authentication",
    description: "Add OAuth integration and JWT token management",
    project: "Mobile App",
    priority: "Medium",
    status: "Todo",
    dueDate: "2024-01-18",
    assignee: {
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "BS",
    },
    comments: 1,
    attachments: 0,
    tags: ["Backend", "Security"],
    estimatedTime: "12h",
    actualTime: "0h",
  },
  {
    id: 3,
    title: "Write blog post about productivity",
    description:
      "Research and write comprehensive guide on productivity techniques",
    project: "Marketing Campaign",
    priority: "Low",
    status: "Review",
    dueDate: "2024-01-20",
    assignee: {
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "CD",
    },
    comments: 0,
    attachments: 1,
    tags: ["Content", "Marketing"],
    estimatedTime: "4h",
    actualTime: "3h",
  },
];
const columns = [
  {
    id: "todo",
    title: "To Do",
    tasks: tasks.filter((t) => t.status === "Todo"),
  },
  {
    id: "progress",
    title: "In Progress",
    tasks: tasks.filter((t) => t.status === "In Progress"),
  },
  {
    id: "review",
    title: "Review",
    tasks: tasks.filter((t) => t.status === "Review"),
  },
  { id: "done", title: "Done", tasks: [] },
];

const priorityColors = {
  High: "bg-red-100 text-red-800 border-red-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Low: "bg-green-100 text-green-800 border-green-200",
};

export function TaskViews() {
  const [currentView, setCurrentView] = useState("list");

  const renderListView = () => (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{task.title}</h3>
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
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {task.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium">{task.project}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {task.dueDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Est: {task.estimatedTime}</span>
                    <span>Actual: {task.actualTime}</span>
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
                <div className="flex items-center gap-2 mt-2">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={task.assignee.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                </Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit Task</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderBoardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{column.title}</h3>
            <Badge variant="secondary">{column.tasks.length}</Badge>
          </div>
          <div className="space-y-3">
            {column.tasks.map((task) => (
              <Card
                key={task.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-3">
                  <h4 className="font-medium mb-2">{task.title}</h4>
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
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={task.assignee.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="text-xs">
                        {task.assignee.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {task.dueDate}
                    {task.comments > 0 && (
                      <>
                        <MessageSquare className="h-3 w-3" />
                        {task.comments}
                      </>
                    )}
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and organize your tasks efficiently
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
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
      {currentView === "list" && renderListView()}
      {currentView === "board" && renderBoardView()}
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
