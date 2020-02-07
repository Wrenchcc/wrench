// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, CommentsDocument } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Actions from '../../components/Actions'
import { PlaceholderRow } from '../../components/Placeholder'

// TODO
function Comments() {
  const {
    data: { edges },
    isFetching,
  } = usePaginatedQuery(['comments'])(CommentsDocument, {
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
    },
    {
      Header: 'Projects',
      accessor: 'projectCount',
      width: 215,
    },
    {
      Header: 'Actions',
      width: 95,
      Cell: ({ row }) => <Actions />,
    },
  ]

  return (
    <Layout title="Comments">
      {isFetching ? (
        <PlaceholderRow />
      ) : (
        edges && <Table columns={columns} data={edges.map(({ node }) => node)} />
      )}
    </Layout>
  )
}

export default Comments
