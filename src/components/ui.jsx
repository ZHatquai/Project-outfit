// Small shared UI pieces — status pills, section cards, inline icons.

const STATUS_TONE = {
  'on-track': { bg: 'bg-good-bg', text: 'text-good-text', dot: 'bg-good-text' },
  'at-risk': { bg: 'bg-warn-bg', text: 'text-warn-text', dot: 'bg-warn-text' },
  behind: { bg: 'bg-bad-bg', text: 'text-bad-text', dot: 'bg-bad-text' },
  Certified: { bg: 'bg-good-bg', text: 'text-good-text', dot: 'bg-good-text' },
  Pending: { bg: 'bg-warn-bg', text: 'text-warn-text', dot: 'bg-warn-text' },
  Missing: { bg: 'bg-bad-bg', text: 'text-bad-text', dot: 'bg-bad-text' },
}

export function StatusPill({ tone, children, className = '' }) {
  const t = STATUS_TONE[tone] ?? STATUS_TONE.Pending
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${t.bg} ${t.text} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${t.dot}`} aria-hidden="true" />
      {children}
    </span>
  )
}

export function SectionCard({ title, subtitle, aside, children, className = '', style }) {
  return (
    <section
      className={`rounded-2xl border border-line bg-white shadow-card ${className}`}
      style={style}
    >
      {(title || aside) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink sm:text-base">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-xs text-ink-secondary sm:text-[13px]">{subtitle}</p>
            )}
          </div>
          {aside}
        </header>
      )}
      {children}
    </section>
  )
}

const icon = (path, viewBox = '0 0 20 20') =>
  function Icon({ className = 'size-4' }) {
    return (
      <svg
        viewBox={viewBox}
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        {path}
      </svg>
    )
  }

export const PlusIcon = icon(
  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />,
)

export const TrashIcon = icon(
  <path
    fillRule="evenodd"
    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482 41.03 41.03 0 0 0-2.365-.298V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
    clipRule="evenodd"
  />,
)

export const DownloadIcon = icon(
  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />,
)

export const DocIcon = icon(
  <path
    fillRule="evenodd"
    d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm2.25 8.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 3a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z"
    clipRule="evenodd"
  />,
)

export const CheckIcon = icon(
  <path
    fillRule="evenodd"
    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
    clipRule="evenodd"
  />,
)

export const AlertIcon = icon(
  <path
    fillRule="evenodd"
    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
    clipRule="evenodd"
  />,
)

export const ArrowRightIcon = icon(
  <path
    fillRule="evenodd"
    d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
    clipRule="evenodd"
  />,
)

export function LogoMark({ className = 'size-8' }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-md bg-lime ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-[27%] rounded-[3px] bg-navy" />
    </span>
  )
}
