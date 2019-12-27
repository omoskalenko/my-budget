import React from 'react';
import { Empty } from 'antd';
import Error from '../../components/Common/Error'

const isEmpty = (data, renderFunc) => {
  try {
    if (data.length === 0) return <Empty />
    else return data.map(renderFunc)
  } catch(error) {
    return <Error error={error}/>
  }

}

export default isEmpty;
