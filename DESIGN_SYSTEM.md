# Modern Design System - DDA Web

## Design Philosophy

**Minimal • Calm • Learning-Focused**

This design system creates a peaceful, distraction-free environment for learning. Every element serves a purpose. Visual noise is eliminated through:
- Subtle borders and gentle shadows
- Generous whitespace and breathing room
- Consistent, readable typography
- A restrained color palette
- Icons used only when they add clarity

---

## Color System

### Primary Brand Color
The primary color is a professional, trustworthy green that conveys growth and success.

```css
--primary-50: #f0fdf5;   /* Very light backgrounds */
--primary-100: #dcfce8;  /* Light hover states */
--primary-200: #bbf7d1;  /* Subtle accents */
--primary-500: #22c55e;  /* Primary actions */
--primary-600: #16a34a;  /* Primary hover */
--primary-700: #15803d;  /* Primary pressed */
```

### Neutral Palette
Grays provide structure without competing for attention.

```css
--gray-50: #fafafa;      /* Page background */
--gray-100: #f5f5f5;     /* Card backgrounds, subtle surfaces */
--gray-200: #e5e5e5;     /* Borders, separators */
--gray-300: #d4d4d4;     /* Disabled states */
--gray-400: #a3a3a3;     /* Placeholder text */
--gray-500: #737373;     /* Secondary text */
--gray-600: #525252;     /* Body text */
--gray-700: #404040;     /* Emphasis text */
--gray-900: #171717;     /* Headings */
```

### Semantic Colors

**Success**
```css
--success-50: #f0fdf4;
--success-500: #22c55e;
--success-600: #16a34a;
```

**Warning**
```css
--warning-50: #fffbeb;
--warning-500: #f59e0b;
--warning-600: #d97706;
```

**Error**
```css
--error-50: #fef2f2;
--error-500: #ef4444;
--error-600: #dc2626;
```

**Info**
```css
--info-50: #eff6ff;
--info-500: #3b82f6;
--info-600: #2563eb;
```

### Usage Guidelines
- **Primary Green**: CTAs, active states, progress indicators
- **Grays**: Text, borders, backgrounds, inactive elements
- **Semantic Colors**: Feedback, status indicators, badges only
- **Avoid**: Using multiple colors in the same context

---

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 
             'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

System fonts ensure instant loading and native feel.

### Type Scale

```css
--text-xs: 0.75rem;      /* 12px - captions, labels */
--text-sm: 0.875rem;     /* 14px - body small, secondary */
--text-base: 1rem;       /* 16px - body text (default) */
--text-lg: 1.125rem;     /* 18px - emphasized body */
--text-xl: 1.25rem;      /* 20px - section headings */
--text-2xl: 1.5rem;      /* 24px - page titles */
--text-3xl: 1.875rem;    /* 30px - hero headings */
```

### Font Weights

```css
--font-normal: 400;      /* Body text */
--font-medium: 500;      /* Emphasis, labels */
--font-semibold: 600;    /* Headings, buttons */
--font-bold: 700;        /* Strong emphasis (use sparingly) */
```

**Avoid**: font-black (900), too-heavy weights create visual noise.

### Line Height

```css
--leading-tight: 1.25;   /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Long-form content */
```

### Hierarchy Example

```
H1 (Page Title):     text-2xl (24px), font-semibold, text-gray-900
H2 (Section):        text-xl (20px), font-semibold, text-gray-900
H3 (Subsection):     text-lg (18px), font-semibold, text-gray-700
Body (Default):      text-base (16px), font-normal, text-gray-600
Body Emphasis:       text-base (16px), font-medium, text-gray-700
Small/Secondary:     text-sm (14px), font-normal, text-gray-500
Caption:             text-xs (12px), font-normal, text-gray-400
```

---

## Spacing System

Use consistent spacing multiples of 4px (Tailwind's default spacing scale).

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Component Spacing
- **Card padding**: 24px (space-6) on desktop, 16px (space-4) on mobile
- **Section gaps**: 32px (space-8) on desktop, 24px (space-6) on mobile
- **Element gaps**: 12px (space-3) to 16px (space-4)
- **Page margins**: 32px (space-8) on desktop, 16px (space-4) on mobile

---

## Radius & Shadows

### Border Radius

```css
--radius-sm: 0.5rem;    /* 8px - small elements, badges */
--radius-md: 0.75rem;   /* 12px - buttons, inputs */
--radius-lg: 1rem;      /* 16px - cards, containers */
--radius-xl: 1.5rem;    /* 24px - large panels */
```

### Shadows

Keep shadows **very subtle**. Avoid heavy box-shadows.

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
```

**Usage**:
- sm: floating elements, dropdown menus
- md: cards (default)
- lg: modals, elevated panels

---

## Component Library

### 1. Buttons

#### Primary Button
```jsx
<button className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors">
  Continue Learning
</button>
```

#### Secondary Button
```jsx
<button className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors">
  View Details
</button>
```

#### Ghost Button
```jsx
<button className="px-6 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-lg transition-colors">
  Skip
</button>
```

#### Destructive Button
```jsx
<button className="px-6 py-2.5 bg-error-500 hover:bg-error-600 text-white font-medium rounded-lg transition-colors">
  Delete
</button>
```

**Specs**:
- Min height: 44px (touch-friendly)
- Padding: 12px horizontal on mobile, 24px on desktop
- Font: text-base, font-medium
- Border radius: rounded-lg (12px)

---

### 2. Cards

#### Default Card
```jsx
<div className="bg-white rounded-lg border border-gray-100 p-6">
  {/* Content */}
</div>
```

#### Interactive Card (Hover State)
```jsx
<div className="bg-white rounded-lg border border-gray-100 p-6 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer">
  {/* Content */}
</div>
```

#### Stat Card
```jsx
<div className="bg-gray-50 rounded-lg border border-gray-100 p-6">
  <div className="text-gray-500 text-sm font-medium mb-1">Completed</div>
  <div className="text-gray-900 text-2xl font-semibold">24/50</div>
</div>
```

**Specs**:
- Background: white or gray-50 for subtle distinction
- Border: border-gray-100 (very subtle)
- Shadow: only on hover for interactive cards
- Border radius: rounded-lg (16px)
- Padding: p-6 (24px)

---

### 3. Progress Indicators

#### Progress Bar
```jsx
<div className="w-full bg-gray-100 rounded-full h-2">
  <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: '60%' }}></div>
</div>
```

#### Progress Circle Badge
```jsx
<div className="flex items-center gap-2">
  <span className="text-sm font-medium text-gray-700">Progress</span>
  <span className="text-sm font-medium text-primary-600">60%</span>
</div>
```

---

### 4. Badges

#### Success Badge
```jsx
<span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-success-50 text-success-700">
  Completed
</span>
```

#### Warning Badge
```jsx
<span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-warning-50 text-warning-700">
  In Progress
</span>
```

#### Info Badge
```jsx
<span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-info-50 text-info-700">
  New
</span>
```

#### Neutral Badge
```jsx
<span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
  Draft
</span>
```

---

### 5. Inputs & Forms

#### Text Input
```jsx
<input 
  type="text"
  placeholder="Search topics..."
  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
/>
```

#### Search Input (with icon)
```jsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  <input 
    type="text"
    placeholder="Search..."
    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  />
</div>
```

---

### 6. Navigation Elements

#### Tab Navigation (Segmented Control)
```jsx
<div className="inline-flex p-1 bg-gray-100 rounded-lg">
  <button className="px-4 py-2 text-sm font-medium rounded-md bg-white text-gray-900 shadow-sm">
    All
  </button>
  <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900">
    Completed
  </button>
  <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900">
    In Progress
  </button>
</div>
```

#### Filter Chips
```jsx
<div className="flex flex-wrap gap-2">
  <button className="px-3 py-1.5 text-sm font-medium bg-primary-50 text-primary-700 rounded-full">
    All Topics
  </button>
  <button className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50">
    Completed
  </button>
</div>
```

---

### 7. Modal

```jsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
  <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-gray-900">Modal Title</h2>
      <button className="text-gray-400 hover:text-gray-600">
        <X className="w-5 h-5" />
      </button>
    </div>
    <div className="text-gray-600 mb-6">
      {/* Content */}
    </div>
    <div className="flex gap-3 justify-end">
      <button className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
        Cancel
      </button>
      <button className="px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

### 8. Toast Notification

```jsx
<div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center flex-shrink-0">
      <Check className="w-3 h-3 text-white" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900">Success</p>
      <p className="text-sm text-gray-600">Your changes have been saved.</p>
    </div>
  </div>
</div>
```

---

## Layout Grid

### Container Max Width
```css
max-width: 1200px; /* Desktop content area */
```

### Responsive Breakpoints (Tailwind defaults)
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Layout Patterns

#### Two-Column Layout (Dashboard)
```jsx
<div className="max-w-[1200px] mx-auto px-4 lg:px-8">
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
    <main>{/* Main content */}</main>
    <aside>{/* Sidebar */}</aside>
  </div>
</div>
```

#### Content + Sidebar (Topics)
```jsx
<div className="flex h-screen">
  <aside className="w-80 border-r border-gray-100">{/* Sidebar */}</aside>
  <main className="flex-1">{/* Content */}</main>
</div>
```

---

## Icon Usage

### Guidelines
- Use lucide-react (already installed)
- Stroke width: 1.5 to 2 (not too thin, not too heavy)
- Size: w-5 h-5 (20px) for most UI elements
- Color: text-gray-500 for inactive, text-gray-700 for active
- Use icons to **support**, not replace, text labels

### Common Icons
```jsx
<BookOpen className="w-5 h-5" strokeWidth={2} />
<Video className="w-5 h-5" strokeWidth={2} />
<CheckCircle className="w-5 h-5" strokeWidth={2} />
<Clock className="w-5 h-5" strokeWidth={2} />
<User className="w-5 h-5" strokeWidth={2} />
```

---

## Accessibility

### Focus States
All interactive elements must have visible focus states:
```css
focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
```

### Color Contrast
- Body text (gray-600) on white: 7:1 (AAA)
- Headings (gray-900) on white: 16:1 (AAA)
- Primary button text on primary-500: 4.5:1 (AA)

### Touch Targets
- Minimum: 44x44px (WCAG 2.1 Level AAA)
- Buttons: min-h-11 (44px)
- Interactive cards: adequate padding

---

## Animation

### Principles
- Use animations sparingly
- Keep durations short (150-300ms)
- Prefer opacity and transform over color changes

### Transitions
```css
transition-colors    /* For color changes (hover states) */
transition-all       /* For multiple property changes */
duration-200         /* 200ms (default) */
ease-in-out         /* Smooth easing */
```

### Examples
```jsx
className="hover:bg-gray-50 transition-colors"
className="hover:shadow-md transition-all duration-200"
className="transform hover:-translate-y-0.5 transition-transform"
```

**Avoid**: Heavy animations, spinning elements, sliding drawers with slow durations.

---

## Implementation Priority

### Phase 1: Foundation (High Priority)
1. ✅ Design system documentation
2. Update Tailwind config with tokens
3. Create shared component library

### Phase 2: Core Pages
1. Dashboard/Home refresh
2. Topics/Lesson detail refresh
3. Header and navigation update

### Phase 3: Feature Pages
1. Road Signs section
2. Tests/Exam UI
3. Online Classes

### Phase 4: Polish
1. Mobile optimization
2. Loading states
3. Empty states
4. Error states

---

## File Structure

```
src/
├── components/
│   ├── ui/                 # Reusable design system components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   └── Progress.jsx
│   ├── layout/            # Layout components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Container.jsx
│   └── [feature]/         # Feature-specific components
│       └── ...
```

---

## Key Takeaways

✅ **DO:**
- Use generous whitespace
- Keep borders subtle (border-gray-100)
- Use one primary CTA per section
- Maintain consistent spacing (multiples of 4)
- Test on mobile devices

❌ **DON'T:**
- Use heavy shadows
- Mix multiple accent colors
- Over-use icons
- Create visual clutter
- Forget focus states
