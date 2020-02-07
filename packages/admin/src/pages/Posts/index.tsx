// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, PostsDocument } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Avatar from '../../components/Avatar'
import Actions from '../../components/Actions'
import EditPost from '../../components/EditPost'
import { PlaceholderRow } from '../../components/Placeholder'

function Posts() {
  const {
    data: { edges },
    isFetching,
    fetchMore,
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
      Cell: ({ row }) => <Actions component={<EditPost id={row.original.id} />} />,
    },
  ]

  return (
    <Layout title="Posts">
      {isFetching && !edges ? (
        <PlaceholderRow />
      ) : (
        <Table columns={columns} data={edges.map(({ node }) => node)} fetchMore={fetchMore} />
      )}
    </Layout>
  )
}

export default Posts
