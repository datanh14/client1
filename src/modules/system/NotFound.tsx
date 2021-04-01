import React from 'react';
import { Typography } from '@material-ui/core';
import Helmet from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { ReactComponent as NotFoundIcon } from '../../assets/icons/ic_notFound.svg';

interface Props {}
const NotFound: React.FC<Props> = (props) => {
  const intl = useIntl();
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'IDS_NOT_FOUND' })}</title>
      </Helmet>
      <div style={{ margin: '20px auto', width: '570px' }}>
        <Typography variant="h4">404</Typography>
        <Typography color="textSecondary">
          <FormattedMessage id="IDS_NOT_FOUND" />
        </Typography>
        <br />
        <NotFoundIcon />
      </div>
    </>
  );
};

export default NotFound;
