// @ts-nocheck
import React from 'react'
import { usePaginatedQuery, RecentCommentsDocument, useDeleteCommentMutation } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Actions from '../../components/Actions'
import { PlaceholderRow } from '../../components/Placeholder'

function Comments() {
  const {
    data: { edges },
    isFetching,
    hasNextPage,
  } = usePaginatedQuery(['comments'])(RecentCommentsDocument, {
    variables: {
      first: 20,
    },
  })

  const [handleDelete] = useDeleteCommentMutation()

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
      Cell: ({ row }) => {
        const id = row.original.id
        return (
          <Actions
            id={id}
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
                        query: RecentCommentsDocument,
                        variables: {
                          first: 20,
                        },
                      })

                      const edges = data.comments.edges.filter(edge => edge.node.id !== id)

                      cache.writeQuery({
                        query: RecentCommentsDocument,
                        variables: {
                          first: 20,
                        },
                        data: {
                          ...data,
                          comments: {
                            ...data.comments,
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
    <Layout title="Comments">
      {isFetching ? (
        <PlaceholderRow />
      ) : (
        edges && <Table columns={columns} data={edges.map(({ node }) => node)} hasMore={hasNextPage} />
      )}
    </Layout>
  )
}

export default Comments
