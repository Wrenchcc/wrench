import React from 'react'
import withLocalization from 'i18n/withLocalization'
import { Base, Header, Content, AddButton, Title, SubTitle, Input } from './styles'

// TODO: Implement add project if data edit || new
// TODO: Handle keyboard up and down
const EditProject = ({ t }) => (
  <Base>
    <Header />
    <Content contentContainerStyle={{ flex: 1 }}>
      <Title medium>{t('.title')}</Title>
      <SubTitle>{t('.subTitle')}</SubTitle>

      <Input placeholder={t('.inputTitle')} />
      <Input placeholder={t('.inputBrand')} />
      <Input placeholder={t('.inputModel')} />
      <Input placeholder={t('.inputYear')} />
    </Content>
    <AddButton onPress={() => console.log('Add')}>{t('.add')}</AddButton>
  </Base>
)

export default withLocalization(EditProject, 'EditProject')
