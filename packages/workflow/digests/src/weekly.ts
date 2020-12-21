import { splitEvery } from 'rambda'
import { SES } from 'aws-sdk'

const { AWS_SES_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

const BULK_LIMIT = 2

const TEMPLATE_NAME = 'weekly

const DEFAULT_TEMPLATE_DATA = {
  firstName: 'unknown',
  projects: 'unknown',
  unsubscribe: 'unknown',
}

const ses = new SES({
  apiVersion: '2010-12-01',
  region: AWS_SES_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

async function sendEmails() {
  // Get all users where similar projects is enabled

  const data = {
    subject: 'Wrench - weekly digests',
    unsubscribe:
      'https://wrench.cc/emails/unsubscribe/reminders?user_id=8307592319&sig=AU86YUwCx7WgFZ-e',
    projects: [
      {
        id: 1,
        title: 'BMW K1100 cafe racer',
        user: {
          fullName: 'Lysmotorcycles Dim',
        },
        cover: {
          uri: 'https://edge-files.wrench.cc/images/66a0bbae-af24-4991-9444-2391f7f27623.jpg?w=320',
        },
      },
      {
        id: 1,
        title: 'BMW K1100 cafe racer',
        user: {
          fullName: 'Lysmotorcycles Dim',
        },
        cover: {
          uri: 'https://edge-files.wrench.cc/images/66a0bbae-af24-4991-9444-2391f7f27623.jpg?w=320',
        },
      },
      {
        id: 1,
        title: 'BMW K1100 cafe racer',
        user: {
          fullName: 'Lysmotorcycles Dim',
        },
        cover: {
          uri: 'https://edge-files.wrench.cc/images/66a0bbae-af24-4991-9444-2391f7f27623.jpg?w=320',
        },
      },
      {
        id: 1,
        title: 'BMW K1100 cafe racer',
        user: {
          fullName: 'Lysmotorcycles Dim',
        },
        cover: {
          uri: 'https://edge-files.wrench.cc/images/66a0bbae-af24-4991-9444-2391f7f27623.jpg?w=320',
        },
      },
      {
        id: 1,
        title: 'BMW K1100 cafe racer',
        user: {
          fullName: 'Lysmotorcycles Dim',
        },
        cover: {
          uri: 'https://edge-files.wrench.cc/images/66a0bbae-af24-4991-9444-2391f7f27623.jpg?w=320',
        },
      },
      {
        id: 1,
        title: 'BMW K1100 cafe racer',
        user: {
          fullName: 'Lysmotorcycles Dim',
        },
        cover: {
          uri: 'https://edge-files.wrench.cc/images/66a0bbae-af24-4991-9444-2391f7f27623.jpg?w=320',
        },
      },
      {
        id: 1,
        title: 'BMW K1100 cafe racer',
        user: {
          fullName: 'Lysmotorcycles Dim',
        },
        cover: {
          uri: 'https://edge-files.wrench.cc/images/66a0bbae-af24-4991-9444-2391f7f27623.jpg?w=320',
        },
      },
      {
        id: 1,
        title: 'BMW K1100 cafe racer',
        user: {
          fullName: 'Lysmotorcycles Dim',
        },
        cover: {
          uri: 'https://edge-files.wrench.cc/images/66a0bbae-af24-4991-9444-2391f7f27623.jpg?w=320',
        },
      },
    ],
  }

  const users = [
    { firstName: 'Pontus', email: 'pontus@wrench.cc', id: 1 },
    // { firstName: 'Viktor', email: 'viktor@wrench.cc', id: 2 },
    // { firstName: 'Felix', email: 'felix@wrench.cc', id: 3 },
  ]

  const chunkedUsers = splitEvery(BULK_LIMIT, users)

  chunkedUsers.forEach(async (chunks) => {
    try {
      const destinations = chunks.map((user) => {
        const templateData = {
          firstName: user.firstName,
          projects: data.projects,
          unsubscribe: data.unsubscribe,
        }

        return {
          Destination: {
            ToAddresses: [user.email],
          },
          ReplacementTemplateData: JSON.stringify(templateData),
        }
      })

      const params = {
        Destinations: destinations,
        Source: `${data.subject} <no-reply@wrench.cc>`,
        Template: TEMPLATE_NAME,
        DefaultTemplateData: JSON.stringify(DEFAULT_TEMPLATE_DATA),
      }

      await ses.sendBulkTemplatedEmail(params).promise()
    } catch (err) {
      console.log(err)
    }
  })
}

export default sendEmails
