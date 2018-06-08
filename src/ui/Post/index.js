import React from 'react'
import PropTypes from 'prop-types'
import { navigateToProject, navigateToProfile } from 'navigation'
import { Media, Comments } from 'ui'
import { Base, Top, Content, Title, Avatar } from './styled'

const Post = ({ data, onPost = false, avatar = true, onLongPress }) => (
  <Base>
    <Top>
      {!onPost && (
        <Title
          numberOfLines={1}
          onPress={() => navigateToProject({ id: data.id, user: data.user, project: data.project })}
        >
          {data.title}
        </Title>
      )}
      {avatar && (
        <Avatar
          uri={data.user.avatarUrl}
          onPress={() => navigateToProfile({ user: data.user })}
          disabled={onPost}
        />
      )}
    </Top>
    <Content>
      <Media
        onLongPress={onLongPress}
        post={data}
        onPress={() =>
          !onPost && navigateToProject({ id: data.id, user: data.user, project: data.project })
        }
      />
    </Content>
    <Comments data={data.comments} />
  </Base>
)

Post.propTypes = {
  data: PropTypes.object.isRequired,
  onLongPress: PropTypes.func,
  onPost: PropTypes.bool,
  avatar: PropTypes.bool,
}

export default Post
