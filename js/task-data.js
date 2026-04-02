/* =============================================
   task-data.js  — all static data (ONE declaration each)
   ============================================= */

const TAG_LABELS = {
  ml:       'ML Ops',
  backend:  'Backend',
  frontend: 'Frontend',
  data:     'Data',
  security: 'Security',
  ux:       'UX',
  docs:     'Docs',
};

const MENU_ITEMS = [
  { title: 'Sort by priority', action: 'sort'     },
  { title: 'Lock column',      action: 'lock'     },
  { title: 'Highlight column', action: 'highlight'},
  { title: 'Move all to Done', action: 'moveDone' },
];

const COLUMNS = [
  {
    id: 'backlog',
    title: 'Backlog',
    dotClass: 'column__dot--backlog',
    tasks: [
      {
        id: 't1',
        title: 'Multi-modal input support',
        desc: 'Accept images and PDFs alongside text prompts.',
        priority: 'high',
        tags: ['frontend', 'ml'],
        avatar: { initials: 'LS', img: 'https://i.pravatar.cc/80?img=47' },
        date: 'Mar 28 – Apr 4',
      },
      {
        id: 't2',
        title: 'Vector DB integration',
        desc: 'Connect Pinecone for long-term memory storage.',
        priority: 'medium',
        tags: ['backend', 'data'],
        avatar: { initials: 'RK', img: 'https://i.pravatar.cc/80?img=12' },
        date: 'Apr 1 – Apr 7',
      },
      {
        id: 't3',
        title: 'Rate-limit dashboard',
        desc: 'Visualise API quota usage per team member.',
        priority: 'low',
        tags: ['ux', 'frontend'],
        avatar: { initials: 'NP', img: '' },
        date: 'Apr 3 – Apr 7',
      },
    ],
  },
  {
    id: 'progress',
    title: 'In Progress',
    dotClass: 'column__dot--progress',
    tasks: [
      {
        id: 't4',
        title: 'Streaming response renderer',
        desc: 'Render token-by-token output with smooth animation.',
        priority: 'high',
        tags: ['frontend'],
        avatar: { initials: 'AS', img: 'https://i.pravatar.cc/80?img=33' },
        date: 'Mar 24 – Apr 2',
      },
      {
        id: 't5',
        title: 'Fine-tune evaluation harness',
        desc: 'Automated benchmarks across 6 model checkpoints.',
        priority: 'high',
        tags: ['ml', 'data'],
        avatar: { initials: 'JW', img: 'https://i.pravatar.cc/80?img=56' },
        date: 'Mar 26 – Apr 4',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    dotClass: 'column__dot--review',
    tasks: [
      {
        id: 't6',
        title: 'Prompt injection hardening',
        desc: 'Sanitise user inputs against known jailbreak patterns.',
        priority: 'high',
        tags: ['security', 'backend'],
        avatar: { initials: 'MO', img: 'https://i.pravatar.cc/80?img=21' },
        date: 'Mar 22 – Mar 30',
      },
      {
        id: 't7',
        title: 'Onboarding flow redesign',
        desc: 'New 3-step wizard with contextual tooltips.',
        priority: 'medium',
        tags: ['ux'],
        avatar: { initials: 'CL', img: 'https://i.pravatar.cc/80?img=9' },
        date: 'Mar 20 – Mar 28',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    dotClass: 'column__dot--done',
    tasks: [
      {
        id: 't8',
        title: 'Auth service migration',
        desc: 'Moved from Auth0 to Clerk, zero downtime.',
        priority: 'high',
        tags: ['backend', 'security'],
        avatar: { initials: 'LS', img: 'https://i.pravatar.cc/80?img=47' },
        date: 'Mar 10 – Mar 18',
        done: true,
      },
      {
        id: 't9',
        title: 'API docs refresh',
        desc: 'Full rewrite with OpenAPI 3.1 and live examples.',
        priority: 'low',
        tags: ['docs'],
        avatar: { initials: 'RK', img: 'https://i.pravatar.cc/80?img=12' },
        date: 'Mar 12 – Mar 20',
        done: true,
      },
    ],
  },
];