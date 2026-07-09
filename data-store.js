import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const DATA_FILE = process.env.EDITS_FILE || './data/edits.json'

function ensureDir() {
  const dir = dirname(DATA_FILE)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

export function loadAllEdits() {
  if (!existsSync(DATA_FILE)) return {}
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
  } catch {
    return {}
  }
}

export function getEditsForDate(date) {
  if (!date) return {}
  const all = loadAllEdits()
  return all[date] || {}
}

export function saveEditsForDate(date, edits) {
  if (!date) throw new Error('date is required')
  ensureDir()
  const all = loadAllEdits()
  const cleaned = {}
  for (const [k, v] of Object.entries(edits || {})) {
    if (typeof v === 'string') cleaned[k] = v
  }
  all[date] = cleaned
  all[`${date}_updatedAt`] = new Date().toISOString()
  writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8')
  return { ok: true, count: Object.keys(cleaned).length }
}
