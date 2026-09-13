import React, { useState } from 'react';
import {
  SyllabusModule,
  SyllabusTopicItem,
  ModuleColor,
  DEFAULT_PYTHON_MODULES,
} from '../../types/syllabus';
import {
  CheckSquare,
  Square,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  RotateCcw,
  Layers,
  Check,
  Edit2,
  ChevronsUpDown,
} from 'lucide-react';

interface Props {
  modules: SyllabusModule[];
  onChange: (modules: SyllabusModule[]) => void;
}

const COLOR_STYLES: Record<
  ModuleColor,
  {
    headerBg: string;
    badgeBg: string;
    border: string;
    accentText: string;
    subtopicTagActive: string;
    subtopicTagInactive: string;
  }
> = {
  blue: {
    headerBg: 'bg-[#1E3A8A] text-white',
    badgeBg: 'bg-editorial-card text-editorial-fg shadow-sm',
    border: 'border-blue-500/30',
    accentText: 'text-blue-700 dark:text-blue-300',
    subtopicTagActive: 'bg-blue-500/10 text-blue-800 dark:text-blue-300 border-blue-500/30 font-medium',
    subtopicTagInactive: 'bg-editorial-muted text-editorial-muted-fg border-editorial-border line-through opacity-50',
  },
  emerald: {
    headerBg: 'bg-[#14532D] text-white',
    badgeBg: 'bg-editorial-card text-editorial-fg shadow-sm',
    border: 'border-emerald-500/30',
    accentText: 'text-emerald-700 dark:text-emerald-300',
    subtopicTagActive: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 font-medium',
    subtopicTagInactive: 'bg-editorial-muted text-editorial-muted-fg border-editorial-border line-through opacity-50',
  },
  purple: {
    headerBg: 'bg-[#581C87] text-white',
    badgeBg: 'bg-editorial-card text-editorial-fg shadow-sm',
    border: 'border-purple-500/30',
    accentText: 'text-purple-700 dark:text-purple-300',
    subtopicTagActive: 'bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-500/30 font-medium',
    subtopicTagInactive: 'bg-editorial-muted text-editorial-muted-fg border-editorial-border line-through opacity-50',
  },
  amber: {
    headerBg: 'bg-[#92400E] text-white',
    badgeBg: 'bg-editorial-card text-editorial-fg shadow-sm',
    border: 'border-amber-500/30',
    accentText: 'text-amber-700 dark:text-amber-300',
    subtopicTagActive: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30 font-medium',
    subtopicTagInactive: 'bg-editorial-muted text-editorial-muted-fg border-editorial-border line-through opacity-50',
  },
  cyan: {
    headerBg: 'bg-[#155E75] text-white',
    badgeBg: 'bg-editorial-card text-editorial-fg shadow-sm',
    border: 'border-cyan-500/30',
    accentText: 'text-cyan-700 dark:text-cyan-300',
    subtopicTagActive: 'bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border-cyan-500/30 font-medium',
    subtopicTagInactive: 'bg-editorial-muted text-editorial-muted-fg border-editorial-border line-through opacity-50',
  },
  rose: {
    headerBg: 'bg-[#9F1239] text-white',
    badgeBg: 'bg-editorial-card text-editorial-fg shadow-sm',
    border: 'border-rose-500/30',
    accentText: 'text-rose-700 dark:text-rose-300',
    subtopicTagActive: 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30 font-medium',
    subtopicTagInactive: 'bg-editorial-muted text-editorial-muted-fg border-editorial-border line-through opacity-50',
  },
  indigo: {
    headerBg: 'bg-[#312E81] text-white',
    badgeBg: 'bg-editorial-card text-editorial-fg shadow-sm',
    border: 'border-indigo-500/30',
    accentText: 'text-indigo-700 dark:text-indigo-300',
    subtopicTagActive: 'bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/30 font-medium',
    subtopicTagInactive: 'bg-editorial-muted text-editorial-muted-fg border-editorial-border line-through opacity-50',
  },
};

export const ModuleTopicSelector: React.FC<Props> = ({ modules, onChange }) => {
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>({});
  // Modules dropdown/collapse state (all initially collapsed for clean, non-overwhelming UI)
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    modules.forEach((m) => {
      init[m.id] = true;
    });
    return init;
  });
  const [addingTopicModuleId, setAddingTopicModuleId] = useState<string | null>(null);
  const [newTopicText, setNewTopicText] = useState<string>('');
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [moduleTitleInput, setModuleTitleInput] = useState<string>('');

  // Toggle module collapse / dropdown
  const handleToggleModuleCollapse = (moduleId: string) => {
    setCollapsedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const allCollapsed = modules.length > 0 && modules.every((m) => collapsedModules[m.id]);

  const handleToggleAllModules = () => {
    if (allCollapsed) {
      setCollapsedModules({});
    } else {
      const next: Record<string, boolean> = {};
      modules.forEach((m) => {
        next[m.id] = true;
      });
      setCollapsedModules(next);
    }
  };

  // Toggle whole module selection
  const handleToggleModule = (moduleId: string) => {
    const updated = modules.map((mod) => {
      if (mod.id !== moduleId) return mod;
      const nextSelected = !mod.selected;
      return {
        ...mod,
        selected: nextSelected,
        items: mod.items.map((item) => ({
          ...item,
          selected: nextSelected,
        })),
      };
    });
    onChange(updated);
  };

  // Toggle individual topic item
  const handleToggleTopic = (moduleId: string, itemId: string) => {
    const updated = modules.map((mod) => {
      if (mod.id !== moduleId) return mod;
      const updatedItems = mod.items.map((item) => {
        if (item.id !== itemId) return item;
        return { ...item, selected: !item.selected };
      });
      const hasAnySelected = updatedItems.some((i) => i.selected);
      return {
        ...mod,
        items: updatedItems,
        selected: hasAnySelected,
      };
    });
    onChange(updated);
  };

  // Toggle subtopic chip selection
  const handleToggleSubtopic = (moduleId: string, itemId: string, subtopic: string) => {
    const updated = modules.map((mod) => {
      if (mod.id !== moduleId) return mod;
      return {
        ...mod,
        items: mod.items.map((item) => {
          if (item.id !== itemId) return item;
          const currentSelected =
            item.selectedSubtopics !== undefined
              ? item.selectedSubtopics
              : item.subtopics || [];

          let nextSelected: string[];
          if (currentSelected.includes(subtopic)) {
            nextSelected = currentSelected.filter((s) => s !== subtopic);
          } else {
            nextSelected = [...currentSelected, subtopic];
          }

          return {
            ...item,
            selectedSubtopics: nextSelected,
            selected: nextSelected.length > 0 ? true : item.selected,
          };
        }),
      };
    });
    onChange(updated);
  };

  // Toggle tree collapse
  const handleToggleCollapse = (itemId: string) => {
    setCollapsedTopics((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Delete topic item
  const handleDeleteTopic = (moduleId: string, itemId: string) => {
    const updated = modules.map((mod) => {
      if (mod.id !== moduleId) return mod;
      return {
        ...mod,
        items: mod.items.filter((i) => i.id !== itemId),
      };
    });
    onChange(updated);
  };

  // Add custom topic to a module
  const handleAddTopicToModule = (moduleId: string) => {
    if (!newTopicText.trim()) return;

    const parts = newTopicText.split(',').map((p) => p.trim()).filter(Boolean);
    const mainTitle = parts[0];
    const subtopics = parts.slice(1);

    const newItem: SyllabusTopicItem = {
      id: `custom-topic-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: mainTitle,
      subtopics: subtopics.length > 0 ? subtopics : [],
      selected: true,
    };

    const updated = modules.map((mod) => {
      if (mod.id !== moduleId) return mod;
      return {
        ...mod,
        selected: true,
        items: [...mod.items, newItem],
      };
    });

    onChange(updated);
    setNewTopicText('');
    setAddingTopicModuleId(null);
  };

  // Select all modules & topics
  const handleSelectAll = () => {
    const updated = modules.map((mod) => ({
      ...mod,
      selected: true,
      items: mod.items.map((i) => ({ ...i, selected: true, selectedSubtopics: undefined })),
    }));
    onChange(updated);
  };

  // Deselect all
  const handleDeselectAll = () => {
    const updated = modules.map((mod) => ({
      ...mod,
      selected: false,
      items: mod.items.map((i) => ({ ...i, selected: false })),
    }));
    onChange(updated);
  };

  // Reset to default 4 syllabus modules
  const handleResetToDefault = () => {
    onChange(JSON.parse(JSON.stringify(DEFAULT_PYTHON_MODULES)));
  };

  // Add new blank module
  const handleAddNewModule = () => {
    const colors: ModuleColor[] = ['blue', 'emerald', 'purple', 'amber', 'cyan', 'rose'];
    const nextNum = modules.length + 1;
    const newMod: SyllabusModule = {
      id: `module-${Date.now()}`,
      moduleNumber: nextNum,
      title: `Module ${nextNum}: Extended Unit`,
      color: colors[(nextNum - 1) % colors.length],
      selected: true,
      items: [
        {
          id: `item-${Date.now()}-1`,
          title: 'Core Concepts',
          selected: true,
          subtopics: [],
        },
      ],
    };
    onChange([...modules, newMod]);
    // Ensure the new module is open for editing
    setCollapsedModules((prev) => ({ ...prev, [newMod.id]: false }));
  };

  // Delete module
  const handleDeleteModule = (moduleId: string) => {
    if (modules.length <= 1) {
      alert('At least one curriculum module is required.');
      return;
    }
    onChange(modules.filter((m) => m.id !== moduleId));
  };

  // Save renamed module title
  const handleSaveModuleTitle = (moduleId: string) => {
    if (!moduleTitleInput.trim()) {
      setEditingModuleId(null);
      return;
    }
    onChange(
      modules.map((m) => (m.id === moduleId ? { ...m, title: moduleTitleInput.trim() } : m))
    );
    setEditingModuleId(null);
    setModuleTitleInput('');
  };

  // Stats calculation
  const totalModules = modules.length;
  const activeModules = modules.filter((m) => m.selected).length;
  const totalTopics = modules.reduce((sum, m) => sum + m.items.length, 0);
  const activeTopics = modules.reduce(
    (sum, m) => sum + (m.selected ? m.items.filter((i) => i.selected).length : 0),
    0
  );

  return (
    <div className="space-y-4">
      {/* Top Toolbar / Overview Header */}
      <div className="card-editorial p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-md bg-editorial-muted text-editorial-accent border border-editorial-border">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="small-caps text-[10px] text-editorial-fg">
                Curriculum Blueprint Architecture
              </h3>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-medium bg-editorial-muted text-editorial-accent border border-editorial-border">
                {activeModules}/{totalModules} Modules · {activeTopics}/{totalTopics} Topics Active
              </span>
            </div>
            <p className="text-xs text-editorial-muted-fg mt-0.5 font-sans">
              Click any module to toggle dropdown and configure topics.
            </p>
          </div>
        </div>

        {/* Global Toolbar Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleToggleAllModules}
            className="px-2.5 py-1 rounded text-xs font-medium bg-editorial-card hover:bg-editorial-muted text-editorial-accent border border-editorial-border hover:border-editorial-accent transition-all flex items-center space-x-1"
            title={allCollapsed ? 'Expand all module dropdowns' : 'Collapse all module dropdowns'}
          >
            <ChevronsUpDown className="w-3 h-3" />
            <span>{allCollapsed ? 'Expand All' : 'Collapse All'}</span>
          </button>
          <button
            type="button"
            onClick={handleSelectAll}
            className="px-2.5 py-1 rounded text-xs font-medium bg-editorial-card hover:bg-editorial-muted text-editorial-fg border border-editorial-border transition-all"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={handleDeselectAll}
            className="px-2.5 py-1 rounded text-xs font-medium bg-editorial-card hover:bg-editorial-muted text-editorial-muted-fg hover:text-editorial-fg border border-editorial-border transition-all"
          >
            Clear Selection
          </button>
          <button
            type="button"
            onClick={handleResetToDefault}
            title="Reset to the 4 standard syllabus modules"
            className="px-2.5 py-1 rounded text-xs font-medium bg-editorial-card hover:bg-editorial-muted text-editorial-accent border border-editorial-border hover:border-editorial-accent transition-all flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Standard 4</span>
          </button>
          <button
            type="button"
            onClick={handleAddNewModule}
            className="btn-primary-serif text-xs py-1 px-3 flex items-center space-x-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add Module</span>
          </button>
        </div>
      </div>

      {/* 4-QUADRANT RESPONSIVE GRID / DROPDOWN ACCORDIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {modules.map((mod, modIdx) => {
          const style = COLOR_STYLES[mod.color] || COLOR_STYLES.blue;
          const selectedItemsCount = mod.items.filter((i) => i.selected).length;
          const isAddingTopic = addingTopicModuleId === mod.id;
          const isEditingTitle = editingModuleId === mod.id;
          const isCollapsed = collapsedModules[mod.id] ?? false;

          return (
            <div
              key={mod.id}
              className={`card-editorial overflow-hidden flex flex-col shadow-xs hover:shadow-md transition-all duration-200 ${
                mod.selected
                  ? 'border-editorial-border'
                  : 'border-editorial-border/60 opacity-75'
              }`}
            >
              {/* Module Header Bar (Clickable Dropdown Toggle) */}
              <div
                onClick={() => handleToggleModuleCollapse(mod.id)}
                className={`p-3 sm:p-3.5 ${style.headerBg} flex items-center justify-between shadow-sm cursor-pointer select-none transition-all hover:brightness-105`}
                title={isCollapsed ? 'Click to expand module dropdown' : 'Click to collapse module dropdown'}
              >
                <div className="flex items-center space-x-2.5 sm:space-x-3 flex-1 min-w-0 pr-2">
                  {/* Circle Number Badge */}
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm sm:text-base shrink-0 ${style.badgeBg}`}
                  >
                    {mod.moduleNumber || modIdx + 1}
                  </span>

                  {/* Module Title */}
                  {isEditingTitle ? (
                    <div
                      className="flex items-center space-x-1 flex-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        value={moduleTitleInput}
                        onChange={(e) => setModuleTitleInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveModuleTitle(mod.id);
                          if (e.key === 'Escape') setEditingModuleId(null);
                        }}
                        autoFocus
                        className="px-2 py-0.5 rounded bg-editorial-card text-xs font-bold text-editorial-fg border border-editorial-border focus:outline-none w-full"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveModuleTitle(mod.id)}
                        className="p-1 hover:bg-white/20 rounded text-white"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1.5 truncate">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-white truncate">
                        {mod.title}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingModuleId(mod.id);
                          setModuleTitleInput(mod.title);
                        }}
                        className="text-white/70 hover:text-white p-0.5 rounded transition-opacity"
                        title="Rename Module"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Header Actions & Dropdown Chevron */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                  <span
                    className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-black/25 text-white"
                    title={`${selectedItemsCount} of ${mod.items.length} topics active`}
                  >
                    {selectedItemsCount}/{mod.items.length}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleModule(mod.id);
                    }}
                    className="p-1 rounded bg-black/20 hover:bg-black/30 text-white transition-colors flex items-center space-x-1 text-xs font-medium"
                    title={mod.selected ? 'Deselect Module' : 'Select Module'}
                  >
                    {mod.selected ? (
                      <CheckSquare className="w-4 h-4 text-white" />
                    ) : (
                      <Square className="w-4 h-4 text-white/70" />
                    )}
                  </button>

                  {modules.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteModule(mod.id);
                      }}
                      className="p-1 rounded bg-black/20 hover:bg-rose-600 text-white/80 hover:text-white transition-colors"
                      title="Delete Module"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Dropdown Chevron Indicator */}
                  <div
                    className="p-1 rounded bg-black/20 hover:bg-black/30 text-white transition-colors ml-0.5"
                    title={isCollapsed ? 'Click to expand' : 'Click to collapse'}
                  >
                    <ChevronDown
                      className={`w-4 h-4 text-white transition-transform duration-200 ${
                        isCollapsed ? '-rotate-90' : 'rotate-0'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Collapsible Dropdown Content */}
              {!isCollapsed && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-200 flex flex-col justify-between flex-1">
                  {/* Module Body / Topics List */}
                  <div className="p-3 sm:p-4 space-y-2.5">
                    {mod.items.length === 0 ? (
                      <div className="p-3 rounded bg-editorial-muted/40 border border-editorial-border text-center">
                        <p className="text-xs text-editorial-muted-fg">No topics in this module.</p>
                      </div>
                    ) : (
                      mod.items.map((item, itemIdx) => {
                        const hasSubtopics = item.subtopics && item.subtopics.length > 0;
                        const isTopicCollapsed = collapsedTopics[item.id] || false;
                        const activeSubCount =
                          item.selectedSubtopics !== undefined
                            ? item.selectedSubtopics.length
                            : (item.subtopics || []).length;

                        return (
                          <div
                            key={item.id}
                            className={`rounded-md transition-all ${
                              item.selected
                                ? 'bg-editorial-muted/40 border border-editorial-border'
                                : 'bg-editorial-muted/10 border border-editorial-border/40 opacity-50'
                            }`}
                          >
                            {/* Topic Main Row */}
                            <div className="p-2.5 flex items-start justify-between gap-2">
                              <div className="flex items-start space-x-2.5 flex-1 min-w-0">
                                {/* Topic Checkbox */}
                                <button
                                  type="button"
                                  onClick={() => handleToggleTopic(mod.id, item.id)}
                                  className="mt-0.5 text-editorial-muted-fg hover:text-editorial-accent transition-colors shrink-0"
                                >
                                  {item.selected ? (
                                    <CheckSquare className="w-4 h-4 text-editorial-accent" />
                                  ) : (
                                    <Square className="w-4 h-4 text-editorial-muted-fg/60" />
                                  )}
                                </button>

                                {/* Numbered Title */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-baseline space-x-1.5">
                                    <span className="text-xs font-mono font-semibold text-editorial-muted-fg">
                                      {itemIdx + 1}.
                                    </span>
                                    <span
                                      onClick={() => handleToggleTopic(mod.id, item.id)}
                                      className={`text-xs sm:text-sm cursor-pointer select-none transition-colors ${
                                        item.selected
                                          ? 'text-editorial-fg font-medium hover:text-editorial-accent'
                                          : 'text-editorial-muted-fg line-through'
                                      }`}
                                    >
                                      {item.title}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Subtopics Collapse Button & Delete Icon */}
                              <div className="flex items-center space-x-1 shrink-0">
                                {hasSubtopics && (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleCollapse(item.id)}
                                    className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-medium flex items-center space-x-0.5 transition-colors ${
                                      item.selected
                                        ? 'bg-editorial-card border border-editorial-border text-editorial-fg hover:border-editorial-accent'
                                        : 'bg-editorial-muted text-editorial-muted-fg'
                                    }`}
                                    title={isTopicCollapsed ? 'Expand subtopics' : 'Collapse subtopics'}
                                  >
                                    <span>
                                      {activeSubCount}/{item.subtopics!.length}
                                    </span>
                                    {isTopicCollapsed ? (
                                      <ChevronRight className="w-3 h-3 ml-0.5" />
                                    ) : (
                                      <ChevronDown className="w-3 h-3 ml-0.5" />
                                    )}
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleDeleteTopic(mod.id, item.id)}
                                  className="p-1 rounded text-editorial-muted-fg hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                                  title="Remove topic"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Nested Subtopics Tree (Editorial Arrow Style) */}
                            {hasSubtopics && !isTopicCollapsed && (
                              <div className="px-3 pb-2.5 pt-0.5 ml-5 border-l border-editorial-border space-y-1">
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {item.subtopics!.map((sub) => {
                                    const isSubActive =
                                      item.selected &&
                                      (item.selectedSubtopics === undefined
                                        ? true
                                        : item.selectedSubtopics.includes(sub));

                                    return (
                                      <button
                                        key={sub}
                                        type="button"
                                        onClick={() => handleToggleSubtopic(mod.id, item.id, sub)}
                                        className={`text-[11px] px-2 py-0.5 rounded font-sans border flex items-center space-x-1 transition-all ${
                                          isSubActive
                                            ? style.subtopicTagActive
                                            : style.subtopicTagInactive
                                        }`}
                                        title={isSubActive ? `Exclude "${sub}"` : `Include "${sub}"`}
                                      >
                                        <span className="opacity-70 text-[10px]">→</span>
                                        <span>{sub}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Module Footer: Add Topic Input */}
                  <div className="p-3 pt-0 mt-auto">
                    {isAddingTopic ? (
                      <div className="p-2 rounded bg-editorial-muted/40 border border-editorial-border space-y-2">
                        <input
                          type="text"
                          value={newTopicText}
                          onChange={(e) => setNewTopicText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddTopicToModule(mod.id);
                            if (e.key === 'Escape') setAddingTopicModuleId(null);
                          }}
                          placeholder="e.g. Slicing, or Topic, sub1, sub2..."
                          autoFocus
                          className="input-editorial w-full text-xs py-1.5"
                        />
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            type="button"
                            onClick={() => setAddingTopicModuleId(null)}
                            className="px-2.5 py-1 rounded text-xs text-editorial-muted-fg hover:text-editorial-fg"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddTopicToModule(mod.id)}
                            className="btn-primary-serif text-xs py-1 px-3"
                          >
                            Add Topic
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setAddingTopicModuleId(mod.id);
                          setNewTopicText('');
                        }}
                        className="w-full py-1.5 px-3 rounded border border-dashed border-editorial-border hover:border-editorial-accent bg-editorial-muted/30 text-editorial-muted-fg hover:text-editorial-fg text-xs font-medium flex items-center justify-center space-x-1.5 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5 text-editorial-accent" />
                        <span>Add Topic to {mod.title.split(':')[0]}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
