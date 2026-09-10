# SLKTrack Design System v2

**Supersedes v1** (red/black/white glassmorphism). Rebuilt per explicit reference to `docs/PROJECT STURUP MERZOUG ABDELMADJIDE.pdf`, page 2, "Photo 03" — a navy-sidebar / light-content dashboard with colored pastel stat cards. Produced via `ui-ux-pro-max` (`"industrial IoT operations enterprise dashboard deep blue navy premium"` → navy/slate dark palette; `"enterprise SaaS blue gradient light mode professional"` → light-mode navy+blue palette) and cross-checked against `frontend-design`'s warning that a "blue gradient hero on white" is a generic AI-design default — mitigated by keeping the signature Tool String element and by the fact the light/navy structure comes from the user's own reference image, not a default choice.

## Structural change from v1

- **v1**: full dark background everywhere, glassmorphism cards, red accent.
- **v2**: fixed navy sidebar (dark) + light content area (white/off-white cards with soft shadows, not glass) + blue gradient as brand accent. This matches Photo 03's structure exactly: dark chrome, light workspace.
- Both a dark-mode and light-mode variant exist for the content area; the sidebar stays navy in both (matching Photo 03, which doesn't have a light sidebar).

## Color tokens

### Brand (both modes)
| Token | Value | Role |
|---|---|---|
| `--brand` | `#2563eb` | Primary blue (buttons, links, active states) |
| `--brand-deep` | `#1e3a8a` | Gradient partner, pressed states |
| `--brand-navy` | `#0c1a3d` | Deepest gradient stop, sidebar base |

### Sidebar (fixed navy chrome, same in both modes)
| Token | Value |
|---|---|
| `--sidebar-bg` | `linear-gradient(180deg, #0f1b3d, #0a1330)` |
| `--sidebar-text` | `rgba(255,255,255,.72)` |
| `--sidebar-text-active` | `#ffffff` |
| `--sidebar-active-bg` | `rgba(37,99,235,.28)` |

### Light mode (default)
| Token | Value | Role |
|---|---|---|
| `--bg` | `#f4f6fa` | Page background |
| `--surface` | `#ffffff` | Cards |
| `--surface-2` | `#eef1f7` | Nested surfaces, table header |
| `--border` | `#e3e7ef` | Hairlines |
| `--text` | `#0f172a` | Primary text |
| `--text-muted` | `#64748b` | Secondary text |

### Dark mode
| Token | Value | Role |
|---|---|---|
| `--bg` | `#0a0e17` | Page background |
| `--surface` | `#121a2b` | Cards |
| `--surface-2` | `#182238` | Nested surfaces |
| `--border` | `rgba(255,255,255,.08)` | Hairlines |
| `--text` | `#f1f5f9` | Primary text |
| `--text-muted` | `#94a3b8` | Secondary text |

### Status (semantic — same in both modes, independent of brand blue)
Per Photo 03: each stat card gets its own pastel-tinted background, not a neutral card with a colored icon.
| Status | Icon/text color | Card background (light) | Card background (dark) |
|---|---|---|---|
| Total (neutral) | `#2563eb` | `#eaf1ff` | `rgba(37,99,235,.14)` |
| Available (ok) | `#16a34a` | `#eafbf0` | `rgba(22,163,74,.14)` |
| Reserved (warn) | `#d97706` | `#fef6e7` | `rgba(217,119,6,.14)` |
| Assigned (info) | `#0891b2` | `#e8f7fb` | `rgba(8,145,178,.14)` — **deliberately teal, not blue**, so it never reads as the brand accent |
| In Job (busy) | `#ea580c` | `#fef1e8` | `rgba(234,88,12,.14)` |
| Not Returned (danger) | `#dc2626` | `#fdecec` | `rgba(220,38,38,.16)`, pulse retained |

## Typography

Unchanged from v1, confirmed to keep: **Space Grotesk** (display/body) + **IBM Plex Mono** (IDs, serials, timestamps, badge labels).

## Layout & components

- **Sidebar**: fixed navy, same in light/dark mode — logo, nav items (active = blue-tinted pill), user info at bottom. No glass effect here; solid gradient per Photo 03.
- **Cards**: solid surface + `border` + soft shadow (`0 1px 2px rgba(0,0,0,.04), 0 8px 24px -12px rgba(0,0,0,.08)` in light; deeper/darker shadow in dark) — **not glassmorphism**. This is the biggest style change from v1: Photo 03's cards are opaque, not translucent.
- **Buttons**: solid blue gradient (`--brand` → `--brand-deep`), white text, no red anywhere.
- **Stat cards**: icon in a colored circular chip + pastel card background per status table above — directly matching Photo 03's colored stat-card row.
- **Donut chart**: unchanged mechanism (5 slices, capped, always labeled), recolored to the new status palette (teal Assigned instead of blue, to avoid clashing with brand blue).
- **Tool String Builder**: unchanged horizontal-chain layout (already matches Photo 03's own tool-string strip), recolored — component number badges now use the blue gradient instead of red.
- **Landing hero**: the Tool String signature element stays, glassmorphism kept *only* on the landing page's dark hero section (not in the app shell) since Photo 03 doesn't cover the landing page and the original brief's "cinematic hero" intent still applies there.

## Theme toggle

A light/dark toggle is added to the topbar (new — v1 had no toggle). Default: light, since that's what Photo 03 shows and what most users will demo in a lit room. Respects `prefers-color-scheme` on first load, user choice persisted to `localStorage`.

## Accessibility floor (unchanged)

Contrast ≥4.5:1, visible focus rings, ≥44×44px touch targets, `prefers-reduced-motion` respected, no emoji icons.
