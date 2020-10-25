// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, useDeletePostMutation, PostsDocument } from '@wrench/common'
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
    hasNextPage,
  } = usePaginatedQuery(['posts'])(PostsDocument, {
    variables: {
      first: 20,
    },
  })

  const [handleDelete] = useDeletePostMutation()

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
          <span style={{ marginLeft: 10 }}>{row.values.user.fullName}</span>
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
      Cell: ({ row }) => {
        const id = row.original.id
        return (
          <Actions
            component={<EditPost id={id} />}
            onDelete={() => {
              const accepted = window.confirm('Delete')

              if (accepted) {
                handleDelete({
                  variables: {
                    id,
                  },
                  update: cache => {
                    try {
                      const data = cache.readQuery({
                        query: PostsDocument,
                        variables: {
                          first: 20,
                        },
                      })

                      const edges = data.posts.edges.filter(edge => edge.node.id !== id)

                      cache.writeQuery({
                        query: PostsDocument,
                        variables: {
                          first: 20,
                        },
                        data: {
                          ...data,
                          posts: {
                            ...data.posts,
                            edges,
                          },
                        },
                      })
                    } catch {
                      // Swollow error when no post is found
                    }
                  },
                })
              }
            }}
          />
        )
      },
    },
  ]

  return (
    <Layout title="Posts">
      {isFetching && !edges ? (
        <PlaceholderRow />
      ) : (
        <Table columns={columns} data={edges.map(({ node }) => node)} fetchMore={fetchMore} hasMore={hasNextPage} />
      )}
    </Layout>
  )
}

export default Posts
