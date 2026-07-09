import type { Buffer } from 'node:buffer'

export interface PdfPayload {
  kpiData?: unknown
  newsData?: unknown
  rtpmsData?: unknown
  budgetData?: unknown
  edits?: Record<string, string>
  contentHTML?: string
}

export interface GeneratePdfOptions {
  baseUrl: string
  payload?: PdfPayload
}

export function generatePdf(options: GeneratePdfOptions): Promise<Buffer>
