import React from 'react'
import { translate } from 'react-i18next'
import { Base, Header, Content, AddButton, Title, SubTitle, Input } from './styles'

// TODO: Implement add project if data edit || new
// TODO: Handle keyboard up and down
const EditProject = ({ t }) => (
  <Base>
    <Header />
    <Content contentContainerStyle={{ flex: 1 }}>
      <Title medium>{t('EditProject:title')}</Title>
      <SubTitle>{t('EditProject:subTitle')}</SubTitle>

      <Input placeholder={t('.inputTitle')} />
      <Input placeholder={t('.inputBrand')} />
      <Input placeholder={t('.inputModel')} />
      <Input placeholder={t('.inputYear')} />
    </Content>
    <AddButton onPress={() => console.log('Add')}>{t('EditProject:add')}</AddButton>
  </Base>
)

export default translate('EditProject')(EditProject)
