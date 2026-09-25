import React, { useState } from 'react';
import { TaskItem, TeamMember } from '../../data/seedData';
import {
  CheckSquare,
  Plus,
  Clock,
  User,
  Sparkles,
  Filter,
  CheckCircle2,
  AlertCircle,
  Tag,
  Trash2,
} from 'lucide-react';

interface TaskDashboardViewProps {
  tasks: TaskItem[];
  teamMembers: TeamMember[];
  onAddTask: (task: Omit<TaskItem, 'id'>) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskItem['status']) => void;
  onDeleteTask: (taskId: string) => void;
  onNotify: (msg: string) => void;
}

export const TaskDashboardView: React.FC<TaskDashboardViewProps> = ({
  tasks,
  teamMembers,
  onAddTask,
  onUpdateTaskStatus,
  onDeleteTask,
  onNotify,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newAssignee, setNewAssignee] = useState(teamMembers[0]?.name || 'Bilal Khan');
  const [newCategory, setNewCategory] = useState<TaskItem['category']>('Copywriting');
  const [newPriority, setNewPriority] = useState<TaskItem['priority']>('High');
  const [newDueDate, setNewDueDate] = useState('2026-09-26');

  const filteredTasks = tasks.filter((t) => {
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    return true;
  });

  const columns: Array<{ status: TaskItem['status']; label: string }> = [
    { status: 'Draft', label: 'Brief & Copy (Draft)' },
    { status: 'Designing', label: 'Design & Visuals' },
    { status: 'Review', label: 'Medical & Tone Review' },
    { status: 'Approved', label: 'Approved for Publishing' },
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask({
      title: newTitle,
      assignedTo: newAssignee,
      role: 'Content Creator',
      category: newCategory,
      priority: newPriority,
      status: 'Draft',
      dueDate: newDueDate,
    });
    setNewTitle('');
    setShowNewTaskModal(false);
    onNotify('New task added to board');
  };

  const getPriorityBadge = (p: TaskItem['priority']) => {
    switch (p) {
      case 'High':
        return 'bg-[var(--red-soft)] text-[var(--red)]';
      case 'Medium':
        return 'bg-[var(--amber-soft)] text-[var(--amber)]';
      case 'Low':
        return 'bg-[var(--green-soft)] text-[var(--green)]';
    }
  };

  return (
    <div className="view space-y-5">
      {/* Head */}
      <div className="head">
        <div>
          <span className="eyebrow">Content Operations</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Production Task Workflow</h1>
          <p className="sub text-[13px] mt-1 text-[var(--ink2)]">
            Coordinate Urdu copywriting, video rendering, graphics design, and Shariah approval before publication.
          </p>
        </div>

        <div className="row">
          <button onClick={() => setShowNewTaskModal(true)} className="btn primary">
            <Plus className="w-4 h-4" />
            <span>+ Add Task</span>
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="card p-3 flex flex-wrap items-center justify-between gap-3 bg-[var(--card)]">
        <div className="seg">
          {['all', 'Copywriting', 'Design', 'Video Editing', 'Translation', 'Approval'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              aria-pressed={filterCategory === cat}
            >
              {cat === 'all' ? 'All Disciplines' : cat}
            </button>
          ))}
        </div>

        <div className="text-[12px] text-[var(--muted)]">
          Total Tasks: <b>{filteredTasks.length}</b>
        </div>
      </div>

      {/* Kanban Board Columns (4 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.status);
          return (
            <div
              key={col.status}
              className="p-3 rounded-2xl bg-[var(--card)] border border-[var(--sep2)] space-y-3 min-h-[420px]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[var(--sep2)]">
                <span className="font-bold text-[13px] text-[var(--ink)] flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      col.status === 'Approved'
                        ? 'bg-[var(--green)]'
                        : col.status === 'Designing'
                        ? 'bg-[var(--blue)]'
                        : col.status === 'Review'
                        ? 'bg-[var(--amber)]'
                        : 'bg-[var(--muted)]'
                    }`}
                  ></span>
                  {col.label}
                </span>
                <span className="text-[11px] font-semibold text-[var(--muted)] bg-[var(--card2)] px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {colTasks.length === 0 ? (
                  <div className="py-8 text-center text-[12px] text-[var(--muted)] border border-dashed border-[var(--sep2)] rounded-xl">
                    No tasks in {col.label}
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl bg-[var(--card2)] border border-[var(--sep2)] hover:border-[var(--sep)] shadow-sm space-y-2 group transition-all"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>

                        <div className="flex items-center gap-1">
                          <select
                            value={task.status}
                            onChange={(e: any) =>
                              onUpdateTaskStatus(task.id, e.target.value)
                            }
                            className="text-[10.5px] py-0.5 px-1 bg-[var(--card)] rounded border border-[var(--sep2)] font-medium text-[var(--ink2)]"
                          >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Review">Review</option>
                            <option value="Done">Done</option>
                          </select>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="text-[var(--muted)] hover:text-[var(--red)] p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-semibold text-[13px] text-[var(--ink)] leading-snug">
                        {task.title}
                      </h4>

                      {task.relatedCampaign && (
                        <div className="text-[11px] text-[var(--muted)] truncate">
                          {task.relatedCampaign}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-[var(--sep2)] text-[11px] text-[var(--muted)]">
                        <span className="flex items-center gap-1 text-[var(--ink2)] font-medium">
                          <User className="w-3 h-3" />
                          <span className="truncate max-w-[100px]">{task.assignedTo}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{task.dueDate.slice(5)}</span>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="scrim center" onClick={() => setShowNewTaskModal(false)}>
          <div
            className="modal max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mhead flex justify-between items-center border-b border-[var(--sep2)] pb-3">
              <h2 className="text-lg font-bold">Add Production Task</h2>
              <button onClick={() => setShowNewTaskModal(false)} className="iconbtn">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 py-2 text-[12.5px]">
              <div className="field">
                <label>Task Description / Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Design 4-slide carousel for Cataract patient"
                />
              </div>

              <div className="field">
                <label>Assign To</label>
                <select
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                >
                  {teamMembers.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} ({m.role.split('&')[0]})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="field">
                  <label>Discipline</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                  >
                    <option value="Copywriting">Copywriting</option>
                    <option value="Design">Design</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Translation">Translation</option>
                    <option value="Approval">Approval</option>
                  </select>
                </div>

                <div className="field">
                  <label>Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--sep2)]">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="btn"
                >
                  Cancel
                </button>
                <button type="submit" className="btn green text-white">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
