import * as awsx from '@pulumi/awsx'

const cluster = new awsx.ecs.Cluster('cluster')

const apiAlb = new awsx.elasticloadbalancingv2.ApplicationLoadBalancer('net-lb', {
  external: true,
  securityGroups: cluster.securityGroups,
})

const apiListener = apiAlb.createListener('api', {
  port: 80,
  external: true,
})

const appService = new awsx.ecs.FargateService('app-service', {
  cluster,
  taskDefinitionArgs: {
    container: {
      image: awsx.ecs.Image.fromPath('api-img', '../packages/api'),
      memory: 1024,
      portMappings: [apiListener],
    },
  },
  desiredCount: 2,
})

export const api = apiListener.endpoint.hostname
