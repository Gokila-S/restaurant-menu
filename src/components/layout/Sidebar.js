import React, { useState } from 'react';
import Icon from '../common/Icon';
import { FILTER_OPTIONS } from '../../data/dishes';

const FilterGroup = ({ title, options, selectedFilters, onFilterChange, iconName }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="filter-group">
            <h3 className={isCollapsed ? 'collapsed' : ''} onClick={() => setIsCollapsed(!isCollapsed)}>
                <Icon name={iconName} className="filter-icon" />
                {title} <span className="toggle-arrow">{isCollapsed ? '►' : '▼'}</span>
            </h3>
            <div className={`filter-options ${isCollapsed ? 'collapsed' : ''}`}>
                {options.map(option => (
                    <label key={option.value} className="custom-checkbox-label">
                        <input
                            type="checkbox"
                            value={option.value}
                            checked={selectedFilters.includes(option.value)}
                            onChange={(e) => onFilterChange(title, option.value, e.target.checked)}
                        />
                        <span className="custom-checkbox"></span>
                        {option.label}
                        {option.count && <span className="count-badge">+{option.count}</span>}
                    </label>
                ))}
            </div>
        </div>
    );
};

const Sidebar = ({ selectedFilters, onFilterChange, clearFilters, applyFilters }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-content">
                <div className="sidebar-header">
                    <h4>Filter Menu</h4>
                    <button className="clear-all-btn" onClick={clearFilters}><Icon name="X" />Clear All</button>
                </div>

                {FILTER_OPTIONS.map(group => (
                    <FilterGroup
                        key={group.title}
                        title={group.title}
                        iconName={group.icon}
                        options={group.options}
                        selectedFilters={selectedFilters[group.title] || []}
                        onFilterChange={onFilterChange}
                    />
                ))}
            </div>

            <div className="sidebar-footer">
                <button className="apply-filters-btn" onClick={applyFilters}>Apply Filters</button>
            </div>
        </aside>
    );
};

export default Sidebar;
