'use client';

import { useState } from 'react';
import { FILTERS, PROJECTS } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCategories, setVisibleCategories] = useState(
    Object.fromEntries(PROJECTS.map((project) => [project.id, true])),
  );

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    const nextVisibility = {};
    PROJECTS.forEach((project) => {
      nextVisibility[project.id] = filter === 'all' || project.category === filter;
    });
    setVisibleCategories(nextVisibility);
  };

  return (
    <>
      <div className="filter-bar reveal" role="tablist" aria-label="Filter projects">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter.id}
            className={`filter-btn${activeFilter === filter.id ? ' active' : ''}`}
            data-filter={filter.id}
            onClick={() => handleFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="project-grid-detailed">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="detailed"
            stagger={`stagger-${index + 1}`}
            className={visibleCategories[project.id] ? 'active' : ''}
            style={{ display: visibleCategories[project.id] ? 'flex' : 'none' }}
          />
        ))}
      </div>
    </>
  );
}
