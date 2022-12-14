import React, { useEffect, useState } from 'react';

import { DatePick } from '..';

import './ReportsLayout.css';
import { BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
const ReportsDates = props => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const date = new Date();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  useEffect(() => {
    setStartDate(firstDayOfMonth);
    setEndDate(lastDayOfMonth);
  }, []);

  const searchHandler = e => {
    props.setRange({
      from: startDate ? startDate.toISOString() : null,
      to: endDate ? endDate.toISOString() : null,
    });
  };

  return (
    <div className='reports-dates'>
      <DatePick
        value={startDate}
        setValue={setStartDate}
        label={t('startDate')}
      />
      <DatePick value={endDate} setValue={setEndDate} label={t('endDate')} />
      <div className='reports-search' onClick={searchHandler}>
        <BsSearch />
      </div>
    </div>
  );
};

export default ReportsDates;
