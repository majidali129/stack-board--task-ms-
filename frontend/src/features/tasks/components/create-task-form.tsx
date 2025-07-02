import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Flag } from "lucide-react";
import { format } from "date-fns";
import { addTask, type Priority, type Status } from "../task-slice";
import { FormItem } from "@/components/form/form-item";
import { ReusableSelect } from "@/components/reusable-select";
import { useAppDispatch } from "@/store/hooks";

const priorities = [
  {
    value: "Low",
    label: "Low",
    icon: <Flag className="h-3 w-3 text-green-800" />,
  },
  {
    value: "Medium",
    label: "Medium",
    icon: <Flag className="h-3 w-3 text-yellow-800" />,
  },
  {
    value: "High",
    label: "High",
    icon: <Flag className="h-3 w-3 text-orange-800" />,
  },
  {
    value: "Urgent",
    label: "Urgent",
    icon: <Flag className="h-3 w-3 text-red-800" />,
  },
];

const projects = [
  { value: "1", label: "Website Redesign" },
  { value: "2", label: "Mobile App" },
  { value: "3", label: "Marketing Campaign" },
];

type NewTaskType = {
  title: string;
  description: string;
  project: string;
  priority: Priority;
  status: Status;
  assignee: string;
  dueDate: Date | null;
  estimatedTime: string;
  actualTime: string;
  tags?: string[];
};

type CreateNewTaskFormProps = {
  onClose?: () => void;
};

const initialState = {
  title: "",
  description: "",
  project: "",
  priority: "Medium",
  status: "todo",
  assignee: "",
  dueDate: new Date(),
  estimatedTime: "",
  actualTime: "",
  tags: [] as string[],
} satisfies NewTaskType as NewTaskType;
export function CreateNewTaskForm({ onClose }: CreateNewTaskFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<NewTaskType>(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addTask({
        id: `task-${Math.random() * 102}`,
        ...formData,
        createdAt: new Date(),
      })
    );
    console.log("Task data:", formData);
    setFormData(initialState);

    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <FormItem
          label="Task Title"
          name="title"
          type="text"
          value={formData.title}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, title: value }))
          }
        />
        <FormItem
          label="Description"
          name="description"
          type="text"
          textarea
          value={formData.description}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, description: value }))
          }
        />
      </div>
      {/* <Separator /> */}
      {/* Project and Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReusableSelect
          label="Project"
          placeholder="Select project"
          options={projects}
          value={formData.project}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, project: value }))
          }
        />

        <ReusableSelect
          label="Priority"
          placeholder="Choose priority"
          options={priorities}
          value={formData.priority}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, priority: value as Priority }))
          }
        />
      </div>
      <Separator />

      {/* Estimated Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItem
          label="Estimated Time"
          name="estimatedTime"
          type="text"
          value={formData.estimatedTime}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, estimatedTime: value }))
          }
        />
        <FormItem
          label="Actual Time"
          name="actualTime"
          type="text"
          value={formData.actualTime}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, actualTime: value }))
          }
        />
      </div>
      <Separator />

      {/* Due Date and Time */}
      <div className="space-y-4">
        <Label>Due Date & Time</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {formData.dueDate
                  ? format(formData.dueDate, "PPP")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.dueDate!}
                onSelect={(date) =>
                  setFormData((prev) => ({ ...prev, dueDate: date! }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Tags */}
      {/* <div className="space-y-3">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag..."
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>
          </div> */}
      {/* <Separator /> */}
      {/* Attachments */}
      {/* <div className="space-y-3">
            <Label>Attachments</Label>
            <div className="space-y-2">
              {formData.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 border rounded"
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="flex-1 text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 p-3 border-2 border-dashed rounded-lg hover:bg-gray-50">
                  <Upload className="h-4 w-4" />
                  <span>Click to upload files or drag and drop</span>
                </div>
              </Label>
            </div>
          </div>
          <Separator /> */}
      {/* Form Actions */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}
