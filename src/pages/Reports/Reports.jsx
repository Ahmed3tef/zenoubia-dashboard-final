import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { ReportsDates, ReportsLayout } from '../../components';

const Reports = () => {
  // const [filteredData, setFilteredData] = useState(null);
  // const [action, setAction] = useState(null);
  const [range, setRange] = useState(null);
  return (
    <Container fluid>
      <ReportsDates setRange={setRange} />
      <ReportsLayout range={range} />
    </Container>
  );
};

export default Reports;
