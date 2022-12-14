import React from 'react';
import { useSelector } from 'react-redux';
import { MainPageLayout } from '../components';
import { loadMails } from '../store/reducers/contact';

const Contact = () => {
  const mails = useSelector(state => state.mails.mails);
  const token = useSelector(state => state.auth.token);
  return (
    <MainPageLayout
      path='contact'
      data={mails}
      route='contactus'
      deleteTitle='Mail'
      action={loadMails(token)}
      // title='Active Mails'
    />
  );
};

export default Contact;
