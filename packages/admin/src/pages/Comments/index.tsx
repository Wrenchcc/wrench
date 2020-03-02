// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, RecentCommentsDocument } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Actions from '../../components/Actions'
import { PlaceholderRow } from '../../components/Placeholder'

function Comments() {
  const {
    data: { edges },
    isFetching,
  } = usePaginatedQuery(['comments'])(RecentCommentsDocument, {
    variables: {
      first: 20,
    },
  })

  const columns = [
    {
      Header: 'Text',
      accessor: 'text',
      minWidth: 350,
    },
    {
      Header: 'Username',
      accessor: 'user.username',
      minWidth: 200,
    },
    {
      Header: 'Replies',
      accessor: 'replies.totalCount',
      minWidth: 200,
    },
    {
      Header: 'Likes',
      accessor: 'likes.totalCount',
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
