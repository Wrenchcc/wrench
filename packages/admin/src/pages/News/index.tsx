// @ts-nocheck
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { usePaginatedQuery, BlogPostsDocument, useDeleteBlogPostMutation } from '@wrench/common'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Actions from '../../components/Actions'
import Avatar from '../../components/Avatar'
import { PlaceholderRow } from '../../components/Placeholder'

const Header = styled.div`
  position: absolute;
  top: 0;
  right: 20px;
`

const NewPost = styled(Link)`
  height: 40px;
  background: black;
  color: white;
  border: none;
  padding: 0 50px;
  margin-left: 20px;
  display: block;
  line-height: 40px;
`

function News() {
  const {
    data: { edges },
    isFetching,
    hasNextPage
  } = usePaginatedQuery(['blogPosts'])(BlogPostsDocument, {
    variables: {
      first: 20,
    },
  })

  const [deletePost] = useDeleteBlogPostMutation()

  const handleDeletePost = (id) => {
    deletePost({
      variables: {
        id
      },
      update(cache) {
        cache.modify({
          fields: {
            blogPosts(existingPostsRefs = {}, { readField }) {
              return {
                ...existingPostsRefs,
                edges: existingPostsRefs.edges.filter(
                  ({ node }) => id !== readField('id', node)
                ),
              }
            },
          },
        })
      }
    })
  }

  const columns = [
    {
      Header: 'Title',
      accessor: 'title',
      minWidth: 415,
      Cell: ({ row }) => (
        <Link to={`/news/edit/${row.original.id}`}>
          <span>{row.values.title}</span>
        </Link>
      ),
    },
    {
      Header: 'Author',
      accessor: 'user',
      minWidth: 350,
      Cell: ({ row }) => (
        <>
          <Avatar src={row.values.user.avatarUrl} size={25} />
          <span style={{ marginLeft: 10 }}>{row.values.user.fullName}</span>
        </>
      ),
    },
    {
      Header: 'Link',
      accessor: 'slug',
      minWidth: 200,
      Cell: ({ row }) => <a href={`https://wrench.cc/blog/${row.values.slug}`}>{row.values.slug}</a>,
    },
    {
      Header: 'Actions',
      width: 95,
      accessor: 'fullName',
      Cell: ({ row }) => <Actions disableEdit onDelete={(d) => handleDeletePost(row.original.id)} />,
    },
  ]
  return (
    <Layout title="News">
      <Header>
        <NewPost to="/news/edit">New post</NewPost>
      </Header>
      {isFetching ? (
        <PlaceholderRow />
      ) : (
        edges && <Table columns={columns} data={edges.map(({ node }) => node)} hasMore={hasNextPage} />
      )}
    </Layout>
  )
}

export default News
