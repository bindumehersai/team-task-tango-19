
import { Clock, User, Flag } from "lucide-react";
import { Task } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-orange-100 text-orange-800 border-orange-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

const statusColors = {
  todo: "bg-gray-100 text-gray-800 border-gray-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
};

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'completed';

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium text-gray-900 line-clamp-2">
            {task.title}
          </CardTitle>
          <Flag size={16} className={`ml-2 ${
            task.priority === 'high' ? 'text-red-500' : 
            task.priority === 'medium' ? 'text-orange-500' : 
            'text-green-500'
          }`} />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {task.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <Badge className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
          <Badge className={statusColors[task.status]}>
            {task.status.replace('_', ' ')}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <User size={14} className="mr-1" />
            <span>{task.assignee.name}</span>
          </div>
          <div className={`flex items-center ${isOverdue ? 'text-red-500' : ''}`}>
            <Clock size={14} className="mr-1" />
            <span>{formatDate(task.deadline)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
