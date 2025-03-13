// import { join } from 'path'
// import { generateService } from '@umijs/openapi'
const { join } = require('path')
const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { generateService } = require('@umijs/openapi')
const serversPath = join(__dirname, '../../apps/web-antd/src/api')
const projectName = 'mango-admin'

async function main() {
  await generateService({
    schemaPath: 'http://127.0.0.1:8899/swagger/json',
    serversPath: serversPath,
    projectName,
    // requestImportStatement: `import { requestClient } from '#/api/request';\nconst request = requestClient.request;`,
    requestImportStatement: `import { request } from '#/api/request'`,
  })

  // 给formData类型添加headers
  const apiPath = join(serversPath, projectName)
  const files = readdirSync(apiPath)
  files.forEach((file) => {
    const filePath = join(apiPath, file)
    const content = readFileSync(filePath, 'utf-8')
    if (content.includes("requestType: 'form'")) {
      const newContent = content.replace("requestType: 'form'", "headers: {'Content-Type': 'multipart/form-data'}")
      writeFileSync(filePath, newContent)
    }
  })

  console.log('serversPath', serversPath)
}

main()
