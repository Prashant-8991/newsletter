import { chromium } from 'playwright'
import { Buffer } from 'node:buffer'

/**
 * @typedef {object} PdfPayload
 * @property {unknown} [kpiData]
 * @property {unknown} [newsData]
 */

/**
 * @typedef {object} GeneratePdfOptions
 * @property {string} baseUrl
 * @property {PdfPayload} [payload]
 */

/**
 * @param {GeneratePdfOptions} options
 * @returns {Promise<Buffer>}
 */
export async function generatePdf({ baseUrl, payload = {} }) {
  const browser = await chromium.launch({ headless: true })
  try {
    const context = await browser.newContext({
      viewport: { width: 794, height: 1123 },
      deviceScaleFactor: 2,
    })
    const page = await context.newPage()

    const injectedKpi = JSON.stringify(payload.kpiData ?? null)
    const injectedNews = JSON.stringify(payload.newsData ?? null)
    const injectedRtpms = JSON.stringify(payload.rtpmsData ?? null)

    await page.addInitScript(
      ({ kpiData, newsData, rtpmsData }) => {
        window.__injectedKpiData = JSON.parse(kpiData)
        window.__injectedNewsData = JSON.parse(newsData)
        window.__injectedRtpmsData = JSON.parse(rtpmsData)
        window.__kpiLoaded = true
        window.__newsLoaded = true
        window.__rtpmsLoaded = true
      },
      { kpiData: injectedKpi, newsData: injectedNews, rtpmsData: injectedRtpms }
    )

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 60000 })

    await page.waitForFunction(
      () => {
        const wrapper = document.querySelector('#newsletter-content .print-wrapper')
        return wrapper && wrapper.children.length >= 2
      },
      { timeout: 30000 }
    ).catch(() => null)

    await page.evaluate(async () => {
      await document.fonts.ready
    })

    await page.waitForTimeout(800)
    await page.emulateMedia({ media: 'print' })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    return Buffer.from(pdf)
  } finally {
    await browser.close()
  }
}
