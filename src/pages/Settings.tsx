
import { useState } from "react";
import { User, Bell, Palette, Shield, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskDeadlines: true,
    taskAssignments: true,
    projectUpdates: false,
  });

  const [theme, setTheme] = useState("light");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-2">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <a href="#profile" className="flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg">
                  <User size={16} className="mr-3" />
                  Profile
                </a>
                <a href="#notifications" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Bell size={16} className="mr-3" />
                  Notifications
                </a>
                <a href="#appearance" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Palette size={16} className="mr-3" />
                  Appearance
                </a>
                <a href="#security" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Shield size={16} className="mr-3" />
                  Security
                </a>
                <a href="#help" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  <HelpCircle size={16} className="mr-3" />
                  Help & Support
                </a>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card id="profile">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User size={20} className="mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-medium">JD</span>
                </div>
                <Button variant="outline">Change Photo</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={profile.role} onValueChange={(value) => setProfile(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="team_member">Team Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card id="notifications">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell size={20} className="mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Task Deadlines</Label>
                    <p className="text-sm text-gray-600">Get reminded about upcoming deadlines</p>
                  </div>
                  <Switch
                    checked={notifications.taskDeadlines}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, taskDeadlines: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Task Assignments</Label>
                    <p className="text-sm text-gray-600">Notify when tasks are assigned to you</p>
                  </div>
                  <Switch
                    checked={notifications.taskAssignments}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, taskAssignments: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Project Updates</Label>
                    <p className="text-sm text-gray-600">Get notified about project changes</p>
                  </div>
                  <Switch
                    checked={notifications.projectUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, projectUpdates: checked }))
                    }
                  />
                </div>
              </div>
              
              <Button className="bg-blue-600 hover:bg-blue-700">Save Preferences</Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card id="appearance">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette size={20} className="mr-2" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="bg-blue-600 hover:bg-blue-700">Apply Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
