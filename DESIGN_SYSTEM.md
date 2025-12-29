# Design System Documentation

## UI Refresh & Modernization for Educational Platform

This document outlines the complete design system for the modernized driving education platform.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Border Radius & Shadows](#border-radius--shadows)
6. [Component Inventory](#component-inventory)
7. [Page Templates](#page-templates)
8. [Implementation Guide](#implementation-guide)
9. [Accessibility Guidelines](#accessibility-guidelines)
10. [Priority Implementation Plan](#priority-implementation-plan)

---

## Design Philosophy

### Core Principles

1. **Minimalist & Calm**: Reduce visual noise; fewer borders, colors, shadows
2. **Mobile-First**: Touch targets ≥44px; responsive layouts
3. **Clear Hierarchy**: Obvious primary actions on every page
4. **Readable**: High contrast, comfortable line heights
5. **Consistent**: Unified component system across all pages

### 10-Second Clarity Test

Every page should answer within 10 seconds:
- **Where am I?** → Clear page title + breadcrumb
- **What should I do next?** → Single prominent CTA
- **How do I continue learning?** → "Continue" card always visible

---

## Color Palette

### Primary Colors (Teal)

A sophisticated alternative to bright green. Professional, calming, educational.

| Token | Value | Usage |
|-------|-------|-------|
| `primary-50` | `#f0fdfa` | Backgrounds, hover states |
| `primary-100` | `#ccfbf1` | Light backgrounds |
| `primary-500` | `#14b8a6` | Interactive elements |
| `primary-600` | `#0d9488` | Primary buttons, links |
| `primary-700` | `#0f766e` | Button hover, active states |

```css
/* CSS Variables */
--color-primary-600: #0d9488;
```

### Neutral Colors (Slate)

Modern gray scale for text, borders, backgrounds.

| Token | Value | Usage |
|-------|-------|-------|
| `neutral-0` | `#ffffff` | Card backgrounds |
| `neutral-50` | `#f8fafc` | Page backgrounds |
| `neutral-100` | `#f1f5f9` | Subtle backgrounds |
| `neutral-200` | `#e2e8f0` | Borders, dividers |
| `neutral-500` | `#64748b` | Secondary text |
| `neutral-600` | `#475569` | Body text |
| `neutral-800` | `#1e293b` | Headings |

### Semantic Colors

| Purpose | Light | Main | Dark |
|---------|-------|------|------|
| Success | `#f0fdf4` | `#22c55e` | `#16a34a` |
| Warning | `#fffbeb` | `#f59e0b` | `#d97706` |
| Error | `#fef2f2` | `#ef4444` | `#dc2626` |
| Info | `#eff6ff` | `#3b82f6` | `#2563eb` |

---

## Typography

### Font Family

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| `xs` | 12px | 16px | Labels, badges |
| `sm` | 14px | 20px | Body small, captions |
| `base` | 16px | 24px | Body text |
| `lg` | 18px | 28px | Lead text |
| `xl` | 20px | 28px | Section titles |
| `2xl` | 24px | 32px | Page titles |
| `3xl` | 30px | 36px | Hero titles |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Normal | 400 | Body text |
| Medium | 500 | Buttons, labels |
| Semibold | 600 | Headings, emphasis |
| Bold | 700 | Page titles, strong emphasis |

---

## Spacing & Layout

### Spacing Scale

Base unit: **4px**

| Token | Value | Usage |
|-------|-------|-------|
| `1` | 4px | Tight gaps |
| `2` | 8px | Icon gaps, tight padding |
| `3` | 12px | Compact padding |
| `4` | 16px | Standard padding |
| `5` | 20px | Card padding |
| `6` | 24px | Section spacing |
| `8` | 32px | Large section spacing |
| `10` | 40px | Page margins |
| `12` | 48px | Hero sections |

### Layout Grid

```css
/* Max content width */
max-width: 1280px;

/* Container padding */
padding-left: 16px;  /* Mobile */
padding-left: 24px;  /* Desktop */
```

### Responsive Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |

---

## Border Radius & Shadows

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 6px | Small elements |
| `md` | 8px | Inputs, small cards |
| `lg` | 12px | Cards, modals |
| `xl` | 16px | Large cards |
| `2xl` | 20px | Hero sections |
| `full` | 9999px | Badges, pills |

### Shadows

**Philosophy**: Subtle, modern shadows. No heavy "boxy" effects.

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | `0 1px 2px rgba(0,0,0,0.03)` | Subtle lift |
| `sm` | `0 1px 3px rgba(0,0,0,0.04)` | Cards default |
| `md` | `0 4px 6px rgba(0,0,0,0.05)` | Elevated cards |
| `lg` | `0 10px 15px rgba(0,0,0,0.05)` | Dropdowns, modals |
| `card-hover` | `0 10px 40px rgba(15,118,110,0.12)` | Interactive card hover |

---

## Component Inventory

### Buttons

```jsx
import Button from './components/ui/Button'

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<Icon />}>With Icon</Button>
<Button rightIcon={<ArrowRight />}>Continue</Button>

// States
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>
```

### Cards

```jsx
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/Card'

// Variants
<Card variant="default">Default card</Card>
<Card variant="interactive" onClick={handler}>Clickable</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="flat">Flat with border</Card>

// With structure
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Badges

```jsx
import Badge from './components/ui/Badge'

<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="neutral">Neutral</Badge>

// With dot indicator
<Badge variant="error" dot>Live</Badge>
```

### Progress

```jsx
import Progress, { ProgressCircle } from './components/ui/Progress'

// Bar
<Progress value={45} max={100} />
<Progress value={45} showLabel />
<Progress value={45} variant="success" size="lg" />

// Circle
<ProgressCircle value={45} max={100} size={48} />
```

### Inputs

```jsx
import Input, { SearchInput } from './components/ui/Input'

<Input placeholder="Enter text" />
<Input error="Error message" />
<Input leftIcon={<Icon />} />

<SearchInput placeholder="Search..." />
```

### Chips / Filter Tags

```jsx
import Chip, { ChipGroup } from './components/ui/Chip'

<ChipGroup>
  <Chip active={filter === 'all'} onClick={() => setFilter('all')}>All</Chip>
  <Chip active={filter === 'new'} onClick={() => setFilter('new')}>New</Chip>
  <Chip active={filter === 'completed'} onClick={() => setFilter('completed')}>Completed</Chip>
</ChipGroup>
```

### Tabs

```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3" disabled>Locked</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Modal

```jsx
import Modal, { ModalFooter } from './components/ui/Modal'

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  description="Optional description"
  size="md" // sm, md, lg, xl, full
>
  <p>Modal content</p>
  <ModalFooter>
    <Button variant="ghost" onClick={onClose}>Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </ModalFooter>
</Modal>
```

### Drawer (Mobile)

```jsx
import Drawer from './components/ui/Drawer'

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Menu"
  position="bottom" // left, right, bottom
>
  Content
</Drawer>
```

### Toast

```jsx
import Toast from './components/ui/Toast'

{toast && (
  <Toast
    message={toast.message}
    variant="success" // success, error, warning, info
    onClose={() => setToast(null)}
    duration={3000}
  />
)}
```

---

## Page Templates

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ Header (sticky)                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Logo    [Search]    [Lang] [Notifications] [Avatar] │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Welcome Section                                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Continue Learning Card (Hero)                    │   │
│  │ [Last topic] [Progress] [Continue Button]        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Module Cards (2x4 grid on desktop, 2x2 on mobile)     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐          │
│  │Topics  │ │Videos  │ │Tests   │ │Signs   │          │
│  └────────┘ └────────┘ └────────┘ └────────┘          │
│                                                         │
│  Two Column Layout                                      │
│  ┌────────────────────┐ ┌────────────────────┐         │
│  │ Recent Results     │ │ Upcoming Classes    │         │
│  │ • Result 1         │ │ • Class 1 (Live)    │         │
│  │ • Result 2         │ │ • Class 2           │         │
│  └────────────────────┘ └────────────────────┘         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Lesson Detail Layout

```
┌──────────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌─────────────────────────────────────────┐ │
│ │ Sidebar  │ │ Header (Topic title + progress)         │ │
│ │          │ ├─────────────────────────────────────────┤ │
│ │ Topics   │ │ Tab Navigation                          │ │
│ │ List     │ ├─────────────────────────────────────────┤ │
│ │          │ │                                         │ │
│ │ • M1 ✓   │ │  Content Area                          │ │
│ │ • M2     │ │  (Articles / Video / Questions)        │ │
│ │ • M3 ←   │ │                                         │ │
│ │ • M4     │ │                                         │ │
│ │          │ │                                         │ │
│ └──────────┘ └─────────────────────────────────────────┘ │
│              ┌─────────────────────────────────────────┐ │
│              │ [Previous] [Next Lesson] (Mobile only) │ │
│              └─────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### Road Signs Layout

```
┌──────────────────────────────────────────────────────────┐
│ Header + Search                                          │
├──────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌─────────────────────────────────────────┐ │
│ │ Groups   │ │ Signs Grid (2 columns)                  │ │
│ │ Sidebar  │ │ ┌─────────────┐ ┌─────────────┐        │ │
│ │          │ │ │ Sign Card   │ │ Sign Card   │        │ │
│ │ • All    │ │ │ [img] text  │ │ [img] text  │        │ │
│ │ • Warn   │ │ └─────────────┘ └─────────────┘        │ │
│ │ • Stop   │ │ ┌─────────────┐ ┌─────────────┐        │ │
│ │ • Info   │ │ │ Sign Card   │ │ Sign Card   │        │ │
│ │          │ │ └─────────────┘ └─────────────┘        │ │
│ └──────────┘ └─────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Implementation Guide

### File Structure

```
src/
├── components/
│   ├── ui/                    # Design System Components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Input.jsx
│   │   ├── Progress.jsx
│   │   ├── Chip.jsx
│   │   ├── Tabs.jsx
│   │   ├── Modal.jsx
│   │   ├── Drawer.jsx
│   │   ├── Toast.jsx
│   │   ├── Avatar.jsx
│   │   └── index.js           # Barrel export
│   ├── Dashboard.jsx
│   ├── Sidebar.jsx
│   ├── Topics/
│   ├── RoadSigns/
│   └── OnlineClasses/
├── index.css                   # Design tokens + utilities
└── App.jsx
```

### Using Design Tokens

```jsx
// Import components
import { Button, Card, Badge, Progress } from './components/ui'

// Use Tailwind classes with design tokens
<div className="bg-neutral-50 text-neutral-800">
  <Card variant="interactive" className="p-6">
    <Badge variant="primary">New</Badge>
    <h3 className="text-lg font-semibold text-neutral-800">Title</h3>
    <p className="text-sm text-neutral-500">Description</p>
    <Progress value={45} className="mt-4" />
    <Button variant="primary" className="mt-4">
      Continue
    </Button>
  </Card>
</div>
```

### CSS Custom Properties

```css
/* Available in index.css */
:root {
  --color-primary-600: #0d9488;
  --color-neutral-800: #1e293b;
  --radius-xl: 1rem;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.04);
  --transition-base: 200ms ease;
}
```

---

## Accessibility Guidelines

### Color Contrast

- Body text on white: minimum 4.5:1
- Large text on white: minimum 3:1
- All colors tested for WCAG AA compliance

### Touch Targets

- Minimum size: 44×44px
- Adequate spacing between interactive elements

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Keyboard Navigation

- All interactive elements focusable
- Logical tab order
- Escape key closes modals/drawers

### Screen Reader Support

- Semantic HTML structure
- ARIA labels where needed
- Alt text for images

---

## Priority Implementation Plan

### Phase 1: Foundation (Week 1)
1. ✅ Design tokens (CSS variables)
2. ✅ Tailwind config update
3. ✅ UI component library
4. ✅ Header/Nav redesign
5. ✅ Dashboard page

### Phase 2: Core Pages (Week 2)
1. ✅ Sidebar modernization
2. ✅ Topics/Lesson page
3. ✅ Road Signs page
4. ⬜ Tests/Exam UI
5. ⬜ Online Classes refinement

### Phase 3: Polish (Week 3)
1. ⬜ Animation refinements
2. ⬜ Mobile drawer menu
3. ⬜ Lazy loading implementation
4. ⬜ Performance optimization
5. ⬜ Accessibility audit

### Phase 4: Testing (Week 4)
1. ⬜ Cross-browser testing
2. ⬜ Mobile device testing
3. ⬜ User feedback collection
4. ⬜ Final adjustments

---

## Quick Reference

### Common Patterns

```jsx
// Page container
<div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">

// Card grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Flex between
<div className="flex items-center justify-between">

// Section spacing
<section className="mb-8">

// Sticky header
<header className="sticky top-0 z-sticky bg-white border-b border-neutral-100">
```

### Color Usage Cheatsheet

| Element | Color |
|---------|-------|
| Page background | `neutral-50` |
| Card background | `white` |
| Primary button | `primary-600` |
| Body text | `neutral-600` |
| Headings | `neutral-800` |
| Secondary text | `neutral-500` |
| Borders | `neutral-100` or `neutral-200` |
| Disabled | `neutral-400` |

---

*Last updated: December 2024*
