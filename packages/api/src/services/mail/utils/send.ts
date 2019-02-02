import client from '../client'

export default async ({ to = 'info@wdlinkoping.se', type = 'welcome', data = {} }) => {
  console.log(type, data)
  
  try {
    const blah = await client.sendMail({
      from: 'pontus@wrench.cc',
      to,
      subject: 'Welcome to Wrench - Project comunity',
      text: 'Hello',
    })

    console.log(blah)
  } catch(err) {
    console.log(err)
  }
}
