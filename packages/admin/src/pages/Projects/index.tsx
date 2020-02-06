// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import { PlaceholderRow } from '../../components/Placeholder'

function Projects() {
  const {
    data: { edges },
    isFetching,
  } = usePaginatedQuery(['projects'])(ProjectsDocument, {
    variables: {
      first: 20,
      type: 'POPULAR',
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
      accessor: 'user.fullName',
      width: 215,
    },
    {
      Header: 'Followers',
      accessor: 'followers.totalCount',
      width: 195,
    },
    {
      Header: 'Actions',
      width: 95,
      Cell: ({ row }) => <span>katt</span>,
    },
  ]

  return (
    <Layout title="Projects">
      {isFetching ? (
        <PlaceholderRow />
      ) : (
        <Table columns={columns} data={edges.map(({ node }) => node)} />
      )}
    </Layout>
  )
}

export default Projects
