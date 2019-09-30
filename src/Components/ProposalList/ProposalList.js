import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'
import { fetchProposal } from '../../Store/ProposalList'
import renderTags from './renderTags'
import Table from './ProposalTable'

export class ProposalList extends Component {
  columns = [
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

  state = {
    search: ''
  }

  componentDidMount() {
    this.props.fetchProposal()
  }

  handleTableChange = () => {
    const test = 'test'
    return test
  }

  handleChange = e => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return (
      <>
        <Input
          data-testid="input-search"
          placeholder={"Pesquisar"}
          onChange={this.handleChange}
          value={this.state.search}
        />
        <Table size="small"
          data-testid="table"
          columns={this.columns}
          dataSource={this.props.proposals}
          onChange={this.handleTableChange}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  proposals: state.ProposalTable
})

export default connect(mapStateToProps, { fetchProposal })(ProposalList)
