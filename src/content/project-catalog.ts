export type ResultIcon = 'trend' | 'clock' | 'cart' | 'users' | 'star' | 'shield';
export type AccentKey = 'cyan' | 'purple' | 'pink' | 'green' | 'blue';

export interface ProjectMeta {
  id: string;
  title: string;
  year: string;
  link: string;
  accent: AccentKey;
  technologies: {name: string; link: string}[];
  results: {icon: ResultIcon}[];
}

export const projectCatalog: ProjectMeta[] = [
  {
    id: 'elle',
    title: 'Elle',
    year: '2025',
    link: 'https://loja.elle.com.br',
    accent: 'pink',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'cart'}, {icon: 'star'}, {icon: 'users'}],
  },
  {
    id: 'dpaschoal',
    title: 'Dpaschoal',
    year: '2025',
    link: 'https://www.dpaschoal.com.br',
    accent: 'green',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'cart'}, {icon: 'clock'}, {icon: 'shield'}],
  },
  {
    id: 'crisBarros',
    title: 'Cris Barros',
    year: '2024',
    link: 'https://www.crisbarros.com',
    accent: 'purple',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'star'}, {icon: 'cart'}, {icon: 'users'}],
  },
  {
    id: 'canal',
    title: 'Canal Concept',
    year: '2024',
    link: 'https://www.canal.com.br',
    accent: 'blue',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'Wake', link: 'https://wake.tech'},
    ],
    results: [{icon: 'cart'}, {icon: 'users'}, {icon: 'star'}],
  },
  {
    id: 'fares',
    title: 'Clínica Fares',
    year: '2025',
    link: 'https://www.clinicafares.com.br/',
    accent: 'cyan',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'Wake', link: 'https://wake.tech'},
    ],
    results: [{icon: 'users'}, {icon: 'shield'}, {icon: 'clock'}],
  },
  {
    id: 'orit',
    title: 'Orit',
    year: '2024',
    link: 'https://www.orit.com.br/',
    accent: 'pink',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'Wake', link: 'https://wake.tech'},
    ],
    results: [{icon: 'shield'}, {icon: 'star'}, {icon: 'cart'}],
  },
  {
    id: 'primeGuns',
    title: 'Prime Guns',
    year: '2026',
    link: 'https://www.primeguns.com.br',
    accent: 'green',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'shield'}, {icon: 'cart'}, {icon: 'clock'}],
  },
  {
    id: 'leBlog',
    title: 'Le Blog Store',
    year: '2025',
    link: 'https://www.leblogstore.com.br',
    accent: 'purple',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'users'}, {icon: 'cart'}, {icon: 'trend'}],
  },
  {
    id: 'goldko',
    title: 'GoldKo',
    year: '2025',
    link: 'https://www.goldko.com.br',
    accent: 'pink',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'trend'}, {icon: 'cart'}, {icon: 'star'}],
  },
  {
    id: 'gama',
    title: 'GA.MA Italy',
    year: '2025',
    link: 'https://www.gamaitaly.com.br',
    accent: 'blue',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'trend'}, {icon: 'star'}, {icon: 'cart'}],
  },
  {
    id: 'toymania',
    title: 'Toymania',
    year: '2022',
    link: 'https://www.toymania.com.br',
    accent: 'cyan',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'clock'}, {icon: 'trend'}, {icon: 'cart'}],
  },
  {
    id: 'amakha',
    title: 'Amakha Paris',
    year: '2023',
    link: 'https://www.amakhaparis.com.br',
    accent: 'purple',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'users'}, {icon: 'cart'}, {icon: 'star'}],
  },
  {
    id: 'capodarte',
    title: 'Capodarte',
    year: '2026',
    link: 'https://www.capodarte.com.br/',
    accent: 'pink',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'star'}, {icon: 'cart'}, {icon: 'shield'}],
  },
  {
    id: 'farm',
    title: 'Farm Rio',
    year: '2024',
    link: 'https://www.farmrio.cl/',
    accent: 'green',
    technologies: [
      {name: 'Wicomm', link: 'https://www.wicomm.com.br/'},
      {name: 'VTEX', link: 'https://vtex.com'},
    ],
    results: [{icon: 'cart'}, {icon: 'clock'}, {icon: 'users'}],
  },
  {
    id: 'csp',
    title: 'CSP Forge',
    year: '2025',
    link: 'https://cspforge.simks.com.br',
    accent: 'cyan',
    technologies: [
      {name: 'Next.js', link: 'https://nextjs.org'},
      {name: 'TypeScript', link: 'https://www.typescriptlang.org'},
    ],
    results: [{icon: 'shield'}, {icon: 'star'}, {icon: 'clock'}],
  },
  {
    id: 'wakeRunner',
    title: 'Wake Runner',
    year: '2026',
    link: 'https://www.npmjs.com/package/wake-runner',
    accent: 'blue',
    technologies: [{name: 'Node.js', link: 'https://nodejs.org'}],
    results: [{icon: 'clock'}, {icon: 'shield'}, {icon: 'star'}],
  },
  {
    id: 'wakeMcp',
    title: 'Wake GraphQL MCP',
    year: '2026',
    link: 'https://www.npmjs.com/package/wake-graphql-mcp',
    accent: 'purple',
    technologies: [
      {name: 'Node.js', link: 'https://nodejs.org'},
      {name: 'TypeScript', link: 'https://www.typescriptlang.org'},
      {name: 'MCP SDK', link: 'https://modelcontextprotocol.io'},
    ],
    results: [{icon: 'shield'}, {icon: 'users'}, {icon: 'clock'}],
  },
  {
    id: 'treplica',
    title: 'Treplica',
    year: '2026',
    link: 'https://treplica.simks.com.br/',
    accent: 'green',
    technologies: [
      {name: 'Tauri', link: 'https://tauri.app'},
      {name: 'Rust', link: 'https://www.rust-lang.org'},
      {name: 'React', link: 'https://reactjs.org'},
    ],
    results: [{icon: 'shield'}, {icon: 'users'}, {icon: 'star'}],
  },
];
