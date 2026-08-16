import { useState } from 'react'
import { SAMPLE_PROJECTS } from '../data/samples.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { SectionCard, StatusPill, AlertIcon, ArrowRightIcon } from './ui.jsx'

// Animated single-hue meter: value counts up, bar fills. Identity comes from the
// label, not the fill color; the value wears ink, per the dataviz rules.
function StatMeter({ label, value, fillClass }) {
  const shown = useCountUp(value)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-semibold tracking-wide text-ink-secondary uppercase">
          {label}
        </span>
        <span className="text-xl font-bold tabular-nums text-ink">
          {shown}
          <span className="text-sm font-semibold text-ink-muted">%</span>
        </span>
      </div>
      <div
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper"
        role="img"
        aria-label={`${label}: ${value}%`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-900 ease-out ${fillClass}`}
          style={{ width: `${shown}%` }}
        />
      </div>
    </div>
  )
}

function ProjectCard({ project, selected, onSelect, delay }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`animate-rise group relative w-full rounded-2xl border bg-white p-5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
        selected
          ? 'border-navy shadow-card-hover ring-2 ring-lime'
          : 'border-line shadow-card hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-card-hover'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] leading-snug font-semibold text-ink">{project.name}</h3>
          <p className="mt-1 text-xs text-ink-secondary">
            Target BREEAM ·{' '}
            <span className="font-semibold text-ink">{project.targetRating}</span>
          </p>
        </div>
        <StatusPill tone={project.status}>{project.statusLabel}</StatusPill>
      </div>

      <div className="mt-5 space-y-4">
        <StatMeter
          label="Materials certified"
          value={project.materialsCertified}
          fillClass="bg-navy"
        />
        <StatMeter
          label="Waste diverted"
          value={project.wasteDiverted}
          fillClass="bg-lime"
        />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-3 text-xs text-ink-muted">
        <span>
          {project.subcontractors} subcontractors · last submission {project.lastSubmission}
        </span>
        <span
          className={`inline-flex items-center gap-1 font-semibold transition-all duration-200 ${
            selected
              ? 'text-navy'
              : 'text-ink-muted opacity-0 group-hover:opacity-100'
          }`}
        >
          {selected ? 'Viewing' : 'View'}
          <ArrowRightIcon className="size-3.5" />
        </span>
      </div>
    </button>
  )
}

const SEVERITY = {
  bad: { chip: 'bg-bad-bg text-bad-text', label: 'Action needed' },
  warn: { chip: 'bg-warn-bg text-warn-text', label: 'Chase evidence' },
}

export default function DashboardTab() {
  const [selectedId, setSelectedId] = useState(SAMPLE_PROJECTS[0].id)
  const project = SAMPLE_PROJECTS.find((p) => p.id === selectedId)

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="animate-rise flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-3 py-1 text-xs font-semibold text-ink-secondary">
          <span className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" aria-hidden="true" />
          Illustrative sample data — a preview of portfolio review once live submissions flow in
        </span>
      </div>

      {/* Project cards */}
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {SAMPLE_PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            selected={p.id === selectedId}
            onSelect={() => setSelectedId(p.id)}
            delay={i * 70}
          />
        ))}
      </div>

      {/* Selected project detail — keyed so switching projects replays the entrance */}
      <div key={project.id} className="space-y-5 sm:space-y-6">
        <SectionCard
          title={`Materials — ${project.name}`}
          subtitle="Every product this project's subcontractors have declared, with certification status."
          aside={<StatusPill tone={project.status}>{project.statusLabel}</StatusPill>}
          className="animate-rise"
        >
          <div className="table-scroll">
            <table className="w-full min-w-[860px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-paper/70 text-left text-[11px] font-semibold tracking-wide text-ink-secondary uppercase">
                  <th className="px-4 py-3 sm:pl-6">Location / Use</th>
                  <th className="px-3 py-3">Product</th>
                  <th className="px-3 py-3">Manufacturer</th>
                  <th className="px-3 py-3 text-right">Quantity</th>
                  <th className="px-3 py-3 text-right">Recycled %</th>
                  <th className="px-3 py-3">Certification</th>
                  <th className="px-3 py-3 sm:pr-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {project.materials.map((m, i) => (
                  <tr
                    key={`${project.id}-${i}`}
                    className="animate-row-in border-b border-line/70 transition-colors duration-150 last:border-0 hover:bg-paper/50"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <td className="px-4 py-3 font-medium text-ink sm:pl-6">{m.location}</td>
                    <td className="px-3 py-3 text-ink-secondary">{m.product}</td>
                    <td className="px-3 py-3 text-ink-secondary">{m.manufacturer}</td>
                    <td className="px-3 py-3 text-right tabular-nums text-ink-secondary">
                      {m.quantity}
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums text-ink-secondary">
                      {m.recycled}%
                    </td>
                    <td className="px-3 py-3 text-ink-secondary">{m.certification}</td>
                    <td className="px-3 py-3 sm:pr-6">
                      <StatusPill tone={m.status}>{m.status}</StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard
          title="Needs attention"
          subtitle={`Evidence gaps flagged on ${project.name} — resolve these before the next BREEAM assessment gateway.`}
          aside={
            <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-ink-secondary">
              {project.attention.length} flagged
            </span>
          }
          className="animate-rise"
          style={{ animationDelay: '80ms' }}
        >
          <ul className="divide-y divide-line/70">
            {project.attention.map((item, i) => {
              const severity = SEVERITY[item.severity] ?? SEVERITY.warn
              return (
                <li
                  key={`${project.id}-a-${i}`}
                  className="animate-row-in flex items-start gap-4 px-5 py-4 transition-colors duration-150 hover:bg-paper/50 sm:px-6"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span
                    className={`mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg ${severity.chip}`}
                  >
                    <AlertIcon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${severity.chip}`}
                      >
                        {severity.label}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-secondary">
                      {item.detail}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </SectionCard>
      </div>
    </div>
  )
}
