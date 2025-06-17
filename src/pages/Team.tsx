
import { useState } from "react";
import { Plus, Search, Mail, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockUsers, mockTasks } from "@/data/mockData";

const Team = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserTaskCount = (userId: string) => {
    return mockTasks.filter(task => task.assignee.id === userId).length;
  };

  const getUserCompletedTasks = (userId: string) => {
    return mockTasks.filter(task => task.assignee.id === userId && task.status === 'completed').length;
  };

  const roleColors = {
    admin: "bg-purple-100 text-purple-800 border-purple-200",
    manager: "bg-blue-100 text-blue-800 border-blue-200",
    team_member: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600 mt-1">Manage your team members and their roles</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const taskCount = getUserTaskCount(user.id);
          const completedTasks = getUserCompletedTasks(user.id);
          const completionRate = taskCount > 0 ? Math.round((completedTasks / taskCount) * 100) : 0;

          return (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={roleColors[user.role]}>
                      {user.role.replace('_', ' ')}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Mail size={14} className="mr-1" />
                      Contact
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{taskCount}</div>
                      <div className="text-gray-600">Total Tasks</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{completionRate}%</div>
                      <div className="text-gray-600">Completion</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No team members found</div>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default Team;
