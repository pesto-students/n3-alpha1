/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
// import { Button } from 'design-system';
import React, { useEffect, useState } from 'react';

import { useAppSelector } from 'hooks/useRedux';
import Select from '../../common/form/select/Select';
import FiltersBG from '../../../assets/images/filters-bg@2x.png';
import './filters.scss';

const Filters = (props: {
  // todo: auto-width dropdowns
  // todo: auto-width menulist with max-width
  // todo: hover, selected, mouseleave states of option
  // todo: fix blue outline on select
  // todo: end to end horizontal scrolling
  onFiltersChange: (filters: {
    gender: { value: string };
    clothing: { value: string };
    size: { value: string };
    brand: { value: string };
  }) => void;
}) => {
  const settings = useAppSelector((state) => state.settings);
  const clothingOptions = settings?.listData?.clothingCategory || [];
  const genderOptions = settings?.listData?.gender || [];
  const sizeOptions = settings?.listData?.size || [];
  const brandOptions = settings?.listData?.brand || [];

  const [filters, setFilters] = useState({
    clothing: clothingOptions[0],
    gender: genderOptions[0],
    size: sizeOptions[0],
    brand: brandOptions[0],
  });

  const onselectionchange = (obj: any, action: any) => {
    const updatedFilters = {
      ...filters,
      [action.name]: obj,
    };
    setFilters(updatedFilters);
    props.onFiltersChange(updatedFilters);
  };

  useEffect(() => {
    setFilters({
      clothing: clothingOptions[0],
      gender: genderOptions[0],
      size: sizeOptions[0],
      brand: brandOptions[0],
    });
  }, [clothingOptions, genderOptions, sizeOptions, brandOptions]);

  return (
    <div className="rf-filters">
      <div className="rf-filters-main">
        <img alt="" src={FiltersBG} className="rf-filters-bg" />
        <div className="rf-filters-inner">
          <div className="rf-filter-item">
            <span className="rf-opacity-40">Show me</span>
            <Select
              variant="tertiary"
              theme="light"
              menuPortalTarget={document.body}
              defaultValue={clothingOptions[0]}
              value={filters.clothing}
              onChange={onselectionchange}
              name="clothing"
              options={clothingOptions}
            />
          </div>
          <div className="rf-filter-item">
            <span className="rf-opacity-40">For</span>
            <Select
              variant="tertiary"
              theme="light"
              menuPortalTarget={document.body}
              defaultValue={genderOptions[1]}
              value={filters.gender}
              onChange={onselectionchange}
              name="gender"
              options={genderOptions}
            />
          </div>
          <div className="rf-filter-item">
            <span className="rf-opacity-40">From</span>
            <Select
              variant="tertiary"
              theme="light"
              menuPortalTarget={document.body}
              defaultValue={brandOptions[0]}
              value={filters.brand}
              onChange={onselectionchange}
              name="brand"
              options={brandOptions}
            />
          </div>
          <div className="rf-filter-item">
            <span className="rf-opacity-40">Of size</span>
            <Select
              variant="tertiary"
              theme="light"
              menuPortalTarget={document.body}
              defaultValue={sizeOptions[0]}
              value={filters.size}
              onChange={onselectionchange}
              name="size"
              options={sizeOptions}
            />
          </div>
        </div>
        {/* the summary and actions only renders on mobile */}
        {/* <div className="rf-filters-actions">
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
        </div> */}
      </div>

      {/* the sort bar only renders on desktop */}
      <div className="rf-filters-sort-bar">
        <p className="rf-text-sm rf-opacity-40" style={{ marginBottom: 0 }}>
          56 Results
        </p>
        {/* <div className="rf-filter-item rf-text-sm" style={{ marginRight: '0' }}>
          <span className="rf-opacity-40">SORT BY:</span>
          <select>
            <option>PRICE - HIGH TO LOW</option>
          </select>
        </div> */}
      </div>
    </div>
  );
};

export default Filters;
