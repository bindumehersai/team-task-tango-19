
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/ProjectCard";
import { CreateProjectModal } from "@/components/CreateProjectModal";
import { mockProjects, mockTasks } from "@/data/mockData";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState(mockProjects);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProjectTasks = (projectId: string) => {
    return mockTasks.filter(task => task.projectId === projectId);
  };

  const handleProjectCreated = (newProject: any) => {
    setProjects(prev => [...prev, newProject]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your team projects</p>
        </div>
        <CreateProjectModal onProjectCreated={handleProjectCreated}>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={20} className="mr-2" />
            New Project
          </Button>
        </CreateProjectModal>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            tasks={getProjectTasks(project.id)}
            onClick={() => console.log('Project clicked:', project.id)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No projects found</div>
          <p className="text-gray-500">Try adjusting your search terms or create a new project</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
