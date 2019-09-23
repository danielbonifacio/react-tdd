import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { fetchProposal } from '../../Store/ProposalList'
import renderTags from './renderTags'

const ProposalList = ({ proposals, fetchProposal }) => {
  const columns = [
    {
      title:     'Nome',
      dataIndex: 'name',
      key:       'name',
      width:     '10%',
    },
    {
      title:     'CPF',
      dataIndex: 'cpf',
      key:       'cpf',
      width:     '10%',
    },
    {
      title:     'Idade',
      dataIndex: 'age',
      key:       'age',
      width:     '10%'
    },
    {
      title:     'Endereço',
      dataIndex: 'address',
      key:       'address',
      width:     '10%'
    },
    {
      title:     'Profissão',
      dataIndex: 'profession',
      key:       'profession',
      width:     '10%'
    },
    {
      title:     'Status',
      dataIndex: 'status',
      key:       'status',
      width:     '10%',
    },
    {
      title:     'Data Início',
      dataIndex: 'initialDate',
      key:       'initialDate',
      width:     '10%'
    },
    {
      title:     'Data Fim',
      dataIndex: 'endDate',
      key:       'endDate',
      width:     '10%'
    },
    {
      title:     'Flags',
      dataIndex: 'flags',
      key:       'flags',
      width:     '10%',
      render:    renderTags
    }
  ]

  useEffect(fetchProposal, [])

  return (
    <Table size="small"
      data-testid="table"
      columns={columns}
      dataSource={proposals}
    />
  )
}

const mapStateToProps = state => ({
  proposals: state.ProposalTable
})

export default connect(mapStateToProps, { fetchProposal })(ProposalList)
