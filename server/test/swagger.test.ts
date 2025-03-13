import { Elysia, type InferContext } from 'elysia'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
	.use(
		swagger({
			provider: 'scalar',
			documentation: {
				info: {
					title: 'Elysia Scalar',
					version: '0.8.1'
				},
				tags: [
					{
						name: 'Test',
						description: 'Hello'
					}
				],
				components: {
					schemas: {
						User: {
							description: 'string'
						}
					},
					securitySchemes: {
						JwtAuth: {
							type: 'http',
							scheme: 'bearer',
							bearerFormat: 'JWT',
							description: 'Enter JWT Bearer token **_only_**'
						}
					}
				}
			},
			swaggerOptions: {
				persistAuthorization: true
			}
		})
	)
	.get('/id/:id?', 'a')
	.listen(3000)

  type context = InferContext<typeof app>
