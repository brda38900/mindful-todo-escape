import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoItem from "@/components/TodoItem";
import { Todo } from "@/types/todo";
import { toast } from "sonner";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      toast.error("Please enter a todo");
      return;
    }
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [todo, ...prev]);
    setNewTodo("");
    toast.success("Todo added");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast.success("Todo deleted");
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your tasks with elegance and simplicity
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </form>

        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
          {todos.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-6">
              No tasks yet. Add one above to get started.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;