import * as nodemailer from "nodemailer"
import { SES } from "aws-sdk"

const { APP_AWS_SNS_REGION } = process.env

export default nodemailer.createTransport({
  SES: new SES({ apiVersion: "2010-12-01", region: APP_AWS_SNS_REGION })
});
