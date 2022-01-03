import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { usePaginatedQuery, UserDocument, useDeleteUserMutation } from '@wrench/common'
import Layout from '../../components/Layout'
import Avatar from '../../components/Avatar'

const Footer = styled.div`
  width: 100%;
  margin-top: 100px;
`

const Delete = styled.button`
  background: black;
  border: 0;
  color: white;
  padding: 10px 20px;
`

function User() {
  const { username } = useParams()
  const history = useHistory()
  const [onDelete] = useDeleteUserMutation()

  const {
    data: { user },
  } = usePaginatedQuery(['user', 'posts'])(UserDocument, {
    variables: {
      username,
    },
  })

  const handleDelete = () => {
    var result = confirm('Are you sure?')

    if (result) {
      onDelete(user.id)

      history.push('/')
    }
  }

  if (!user) {
    return null
  }

  return (
    <Layout title={user.fullName}>
      <Avatar size={80} src={user.avatarUrl} />
      <span>ID: {user.id}</span>

      <Footer>
        <Delete onClick={handleDelete}>Delete</Delete>
      </Footer>
    </Layout>
  )
}

export default User
