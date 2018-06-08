import React from 'react'
import withLocalization from 'i18n/withLocalization'
import { navigateToProject } from 'navigation'
import projects from 'fixtures/projects'
import { Base, Scroll, Title, Card } from './styles'

const Popular = ({ t }) => (
  <Base>
    <Title medium>{t('.popular')}</Title>
    <Scroll
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={10}
      pagingEnabled
    >
      {projects.map(({ coverUri, name, id, user }, index) => (
        <Card
          coverUri={coverUri}
          name={name}
          key={id}
          onPress={() => navigateToProject({ id, user, project: { name } })}
          first={index === 0}
          last={index === projects.length - 1}
        />
      ))}
    </Scroll>

    <Title medium>{t('.recent')}</Title>
  </Base>
)

export default withLocalization(Popular, 'Popular')
