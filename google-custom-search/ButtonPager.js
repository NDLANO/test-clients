/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';

import { stepNumbers } from './PagerUtil';

export default function ButtonPager(props) {
  const { page, lastPage, pagerAction } = props;
  const steps = stepNumbers(page, lastPage);

  const handleClickToPage = pageNumber => (evt) => {
    evt.preventDefault();
    pagerAction(pageNumber);
  };

  const pageLinks = steps.map((n) => {
    if (n === page) {
      return <span key={n} className="search-stepper_step search-stepper_step--active">{n}</span>;
    }
    return <button key={n} className="search-stepper_step" onClick={handleClickToPage(n)}>{n}</button>;
  });
  let prevPageLink = '';
  let nextPageLink = '';

  if (steps[0] < page) {
    prevPageLink = (
      <button className="search-stepper_step search-stepper_step--back" onClick={handleClickToPage(page - 1)} >
        {'<'}
      </button>
    );
  }

  if (page < lastPage) {
    nextPageLink = (
      <button className="search-stepper_step search-stepper_step--forward" onClick={handleClickToPage(page + 1)} >
        {'>'}
      </button>
    );
  }

  return (
    <div className="search-stepper">
      {prevPageLink}
      {pageLinks}
      {nextPageLink}
    </div>
  );
}

ButtonPager.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  pagerAction: PropTypes.func.isRequired,
};
