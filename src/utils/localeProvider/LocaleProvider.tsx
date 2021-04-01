import React from 'react';
import moment from 'moment';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import 'moment/locale/vi';
import vi from '../intl/vi.json';
import en from '../intl/en.json';
import { AppState } from '../../modules/rootReducer';
import { some } from '../../constants/constants';

moment.locale('vi');

const Locales = (props: some) => {
  const localeIntl = {
    locale: props.locale,
    messages: props.locale === 'en' ? en : vi,
  };
  moment.locale(props.locale);
  return <IntlProvider {...localeIntl}>{props.children}</IntlProvider>;
};

export default connect(
  (state: AppState) => ({
    locale: state.system.locale,
  }),
  null
)(Locales);
