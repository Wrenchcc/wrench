# Syncing Email Templates with AWS SES

All email templates must have their CSS inlined before being added to AWS SES. AWS SES does _not_ automatically inline the CSS. Additionally, to save time while testing email template changes it is tedious to copy/paste templates between a code editor and the AWS SES UI, with the CSS-inlining script being required to run with each modification.

The scripts in this directory solve both of these problems. To get started:

- Make sure you have run yarn installed: `yarn`
- Add `APP_AWS_ACCESS_KEY`, `APP_AWS_SECRET_ACCESS_KEY` and `APP_AWS_SNS_REGION` to `.env` file.

To develop email, run:
`yarn dev`

To test email, run:
`yarn run ses:test example@example.com`

To add a new template, run:
`yarn run ses:create templateName`

To delete a new template, run:
`yarn run ses:delete templateName`
