import type { Plugin } from 'vite'
import { Buffer } from 'node:buffer'
import { generatePdf, type PdfPayload } from '../pdf-core.js'

async function readJsonBody(req: import('node:http').IncomingMessage): Promise<PdfPayload> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf-8')
        resolve(raw ? (JSON.parse(raw) as PdfPayload) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

export function playwrightPdf(): Plugin {
  let devServerUrl: string | undefined

  return {
    name: 'vite-plugin-playwright-pdf',
    apply: 'serve',
    configureServer(server) {
      const port = server.config.server.port ?? 5173
      devServerUrl = `http://localhost:${port}`

      server.middlewares.use('/api/pdf', async (req, res) => {
        if (!devServerUrl) {
          res.statusCode = 500
          res.end('Dev server URL not available')
          return
        }

        let payload: PdfPayload = {}
        if (req.method === 'POST') {
          try {
            payload = await readJsonBody(req)
          } catch (err) {
            res.statusCode = 400
            res.end(`Invalid JSON body: ${(err as Error).message}`)
            return
          }
        }

        try {
          const pdf = await generatePdf({ baseUrl: devServerUrl, payload })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader(
            'Content-Disposition',
            'attachment; filename="newsletter.pdf"'
          )
          res.end(pdf)
        } catch (err) {
          res.statusCode = 500
          res.end(`PDF generation failed: ${(err as Error).message}`)
        }
      })
    },
  }
}
