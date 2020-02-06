// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, PostsDocument } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Avatar from '../../components/Avatar'
import { PlaceholderRow } from '../../components/Placeholder'

function Posts() {
  const {
    data: { edges },
    isFetching,
  } = usePaginatedQuery(['posts'])(PostsDocument, {
    variables: {
      first: 20,
    },
  })

  const columns = [
    {
      Header: 'Caption',
      accessor: 'caption',
      minWidth: 350,
      Cell: ({ row }) => row.values.caption || 'No caption',
    },
    {
      Header: 'Project',
      accessor: 'project.title',
      minWidth: 200,
    },
    {
      Header: 'User',
      accessor: 'user',
      width: 215,
      Cell: ({ row }) => (
        <>
          <Avatar src={row.values.user.avatarUrl} size={25} />
          <span style={{ marginLeft: 5 }}>{row.values.user.fullName}</span>
        </>
      ),
    },
    {
      Header: 'Posted',
      accessor: 'createdAt',
      width: 195,
    },
    {
      Header: 'Actions',
      width: 95,
      Cell: ({ row }) => <span>katt</span>,
    },
  ]

  return (
    <Layout title="Posts">
      {isFetching ? (
        <PlaceholderRow />
      ) : (
        <Table columns={columns} data={edges.map(({ node }) => node)} />
      )}
    </Layout>
  )
}

export default Posts
