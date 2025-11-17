'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Users,
  Plus,
  TrendingUp,
  Award,
  BookOpen,
  Settings,
  Download,
} from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Student {
  id: string;
  name: string;
  avatar: string;
  points: number;
  wordsLearned: number;
  avgAccuracy: number;
  lastActive: string;
}

export default function ClassroomPage() {
  const [selectedClass, setSelectedClass] = useState('Grade 3A');

  const classes = ['Grade 3A', 'Grade 3B', 'Grade 4A'];

  const students: Student[] = [
    {
      id: '1',
      name: 'Emma Wilson',
      avatar: '👧',
      points: 1850,
      wordsLearned: 247,
      avgAccuracy: 87,
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'Jack Thompson',
      avatar: '👦',
      points: 1680,
      wordsLearned: 215,
      avgAccuracy: 82,
      lastActive: '5 hours ago',
    },
    {
      id: '3',
      name: 'Sophie Chen',
      avatar: '👱‍♀️',
      points: 1520,
      wordsLearned: 198,
      avgAccuracy: 90,
      lastActive: '1 day ago',
    },
    {
      id: '4',
      name: 'Liam Rodriguez',
      avatar: '👨',
      points: 1340,
      wordsLearned: 176,
      avgAccuracy: 78,
      lastActive: '3 hours ago',
    },
    {
      id: '5',
      name: 'Olivia Kim',
      avatar: '👩',
      points: 1180,
      wordsLearned: 152,
      avgAccuracy: 85,
      lastActive: '1 hour ago',
    },
  ];

  const weeklyProgress = [
    { day: 'Mon', avgScore: 75 },
    { day: 'Tue', avgScore: 82 },
    { day: 'Wed', avgScore: 78 },
    { day: 'Thu', avgScore: 88 },
    { day: 'Fri', avgScore: 85 },
  ];

  const activityData = [
    { activity: 'Vocabulary', students: 18 },
    { activity: 'Pronunciation', students: 15 },
    { activity: 'Conversation', students: 12 },
    { activity: 'Stories', students: 10 },
    { activity: 'Games', students: 20 },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Users className="w-12 h-12 text-purple-600" />
              Classroom Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Manage your students and track their progress
            </p>
          </div>

          <Link href="/">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </button>
          </Link>
        </div>

        {/* Class Selector */}
        <div className="flex gap-4 mb-8">
          {classes.map((className) => (
            <button
              key={className}
              onClick={() => setSelectedClass(className)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                selectedClass === className
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {className} ({className === 'Grade 3A' ? 25 : className === 'Grade 3B' ? 22 : 20} students)
            </button>
          ))}
          <button className="px-6 py-3 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Class
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="kid-card bg-blue-50"
          >
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <div className="text-3xl font-bold text-blue-600">25</div>
            <div className="text-gray-600">Total Students</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="kid-card bg-green-50"
          >
            <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
            <div className="text-3xl font-bold text-green-600">84%</div>
            <div className="text-gray-600">Avg. Accuracy</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="kid-card bg-purple-50"
          >
            <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
            <div className="text-3xl font-bold text-purple-600">4,832</div>
            <div className="text-gray-600">Words Learned</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="kid-card bg-yellow-50"
          >
            <Award className="w-8 h-8 text-yellow-600 mb-2" />
            <div className="text-3xl font-bold text-yellow-600">18</div>
            <div className="text-gray-600">Active Today</div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Progress */}
          <div className="kid-card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Class Weekly Progress
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Participation */}
          <div className="kid-card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Activity Participation
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student List */}
        <div className="kid-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Student Progress</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:bg-gray-50 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-600 font-semibold">
                    Student
                  </th>
                  <th className="text-center py-4 px-4 text-gray-600 font-semibold">
                    Points
                  </th>
                  <th className="text-center py-4 px-4 text-gray-600 font-semibold">
                    Words Learned
                  </th>
                  <th className="text-center py-4 px-4 text-gray-600 font-semibold">
                    Avg. Accuracy
                  </th>
                  <th className="text-center py-4 px-4 text-gray-600 font-semibold">
                    Last Active
                  </th>
                  <th className="text-center py-4 px-4 text-gray-600 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{student.avatar}</div>
                        <span className="font-semibold text-gray-800">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="font-bold text-blue-600 text-lg">
                        {student.points}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="font-semibold text-gray-800">
                        {student.wordsLearned}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="inline-block px-3 py-1 rounded-lg bg-green-100 text-green-700 font-bold">
                        {student.avgAccuracy}%
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-gray-600 text-sm">
                      {student.lastActive}
                    </td>
                    <td className="text-center py-4 px-4">
                      <button className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold text-sm">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assignment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Create Assignment */}
          <div className="kid-card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Create Assignment</h3>
            <p className="mb-6">Assign custom vocabulary lists or reading materials to your students</p>
            <button className="px-6 py-3 rounded-xl bg-white text-purple-600 font-bold hover:bg-gray-100">
              <Plus className="w-5 h-5 inline mr-2" />
              New Assignment
            </button>
          </div>

          {/* Quick Actions */}
          <div className="kid-card">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-left font-semibold text-gray-800">
                📊 Generate Progress Report
              </button>
              <button className="w-full px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 text-left font-semibold text-gray-800">
                📧 Send Parent Updates
              </button>
              <button className="w-full px-4 py-3 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-left font-semibold text-gray-800">
                🎯 Set Class Goals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
