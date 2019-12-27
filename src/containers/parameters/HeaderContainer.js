import React from 'react';
import HeaderBlock from '../../components/Blocks/Header'
import { connect } from 'react-redux';
import { getPeriod, changePeriod } from './index'

function HeaderContainer({
  dates,
  changePeriod,
}) {
  return (
    <HeaderBlock
      dates={dates}
      handleChange={changePeriod}
    />
  );
}

export default connect(
  state => ({
    dates: getPeriod(state)
  }),
  dispatch => ({
    changePeriod: (dates, period) => dispatch(changePeriod(dates, period))
  })
)(HeaderContainer)
