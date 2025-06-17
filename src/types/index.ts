
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'team_member';
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  members: User[];
  createdAt: Date;
  status: 'active' | 'completed' | 'on_hold';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'completed';
  assignee: User;
  projectId: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'deadline' | 'assignment' | 'mention' | 'update';
  read: boolean;
  createdAt: Date;
}
