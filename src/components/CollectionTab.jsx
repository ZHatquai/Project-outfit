import { useState } from 'react'
import {
  SectionCard,
  PlusIcon,
  TrashIcon,
  DownloadIcon,
  DocIcon,
  CheckIcon,
} from './ui.jsx'
import {
  BREEAM_RATINGS,
  MATERIAL_STATUSES,
  WASTE_GROUPS,
  WASTE_DESTINATIONS,
  QUANTITY_UNITS,
} from '../data/samples.js'
import { downloadCsv } from '../export/csv.js'

const STATUS_SELECT_TONE = {
  Certified: 'bg-good-bg text-good-text',
  Pending: 'bg-warn-bg text-warn-text',
  Missing: 'bg-bad-bg text-bad-text',
}

function RemoveButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex size-8 items-center justify-center rounded-lg text-ink-muted transition-all duration-150 hover:bg-bad-bg hover:text-bad-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      <TrashIcon className="size-4" />
    </button>
  )
}

function AddRowButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-navy/25 px-3.5 py-2 text-sm font-semibold text-navy transition-all duration-150 hover:border-navy hover:bg-navy hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      <PlusIcon className="size-4" />
      {children}
    </button>
  )
}

export default function CollectionTab({ form }) {
  const {
    context,
    setContext,
    materials,
    waste,
    timberConfirmed,
    setTimberConfirmed,
    addMaterial,
    updateMaterial,
    removeMaterial,
    addWaste,
    updateWaste,
    removeWaste,
  } = form

  const [toast, setToast] = useState(null)

  const notify = (filename, kind) => {
    setToast({ filename, kind, id: Date.now() })
    window.setTimeout(() => setToast(null), 4200)
  }

  const exportData = { context, materials, waste, timberConfirmed }

  const handleCsv = () => notify(downloadCsv(exportData), 'CSV')

  // jsPDF is heavy — load it only when someone actually exports a PDF.
  const handlePdf = async () => {
    const { downloadPdf } = await import('../export/pdf.js')
    notify(downloadPdf(exportData), 'PDF')
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Project context */}
      <SectionCard
        title="Project context"
        subtitle="Appears on every export — identifies the project and the submitting subcontractor."
        className="animate-rise"
      >
        <div className="grid gap-4 px-5 py-5 sm:grid-cols-3 sm:px-6">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-wide text-ink-secondary uppercase">
              Project name
            </span>
            <input
              className="field"
              placeholder="e.g. 80 Strand Level 4 CAT B"
              value={context.projectName}
              onChange={(e) => setContext({ ...context, projectName: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-wide text-ink-secondary uppercase">
              Target BREEAM rating
            </span>
            <input
              className="field"
              list="breeam-ratings"
              placeholder="e.g. Excellent"
              value={context.targetRating}
              onChange={(e) => setContext({ ...context, targetRating: e.target.value })}
            />
            <datalist id="breeam-ratings">
              {BREEAM_RATINGS.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-wide text-ink-secondary uppercase">
              Subcontractor
            </span>
            <input
              className="field"
              placeholder="e.g. Apex Interiors Ltd"
              value={context.subcontractor}
              onChange={(e) => setContext({ ...context, subcontractor: e.target.value })}
            />
          </label>
        </div>
      </SectionCard>

      {/* Materials */}
      <SectionCard
        title="Materials"
        subtitle="One row per product — certification evidence drives the BREEAM Mat credits."
        aside={
          <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-ink-secondary">
            {materials.length} {materials.length === 1 ? 'row' : 'rows'}
          </span>
        }
        className="animate-rise"
        style={{ animationDelay: '60ms' }}
      >
        <div className="table-scroll">
          <table className="w-full min-w-[980px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-paper/70 text-left text-[11px] font-semibold tracking-wide text-ink-secondary uppercase">
                <th className="px-4 py-3 sm:pl-6">Location / Use</th>
                <th className="px-3 py-3">Product</th>
                <th className="px-3 py-3">Manufacturer</th>
                <th className="px-3 py-3">Quantity</th>
                <th className="px-3 py-3">Recycled %</th>
                <th className="px-3 py-3">Certification (scheme / no.)</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 sm:pr-6">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {materials.map((row, index) => (
                <tr
                  key={row.id}
                  className="group animate-row-in border-b border-line/70 transition-colors duration-150 hover:bg-paper/50"
                >
                  <td className="px-2 py-1.5 sm:pl-4">
                    <input
                      className="field-invisible min-w-36"
                      placeholder="e.g. Partitions"
                      aria-label={`Material ${index + 1} location or use`}
                      value={row.location}
                      onChange={(e) => updateMaterial(row.id, { location: e.target.value })}
                    />
                  </td>
                  <td className="px-1 py-1.5">
                    <input
                      className="field-invisible min-w-40"
                      placeholder="e.g. SoundBloc 15mm"
                      aria-label={`Material ${index + 1} product`}
                      value={row.product}
                      onChange={(e) => updateMaterial(row.id, { product: e.target.value })}
                    />
                  </td>
                  <td className="px-1 py-1.5">
                    <input
                      className="field-invisible min-w-36"
                      placeholder="e.g. British Gypsum"
                      aria-label={`Material ${index + 1} manufacturer`}
                      value={row.manufacturer}
                      onChange={(e) => updateMaterial(row.id, { manufacturer: e.target.value })}
                    />
                  </td>
                  <td className="px-1 py-1.5">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        className="field-invisible w-24"
                        placeholder="0"
                        aria-label={`Material ${index + 1} quantity`}
                        value={row.quantity}
                        onChange={(e) => updateMaterial(row.id, { quantity: e.target.value })}
                      />
                      <select
                        className="field-invisible w-18 text-ink-secondary"
                        aria-label={`Material ${index + 1} unit`}
                        value={row.unit}
                        onChange={(e) => updateMaterial(row.id, { unit: e.target.value })}
                      >
                        {QUANTITY_UNITS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-1 py-1.5">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="field-invisible w-20"
                      placeholder="0"
                      aria-label={`Material ${index + 1} recycled content percentage`}
                      value={row.recycled}
                      onChange={(e) => updateMaterial(row.id, { recycled: e.target.value })}
                    />
                  </td>
                  <td className="px-1 py-1.5">
                    <input
                      className="field-invisible min-w-40"
                      placeholder="e.g. FSC C012345"
                      aria-label={`Material ${index + 1} certification`}
                      value={row.certification}
                      onChange={(e) => updateMaterial(row.id, { certification: e.target.value })}
                    />
                  </td>
                  <td className="px-1 py-1.5">
                    <select
                      className={`field-invisible min-w-32 rounded-full text-xs font-semibold ${STATUS_SELECT_TONE[row.status] ?? ''}`}
                      aria-label={`Material ${index + 1} status`}
                      value={row.status}
                      onChange={(e) => updateMaterial(row.id, { status: e.target.value })}
                    >
                      {MATERIAL_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5 text-right sm:pr-4">
                    <RemoveButton
                      onClick={() => removeMaterial(row.id)}
                      label={`Remove material row ${index + 1}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 sm:px-6">
          <AddRowButton onClick={addMaterial}>Add material</AddRowButton>
        </div>
      </SectionCard>

      {/* Waste */}
      <SectionCard
        title="Waste"
        subtitle="Site waste transfers by group — tonnage and destination feed the diversion rate."
        aside={
          <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-ink-secondary">
            {waste.length} {waste.length === 1 ? 'row' : 'rows'}
          </span>
        }
        className="animate-rise"
        style={{ animationDelay: '120ms' }}
      >
        <div className="table-scroll">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-paper/70 text-left text-[11px] font-semibold tracking-wide text-ink-secondary uppercase">
                <th className="px-4 py-3 sm:pl-6">Waste group</th>
                <th className="px-3 py-3">Tonnage (t)</th>
                <th className="px-3 py-3">Destination</th>
                <th className="px-3 py-3 sm:pr-6">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {waste.map((row, index) => (
                <tr
                  key={row.id}
                  className="group animate-row-in border-b border-line/70 transition-colors duration-150 hover:bg-paper/50"
                >
                  <td className="px-2 py-1.5 sm:pl-4">
                    <input
                      className="field-invisible min-w-44"
                      list="waste-groups"
                      placeholder="e.g. Plasterboard"
                      aria-label={`Waste ${index + 1} group`}
                      value={row.group}
                      onChange={(e) => updateWaste(row.id, { group: e.target.value })}
                    />
                  </td>
                  <td className="px-1 py-1.5">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="field-invisible w-28"
                      placeholder="0.00"
                      aria-label={`Waste ${index + 1} tonnage`}
                      value={row.tonnage}
                      onChange={(e) => updateWaste(row.id, { tonnage: e.target.value })}
                    />
                  </td>
                  <td className="px-1 py-1.5">
                    <select
                      className="field-invisible w-44"
                      aria-label={`Waste ${index + 1} destination`}
                      value={row.destination}
                      onChange={(e) => updateWaste(row.id, { destination: e.target.value })}
                    >
                      <option value="" disabled>
                        Select destination…
                      </option>
                      {WASTE_DESTINATIONS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5 text-right sm:pr-4">
                    <RemoveButton
                      onClick={() => removeWaste(row.id)}
                      label={`Remove waste row ${index + 1}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <datalist id="waste-groups">
            {WASTE_GROUPS.map((g) => (
              <option key={g} value={g} />
            ))}
          </datalist>
        </div>
        <div className="px-5 py-4 sm:px-6">
          <AddRowButton onClick={addWaste}>Add waste entry</AddRowButton>
        </div>
      </SectionCard>

      {/* Timber compliance */}
      <SectionCard className="animate-rise" style={{ animationDelay: '180ms' }}>
        <label className="group flex cursor-pointer items-start gap-4 px-5 py-5 sm:items-center sm:px-6">
          <span className="relative mt-0.5 inline-flex sm:mt-0">
            <input
              type="checkbox"
              checked={timberConfirmed}
              onChange={(e) => setTimberConfirmed(e.target.checked)}
              className="peer size-5 appearance-none rounded-md border-2 border-ink-muted/50 bg-white transition-all duration-150 group-hover:border-navy checked:border-lime checked:bg-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            />
            <CheckIcon className="pointer-events-none absolute inset-0 m-auto size-3.5 text-navy opacity-0 transition-opacity duration-150 peer-checked:opacity-100" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-ink">
              Timber legal & sustainable compliance
            </span>
            <span className="mt-0.5 block text-[13px] text-ink-secondary">
              I confirm all timber products supplied to this project are certified legal and
              sustainable under the UK Timber Regulation.
            </span>
          </span>
        </label>
      </SectionCard>

      {/* Export bar */}
      <section
        className="header-texture animate-rise overflow-hidden rounded-2xl bg-navy shadow-card"
        style={{ animationDelay: '240ms' }}
      >
        <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-base font-semibold text-white">Export this submission</h2>
            <p className="mt-1 text-[13px] text-white/60">
              Nothing is saved anywhere — the file you export{' '}
              <span className="font-semibold text-lime">is</span> the record.{' '}
              {materials.length} material {materials.length === 1 ? 'row' : 'rows'} ·{' '}
              {waste.length} waste {waste.length === 1 ? 'row' : 'rows'}
              {timberConfirmed && ' · timber confirmed'}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleCsv}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:border-white hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              <DownloadIcon className="size-4" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={handlePdf}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-lime px-5 py-2.5 text-sm font-bold text-navy shadow-[0_2px_12px_rgb(214_222_35/0.35)] transition-all duration-150 hover:bg-lime-dark hover:shadow-[0_2px_20px_rgb(214_222_35/0.5)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <DocIcon className="size-4" />
              Export PDF
            </button>
          </div>
        </div>
      </section>

      {/* Export toast */}
      {toast && (
        <div
          key={toast.id}
          role="status"
          className="animate-toast-in fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-navy-ink px-4 py-3 text-sm text-white shadow-card-hover"
        >
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-lime">
            <CheckIcon className="size-3.5 text-navy" />
          </span>
          <span>
            <span className="font-semibold">{toast.kind} exported</span>{' '}
            <span className="text-white/60">— {toast.filename}</span>
          </span>
        </div>
      )}
    </div>
  )
}
