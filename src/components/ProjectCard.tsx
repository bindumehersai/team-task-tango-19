
import { Users, Calendar, CheckCircle } from "lucide-react";
import { Project, Task } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  onClick?: () => void;
}

export const ProjectCard = ({ project, tasks, onClick }: ProjectCardProps) => {
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
    on_hold: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {project.name}
          </CardTitle>
          <Badge className={statusColors[project.status]}>
            {project.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="text-gray-900 font-medium">
              {completedTasks}/{totalTasks} tasks
            </span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              <span>{project.members.length} members</span>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
              }).format(project.createdAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
