// @ts-nocheck
import { Layout, Title, Switch } from 'ui'
import { Left, Right, Section } from './styles'

function Settings() {
  return (
    <Layout>
      <Left>
        <Title fontSize={36}>Settings</Title>
        <a href="#notifications">Notifications</a> <br />
        <a href="#language">Language</a> <br />
        <a href="#support">Support</a> <br />
      </Left>
      <Right>
        <Section id="notifications">
          <Title medium>Notifications</Title>
          <br />
          <br />
          Email notifications <br />
          <Switch isOn={true} onColor="black" />
          <Switch isOn={true} onColor="black" />
          <Switch isOn={true} onColor="black" />
          <Switch isOn={true} onColor="black" />
          <Switch isOn={true} onColor="black" />
          <Switch isOn={true} onColor="black" />
          <br />
          Push notifications
        </Section>

        <Section id="language">
          <Title medium>Language</Title>
          <br />
          <br />
          English
          <br />
          <br />
          Swedish
        </Section>

        <Section id="support">
          <Title medium>Support</Title>
          <br />
          <br />
          Mail Support <br />
          <br />
          Feedback <br /> <br />
          Chat with us
        </Section>
      </Right>
    </Layout>
  )
}

export default Settings
