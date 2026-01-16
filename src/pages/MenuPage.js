import React, { useState, useMemo } from 'react';
import { Header, HeroSection, Sidebar, DishCard, DishDetailModal, Icon } from '../components';
import { DISHES_DATA, QUICK_FILTERS, FILTER_OPTIONS } from '../data';

export default function MenuPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [quickFilter, setQuickFilter] = useState('');
    const [sidebarFilters, setSidebarFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);

    // Event handlers for modal
    const openModal = (dish) => {
        setSelectedDish(dish);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Delay clearing the selected dish to allow any exit animation to run
        setTimeout(() => setSelectedDish(null), 300); 
    };

    // Filter Handlers
    const handleFilterChange = (filterGroupTitle, filterValue, isChecked) => {
        setSidebarFilters(prevFilters => {
            const currentGroupFilters = prevFilters[filterGroupTitle] || [];
            if (isChecked) {
                return { ...prevFilters, [filterGroupTitle]: [...currentGroupFilters, filterValue] };
            } else {
                return { ...prevFilters, [filterGroupTitle]: currentGroupFilters.filter(val => val !== filterValue) };
            }
        });
    };

    const handleClearAll = () => {
        setSidebarFilters({});
        setAppliedFilters({});
        setSearchTerm('');
        setQuickFilter('');
    };
    
    // Apply filters from sidebar state to the applied state
    const handleApplyFilters = () => {
        setAppliedFilters(sidebarFilters);
    };

    const handleRemoveTag = (groupTitle, tagValue) => {
        if (groupTitle === 'Quick') {
            setQuickFilter('');
        } else {
             setAppliedFilters(prevFilters => {
                const newFilters = { ...prevFilters };
                newFilters[groupTitle] = newFilters[groupTitle].filter(val => val !== tagValue);
                
                setSidebarFilters(newFilters);
                return newFilters;
            });
        }
    };

    // Memoized Filtering Logic
    const filteredDishes = useMemo(() => {
        let tempDishes = DISHES_DATA;

        const allAppliedFilters = { ...appliedFilters };

        // 1. Apply Search Term
        if (searchTerm) {
            const termLower = searchTerm.toLowerCase();
            tempDishes = tempDishes.filter(dish =>
                dish.title.toLowerCase().includes(termLower) ||
                dish.description.toLowerCase().includes(termLower) ||
                dish.tags.some(tag => tag.toLowerCase().includes(termLower))
            );
        }

        // 2. Apply Quick Filter
        if (quickFilter) {
            tempDishes = tempDishes.filter(dish =>
                dish.tags.some(tag => tag.toLowerCase() === quickFilter)
            );
        }

        // 3. Apply Sidebar Filters
        Object.values(allAppliedFilters).forEach(activeFilters => {
            if (activeFilters && activeFilters.length > 0) {
                tempDishes = tempDishes.filter(dish =>
                    activeFilters.some(filter => dish.tags.includes(filter))
                );
            }
        });

        return tempDishes;
    }, [searchTerm, quickFilter, appliedFilters]);

    // Group filtered dishes by category for display
    const groupedFilteredDishes = useMemo(() => {
        const grouped = {};
        filteredDishes.forEach(dish => {
            const categoryKey = dish.category || 'all';
            if (!grouped[categoryKey]) grouped[categoryKey] = [];
            grouped[categoryKey].push(dish);
        });
        return grouped;
    }, [filteredDishes]);

    // Get a list of currently active filter tags for display
    const activeTags = useMemo(() => {
        const tags = [];
        Object.entries(appliedFilters).forEach(([groupTitle, values]) => {
            values.forEach(value => {
                const label = FILTER_OPTIONS.flatMap(g => g.options).find(o => o.value === value)?.label || value;
                tags.push({ groupTitle, value, label });
            });
        });
        if (quickFilter) {
             const label = QUICK_FILTERS.find(q => q.value === quickFilter)?.label || quickFilter;
             if (!tags.some(t => t.value === quickFilter)) {
                tags.unshift({ groupTitle: 'Quick', value: quickFilter, label });
             }
        }
        return tags;
    }, [appliedFilters, quickFilter]);


    return (
        <div className="app-container">
            <Header />
            <main>
                <HeroSection />

                {/* Search and Quick Filters */}
                <section className="search-filter-area">
                    <div className="search-bar-wrapper">
                        <Icon name="Search" className="search-icon-lg" />
                        <input
                            type="text"
                            placeholder="Search dishes, ingredients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                <Icon name="X" />
                            </button>
                        )}
                        <button className="search-btn">Search</button>
                    </div>

                    <div className="quick-filters">
                        {QUICK_FILTERS.map(filter => (
                            <button
                                key={filter.value}
                                className={`quick-filter-btn ${quickFilter === filter.value ? 'active' : ''}`}
                                onClick={() => setQuickFilter(quickFilter === filter.value ? '' : filter.value)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {activeTags.length > 0 && (
                        <div className="active-filter-tags">
                            <span>Active Filters:</span>
                            {activeTags.map(tag => (
                                <div key={tag.value} className="active-tag-chip">
                                    {tag.label}
                                    <button onClick={() => {
                                        if (tag.groupTitle === 'Quick') setQuickFilter('');
                                        else handleRemoveTag(tag.groupTitle, tag.value);
                                    }}>
                                        <Icon name="X" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                

                <div className="content-area">
                    <Sidebar
                        selectedFilters={sidebarFilters} 
                        onFilterChange={handleFilterChange}
                        clearFilters={handleClearAll}
                        applyFilters={handleApplyFilters}
                    />
                    <section className="menu-listing">
                        {Object.keys(groupedFilteredDishes).length > 0 ? (
                            Object.entries(groupedFilteredDishes).map(([category, dishes]) => (
                                <div className="dish-category" key={category}>
                                    <h2>{category.charAt(0).toUpperCase() + category.slice(1)} ({dishes.length})</h2>
                                    <div className="dish-cards-grid">
                                        {dishes.map((dish) => (
                                            <DishCard 
                                                key={dish.id} 
                                                dish={dish} 
                                                onCardClick={openModal} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <Icon name="Search" />
                                <h3>No Dishes Found</h3>
                                <p>Try broadening your search or adjusting your filters.</p>
                            </div>
                        )}
                    </section>
                </div>
            </main>
            
            {/* Modal Rendering */}
            {isModalOpen && (
                <DishDetailModal 
                    dish={selectedDish} 
                    onClose={closeModal} 
                />
            )}

        </div>
    );
}
