// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { useMetaQuery } from '@wrench/common'
import Layout from '../../components/Layout'
import Chart from '../../components/Chart'

export const Box = styled.div`
  width: 235px;
  height: 235px;
  border-radius: 1px;
  border: solid 1px #e6e7e9;
  font-size: 48px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const Count = styled.div``

export const Headline = styled.h1`
  font-size: 27px;
  font-weight: 500;
`

export const Section = styled.section`
  margin-top: 100px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
`
export const Column = styled.div``

export const Top = styled.div`
  margin-bottom: 40px;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Cat = styled.div`
  position: absolute;
  bottom: -40px;
  left: 0;
  font-size: 16px;
`

function Dashboard() {
  const { data, loading } = useMetaQuery()

  if (loading) {
    return null
  }

  return (
    <Layout title="Hightlights">
      <Row>
        <Box>
          <Count>{data.meta?.totalProjects}</Count>
          <Cat>Total projects</Cat>
        </Box>
        <Box>
          <Count>{data.meta?.totalUsers}</Count>
          <Cat>Total users</Cat>
        </Box>
        <Box>
          <Count>{data.meta?.totalComments}</Count>
          <Cat>Total comments</Cat>
        </Box>
        <Box>
          <Count>{data.meta?.totalPosts}</Count>
          <Cat>Total posts</Cat>
        </Box>
      </Row>

      <Section>
        <Column>
          <Top>
            <Headline>Project growth</Headline>
          </Top>
          <Chart />
        </Column>

        <Column>
          <Top>
            <Headline>User growth</Headline>
          </Top>

          <Chart />
        </Column>
      </Section>
    </Layout>
  )
}

export default Dashboard
