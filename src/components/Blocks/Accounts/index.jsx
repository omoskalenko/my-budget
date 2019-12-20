import React from 'react'
import { Card, Icon } from 'antd';

export default function Accounts({
  data
}) {
  return (
    <Card
    style={{ width: 300 }}
    actions={[
      <Icon type="setting" key="setting" />,
      <Icon type="edit" key="edit" />,
      <Icon type="ellipsis" key="ellipsis" />,
    ]}
  >
    {data}
  </Card>
  )
}
