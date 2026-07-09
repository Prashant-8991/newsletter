import express from 'express'
import { generatePdf } from './pdf-core.js'
import { getEditsForDate, saveEditsForDate } from './data-store.js'

const app = express()
const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || '0.0.0.0'
const APP_PATH = process.env.APP_PATH || '/newsletter'
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`
const APP_URL = `${BASE_URL}${APP_PATH}/`

app.use(express.json({ limit: '10mb' }))

app.get('/api/edits', (req, res) => {
  const date = String(req.query.date || '')
  const edits = getEditsForDate(date)
  res.json({ date, edits, updatedAt: null })
})

app.post('/api/edits', (req, res) => {
  try {
    const { date, edits } = req.body || {}
    if (!date) {
      res.status(400).json({ error: 'date is required' })
      return
    }
    const result = saveEditsForDate(String(date), edits)
    res.json({ ok: true, ...result })
  } catch (err) {
    console.error('Save edits error:', err)
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/pdf', async (req, res) => {
  try {
    const payload = req.body || {}
    let edits = payload.edits
    if (!edits && payload.date) {
      edits = getEditsForDate(String(payload.date))
    }
    const pdf = await generatePdf({
      baseUrl: APP_URL,
      payload: { ...payload, edits: edits || {} },
    })
    res.status(200)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename="newsletter.pdf"')
    res.send(pdf)
  } catch (err) {
    console.error('PDF generation failed:', err)
    res.status(500).send(`PDF generation failed: ${err.message}`)
  }
})

app.use(APP_PATH, express.static('dist', {
  index: 'index.html',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache')
    }
  },
}))

app.use(APP_PATH, (req, res) => {
  res.sendFile('dist/index.html', { root: '.' })
})

app.listen(PORT, HOST, () => {
  console.log(`Newsletter server running at ${BASE_URL}`)
  console.log(`App served at: ${APP_URL}`)
  console.log(`PDF endpoint: POST ${BASE_URL}/api/pdf`)
  console.log(`Edits: GET/POST ${BASE_URL}/api/edits?date=YYYY-MM-DD`)
})
