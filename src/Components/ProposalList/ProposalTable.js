import React from 'react'
import { Table } from 'antd'

const ProposalTable = ({ columns, proposals, onChange }) => (
  <Table size="small"
    data-testid="table"
    columns={columns}
    dataSource={proposals}
    onChange={onChange}
  />
)

export default ProposalTable
