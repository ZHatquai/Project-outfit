// Illustrative sample data for the ESG Dashboard tab.
// Static in this version — not connected to the Data Collection tab (see product-spec.md §12).

export const SAMPLE_PROJECTS = [
  {
    id: 'bishopsgate',
    name: '22 Bishopsgate Fit-Out',
    client: 'Fourfront Group',
    targetRating: 'Outstanding',
    status: 'on-track',
    statusLabel: 'On track',
    materialsCertified: 86,
    wasteDiverted: 94,
    subcontractors: 12,
    lastSubmission: '2 days ago',
    materials: [
      { location: 'Raised access floor', product: 'Kingspan RG3 600×600', manufacturer: 'Kingspan', quantity: '2,400 m²', recycled: 32, certification: 'BES 6001 · Excellent', status: 'Certified' },
      { location: 'Partitions', product: 'Gyproc SoundBloc 15mm', manufacturer: 'British Gypsum', quantity: '5,150 m²', recycled: 84, certification: 'BES 6001 · Very Good', status: 'Certified' },
      { location: 'Ceilings', product: 'Ultima+ OP 600×600', manufacturer: 'Armstrong', quantity: '2,120 m²', recycled: 71, certification: 'Cradle to Cradle Silver', status: 'Certified' },
      { location: 'Flooring', product: 'Tessera Layout carpet tile', manufacturer: 'Forbo', quantity: '1,860 m²', recycled: 58, certification: 'EPD S-P-01533', status: 'Certified' },
      { location: 'Joinery / doorsets', product: 'FD30 veneered doorsets', manufacturer: 'Shadbolt', quantity: '64 units', recycled: 0, certification: 'FSC C104232', status: 'Pending' },
    ],
    attention: [
      { severity: 'warn', title: 'Doorset FSC chain-of-custody', detail: 'Certificate uploaded but delivery notes not yet cross-referenced — evidence due before practical completion.' },
      { severity: 'warn', title: 'Adhesives VOC data', detail: 'Two flooring adhesives missing Emicode/EC1 declarations for the Hea 02 credit.' },
    ],
  },
  {
    id: 'riverside',
    name: 'Riverside House Refurb',
    client: 'Fourfront Group',
    targetRating: 'Excellent',
    status: 'at-risk',
    statusLabel: 'At risk',
    materialsCertified: 63,
    wasteDiverted: 81,
    subcontractors: 9,
    lastSubmission: '6 days ago',
    materials: [
      { location: 'Partitions', product: 'Optima 117 glazed system', manufacturer: 'Optima', quantity: '640 m²', recycled: 28, certification: 'EPD pending', status: 'Pending' },
      { location: 'Flooring', product: 'Marmoleum Real 2.5mm', manufacturer: 'Forbo', quantity: '1,180 m²', recycled: 43, certification: 'Cradle to Cradle Gold', status: 'Certified' },
      { location: 'Ceilings', product: 'Krios A 600×600', manufacturer: 'AMF', quantity: '980 m²', recycled: 55, certification: 'ISO 14001 (mfr)', status: 'Certified' },
      { location: 'Joinery / tea points', product: 'Egger MFC worktops', manufacturer: 'Egger', quantity: '46 m', recycled: 30, certification: 'PEFC 16-33-220', status: 'Certified' },
      { location: 'M&E containment', product: 'Galvanised cable tray', manufacturer: 'Legrand', quantity: '2.4 t', recycled: 0, certification: '—', status: 'Missing' },
    ],
    attention: [
      { severity: 'bad', title: 'M&E containment has no responsible-sourcing evidence', detail: 'No certification recorded for 2.4 t of galvanised steel — blocks the Mat 03 credit if unresolved.' },
      { severity: 'warn', title: 'Glazed partition EPD outstanding', detail: 'Manufacturer EPD promised for 4 weeks — chase before the next BREEAM evidence gateway.' },
      { severity: 'warn', title: 'Plasterboard offcut segregation slipping', detail: 'Week 14 site audit found plasterboard in the mixed skip — diversion rate trending down.' },
    ],
  },
  {
    id: 'kingscross',
    name: 'Kings Cross Office CAT B',
    client: 'Fourfront Group',
    targetRating: 'Excellent',
    status: 'behind',
    statusLabel: 'Behind',
    materialsCertified: 41,
    wasteDiverted: 68,
    subcontractors: 7,
    lastSubmission: '13 days ago',
    materials: [
      { location: 'Partitions', product: 'Metal stud & board system', manufacturer: 'Knauf', quantity: '3,300 m²', recycled: 62, certification: 'BES 6001 · Good', status: 'Certified' },
      { location: 'Flooring', product: 'Amtico Signature LVT', manufacturer: 'Amtico', quantity: '1,420 m²', recycled: 12, certification: '—', status: 'Missing' },
      { location: 'Ceilings / rafts', product: 'Heartfelt linear rafts', manufacturer: 'Hunter Douglas', quantity: '760 m²', recycled: 50, certification: 'C2C Bronze — expired', status: 'Missing' },
      { location: 'Joinery / feature wall', product: 'Oak slat acoustic panels', manufacturer: 'BCL Timber', quantity: '310 m²', recycled: 0, certification: 'FSC — awaiting cert no.', status: 'Pending' },
      { location: 'Furniture', product: 'Task chair recycled shell', manufacturer: 'Orangebox', quantity: '240 units', recycled: 71, certification: 'FISP', status: 'Certified' },
    ],
    attention: [
      { severity: 'bad', title: 'LVT flooring has no environmental certification', detail: '1,420 m² recorded with no EPD or responsible-sourcing scheme — largest single gap on the project.' },
      { severity: 'bad', title: 'Ceiling raft C2C certificate expired', detail: 'Certificate lapsed in March — request the renewal or an alternative scheme from Hunter Douglas.' },
      { severity: 'warn', title: 'Timber certification numbers missing', detail: 'Acoustic panelling claimed as FSC with no certificate number — cannot count towards Mat 03 yet.' },
      { severity: 'warn', title: 'No waste return for 2 weeks', detail: 'Last waste transfer data is 13 days old — diversion figure may be understated.' },
    ],
  },
]

export const BREEAM_RATINGS = ['Outstanding', 'Excellent', 'Very Good', 'Good', 'Pass']

export const MATERIAL_STATUSES = ['Certified', 'Pending', 'Missing']

export const WASTE_GROUPS = [
  'Plasterboard',
  'Timber',
  'Metals',
  'Concrete & inert',
  'Packaging',
  'Insulation',
  'Floor coverings',
  'Mixed / general',
]

export const WASTE_DESTINATIONS = [
  'Reuse',
  'Recycling',
  'Energy recovery',
  'Landfill',
]

export const QUANTITY_UNITS = ['m²', 'm', 'm³', 'kg', 't', 'units', 'L']
