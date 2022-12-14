import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Chart, ReportsTable } from '..';
import {
  loadMostCustomers,
  loadMostSelling,
} from '../../store/reducers/reports';
import './ReportsLayout.css';

const ReportsLayout = (props) => {
  // dispatch to fetch here
  const { t } = useTranslation();
  const mostSelling = useSelector((state) => state.reports.mostSelling);
  const mostCustomers = useSelector((state) => state.reports.mostCustomer);
  const token = useSelector((state) => state.auth.token);
  const [path, setPath] = useState('products');
  const [income, setIncome] = useState('');
  const [data, setData] = useState(mostSelling);
  const range = props.range ? props.range : null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMostSelling({ params: { asce: -1 }, data: range, token }));
    dispatch(loadMostCustomers({ params: { asce: -1 }, data: range, token }));
  }, [dispatch, range, token]);

  useEffect(() => {
    setData(mostSelling);
  }, [mostSelling]);

  const setMostSellingHandler = (e, path) => {
    setPath(path);
    setData(mostSelling);
  };
  const setMostCustomerHandler = (e, path) => {
    setPath(path);
    setData(mostCustomers);
  };

  useEffect(() => {
    if (path === 'products') {
      const totalCount = data
        .map((p) => p.count)
        .reduce((acc, current) => acc + current, 0);
      setIncome(totalCount);
    }
    if (path === 'customers') {
      const totalCount = data
        .map((p) => p.totalAmount)
        .reduce((acc, current) => acc + current, 0);
      setIncome(totalCount);
    }
  }, [data, path]);

  return (
    <Container fluid>
      <Row className="reports__main">
        {/* {props.title && <h2 className='reports__title'>September Reports</h2>} */}
        <Col sm={4} className="report">
          <div
            className="reports__report"
            style={{
              cursor: 'pointer',
            }}
            onClick={(e) => {
              setMostSellingHandler(e, 'products');
            }}
          >
            <h3 className="reports__report-title">{t('bestProducts')}</h3>
            <p className="reports__report-info">
              {!mostSelling && 'nothing yet'}
              {mostSelling &&
                mostSelling[0] &&
                mostSelling[0].name &&
                mostSelling[0].name.english}
            </p>
          </div>
        </Col>
        <Col sm={4} className="report">
          <div
            className="reports__report"
            style={{
              cursor: 'pointer',
            }}
            onClick={(e) => setMostCustomerHandler(e, 'customers')}
          >
            <h3 className="reports__report-title">{t('bestCustomer')}</h3>
            <p className="reports__report-info">
              {/* {mostCustomers[0].firstName} */}
              {!mostCustomers && 'nothing yet'}
              {mostCustomers &&
                mostCustomers[0] &&
                `${mostCustomers[0].firstName} ${mostCustomers[0].lastName}`}
            </p>
          </div>
        </Col>
        <Col sm={4} className="report">
          <div className="reports__report">
            <h3 className="reports__report-title">{t('income')}</h3>
            <p className="reports__report-info">
              {path === 'customers' ? `${t('currency')} ${income}` : income}
            </p>
          </div>
        </Col>
      </Row>
      
      <Row className="px-5">
        <Col sm={9} className="reports__table">
          <ReportsTable token={props.token} path={path} data={data} />
        </Col>
        <Col sm={3}>
          <Chart data={data} path={path} />
        </Col>
      </Row>
    </Container>
  );
};

export default ReportsLayout;
