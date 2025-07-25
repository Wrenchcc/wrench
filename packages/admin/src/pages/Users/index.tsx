// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, SearchUsersDocument, useBanUserMutation } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Avatar from '../../components/Avatar'
import Actions from '../../components/Actions'
import EditUser from '../../components/EditUser'
import { PlaceholderRow } from '../../components/Placeholder'

function Users() {
  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['users'])(SearchUsersDocument, {
    variables: {
      first: 20,
      query: '',
    },
  })

  const [banUser] = useBanUserMutation()

  const columns = [
    {
      Header: 'Name',
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
      accessor: 'fullName',
      Cell: ({ row }) => <Actions component={<EditUser username={row.values.username} />} onDelete={() => {
        try {
          banUser({
            variables: {
              id: row.original.id,
            }
          })
      } catch(err) {
        console.log(err)
      }
      }} />,
    },
  ]

  return (
    <Layout title="Users">
      {isFetching && !edges ? (
        <PlaceholderRow />
      ) : (
        <Table columns={columns} data={edges.map(({ node }) => node)} fetchMore={fetchMore} hasMore={hasNextPage} />
      )}
    </Layout>
  )
}

export default Users
