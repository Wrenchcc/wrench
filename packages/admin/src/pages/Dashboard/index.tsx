// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { useMetaQuery, useGrowthQuery } from '@wrench/common'
import Layout from '../../components/Layout'
import Chart from '../../components/Chart'
import { PlaceholderBox } from '../../components/Placeholder'

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

export const Icon = styled.img`
  margin-right: 4px;
  margin-top: -2px;
`

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

export const Yey = styled.div`
  position: absolute;
  top: 155px;
  font-size: 13px;
  color: #3cbd9c;
  font-weight: 500;
`

function Dashboard() {
  const { data, loading } = useMetaQuery()
  const { data: userData } = useGrowthQuery({
    variables: {
      type: 'USERS',
    },
  })

  const { data: projectData } = useGrowthQuery({
    variables: {
      type: 'PROJECTS',
    },
  })

  return (
    <Layout title="Hightlights">
      <Row>
        {loading ? (
          <PlaceholderBox />
        ) : (
          <Box>
            <Count>{data.meta?.totalProjects}</Count>
            {data.meta?.totalProjectsToday && (
              <Yey>
                <Icon src={require('./arrow.svg')} />
                {data.meta?.totalProjectsToday}
              </Yey>
            )}
            <Cat>Total projects</Cat>
          </Box>
        )}

        {loading ? (
          <PlaceholderBox />
        ) : (
          <Box>
            <Count>{data.meta?.totalUsers}</Count>
            {data.meta?.totalUsersToday && (
              <Yey>
                <Icon src={require('./arrow.svg')} />
                {data.meta?.totalUsersToday}
              </Yey>
            )}
            <Cat>Total users</Cat>
          </Box>
        )}

        {loading ? (
          <PlaceholderBox />
        ) : (
          <Box>
            <Count>{data.meta?.totalComments}</Count>
            {data.meta?.totalUsersToday && (
              <Yey>
                <Icon src={require('./arrow.svg')} />
                {data.meta?.totalCommentsToday}
              </Yey>
            )}
            <Cat>Total comments</Cat>
          </Box>
        )}

        {loading ? (
          <PlaceholderBox />
        ) : (
          <Box>
            <Count>{data.meta?.totalPosts}</Count>
            {data.meta?.totalPostsToday && (
              <Yey>
                <Icon src={require('./arrow.svg')} />
                {data.meta?.totalPostsToday}
              </Yey>
            )}
            <Cat>Total posts</Cat>
          </Box>
        )}
      </Row>

      <Section>
        <Column>
          <Top>
            <Headline>Project growth</Headline>
          </Top>
          <Chart data={projectData?.growth} />
        </Column>

        <Column>
          <Top>
            <Headline>User growth</Headline>
          </Top>

          <Chart data={userData?.growth} />
        </Column>
      </Section>
    </Layout>
  )
}

export default Dashboard
