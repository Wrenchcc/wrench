// @ts-nocheck
import { useTranslation } from 'i18n'
import { usePostQuery } from '@wrench/common'
import Layout from 'ui/Layout'
import PostComponent from 'ui/Post'
import Seo from 'utils/seo'

function Post({ id }) {
  const { t } = useTranslation('post-page')

  const { data, loading } = usePostQuery({
    variables: {
      id,
    },
  })

  if (loading) {
    return null
  }

  return (
    <Layout>
      <Seo
        config={{
          title: t('title', { fullName: data.post.user.fullName, caption: data.post.caption }),
          description: data.post.caption,
          openGraph: {
            title: t('title', { fullName: data.post.user.fullName, caption: data.post.caption }),
            description: data.post.caption,
            url: `https://wrench.cc/p/${id}`,
            type: 'website',
            images: data.post.files.edges.map(({ node }) => ({
              url: `${node.uri}?w=650&h=650&dpr=1`,
              width: 640,
              height: 640,
            })),
            site_name: 'Wrench',
          },
        }}
      />
      <PostComponent data={data.post} />
    </Layout>
  )
}

Post.getInitialProps = ({ query }) => query

export default Post
