import { Check, Trash2 } from "lucide-react";
import { Todo } from "@/types/todo";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div
      className={cn(
        "group flex items-center justify-between p-4 rounded-lg transition-all duration-200",
        "hover:bg-accent/50 animate-fade-in",
        "border border-border/50"
      )}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
            todo.completed
              ? "bg-primary border-primary"
              : "border-muted-foreground/30 hover:border-primary"
          )}
        >
          {todo.completed && <Check className="w-3 h-3 text-primary-foreground" />}
        </button>
        <span
          className={cn(
            "text-sm transition-all duration-200",
            todo.completed && "line-through text-muted-foreground"
          )}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <Trash2 className="w-4 h-4 text-destructive hover:text-destructive/70 transition-colors" />
      </button>
    </div>
  );
};

export default TodoItem;