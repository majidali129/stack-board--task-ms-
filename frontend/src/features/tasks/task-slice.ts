import { tasks } from "@/data/tasks";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Priority = "High" | "Medium" | "Low" | "Urgent";
export type Status = "todo" | "progress" | "review" | "done";

export type Task = {
  id: string | number;
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
  createdAt: Date;
};

export interface TaskState {
  tasks: Task[];
}

const initialState = {
  tasks: tasks,
} satisfies TaskState as TaskState;

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      console.log(action);
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateStatus: (
      state,
      action: PayloadAction<{ id: string; status: Status }>
    ) => {
      console.log(action);
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      );
    },
  },
});

export const { addTask, updateStatus, updateTask, deleteTask } =
  taskSlice.actions;

export default taskSlice.reducer;
