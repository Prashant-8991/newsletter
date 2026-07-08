import type { Buffer } from 'node:buffer'

export interface PdfPayload {
  kpiData?: unknown
  newsData?: unknown
}

export interface GeneratePdfOptions {
  baseUrl: string
  payload?: PdfPayload
}

export function generatePdf(options: GeneratePdfOptions): Promise<Buffer>
