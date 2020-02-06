// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, SearchUsersDocument } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import { PlaceholderRow } from '../../components/Placeholder'

function Users() {
  const {
    data: { edges },
    isFetching,
  } = usePaginatedQuery(['users'])(SearchUsersDocument, {
    variables: {
      first: 20,
      query: '',
    },
  })

  const columns = [
    {
      Header: 'Name',
      accessor: 'fullName',
      minWidth: 350,
    },
    {
      Header: 'Username',
      accessor: 'username',
      minWidth: 200,
    },
    {
      Header: 'Link',
      accessor: 'dynamicLink',
      minWidth: 200,
      Cell: ({ row }) => <a href={row.values.dynamicLink}>{row.values.dynamicLink}</a>,
    },

    {
      Header: 'Projects',
      accessor: 'projectCount',
      width: 215,
    },
    {
      Header: 'Actions',
      width: 95,
      Cell: () => <span>katt</span>,
    },
  ]

  return (
    <Layout title="Users">
      {isFetching ? (
        <PlaceholderRow />
      ) : (
        <Table columns={columns} data={edges.map(({ node }) => node)} />
      )}
    </Layout>
  )
}

export default Users
