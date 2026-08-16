// Client-side CSV export — plain text blob, no server involved (product-spec.md §11).

const escapeCell = (value) => {
  const text = String(value ?? '')
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

const row = (...cells) => cells.map(escapeCell).join(',')

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'project'

export function buildCsv({ context, materials, waste, timberConfirmed }) {
  const generated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const lines = [
    row('Sustainable Fit-Out — Material & Waste Compliance Export'),
    row('Generated', generated),
    '',
    row('Project name', context.projectName),
    row('Target BREEAM rating', context.targetRating),
    row('Subcontractor', context.subcontractor),
    row(
      'Timber legal & sustainable compliance',
      timberConfirmed ? 'Confirmed' : 'Not confirmed',
    ),
    '',
    row('MATERIALS'),
    row(
      'Location / Use',
      'Product',
      'Manufacturer',
      'Quantity',
      'Unit',
      'Recycled content (%)',
      'Certification (scheme / no.)',
      'Status',
    ),
    ...materials.map((m) =>
      row(
        m.location,
        m.product,
        m.manufacturer,
        m.quantity,
        m.unit,
        m.recycled,
        m.certification,
        m.status,
      ),
    ),
    '',
    row('WASTE'),
    row('Waste group', 'Tonnage (t)', 'Destination'),
    ...waste.map((w) => row(w.group, w.tonnage, w.destination)),
  ]

  return lines.join('\r\n')
}

export function downloadCsv(data) {
  const csv = buildCsv(data)
  const date = new Date().toISOString().slice(0, 10)
  const filename = `sustainable-fit-out_${slugify(data.context.projectName)}_${date}.csv`
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  return filename
}
