import React from 'react'
import PropTypes from 'prop-types'
import { navigateToProfile } from 'navigation'
import { Gallery } from 'ui'
import { Base, Overlay, Content, Info, ProjectName, Followers, Avatar } from './styles'

// TODO: Change to use latest post images
const ProjectCard = ({ coverUri, name, followers, onPress, user }) => (
  <Base onPress={onPress}>
    <Overlay colors={['transparent', 'rgba(000, 000, 000, 0.7)']} locations={[0, 1]} />

    <Gallery
      imageUrls={[
        'https://scontent-arn2-1.cdninstagram.com/vp/3bbd5a6e41c9d12ae0a22fa4dc019951/5BC2DC37/t51.2885-15/s640x640/sh0.08/e35/c202.0.675.675/30079353_2101041190141113_2099464732514713600_n.jpg',
        'https://scontent-arn2-1.cdninstagram.com/vp/fc78a5e0896a29d4cbe848f96c6abbef/5BB70560/t51.2885-15/s640x640/sh0.08/e35/c202.0.675.675/28751779_2121753631381546_9118347592407711744_n.jpg',
        'https://scontent-arn2-1.cdninstagram.com/vp/3cbe958253507c9a78e7fc727069630b/5BB6E3BC/t51.2885-15/s640x640/sh0.08/e35/c202.0.675.675/28750888_946095538888234_5429520217619300352_n.jpg',
        'https://scontent-arn2-1.cdninstagram.com/vp/5069bc0be8ca7d28e42ef1119e19fc3e/5BAAD49D/t51.2885-15/s640x640/sh0.08/e35/c202.0.675.675/28436364_965583096940838_396196070037651456_n.jpg',
        'https://scontent-arn2-1.cdninstagram.com/vp/fc78a5e0896a29d4cbe848f96c6abbef/5BB70560/t51.2885-15/s640x640/sh0.08/e35/c202.0.675.675/28751779_2121753631381546_9118347592407711744_n.jpg?123',
        'https://scontent-arn2-1.cdninstagram.com/vp/3bbd5a6e41c9d12ae0a22fa4dc019951/5BC2DC37/t51.2885-15/s640x640/sh0.08/e35/c202.0.675.675/30079353_2101041190141113_2099464732514713600_n.jpg?33',
      ]}
    />

    <Content>
      <Info>
        <ProjectName numberOfLines={1} color="white">
          {name}
        </ProjectName>
        <Followers followers={followers} color="white" opacity={0.9} />
      </Info>
      <Avatar uri={user.avatarUrl} onPress={() => navigateToProfile({ user })} size={40} />
    </Content>
  </Base>
)

ProjectCard.propTypes = {
  coverUri: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default ProjectCard
