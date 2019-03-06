import { SNS } from 'aws-sdk'

const { AWS_SNS_REGION } = process.env

export default new SNS({
  apiVersion: '2010-12-01',
  region: AWS_SNS_REGION,
  accessKeyId: 'AKIAIFKUAPL3VXR2PASA',
  secretAccessKey: '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',
})
