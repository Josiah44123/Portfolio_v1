# Student Portfolio - Technical Documentation

## 1. TECH STACK & LANGUAGE OVERVIEW

### Core Technologies
- **Framework**: Next.js 16 (React meta-framework with App Router)
- **Language**: TypeScript 5 (type-safe JavaScript)
- **Styling**: Tailwind CSS 4 with PostCSS
- **UI Component System**: Radix UI (headless components) + Custom components
- **State Management**: React Hooks (useState, useEffect)
- **Icons**: Lucide React
- **Themes**: next-themes (dark/light mode support)
- **Analytics**: Vercel Analytics

### Project Dependencies (Package.json)
```
Runtime:
- next@16.2.10 (Web framework)
- react@19.2.0, react-dom@19.2.0 (UI library)
- typescript@5 (Type checking)
- tailwindcss@4.1.9 (CSS framework)
- @radix-ui/* (Accessible component primitives)
- lucide-react@0.454.0 (Icon library)
- next-themes@0.4.6 (Theme management)
- tailwind-merge, class-variance-authority, clsx (Utility helpers)

Dev:
- @tailwindcss/postcss (Tailwind PostCSS plugin)
- @types/react, @types/node (TypeScript definitions)
```

---

## 2. FILE-BY-FILE BREAKDOWN

### **Root Configuration Files**
| File | Purpose | Key Content |
|------|---------|------------|
| `package.json` | Project metadata & dependencies | Scripts: build, dev, start, lint |
| `tsconfig.json` | TypeScript configuration | Compiler options, path aliases |
| `next.config.js` | Next.js configuration | Framework-specific settings |
| `components.json` | Shadcn/UI configuration | Component registry & paths |

### **Application Structure**

#### **`app/` - Next.js App Router**

| File | Purpose | Responsibility |
|------|---------|-----------------|
| `app/layout.tsx` | Root layout wrapper | Sets up fonts (Inter, Geist Mono), ThemeProvider, Analytics, metadata (title, description, icons) |
| `app/page.tsx` | Home page | Orchestrates all sections; imports Navbar, HeroSection, AboutSection, JourneySection, ProjectsSection, etc. |
| `app/globals.css` | Global styling | Defines design tokens (colors via CSS custom properties in light/dark modes), animations (fade-in-up, pulse-glow, shimmer), glassmorphism utilities |

#### **`components/` - React Components**

**Main Section Components**
| Component | File | Responsibility |
|-----------|------|-----------------|
| Navbar | `navbar.tsx` | Fixed navigation with scroll detection, mobile menu, theme toggle, smooth hover effects |
| Hero Section | `hero-section.tsx` | Landing section with intro, CTA buttons, social links, scroll indicator |
| About Section | `about-section.tsx` | Personal bio and introduction |
| Journey Section | `journey-section.tsx` | Timeline of academic/professional milestones |
| **Projects Section** | `projects-section.tsx` | **Core requirement** - Displays 7 projects in grid with modals |
| **Contact Section** | `contact-section.tsx` | **Core requirement** - Contact form with toast notifications, centered layout |
| Skills Section | `skills-section.tsx` | Technical skills with progress visualization |
| Certifications Section | `certifications-section.tsx` | Achievements and certifications |
| Publications Section | `publications-section.tsx` | Published articles/content |
| Education Section | `education-section.tsx` | Academic background |
| Experience Section | `experience-section.tsx` | Work experience timeline |
| Footer | `footer.tsx` | Site footer with links |
| Theme Provider | `theme-provider.tsx` | Context provider for dark/light theme management |

**UI Components Library** (`components/ui/`)
| Component | Purpose | Usage |
|-----------|---------|-------|
| `button.tsx` | Accessible button component | CTA buttons, form submissions |
| `card.tsx` | Container component | Project card wrapper |
| `badge.tsx` | Tag/label component | Technology tags |
| `separator.tsx` | Divider component | Visual separation |
| `tabs.tsx` | Tabbed interface | Content switching |
| `modal.tsx` | Dialog overlay | Project details popup (not used in final, integrated inline) |
| `toast.tsx` | **Custom toast system** | Non-blocking notifications for form validation & success messages |

**Hooks** (`hooks/`)
| Hook | File | Purpose |
|------|------|---------|
| `use-in-view` | `use-in-view.tsx` | Intersection Observer - triggers animations when elements enter viewport |

**Utilities** (`lib/`)
| File | Purpose |
|------|---------|
| `utils.ts` | Helper functions (cn() for classname merging) |

---

## 3. REQUIREMENT EXECUTION MAP

### **REQUIREMENT 1: Navigation Bar (HTML/Components)**

**Location**: `components/navbar.tsx` (Lines 1-90)

**Implementation Details**:
```typescript
// STATE MANAGEMENT (Lines 20-24)
const [scrolled, setScrolled] = useState(false)          // Track scroll position
const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Mobile menu toggle
const [mounted, setMounted] = useState(false)            // Hydration state

// SCROLL DETECTION (Lines 26-33)
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 50)
  window.addEventListener("scroll", handleScroll)
  // Triggers navbar to add glass effect when scrolled
}

// NAVIGATION ITEMS (Lines 9-15)
const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  // ... 7 nav items total
]

// DESKTOP NAV (Lines 47-57)
.hidden md:flex items-center gap-8  // Show on desktop
Hover effect: smooth underline animation (group-hover:w-full)

// MOBILE NAV (Lines 85-91)
{mobileMenuOpen && (
  <div className="md:hidden glass mt-2">
    // Mobile menu dropdown with nav items
)}

// THEME TOGGLE (Lines 59-75)
<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  {theme === "dark" ? <Sun /> : <Moon />}
</button>
```

**CSS Classes Used**:
- `fixed top-0 left-0 right-0 z-50` - Fixed positioning
- `glass` - Glassmorphism (from globals.css: `bg-card/60 backdrop-blur-xl`)
- `transition-all duration-300` - Smooth animations

---

### **REQUIREMENT 2: Portfolio Section with Projects & Modals (HTML/Components + Interactivity)**

**Location**: `components/projects-section.tsx` (Lines 1-400+)

#### **2.1 Project Data Structure (Lines 9-190)**
```typescript
const projects = [
  {
    title: "VeriFund",              // Project name
    description: "...",              // Short description (3-line clamp on card)
    tags: ["Next.js", "React", ...], // Tech stack badges
    github: "https://...",           // Source code link
    demo: "https://...",             // Live demo link
    category: "Web App",             // Category filter
    icon: <Network />,               // Lucide icon
    color: "from-amber-400 to-yellow-500", // Gradient for title bar
    details: {                       // MODAL CONTENT (shown when "Learn More" clicked)
      overview: "...",
      features: ["Feature 1", "Feature 2", ...],
      technologies: ["Tech 1", ...],
      challenges: "...",
      outcome: "..."
    }
  },
  // ... 7 projects total (VeriFund, Chick Stacker, Productivity Hub, etc.)
]
```

#### **2.2 Component State Management (Lines 265-272)**
```typescript
const [filter, setFilter] = useState("All")                    // Category filter
const [activeColorIndex, setActiveColorIndex] = useState(0)    // Color cycling
const [selectedProject, setSelectedProject] = useState<any>(null) // Selected for modal
const { toasts, addToast, removeToast } = useToast()          // Toast system

const categories = ["All", "Web App", "Software", "Design"]
```

#### **2.3 Background Color Change on Title Click (Lines 218-225)**
**Requirement: "Clicking on a project title changes the background color of the portfolio section"**

```typescript
// In ProjectCard component (Line 220-225):
<h3 
  onClick={(e) => {
    e.stopPropagation()
    onClick()  // TRIGGERS COLOR CHANGE (Line 222)
  }}
  className="...cursor-pointer hover:underline"
>
  {project.title}
</h3>

// Click handler passed from ProjectsSection (Line 348):
onClick={() => setActiveColorIndex((prev) => (prev + 1) % backgroundColors.length)}

// Background gradient applied (Lines 304-310):
const backgroundColors = [
  "from-amber-400 to-orange-500",
  "from-orange-500 to-rose-500",
  "from-emerald-500 to-teal-500",
  // ... 6 total colors cycling through
]

// Rendered on backdrop (Lines 363-369):
<div 
  className={cn(
    "...bg-gradient-to-br",
    backgroundColors[activeColorIndex]  // CHANGES ON TITLE CLICK
  )} 
/>
```

**Visual Flow**:
1. User clicks project title
2. `onClick()` handler triggers
3. `setActiveColorIndex` increments and cycles through 6 gradient colors
4. Background glow updates with new gradient (200ms transition)

#### **2.4 Modal Popup for Project Details (Lines 356-410)**
**Requirement: "Each project has a separate modal which contains more details regarding the project"**

```typescript
// STATE FOR MODAL (Line 267):
const [selectedProject, setSelectedProject] = useState<any>(null)

// TRIGGER MODAL (Line 246):
<button onClick={(e) => { setSelectedProject(project) }}>
  Learn More
</button>

// MODAL OVERLAY & CONTENT (Lines 356-410):
{selectedProject && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    {/* Dark overlay (Line 359-363) */}
    <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedProject(null)} />
    
    {/* Modal container (Lines 365-410) */}
    <div className="relative w-full max-w-2xl max-h-[80vh] bg-background border border-border rounded-xl shadow-xl overflow-hidden">
      
      {/* Header with close button */}
      <div className="sticky top-0 flex items-center justify-between px-6 py-5">
        <h2 className="text-xl font-semibold">{selectedProject.title}</h2>
        <button onClick={() => setSelectedProject(null)}>
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Scrollable content */}
      <div className="overflow-y-auto max-h-[calc(80vh-64px)] px-6 py-6 space-y-8">
        
        {/* MODAL CONTENT (unique per project) */}
        <div>
          <p className="text-foreground/90">{selectedProject.details.overview}</p>
        </div>
        
        {/* Features list with arrow icons */}
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase">Key Features</h3>
          <ul className="space-y-3">
            {selectedProject.details.features.map((feature, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-primary mt-1">→</span>
                <span className="text-foreground/80">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Technologies tags */}
        <div className="flex flex-wrap gap-2">
          {selectedProject.details.technologies.map((tech, i) => (
            <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/15">
              {tech}
            </span>
          ))}
        </div>
        
        {/* Challenges & Outcome */}
        <div className="space-y-6 pt-4 border-t border-border">
          <div>
            <h3 className="text-sm font-semibold mb-2">Challenge</h3>
            <p className="text-foreground/80">{selectedProject.details.challenges}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Outcome</h3>
            <p className="text-foreground/80">{selectedProject.details.outcome}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
```

**Key Modal Features**:
- `fixed inset-0 z-50` - Full viewport overlay
- `bg-black/80 backdrop-blur-sm` - Dark semi-transparent backdrop
- `max-h-[80vh]` - 80% of viewport height
- `overflow-y-auto` - Internal scrolling for long content
- `sticky top-0` - Header stays visible when scrolling

#### **2.5 Project Grid Layout (Lines 340-351)**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
  {filteredProjects.map((project, idx) => (
    <ProjectCard 
      project={project} 
      idx={idx}
      onClick={() => setActiveColorIndex((prev) => (prev + 1) % backgroundColors.length)}
      onLearnMore={setSelectedProject}
      addToast={addToast}
    />
  ))}
</div>
```

**Grid Responsiveness**:
- Mobile: `grid-cols-1` (1 column)
- Tablet: `md:grid-cols-2` (2 columns, 768px+)
- Desktop: `lg:grid-cols-3` (3 columns, 1024px+)
- `auto-rows-fr` - Uniform height cards

---

### **REQUIREMENT 3: Contact Form with Submission Alert (HTML/Components + Interactivity)**

**Location**: `components/contact-section.tsx` (Lines 1-175)

#### **3.1 Form State Management (Lines 40-42)**
```typescript
const [formData, setFormData] = useState({ name: "", email: "", message: "" })
const [submitted, setSubmitted] = useState(false)
const { toasts, addToast, removeToast } = useToast()  // Toast system (not native alert)
```

#### **3.2 Form Input Handler (Lines 44-47)**
```typescript
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))  // Update specific field
}
```

#### **3.3 Form Submission with Toast Notifications (Lines 49-60)**
**Requirement: "Display an alert when the contact form is submitted"**

```typescript
const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  
  // VALIDATION
  if (formData.name && formData.email && formData.message) {
    // SUCCESS: Show green toast for 5 seconds
    addToast(`Thank you, ${formData.name}! I've received your message and will get back to you soon.`, "success", 5000)
    setFormData({ name: "", email: "", message: "" })  // Clear form
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  } else {
    // ERROR: Show red toast with validation error
    addToast("Please fill in all fields before submitting!", "error")
  }
}
```

**Why Toast Instead of Alert**:
- `alert()` is blocking and disruptive
- Toasts are non-blocking, styled, with auto-dismiss
- Better UX: user can continue interacting while notification shows

#### **3.4 Form UI Structure (Lines 81-154)**
```html
<!-- Centered header -->
<div className="text-center mb-12">
  <h2 className="flex items-center justify-center gap-3">Get In Touch!</h2>
  <div className="w-20 h-1 bg-primary mx-auto" />  <!-- Centered underline -->
</div>

<!-- Centered contact form container -->
<div className="glass rounded-xl p-8 mb-8 max-w-2xl mx-auto">
  <h3 className="text-xl font-bold mb-6 text-center">Send Me a Message</h3>
  
  <!-- Grid form layout: 2 columns on larger screens -->
  <form onSubmit={handleFormSubmit} className="space-y-4">
    <div className="grid sm:grid-cols-2 gap-4">
      <!-- Name field -->
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 focus:border-primary/50 focus:outline-none transition-colors"
        />
      </div>
      
      <!-- Email field -->
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your@email.com"
        />
      </div>
    </div>
    
    <!-- Message textarea -->
    <div>
      <label className="block text-sm font-medium mb-2">Message</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        rows={4}
        className="w-full px-4 py-2 rounded-lg resize-none"
      />
    </div>
    
    <!-- Submit button -->
    <button
      type="submit"
      className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-all"
    >
      Send Message
    </button>
    
    <!-- Success indicator -->
    {submitted && (
      <p className="text-center text-green-500 text-sm font-medium">
        Message submitted successfully! ✓
      </p>
    )}
  </form>
</div>

<!-- Contact links section -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {contactLinks.map(link => (
    <a href={link.href} className="...">
      {link.icon} {link.label}
    </a>
  ))}
</div>

<!-- Toast notifications container -->
<ToastContainer toasts={toasts} onRemove={removeToast} />
```

#### **3.5 Custom Toast System (components/ui/toast.tsx)**
**Implementation of Non-Blocking Notifications**:

```typescript
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: "success" | "error" | "info" = "info", duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { id, message, type, duration }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    }

    return id
  }

  return { toasts, addToast, removeToast }
}

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

// Individual toast with color coding
function Toast({ toast, onRemove }) {
  const bgColor = {
    success: "bg-green-500/10 border-green-500/30 text-green-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
    info: "bg-blue-500/10 border-blue-500/30 text-blue-400"
  }[toast.type]

  return (
    <div className={`${bgColor} border rounded-lg px-4 py-3 backdrop-blur-sm`}>
      {toast.message}
      <button onClick={() => onRemove(toast.id)}>
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
```

**Toast Features**:
- Located bottom-right (`fixed bottom-4 right-4`)
- Color-coded by type (green=success, red=error, blue=info)
- Auto-dismisses after duration (default 3s, form success 5s)
- Manually closeable with X button
- Smooth animations for enter/exit

---

## 4. STYLING IMPLEMENTATION (CSS & Tailwind)

### **4.1 Design System (globals.css, Lines 1-150)**

**Color Tokens (Design Variables)**:
```css
/* Light mode (default) */
:root {
  --background: oklch(0.98 0 0);      /* Near white */
  --foreground: oklch(0.15 0 0);      /* Near black */
  --primary: oklch(0.65 0.15 195);    /* Cyan/blue */
  --secondary: oklch(0.92 0.01 240);  /* Light blue-gray */
  --card: oklch(0.96 0.005 240);      /* Slightly blue-tinted white */
}

/* Dark mode */
.dark {
  --background: oklch(0.12 0.01 260); /* Very dark blue */
  --foreground: oklch(0.95 0.01 240); /* Off-white */
  --primary: oklch(0.72 0.18 195);    /* Bright cyan */
  --secondary: oklch(0.22 0.02 260);  /* Dark blue-gray */
  --card: oklch(0.16 0.015 260);      /* Very dark blue */
}
```

**Typography Tokens**:
```css
@theme inline {
  --font-sans: "Inter", "Geist", sans-serif;         /* Body text */
  --font-mono: "Geist Mono", monospace;              /* Code/Technical */
}
```

### **4.2 Custom Utilities (globals.css, Lines 200-230)**

```css
/* Glassmorphism effect */
.glass {
  @apply bg-card/60 backdrop-blur-xl border border-border/50;
  /* Semi-transparent card with blur background + border */
}

/* Glow effects */
.glow {
  box-shadow: 0 0 20px oklch(0.72 0.18 195 / 0.3);  /* Large glow */
}

.glow-sm {
  box-shadow: 0 0 10px oklch(0.72 0.18 195 / 0.2);  /* Small glow */
}
```

### **4.3 Custom Animations (globals.css, Lines 232-300)**

```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px oklch(...); }
  50% { box-shadow: 0 0 30px oklch(...); }
}
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer { animation: shimmer 1.5s ease-in-out infinite; }
```

### **4.4 Tailwind Responsive Patterns**

**Mobile-First Breakpoints**:
```
- Mobile default: full-width, single column
- sm: 640px (tablets)
- md: 768px (small desktop)
- lg: 1024px (desktop)
- xl: 1280px (large desktop)
```

**Example from Projects Section**:
```html
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- 1 column mobile → 2 columns tablet → 3 columns desktop -->
</div>
```

---

## 5. INTERACTION FLOW DIAGRAMS

### **Flow 1: Project Title Click → Background Color Change**
```
User clicks project title
    ↓
ProjectCard component onClick handler fires (stopPropagation)
    ↓
onClick() callback invoked with setActiveColorIndex
    ↓
activeColorIndex increments: (prev) => (prev + 1) % backgroundColors.length
    ↓
backgroundColors[activeColorIndex] updates (cycles through 6 gradients)
    ↓
Backdrop glow div re-renders with new gradient
    ↓
Smooth 200ms transition: background color fades to new color
```

### **Flow 2: Contact Form Submission → Toast Notification**
```
User fills form (name, email, message)
    ↓
User clicks "Send Message" button
    ↓
handleFormSubmit triggered
    ↓
Validation: Check all fields filled
    ↓
  ┌─ YES → addToast("success message", "success", 5000)
  │        Form clears
  │        Toast appears bottom-right with green styling
  │        Auto-dismisses after 5 seconds
  │        User can close manually with X button
  │
  └─ NO → addToast("Fill in all fields!", "error")
           Toast appears with red styling
           Auto-dismisses after 3 seconds
```

### **Flow 3: Learn More Click → Modal Opens**
```
User clicks "Learn More" button on project card
    ↓
onLearnMore(project) callback invoked
    ↓
setSelectedProject(project) updates state
    ↓
Modal overlay renders with selectedProject data
    ↓
User sees:
  - Project title in header
  - Overview paragraph
  - Features list with → arrows
  - Technologies tags
  - Challenge & Outcome sections
  ↓
User clicks X or backdrop
    ↓
setSelectedProject(null)
    ↓
Modal dismounts with smooth fade animation
```

---

## 6. ACCESSIBILITY & PERFORMANCE NOTES

### **Accessibility Features**
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<form>`
- ARIA labels: `aria-label="Toggle theme"`, `aria-label="Close modal"`
- Keyboard navigation: Tab through nav items, form inputs, buttons
- Color contrast: Primary cyan meets WCAG AA standards on dark background
- Focus indicators: `:focus-visible` on interactive elements

### **Performance Optimizations**
- Lazy components via Next.js dynamic imports
- Images optimized (SVG icons from lucide-react)
- CSS animations use GPU-accelerated transforms (`translateY`, `translateX`, `scale`)
- Intersection Observer for scroll-triggered animations
- Event delegation: single scroll listener instead of per-element

---

## 7. DEPLOYMENT & ENVIRONMENT

- **Hosting**: Vercel (deployed at portfolio domain)
- **Analytics**: Vercel Analytics integration
- **Environment**: Next.js 16 with React 19 Server Components
- **Build Output**: Optimized static/dynamic routes
- **CSS Pipeline**: Tailwind JIT with PostCSS

