/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Button } from 'design-system';
import React, { useState } from 'react';
import FiltersBG from '../../assets/images/filters-bg@2x.png';

const Filters = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [filters, setFilters] = useState({});
  const resetFilters = () => null;
  const applyFilters = () => null;
  return (
    <div className="rf-filters">
      <div className="rf-filters-main">
        <img alt="" src={FiltersBG} className="rf-filters-bg" />
        <div className="rf-filters-inner">
          <div className="rf-filter-item">
            <span>Show me</span>
            <select>
              <option>All clothing</option>
            </select>
          </div>
          <div className="rf-filter-item">
            <span>For</span>
            <select>
              <option>Men</option>
            </select>
          </div>
          <div className="rf-filter-item">
            <span>From</span>
            <select>
              <option>Versace</option>
            </select>
          </div>
          <div className="rf-filter-item">
            <span>Of size</span>
            <select>
              <option>Any</option>
            </select>
          </div>
        </div>
        {/* the summary and actions only renders on mobile */}
        <div className="rf-filters-actions">
          <Button variant="secondary" theme="light" onClick={resetFilters}>
            Reset
          </Button>
          <Button variant="secondary" theme="light" onClick={applyFilters}>
            Apply
          </Button>
        </div>
        <div className="rf-filters-summary">
          <p>56 Results</p>
          <div className="rf-filter-trigger">
            {isOpen ? (
              <div role="button" onClick={() => setIsOpen(false)}>
                CLOSE
              </div>
            ) : (
              <div role="button" onClick={() => setIsOpen(true)}>
                FILTER &amp; SORT
              </div>
            )}
          </div>
        </div>
      </div>

      {/* the sort bar only renders on desktop */}
      <div className="rf-filters-sort-bar">
        <p>56 Results</p>
        <div className="rf-filter-item">
          <span>SORT BY:</span>
          <select>
            <option>PRICE - HIGH TO LOW</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
