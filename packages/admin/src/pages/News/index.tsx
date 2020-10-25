// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, BlogPostsDocument } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Actions from '../../components/Actions'
import Avatar from '../../components/Avatar'
import EditUser from '../../components/EditUser'
import { PlaceholderRow } from '../../components/Placeholder'

function Comments() {
  const {
    data: { edges },
    isFetching,
  } = usePaginatedQuery(['blogPosts'])(BlogPostsDocument, {
    variables: {
      first: 20,
    },
  })

  const columns = [
    {
      Header: 'Title',
      accessor: 'username',
      minWidth: 415,
    },
    {
      Header: 'Author',
      accessor: 'avatarUrl',
      minWidth: 350,
      Cell: ({ row }) => (
        <>
          <Avatar src={row.values.avatarUrl} size={25} />
          <span style={{ marginLeft: 10 }}>{row.values.fullName}</span>
        </>
      ),
    },
    {
      Header: 'Link',
      accessor: 'dynamicLink',
      minWidth: 200,
      Cell: ({ row }) => <a href={row.values.dynamicLink}>{row.values.dynamicLink}</a>,
    },
    {
      Header: 'Actions',
      width: 95,
      accessor: 'fullName',
      Cell: ({ row }) => <Actions component={<EditUser username={row.values.username} />} />,
    },
  ]
  return (
    <Layout title="News">
      {isFetching ? (
        <PlaceholderRow />
      ) : (
        edges && <Table columns={columns} data={edges.map(({ node }) => node)} />
      )}
    </Layout>
  )
}

export default Comments
