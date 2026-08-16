import { useCallback, useRef, useState } from 'react'
import CollectionTab from './components/CollectionTab.jsx'
import DashboardTab from './components/DashboardTab.jsx'
import { LogoMark } from './components/ui.jsx'

const TABS = [
  {
    id: 'collection',
    label: 'Data Collection',
    headline: ['Submit ', 'material & waste', ' data'],
    blurb:
      'Structured compliance data for BREEAM and carbon reporting — no login, no database, nothing stored. Export the record when you’re done.',
  },
  {
    id: 'dashboard',
    label: 'ESG Dashboard',
    headline: ['Portfolio ', 'ESG', ' overview'],
    blurb:
      'A preview of what review across live fit-out projects looks like once structured submissions replace email threads.',
  },
]

const blankMaterial = (id) => ({
  id,
  location: '',
  product: '',
  manufacturer: '',
  quantity: '',
  unit: 'm²',
  recycled: '',
  certification: '',
  status: 'Pending',
})

const blankWaste = (id) => ({ id, group: '', tonnage: '', destination: '' })

// Session-only form state (product-spec.md: D2). Lives here so entered data
// survives switching tabs; it is gone when the browser tab closes.
function useCollectionForm() {
  const nextId = useRef(2)
  const newId = () => `row-${nextId.current++}`

  const [context, setContext] = useState({
    projectName: '',
    targetRating: '',
    subcontractor: '',
  })
  const [materials, setMaterials] = useState([blankMaterial('row-0')])
  const [waste, setWaste] = useState([blankWaste('row-1')])
  const [timberConfirmed, setTimberConfirmed] = useState(false)

  const addMaterial = useCallback(
    () => setMaterials((rows) => [...rows, blankMaterial(newId())]),
    [],
  )
  const updateMaterial = useCallback(
    (id, patch) =>
      setMaterials((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r))),
    [],
  )
  const removeMaterial = useCallback(
    (id) => setMaterials((rows) => rows.filter((r) => r.id !== id)),
    [],
  )

  const addWaste = useCallback(() => setWaste((rows) => [...rows, blankWaste(newId())]), [])
  const updateWaste = useCallback(
    (id, patch) =>
      setWaste((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r))),
    [],
  )
  const removeWaste = useCallback(
    (id) => setWaste((rows) => rows.filter((r) => r.id !== id)),
    [],
  )

  return {
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
  }
}

function TabToggle({ active, onChange }) {
  const activeIndex = TABS.findIndex((t) => t.id === active)
  return (
    <div
      role="tablist"
      aria-label="Views"
      className="relative grid w-full max-w-90 grid-cols-2 rounded-full border border-white/15 bg-white/8 p-1 backdrop-blur-sm"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-lime shadow-[0_2px_12px_rgb(214_222_35/0.4)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          type="button"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${
            active === tab.id ? 'text-navy' : 'text-white/70 hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('collection')
  const form = useCollectionForm()
  const tab = TABS.find((t) => t.id === activeTab)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Thin lime top bar */}
      <div className="h-1 bg-lime" aria-hidden="true" />

      {/* Navy header */}
      <header className="header-texture bg-navy">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <LogoMark className="size-9" />
              <div>
                <p className="text-[17px] leading-tight font-bold tracking-tight text-white">
                  Sustainable Fit-Out
                </p>
                <p className="text-xs font-medium text-white/50">
                  Fourfront Group · Material & Waste Compliance
                </p>
              </div>
            </div>
            <TabToggle active={activeTab} onChange={setActiveTab} />
          </div>

          <div key={activeTab} className="animate-fade-in pt-2 pb-8 sm:pt-4 sm:pb-10">
            <h1 className="max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-[28px]">
              {tab.headline[0]}
              <span className="underline decoration-lime decoration-[3px] underline-offset-8">
                {tab.headline[1]}
              </span>
              {tab.headline[2]}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-[15px]">
              {tab.blurb}
            </p>
          </div>
        </div>
        {/* Lime accent bar */}
        <div className="h-1 bg-lime" aria-hidden="true" />
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {activeTab === 'collection' ? <CollectionTab form={form} /> : <DashboardTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:px-6">
          <p className="flex items-center gap-2">
            <LogoMark className="size-4" />
            <span>
              <span className="font-semibold text-ink-secondary">Sustainable Fit-Out</span> — a
              Fourfront Group concept MVP
            </span>
          </p>
          <p>Session only — nothing you enter leaves this browser tab.</p>
        </div>
      </footer>
    </div>
  )
}
