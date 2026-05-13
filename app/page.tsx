'use client'

import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as I from '@/lib/icons'
import { CONTENT as C, type Lang, type Bilingual } from '@/lib/data'

const ACCENTS: Record<string, string> = {
  lime: '#c4f24a', violet: '#a78bfa', cyan: '#67e8f9', rose: '#fb7185', amber: '#fbbf24',
}

const setRootAccent = (hex: string) =>
  document.documentElement.style.setProperty('--accent', hex)

const pick = (v: Bilingual | undefined, lang: Lang): string =>
  typeof v === 'string' ? v : v?.[lang] ?? v?.en ?? ''

// ── Utility ──────────────────────────────────────────────────────────────────

const Magnet = memo(function Magnet({ children, strength = 22, className = '' }: {
  children: React.ReactNode; strength?: number; className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) / strength}px, ${(e.clientY - r.top - r.height / 2) / strength}px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-block mag ${className}`}>
      {children}
    </span>
  )
})

const KineticText = memo(function KineticText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="kin" aria-label={text}>
      {[...text].map((c, i) => (
        <span key={i} aria-hidden="true" style={{ animationDelay: `${delay + i * 0.025}s` }}>{c === ' ' ? ' ' : c}</span>
      ))}
    </span>
  )
})

const ShineCard = memo(function ShineCard({ className = '', children }: {
  className?: string; children: React.ReactNode
}) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return <div onMouseMove={onMove} className={`shine ${className}`}>{children}</div>
})

const SectionLabel = memo(function SectionLabel({ icon, text, center = false }: {
  icon: React.ReactNode; text: string; center?: boolean
}) {
  return (
    <div className={`inline-flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 ${center ? 'justify-center' : ''}`}>
      <span className="w-6 h-[1px] bg-zinc-700" />{icon}<span>{text}</span>
      <span className="w-6 h-[1px] bg-zinc-700" />
    </div>
  )
})

// ── Nav ──────────────────────────────────────────────────────────────────────

const Nav = memo(function Nav({ lang, setLang, onOpenTweaks }: {
  lang: Lang; setLang: (l: Lang) => void; onOpenTweaks: () => void
}) {
  const items = [
    { id: 'work',      es: 'Proyectos', en: 'Work' },
    { id: 'education', es: 'Educación', en: 'Education' },
    { id: 'contact',   es: 'Contacto',  en: 'Contact' },
  ]
  return (
    <nav className="fixed top-4 inset-x-0 z-50 flex flex-col items-center gap-2 px-4">
      <div className="flex items-center gap-1 rounded-full border border-line-2 bg-black/60 backdrop-blur-xl px-2 py-1.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,.8)]">
        <div className="flex items-center gap-2 pl-3 pr-4 py-1 border-r border-line-2">
          <span className="relative inline-flex w-2 h-2 rounded-full live-dot" style={{ background: 'var(--accent)' }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300">portfolio</span>
        </div>
        <div className="hidden md:flex items-center">
          {items.map(it => (
            <a key={it.id} href={`#${it.id}`}
              className="px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-400 hover:text-white transition-colors">
              {lang === 'es' ? it.es : it.en}
            </a>
          ))}
        </div>
        <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          className="ml-1 px-3 py-1.5 rounded-full bg-white/5 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 hover:bg-white/10">
          {lang.toUpperCase()}
        </button>
        <button onClick={onOpenTweaks}
          className="ml-1 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/5" aria-label="tweaks">
          <I.Settings size={14} />
        </button>
      </div>
      {/* Mobile nav links */}
      <div className="flex md:hidden items-center gap-1 rounded-full border border-line-2 bg-black/60 backdrop-blur-xl px-1.5 py-1 shadow-[0_10px_40px_-12px_rgba(0,0,0,.8)]">
        {items.map(it => (
          <a key={it.id} href={`#${it.id}`}
            className="px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold text-zinc-400 hover:text-white transition-colors">
            {lang === 'es' ? it.es : it.en}
          </a>
        ))}
      </div>
    </nav>
  )
})

// ── Hero ─────────────────────────────────────────────────────────────────────

const Hero = memo(function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="relative min-h-[78vh] flex items-center justify-center pt-28 md:pt-20 pb-6 overflow-hidden grain text-center">
      <div className="absolute inset-0 aurora drift pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] hero-grid" />
      <div className="absolute top-20 left-6 md:left-10 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">[ portfolio / 2026 ]</div>
      <div className="absolute top-20 right-6 md:right-10 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 text-right">{C.location}</div>
      <div className="absolute bottom-4 left-6 md:left-10 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">N° 01</div>
      <div className="absolute bottom-4 right-6 md:right-10 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">{lang === 'es' ? 'Desliza ↓' : 'Scroll ↓'}</div>

      <div className="relative max-w-[1400px] mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}
          className="inline-flex items-center gap-2 chip rounded-full px-3 py-1.5 bg-white/[0.03] mb-4">
          <span className="w-1.5 h-1.5 rounded-full blink" style={{ background: 'var(--accent)' }} />
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-300">{pick(C.available, lang)}</span>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .2 }}
          className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 mb-3">
          — {C.name} —
        </motion.div>

        <h1 className="font-display tracking-[-0.05em] leading-[0.85]">
          <div className="text-[clamp(2.4rem,9vw,8.5rem)]"><KineticText text="Full Stack" /></div>
          <div className="text-[clamp(2.4rem,9vw,8.5rem)] -mt-1">
            <span className="font-serif italic text-zinc-400"><KineticText text="Developer." delay={0.25} /></span>
          </div>
        </h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: 0.9 }}
          className="mt-5 mx-auto max-w-2xl text-base md:text-lg text-zinc-300 font-light leading-snug">
          <span className="text-white font-normal">{pick(C.subrole, lang)}.</span>{' '}
          <span className="text-zinc-400">
            {lang === 'es' ? 'Construyo software pragmático — del modelo de datos a la última animación.' : 'I build pragmatic software — from the data model to the final animation.'}
          </span>
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: 1.05 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Magnet>
            <a href="#contact" className="group inline-flex items-center gap-3 px-6 py-3 bg-accent text-black rounded-full text-[11px] font-bold uppercase tracking-[0.22em]">
              {lang === 'es' ? 'Contactarme' : 'Contact me'} <I.ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Magnet>
          {C.cv && (
            <Magnet>
              <a href={C.cv} className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-line-2 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-200 hover:border-zinc-500 transition-colors">
                <I.Download size={14} /> {lang === 'es' ? 'Descargar CV' : 'Download CV'}
              </a>
            </Magnet>
          )}
          <Magnet>
            <a href="#work" className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-line-2 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-200 hover:border-zinc-500 transition-colors">
              <I.Briefcase size={14} /> {lang === 'es' ? 'Ver proyectos' : 'View work'}
            </a>
          </Magnet>
        </motion.div>
      </div>
    </section>
  )
})

// ── Ticker ───────────────────────────────────────────────────────────────────

const TICKER_TECH = [...C.skills.languages, ...C.skills.frameworks, ...C.skills.craft, ...C.skills.ops]

const Ticker = memo(function Ticker() {
  const doubled = [...TICKER_TECH, ...TICKER_TECH]
  return (
    <div className="relative py-3.5 border-y border-line-2 overflow-hidden select-none">
      <div className="marquee-track gap-6">
        {doubled.map((label, i) => (
          <div key={i} className="flex items-center gap-6 flex-shrink-0">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-300">{label}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
})

const InfoTicker = memo(function InfoTicker({ lang }: { lang: Lang }) {
  const items = [
    lang === 'es' ? 'Disponible para remoto' : 'Open to remote',
    'React · Next.js · TypeScript',
    lang === 'es' ? 'Titulado Duoc UC 2025' : 'Duoc UC grad · 2025',
    'Django · PostgreSQL',
    lang === 'es' ? 'Respuesta en 24h' : 'Replies within 24h',
    'Mapbox · IA · Chatbots',
    lang === 'es' ? 'Chile · Trabajo remoto' : 'Chile · Remote-ready',
  ]
  return (
    <div className="relative border-y border-line-2 overflow-hidden bg-ink select-none">
      <div className="marquee-track flex whitespace-nowrap py-5">
        {[0, 1].map(pass => (
          <div key={pass} className="flex items-center gap-10 pr-10">
            {items.map((t, i) => (
              <div key={i} className="flex items-center gap-10 text-xl md:text-3xl font-display tracking-tight flex-shrink-0">
                <span className="text-white">{t}</span>
                <span style={{ color: 'var(--accent)' }}>✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
})

// ── GitHub types ──────────────────────────────────────────────────────────────

type GHRepo = {
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  description: string | null
  open_issues_count: number
}

// ── ProjectPreview ────────────────────────────────────────────────────────────

const ProjectPreview = memo(function ProjectPreview({ project }: { project: typeof C.projects[0] }) {
  if (project.title === 'BloodPoint') {
    return (
      <div className="absolute inset-0 stripes">
        <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/20 to-black/80" />
        <div className="absolute right-6 bottom-6 md:right-12 md:bottom-12 w-[200px] md:w-[240px] aspect-[9/19] rounded-[28px] bg-[#0b0b0d] border border-zinc-800 shadow-2xl overflow-hidden rotate-[6deg]">
          <div className="h-6 flex items-center justify-center bg-black"><div className="w-16 h-3 rounded-full bg-zinc-900" /></div>
          <div className="p-3 space-y-2">
            <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500">Donantes cerca</div>
            <div className="h-32 rounded-lg bg-[#0f0f11] relative overflow-hidden border border-zinc-900">
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 40%, rgba(196,242,74,.4), transparent 40%), radial-gradient(circle at 70% 70%, rgba(251,113,133,.3), transparent 40%)' }} />
              <div className="absolute" style={{ left: '28%', top: '38%' }}><div className="w-2 h-2 rounded-full pulse-ring" style={{ background: 'var(--accent)' }} /></div>
              <div className="absolute" style={{ left: '68%', top: '68%' }}><div className="w-2 h-2 rounded-full bg-[#fb7185]" /></div>
            </div>
            <div className="flex gap-1">
              <div className="flex-1 h-7 rounded text-[9px] font-bold uppercase tracking-wider text-black flex items-center justify-center" style={{ background: 'var(--accent)' }}>Donar</div>
              <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-800" />
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full rounded bg-zinc-900" /><div className="h-2 w-3/4 rounded bg-zinc-900" />
            </div>
          </div>
        </div>
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rotate-45 bg-[#fb7185]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">Mobile · Realtime map</span>
        </div>
      </div>
    )
  }
  return <div className="absolute inset-0 stripes" />
})

// ── Projects ─────────────────────────────────────────────────────────────────

const Projects = memo(function Projects({ lang, selectedId, setSelectedId }: {
  lang: Lang; selectedId: number | null; setSelectedId: (id: number | null) => void
}) {
  const featured = C.projects.find(p => p.featured) ?? C.projects[0]
  const repoPath = featured.link?.replace('https://github.com/', '') ?? ''
  const [ghRepo, setGhRepo] = useState<GHRepo | null>(null)

  useEffect(() => {
    if (!repoPath) return
    fetch(`https://api.github.com/repos/${repoPath}`)
      .then(r => { if (!r.ok) throw new Error(`GitHub ${r.status}`); return r.json() })
      .then((d: GHRepo) => setGhRepo(d))
      .catch(() => {})
  }, [repoPath])

  useEffect(() => {
    if (selectedId === null) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedId(null) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [selectedId, setSelectedId])

  const updatedAgo = ghRepo ? (() => {
    const diff = Date.now() - new Date(ghRepo.updated_at).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return lang === 'es' ? 'Hoy' : 'Today'
    if (days === 1) return lang === 'es' ? 'Ayer' : 'Yesterday'
    if (days < 30) return lang === 'es' ? `Hace ${days}d` : `${days}d ago`
    const months = Math.floor(days / 30)
    return lang === 'es' ? `Hace ${months}m` : `${months}mo ago`
  })() : null

  return (
    <section id="work" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-10">
          <SectionLabel center icon={<I.Briefcase size={14} />} text={lang === 'es' ? '02 · Proyectos destacados' : '02 · Selected work'} />
          <h2 className="mt-6 font-display text-4xl md:text-6xl tracking-[-0.04em] leading-[0.9]">
            {lang === 'es'
              ? <>Construido <span className="font-serif italic text-zinc-400">recientemente.</span></>
              : <>Recently <span className="font-serif italic text-zinc-400">shipped.</span></>}
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 max-w-6xl mx-auto">
          <div role="button" tabIndex={0}
            onClick={() => setSelectedId(featured.id)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId(featured.id)}
            aria-label={`Open ${featured.title} project details`}
            className="lg:col-span-8 relative h-[460px] md:h-[540px] rounded-[2rem] border border-line-2 cursor-pointer overflow-hidden group">
            <ProjectPreview project={featured} />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 chip rounded-full px-3 py-1.5 bg-black/60 backdrop-blur">
                  <I.Star size={11} style={{ color: 'var(--accent)' }} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300">{lang === 'es' ? 'Destacado' : 'Featured'}</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">{pick(featured.tag, lang)}</span>
              </div>
              <div>
                <h3 className="font-display text-5xl md:text-7xl tracking-[-0.04em] leading-none mb-4">{featured.title}</h3>
                <p className="max-w-lg text-zinc-300 text-base md:text-lg leading-snug mb-6">{pick(featured.summary, lang)}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {featured.tech.slice(0, 6).map(t => (
                    <span key={t} className="text-[9px] font-mono uppercase tracking-[0.22em] px-2.5 py-1 rounded-full chip bg-black/40 text-zinc-300">{t}</span>
                  ))}
                  {featured.tech.length > 6 && <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-zinc-500">+{featured.tech.length - 6}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 grid gap-4">
            {/* GitHub live stats */}
            <ShineCard className="relative h-[222px] md:h-[262px] rounded-[1.5rem] border border-line-2 overflow-hidden p-6 bg-[#0e0e10]">
              <div className="flex items-center gap-2 mb-4">
                <I.Github size={14} className="text-zinc-400" />
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">GitHub · {repoPath}</span>
              </div>
              {ghRepo ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-line-2 p-3 bg-black/30">
                      <div className="text-[10px] font-mono text-zinc-500 mb-1">★ Stars</div>
                      <div className="font-display text-2xl tracking-tight">{ghRepo.stargazers_count}</div>
                    </div>
                    <div className="rounded-xl border border-line-2 p-3 bg-black/30">
                      <div className="text-[10px] font-mono text-zinc-500 mb-1">⑂ Forks</div>
                      <div className="font-display text-2xl tracking-tight">{ghRepo.forks_count}</div>
                    </div>
                  </div>
                  {ghRepo.language && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                      <span className="text-[10px] font-mono text-zinc-400">{ghRepo.language}</span>
                    </div>
                  )}
                  {updatedAgo && (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                      <I.Clock size={10} /> {lang === 'es' ? `Actualizado ${updatedAgo}` : `Updated ${updatedAgo}`}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2 animate-pulse">
                  <div className="h-16 rounded-xl bg-zinc-800/50" />
                  <div className="h-4 w-24 rounded bg-zinc-800/50" />
                </div>
              )}
            </ShineCard>

            <a href={featured.link} target="_blank" rel="noreferrer"
              className="relative h-[222px] md:h-[262px] rounded-[1.5rem] border border-line-2 overflow-hidden p-6 bg-[#0e0e10] hover:border-zinc-600 transition-colors group flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <I.Github size={14} className="text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">{lang === 'es' ? 'Código fuente' : 'Source code'}</span>
              </div>
              <div>
                <div className="font-display text-2xl tracking-tight mb-2">github.com</div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors">
                  {repoPath} <I.ExternalLink size={11} />
                </div>
              </div>
            </a>
          </div>
        </div>

        <AnimatePresence>
          {selectedId !== null && (() => {
            const p = C.projects.find(x => x.id === selectedId)
            if (!p) return null
            return (
              <motion.div key="modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div onClick={() => setSelectedId(null)} className="absolute inset-0 bg-black/85 backdrop-blur-xl" />
                <motion.div className="relative w-full max-w-5xl bg-[#0d0d10] border border-line-2 rounded-[2rem] overflow-hidden max-h-[90vh] overflow-y-auto"
                  initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
                  <button onClick={() => setSelectedId(null)} aria-label="Cerrar proyecto"
                    className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-line-2 text-zinc-300 hover:text-white hover:bg-white/10 z-20">
                    <I.X size={18} />
                  </button>
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <ProjectPreview project={p} />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0d10] to-transparent" />
                  </div>
                  <div className="p-8 md:p-12 -mt-6 relative">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">{pick(p.tag, lang)}</span>
                      <span className="text-zinc-700">·</span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">{pick(p.role, lang)}</span>
                    </div>
                    <h3 className="font-display text-5xl md:text-7xl tracking-[-0.04em] leading-none mb-6">{p.title}</h3>
                    <p className="max-w-2xl text-zinc-300 text-lg leading-relaxed mb-8">{pick(p.description, lang)}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {p.tech.map(t => (
                        <span key={t} className="text-[10px] font-mono uppercase tracking-[0.22em] px-3 py-1.5 rounded-full chip bg-black/40 text-zinc-300">{t}</span>
                      ))}
                    </div>
                    {ghRepo && (
                      <div className="flex items-center gap-4 mb-8 text-[10px] font-mono text-zinc-500">
                        <span>★ {ghRepo.stargazers_count} stars</span>
                        <span>⑂ {ghRepo.forks_count} forks</span>
                        {ghRepo.language && <span>● {ghRepo.language}</span>}
                      </div>
                    )}
                    <a href={p.link ?? '#'} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] bg-accent">
                      {lang === 'es' ? 'Ver en GitHub' : 'View on GitHub'} <I.ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )
          })()}
        </AnimatePresence>
      </div>
    </section>
  )
})

// ── Education ────────────────────────────────────────────────────────────────

const Education = memo(function Education({ lang }: { lang: Lang }) {
  const e = C.education
  return (
    <section id="education" className="relative py-16 md:py-24 scroll-mt-20 border-t border-line-2">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <SectionLabel center icon={<I.Star size={14} />} text={lang === 'es' ? '01 · Educación' : '01 · Education'} />
          <h2 className="mt-6 font-display text-4xl md:text-6xl tracking-[-0.04em] leading-[0.95]">
            {lang === 'es'
              ? <>Formación <span className="font-serif italic text-zinc-400">continua.</span></>
              : <>Always <span className="font-serif italic text-zinc-400">learning.</span></>}
          </h2>
        </div>
        <ShineCard className="rounded-[1.5rem] border border-line-2 p-8 md:p-10 bg-[#0e0e10] mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500 mb-3">{e.period}</div>
              <div className="font-display text-3xl md:text-4xl tracking-tight">{pick(e.degree, lang)}</div>
              <div className="text-zinc-400 mt-2 text-sm uppercase tracking-[0.2em]">{e.institution}</div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent">
              <I.Check size={12} /><span className="text-[10px] font-bold uppercase tracking-[0.24em]">{pick(e.status, lang)}</span>
            </div>
          </div>
          <p className="text-zinc-400 leading-relaxed max-w-2xl">{pick(e.description, lang)}</p>
        </ShineCard>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-line-2 p-6 bg-[#0e0e10]">
            <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500 mb-4">{lang === 'es' ? 'Idiomas' : 'Languages'}</div>
            <div className="space-y-3">
              {C.languages.map(l => (
                <div key={l.name} className="flex items-center justify-between border-b border-line py-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3"><I.Globe size={14} className="text-zinc-500" /><span className="text-base font-semibold">{l.name}</span></div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-400">{pick(l.level, lang)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line-2 p-6 bg-[#0e0e10]">
            <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500 mb-4">{lang === 'es' ? 'Herramientas' : 'Tools'}</div>
            <div className="flex flex-wrap gap-2">
              {C.tools.map(t => (
                <div key={t.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line-2 bg-black/30">
                  <span className="text-sm font-semibold text-zinc-200">{t.name}</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-zinc-500">{pick(t.category, lang)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line-2 p-6 bg-[#0e0e10] sm:col-span-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500 mb-4">{lang === 'es' ? 'Lenguajes & Frameworks' : 'Languages & Frameworks'}</div>
            <div className="flex flex-wrap gap-2">
              {[...C.skills.languages, ...C.skills.frameworks].map(l => (
                <div key={l} className="flex items-center gap-2 px-4 py-2 rounded-full border border-line-2 bg-black/30">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                  <span className="text-sm font-semibold text-zinc-200">{l}</span>
                </div>
              ))}
            </div>
          </div>
          {C.certifications.length > 0 && (
            <div className="rounded-2xl border border-line-2 p-6 bg-[#0e0e10] sm:col-span-2">
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500 mb-4">{lang === 'es' ? 'Certificaciones' : 'Certifications'}</div>
              <ul className="space-y-3">
                {C.certifications.map(c => (
                  <li key={c} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />{c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
})

// ── Contact ───────────────────────────────────────────────────────────────────

const Contact = memo(function Contact({ lang }: { lang: Lang }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(C.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch {}
  }
  const links: [string, (p: { size?: number }) => React.ReactElement, string][] = ([
    ['GitHub',   I.Github,   C.github   ? `https://github.com/${C.github}` : ''],
    ['LinkedIn', I.Linkedin, C.linkedin],
    ['CV',       I.Download, C.cv],
  ] as [string, (p: { size?: number }) => React.ReactElement, string][]).filter(([,, href]) => !!href)
  return (
    <section id="contact" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-[2.5rem] overflow-hidden p-8 md:p-16 lg:p-20 text-center bg-accent">
          <div className="absolute inset-0 grain opacity-[0.35]" />
          <div className="relative z-10">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/60 mb-6">03 · {lang === 'es' ? 'Contacto' : "Contact"}</div>
            <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] tracking-[-0.04em] leading-[0.85] max-w-5xl mx-auto text-black">
              {lang === 'es'
                ? <>Construyamos <span className="font-serif italic">algo real.</span></>
                : <>{"Let's build "}<span className="font-serif italic">something real.</span></>}
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-black/70 text-base md:text-lg leading-relaxed">
              {lang === 'es' ? 'Abierto a posiciones full-stack, roles junior y colaboraciones. Respondo en menos de 24h.' : 'Open to full-stack roles, junior positions, and collaborations. I reply within 24h.'}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Magnet>
                <a href={`mailto:${C.email}`} className="inline-flex items-center gap-3 px-7 py-4 bg-black text-white rounded-full group">
                  <I.Mail size={16} /><span className="font-semibold text-sm">{C.email}</span>
                  <I.ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </Magnet>
              <button onClick={copy} className="inline-flex items-center gap-3 px-5 py-4 bg-black/10 text-black border border-black/20 rounded-full hover:bg-black/15 transition-colors">
                {copied ? <I.Check size={14} /> : <I.Copy size={14} />}
                <span className="font-semibold text-xs uppercase tracking-[0.18em]">{copied ? (lang === 'es' ? 'Copiado' : 'Copied') : (lang === 'es' ? 'Copiar' : 'Copy')}</span>
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2">
              {links.map(([label, Ic, href]) => (
                <a key={label} href={href} target={href !== '#' ? '_blank' : undefined} rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-black/10 border border-black/20 rounded-full hover:bg-black/15 text-black">
                  <Ic size={12} /><span className="text-[10px] font-mono uppercase tracking-[0.24em]">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

// ── Footer ────────────────────────────────────────────────────────────────────

const Footer = memo(function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-line-2 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500">
        <div>© 2026 {C.name} · {lang === 'es' ? 'Diseñado con cuidado' : 'Designed with care'}</div>
        <a href={`https://github.com/${C.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-zinc-300 transition-colors"><I.Github size={12} /><span>{C.github}</span></a>
      </div>
    </footer>
  )
})

// ── Tweaks ────────────────────────────────────────────────────────────────────

type TweakState = { accent: string; defaultLang: Lang }
const TWEAK_DEFAULTS: TweakState = { accent: '#c4f24a', defaultLang: 'es' }

function Tweaks({ open, onClose, state, setState }: {
  open: boolean; onClose: () => void; state: TweakState; setState: (s: TweakState) => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
          className="fixed bottom-6 right-6 z-[120] w-[300px] rounded-2xl border border-line-2 bg-[#0d0d10] p-5 shadow-[0_30px_60px_-12px_rgba(0,0,0,.9)]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-400"><I.Settings size={12} /> Tweaks</div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white"><I.X size={14} /></button>
          </div>
          <div className="space-y-5">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">Accent</div>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(ACCENTS).map(([k, v]) => (
                  <button key={k} onClick={() => setState({ ...state, accent: v })}
                    className={`w-9 h-9 rounded-full border-2 ${state.accent === v ? 'scale-110' : 'hover:scale-105'}`}
                    style={{ background: v, borderColor: state.accent === v ? '#fff' : 'transparent' }} aria-label={k} />
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">Language</div>
              <div className="grid grid-cols-2 gap-2">
                {(['es', 'en'] as Lang[]).map(l => (
                  <button key={l} onClick={() => setState({ ...state, defaultLang: l })}
                    className={`px-3 py-2 rounded-lg border text-[10px] font-mono uppercase tracking-[0.22em] ${state.defaultLang === l ? 'bg-white text-black border-white' : 'border-line-2 text-zinc-400 hover:text-white'}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [tweaks, setTweaks] = useState<TweakState>(TWEAK_DEFAULTS)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [tweaksOpen, setTweaksOpen] = useState(false)

  const lang = tweaks.defaultLang
  const setLang = (l: Lang) => setTweaks(prev => ({ ...prev, defaultLang: l }))

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('portfolio.tweaks') ?? 'null')
      const knownAccents = new Set(Object.values(ACCENTS))
      if (saved && knownAccents.has(saved.accent) && (saved.defaultLang === 'es' || saved.defaultLang === 'en')) {
        setTweaks(saved)
        setRootAccent(saved.accent)
        return
      }
    } catch {}
    setRootAccent(tweaks.accent)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => { setRootAccent(tweaks.accent) }, [tweaks.accent])
  useEffect(() => { try { localStorage.setItem('portfolio.tweaks', JSON.stringify(tweaks)) } catch {} }, [tweaks])

  return (
    <div className="min-h-screen relative">
      <Nav lang={lang} setLang={setLang} onOpenTweaks={() => setTweaksOpen(true)} />
      <Hero lang={lang} />
      <InfoTicker lang={lang} />
      <Education lang={lang} />
      <Projects lang={lang} selectedId={selectedId} setSelectedId={setSelectedId} />
      <Contact lang={lang} />
      <Footer lang={lang} />
      <Tweaks open={tweaksOpen} onClose={() => setTweaksOpen(false)} state={tweaks} setState={setTweaks} />
    </div>
  )
}
