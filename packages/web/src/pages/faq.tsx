// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import Seo from 'utils/seo'
import Footer from 'components/Footer'
import { Title, Text } from 'ui'

const Base = styled.div`
  padding-top: 80px;
  max-width: 650px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
`

const Row = styled.div`
  padding-top: 40px;
`


function Faq() {
  return (
    <>
      <Seo
        config={{
          title: 'FAQ',
        }}
      />

      <Base>
        <Title medium>FAQ</Title>

        <Text color="neutral">Here you can find our most common questions.</Text>

        <Row>
          <Text color="inverse" medium>
            How do I create a project?
          </Text>

          <Text color="neutral">You can only create a project within the Wrench app, by logging in and press the + icon in the center of the tab bar, you then choose a title, then you select what type of project you are building and last you can search for what model and brand the bike is.</Text>
        </Row>

        <Row>
          <Text color="inverse" medium>
            How do I delete a project?
          </Text>

          <Text color="neutral">Navigate to the project you want to delete, press Edit in the top right corner. Select Delete project from there.</Text>
        </Row>

        <Row>
          <Text color="inverse" medium>
            How do I edit a project?
          </Text>

          <Text color="neutral">Navigate to the project you want to edit, press Edit in the top right corner. Here you can change title and model. Press Done when your ready.</Text>
        </Row>

        <Row>
          <Text color="inverse" medium>
            How do I post?
          </Text>

          <Text color="neutral">First, you need a project to post to. Press the + icon in the middle of the tab bar. Choose to take a picture with the camera or select wanted pictures from the camera roll. You can add multiple images from the camera roll buy selecting more. When you selected the pictures you want in the post you continue by pressing Next in the top right corner, add a caption and press Share.</Text>
        </Row>

        <Row>
          <Text color="inverse" medium>
            How do I delete a post?
          </Text>

          <Text color="neutral">Locate the post you want to edit, press the three dots in the top right section of the post, choose Delete post and verify that you want to remove the specific post.</Text>
        </Row>

        <Row>
          <Text color="inverse" medium>
            How do I edit a post?
          </Text>

          <Text color="neutral">Locate the post you want to edit, press the three dots in the top right section of the post, choose Edit post and then press Save.</Text>
        </Row>

        <Row>
          <Text color="inverse" medium>
            How do I delete my account?
          </Text>

          <Text color="neutral">In the Wrench app you go to Profile -> Settings -> Delete account. Note that it can take up to 7 days for the backups to be completly removed.</Text>
        </Row>

        <Row>
          <Text color="inverse" medium>
            How do I turn off notifications?
          </Text>

          <Text color="neutral">There are two kinds of notifications, email and push notifications. In the app you can turn off both by going to Profile -> Press the menu in the top right corner -> Settings -> Email/Push Notifications and disable the ones you want to stop recive.</Text>
        </Row>

        <Row>
          <Text color="inverse" medium>
            I have another question
          </Text>

          <Text color="neutral">You can reach us on Instagram, Facebook or email <a href="mailto:feedback@wrench.cc">feedback@wrench.cc</a></Text>
        </Row>
      </Base>
      <Footer />
    </>
  )
}

export default Faq
