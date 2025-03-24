import { InferContext } from 'elysia'
import MongoCore from 'mango-core'
import { ip } from 'elysia-ip'
import { jwt } from '@elysiajs/jwt'

const mango = MongoCore.init({
  businessPath: 'src',
  controllerPath: 'modules',
  name: 'Mongo Admin',
  version: '1.0.0',
  cors: true,
  swagger: {},
  logger: true,
})
  .use(
    jwt({
      name: 'jwt',
      secret: (process.env.JWT_SECRET as string) || 'mango-elysia',
    }),
  )
  .decorate('ip', '')
  .onAfterResponse(({ request }) => {
    // TODO：添加操作日志
  })

mango.use(ip())

mango.listen(8899)

export type Context = InferContext<typeof mango>
