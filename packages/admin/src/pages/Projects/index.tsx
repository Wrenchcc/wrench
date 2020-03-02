// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Avatar from '../../components/Avatar'
import Actions from '../../components/Actions'
import EditProject from '../../components/EditProject'
import { PlaceholderRow } from '../../components/Placeholder'

function Projects() {
  const {
    data: { edges },
    isFetching,
    fetchMore,
  } = usePaginatedQuery(['projects'])(ProjectsDocument, {
    variables: {
      first: 20,
      type: 'RECENT',
    },
  })

  const columns = [
    {
      Header: 'Title',
      accessor: 'title',
      minWidth: 350,
    },
    {
      Header: 'Slug',
      accessor: 'slug',
      minWidth: 200,
    },
    {
      Header: 'User',
      accessor: 'user',
      width: 215,
      Cell: ({ row }) => (
        <>
          <Avatar src={row.values.user.avatarUrl} size={25} />
          <span style={{ marginLeft: 10 }}>{row.values.user.fullName}</span>
        </>
      ),
    },
    {
      Header: 'Followers',
      accessor: 'followers.totalCount',
      width: 195,
    },
    {
      Header: 'Actions',
      width: 95,
      Cell: ({ row }) => <Actions component={<EditProject />} id={row.original.id} />,
    },
  ]

  return (
    <Layout title="Projects">
      {isFetching && !edges ? (
        <PlaceholderRow />
      ) : (
        <Table columns={columns} data={edges.map(({ node }) => node)} fetchMore={fetchMore} />
      )}
    </Layout>
  )
}

export default Projects
