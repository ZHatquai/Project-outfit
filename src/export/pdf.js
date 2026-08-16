// Client-side branded PDF report — jsPDF + jspdf-autotable, no server function
// (product-spec.md §3, Export Arm design intent).

import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const NAVY = [43, 53, 67]
const NAVY_DEEP = [34, 42, 53]
const LIME = [214, 222, 35]
const PAPER = [246, 246, 243]
const INK_SECONDARY = [91, 102, 114]
const LINE = [231, 232, 226]
const WHITE = [255, 255, 255]

const STATUS_COLORS = {
  Certified: { fill: [228, 237, 191], text: [75, 90, 0] },
  Pending: { fill: [246, 227, 196], text: [122, 78, 11] },
  Missing: { fill: [241, 215, 207], text: [122, 46, 23] },
}

const MARGIN = 14
const HEADER_HEIGHT = 30

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'project'

const orDash = (value) => {
  const text = String(value ?? '').trim()
  return text === '' ? '—' : text
}

// Navy masthead with lime mark + wordmark and a lime accent bar, matching the
// on-screen header. Drawn on every page.
function drawHeader(doc, pageWidth) {
  doc.setFillColor(...NAVY)
  doc.rect(0, 0, pageWidth, HEADER_HEIGHT, 'F')
  doc.setFillColor(...NAVY_DEEP)
  doc.rect(0, HEADER_HEIGHT - 6, pageWidth, 6, 'F')

  // Lime square logo mark
  doc.setFillColor(...LIME)
  doc.roundedRect(MARGIN, 9, 7.5, 7.5, 1.2, 1.2, 'F')
  doc.setFillColor(...NAVY)
  doc.roundedRect(MARGIN + 2.1, 11.1, 3.3, 3.3, 0.6, 0.6, 'F')

  doc.setTextColor(...WHITE)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('Sustainable Fit-Out', MARGIN + 11, 14.8)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(190, 197, 205)
  doc.text('Material & Waste Compliance Report', MARGIN + 11, 20)

  doc.setFontSize(8)
  doc.text('Fourfront Group', pageWidth - MARGIN, 14.8, { align: 'right' })

  // Lime accent bar under the masthead
  doc.setFillColor(...LIME)
  doc.rect(0, HEADER_HEIGHT, pageWidth, 1.6, 'F')
}

function drawFooter(doc, pageWidth, pageHeight, generated) {
  const y = pageHeight - 9
  doc.setDrawColor(...LINE)
  doc.setLineWidth(0.3)
  doc.line(MARGIN, y - 4, pageWidth - MARGIN, y - 4)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...INK_SECONDARY)
  doc.text(`Generated ${generated} · Sustainable Fit-Out`, MARGIN, y)
  doc.text(
    `Page ${doc.internal.getNumberOfPages()}`,
    pageWidth - MARGIN,
    y,
    { align: 'right' },
  )
}

function sectionTitle(doc, title, y) {
  doc.setFillColor(...LIME)
  doc.rect(MARGIN, y - 3.2, 1.6, 4.2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...NAVY)
  doc.text(title, MARGIN + 4, y)
}

export function downloadPdf({ context, materials, waste, timberConfirmed }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const generated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const chrome = (data) => {
    drawHeader(doc, pageWidth)
    drawFooter(doc, pageWidth, pageHeight, generated)
    if (data) data.settings.margin.top = HEADER_HEIGHT + 12
  }
  chrome()

  // ---- Project context block ----
  let y = HEADER_HEIGHT + 14
  doc.setFillColor(...PAPER)
  doc.roundedRect(MARGIN, y - 6, pageWidth - MARGIN * 2, 21, 2, 2, 'F')

  const contextEntries = [
    ['Project name', orDash(context.projectName)],
    ['Target BREEAM rating', orDash(context.targetRating)],
    ['Subcontractor', orDash(context.subcontractor)],
  ]
  const colWidth = (pageWidth - MARGIN * 2 - 12) / 3
  contextEntries.forEach(([label, value], i) => {
    const x = MARGIN + 6 + colWidth * i
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...INK_SECONDARY)
    doc.text(label.toUpperCase(), x, y)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...NAVY)
    doc.text(
      doc.splitTextToSize(value, colWidth - 4)[0] ?? '—',
      x,
      y + 6.5,
    )
  })

  // ---- Materials table ----
  y += 25
  sectionTitle(doc, 'Materials', y)

  const materialRows = materials.map((m) => [
    orDash(m.location),
    orDash(m.product),
    orDash(m.manufacturer),
    String(m.quantity ?? '').trim() === '' ? '—' : `${m.quantity} ${m.unit ?? ''}`.trim(),
    String(m.recycled ?? '').trim() === '' ? '—' : `${m.recycled}%`,
    orDash(m.certification),
    orDash(m.status),
  ])

  autoTable(doc, {
    startY: y + 3,
    margin: { left: MARGIN, right: MARGIN, top: HEADER_HEIGHT + 12, bottom: 18 },
    head: [
      [
        'Location / Use',
        'Product',
        'Manufacturer',
        'Quantity',
        'Recycled %',
        'Certification',
        'Status',
      ],
    ],
    body: materialRows.length
      ? materialRows
      : [[{ content: 'No material rows entered', colSpan: 7, styles: { halign: 'center', textColor: INK_SECONDARY, fontStyle: 'italic' } }]],
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 2.4,
      textColor: NAVY,
      lineColor: LINE,
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: NAVY,
      textColor: WHITE,
      fontStyle: 'bold',
      fontSize: 7.5,
    },
    alternateRowStyles: { fillColor: PAPER },
    columnStyles: { 4: { halign: 'right' } },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 6) {
        const status = STATUS_COLORS[data.cell.raw]
        if (status) {
          data.cell.styles.fillColor = status.fill
          data.cell.styles.textColor = status.text
          data.cell.styles.fontStyle = 'bold'
        }
      }
    },
    didDrawPage: chrome,
  })

  // ---- Waste table ----
  y = doc.lastAutoTable.finalY + 12
  if (y > pageHeight - 50) {
    doc.addPage()
    chrome()
    y = HEADER_HEIGHT + 14
  }
  sectionTitle(doc, 'Waste', y)

  const wasteRows = waste.map((w) => [
    orDash(w.group),
    String(w.tonnage ?? '').trim() === '' ? '—' : w.tonnage,
    orDash(w.destination),
  ])

  autoTable(doc, {
    startY: y + 3,
    margin: { left: MARGIN, right: MARGIN, top: HEADER_HEIGHT + 12, bottom: 18 },
    head: [['Waste group', 'Tonnage (t)', 'Destination']],
    body: wasteRows.length
      ? wasteRows
      : [[{ content: 'No waste rows entered', colSpan: 3, styles: { halign: 'center', textColor: INK_SECONDARY, fontStyle: 'italic' } }]],
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 2.4,
      textColor: NAVY,
      lineColor: LINE,
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: NAVY,
      textColor: WHITE,
      fontStyle: 'bold',
      fontSize: 7.5,
    },
    alternateRowStyles: { fillColor: PAPER },
    columnStyles: { 1: { halign: 'right' } },
    didDrawPage: chrome,
  })

  // ---- Timber compliance confirmation ----
  if (timberConfirmed) {
    let ty = doc.lastAutoTable.finalY + 10
    if (ty > pageHeight - 32) {
      doc.addPage()
      chrome()
      ty = HEADER_HEIGHT + 14
    }
    doc.setFillColor(228, 237, 191)
    doc.roundedRect(MARGIN, ty - 5, pageWidth - MARGIN * 2, 12, 2, 2, 'F')
    doc.setFillColor(...LIME)
    doc.roundedRect(MARGIN + 4, ty - 2.2, 5, 5, 1, 1, 'F')
    doc.setDrawColor(...NAVY)
    doc.setLineWidth(0.7)
    doc.line(MARGIN + 5.2, ty + 0.4, MARGIN + 6.3, ty + 1.6)
    doc.line(MARGIN + 6.3, ty + 1.6, MARGIN + 8, ty - 1)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(75, 90, 0)
    doc.text(
      'Timber compliance confirmed — all timber products supplied are certified legal and sustainable.',
      MARGIN + 12,
      ty + 1.2,
    )
  }

  const date = new Date().toISOString().slice(0, 10)
  const filename = `sustainable-fit-out_${slugify(context.projectName)}_${date}.pdf`
  doc.save(filename)
  return filename
}
