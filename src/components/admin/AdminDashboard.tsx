import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserProfile, TeacherApprovalStatus, QuizSessionConfig } from '../../types/quiz';
import {
  ShieldCheck,
  Users,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  UserCheck,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface Props {
  activeSessions: QuizSessionConfig[];
  onExploreTeacherView: () => void;
  onExploreStudentView: () => void;
  onOpenAnalytics?: () => void;
}

export const AdminDashboard: React.FC<Props> = ({
  activeSessions,
  onExploreTeacherView,
  onExploreStudentView,
  onOpenAnalytics,
}) => {
  const { getAllUsers, adminSetTeacherStatus, user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<'all' | 'pending' | 'teacher' | 'student' | 'admin'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (e) {
      console.error('Failed to load users:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateStatus = async (userId: string, newStatus: TeacherApprovalStatus, name: string) => {
    setActionLoadingId(userId);
    try {
      await adminSetTeacherStatus(userId, newStatus);
      showToast(
        newStatus === 'approved'
          ? `Successfully approved ${name} as Instructor.`
          : `Application for ${name} marked as rejected.`
      );
      await fetchUsers();
    } catch (err) {
      showToast('Failed to update status. Please try again.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const pendingTeachers = users.filter((u) => u.role === 'teacher' && u.teacherStatus === 'pending');
  const approvedTeachers = users.filter((u) => u.role === 'teacher' && u.teacherStatus === 'approved');
  const students = users.filter((u) => u.role === 'student');
  const admins = users.filter((u) => u.role === 'admin');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterRole === 'pending') {
      return u.role === 'teacher' && u.teacherStatus === 'pending';
    }
    if (filterRole === 'teacher') {
      return u.role === 'teacher';
    }
    if (filterRole === 'student') {
      return u.role === 'student';
    }
    if (filterRole === 'admin') {
      return u.role === 'admin';
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-md bg-editorial-card border border-editorial-accent shadow-2xl text-xs font-serif text-editorial-fg flex items-center space-x-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* DASHBOARD HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-editorial-border pb-6">
        <div>
          <div className="flex items-center space-x-2 text-editorial-accent mb-1">
            <ShieldCheck className="w-5 h-5" />
            <span className="small-caps text-xs font-semibold tracking-wider">
              Platform Administration Console
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-editorial-fg font-normal tracking-tight">
            Governance & System Control
          </h1>
          <p className="text-xs text-editorial-muted-fg mt-1">
            Logged in as <strong className="text-editorial-fg">{currentUser?.fullName}</strong> ({currentUser?.email})
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="btn-ghost-serif text-xs px-3 py-2 flex items-center space-x-1.5"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Records</span>
          </button>

          {onOpenAnalytics && (
            <button
              onClick={onOpenAnalytics}
              className="btn-secondary-serif text-xs px-3 py-2 flex items-center space-x-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-editorial-accent" />
              <span>Platform Analytics</span>
            </button>
          )}

          <button
            onClick={onExploreTeacherView}
            className="btn-secondary-serif text-xs px-3 py-2 flex items-center space-x-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Instructor View</span>
          </button>

          <button
            onClick={onExploreStudentView}
            className="btn-primary-serif text-xs px-3 py-2 flex items-center space-x-1.5"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Candidate View</span>
          </button>
        </div>
      </div>

      {/* 1. PLATFORM METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Total Accounts</span>
            <Users className="w-4 h-4 text-editorial-accent" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-fg">
            {users.length}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            {students.length} Candidates • {approvedTeachers.length} Instructors
          </div>
        </div>

        <div className="card-editorial p-5 border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-1">
            <span className="small-caps text-[11px] font-bold">Pending Approvals</span>
            <Clock className="w-4 h-4 animate-pulse" />
          </div>
          <div className="font-serif text-3xl font-normal text-amber-800 dark:text-amber-300">
            {pendingTeachers.length}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Awaiting administrative review
          </div>
        </div>

        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Approved Teachers</span>
            <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-fg">
            {approvedTeachers.length}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Authorized to dispatch quizzes
          </div>
        </div>

        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Active Live Rooms</span>
            <Activity className="w-4 h-4 text-editorial-accent" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-accent">
            {activeSessions.length}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Synchronized via Broadcast Protocol
          </div>
        </div>
      </div>

      {/* 2. TEACHER APPROVAL QUEUE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-editorial-accent" />
            <h2 className="font-serif text-xl font-bold text-editorial-fg">
              Teacher Approval Applications
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-editorial-muted border border-editorial-border text-editorial-fg">
              {pendingTeachers.length} Pending
            </span>
          </div>
        </div>

        {pendingTeachers.length === 0 ? (
          <div className="card-editorial p-8 text-center bg-editorial-muted/30">
            <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
            <h3 className="font-serif text-base font-bold text-editorial-fg">
              All Instructor Applications Reviewed
            </h3>
            <p className="text-xs text-editorial-muted-fg mt-1 max-w-sm mx-auto">
              There are currently no outstanding teacher signup requests awaiting your approval.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="card-editorial p-5 border-l-4 border-l-amber-500 space-y-4 bg-editorial-card shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-base font-bold text-editorial-fg">
                      {teacher.fullName}
                    </h3>
                    <p className="text-xs font-mono text-editorial-muted-fg">{teacher.email}</p>
                    <span className="inline-block mt-1 text-[10px] text-editorial-muted-fg">
                      Applied: {new Date(teacher.createdAt).toLocaleDateString()} at{' '}
                      {new Date(teacher.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-semibold uppercase">
                    Pending Review
                  </span>
                </div>

                {teacher.teacherNote ? (
                  <div className="p-3 rounded bg-editorial-muted/70 border border-editorial-border text-xs text-editorial-fg">
                    <span className="small-caps text-[10px] text-editorial-muted-fg block mb-1">
                      Applicant Note / Affiliation:
                    </span>
                    <p className="italic font-serif leading-relaxed text-editorial-fg">
                      "{teacher.teacherNote}"
                    </p>
                  </div>
                ) : (
                  <div className="text-xs text-editorial-muted-fg italic">
                    No additional application note provided.
                  </div>
                )}

                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-editorial-border">
                  <button
                    disabled={actionLoadingId === teacher.id}
                    onClick={() => handleUpdateStatus(teacher.id, 'rejected', teacher.fullName)}
                    className="px-3 py-1.5 rounded text-xs font-medium text-red-600 hover:bg-red-500/10 border border-red-500/20 transition-colors flex items-center space-x-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>

                  <button
                    disabled={actionLoadingId === teacher.id}
                    onClick={() => handleUpdateStatus(teacher.id, 'approved', teacher.fullName)}
                    className="btn-primary-serif text-xs py-1.5 px-4 flex items-center space-x-1.5 shadow-sm"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Approve as Teacher</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. ALL USERS DIRECTORY */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-editorial-accent" />
            <h2 className="font-serif text-xl font-bold text-editorial-fg">
              Platform User Directory
            </h2>
            <span className="text-xs text-editorial-muted-fg font-mono">
              ({filteredUsers.length} of {users.length})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-editorial-muted-fg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name or email..."
                className="pl-8 pr-3 py-1.5 text-xs rounded border border-editorial-border bg-editorial-bg text-editorial-fg placeholder:text-editorial-muted-fg focus:outline-none focus:border-editorial-accent"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center p-0.5 bg-editorial-muted border border-editorial-border rounded text-xs">
              {(['all', 'pending', 'teacher', 'student', 'admin'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterRole(tab)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors capitalize ${
                    filterRole === tab
                      ? 'bg-editorial-card text-editorial-fg shadow-xs border border-editorial-border font-semibold'
                      : 'text-editorial-muted-fg hover:text-editorial-fg'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Table */}
        <div className="card-editorial overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-editorial-border bg-editorial-muted/50 text-editorial-muted-fg small-caps">
                  <th className="py-3 px-4 font-semibold">User</th>
                  <th className="py-3 px-4 font-semibold">Assigned Role</th>
                  <th className="py-3 px-4 font-semibold">Teacher Status</th>
                  <th className="py-3 px-4 font-semibold">Registered</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-editorial-border font-sans">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-editorial-muted-fg italic">
                      No matching user records found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const isSelf = u.id === currentUser?.id;
                    return (
                      <tr key={u.id} className="hover:bg-editorial-muted/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-editorial-fg">{u.fullName}</div>
                          <div className="font-mono text-[11px] text-editorial-muted-fg">{u.email}</div>
                          {isSelf && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] bg-editorial-accent/10 text-editorial-accent font-semibold">
                              You (Active Session)
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-mono capitalize ${
                              u.role === 'admin'
                                ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                                : u.role === 'teacher'
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {u.role === 'admin' && <ShieldCheck className="w-3 h-3" />}
                            {u.role === 'teacher' && <GraduationCap className="w-3 h-3" />}
                            {u.role === 'student' && <UserCheck className="w-3 h-3" />}
                            <span>{u.role}</span>
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          {u.role === 'teacher' ? (
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono capitalize ${
                                u.teacherStatus === 'approved'
                                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                                  : u.teacherStatus === 'pending'
                                  ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold animate-pulse'
                                  : 'bg-red-500/10 text-red-700 dark:text-red-400'
                              }`}
                            >
                              {u.teacherStatus || 'pending'}
                            </span>
                          ) : (
                            <span className="text-editorial-muted-fg text-[11px]">—</span>
                          )}
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] text-editorial-muted-fg">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>

                        <td className="py-3 px-4 text-right">
                          {u.role === 'teacher' && u.teacherStatus !== 'approved' && (
                            <button
                              disabled={actionLoadingId === u.id}
                              onClick={() => handleUpdateStatus(u.id, 'approved', u.fullName)}
                              className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mr-3"
                            >
                              Approve
                            </button>
                          )}

                          {u.role === 'teacher' && u.teacherStatus === 'approved' && (
                            <button
                              disabled={actionLoadingId === u.id}
                              onClick={() => handleUpdateStatus(u.id, 'pending', u.fullName)}
                              className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline mr-3"
                            >
                              Revoke
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
