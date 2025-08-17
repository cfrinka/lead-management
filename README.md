# Mini Seller Console

A modern React-based CRM application for managing leads and converting them into sales opportunities. Built with TypeScript, Tailwind CSS, and Vite for optimal performance and developer experience.

## 🚀 Features

- **Lead Management**: View, search, filter, and sort leads with pagination
- **Lead Details**: Edit lead information with real-time validation
- **Opportunity Conversion**: Convert qualified leads into sales opportunities
- **Responsive Design**: Mobile-first design that works on all devices
- **Persistent State**: Filters and pagination settings saved in localStorage
- **Real-time Updates**: Instant UI updates with simulated API calls

## 🛠 Technology Stack

### Frontend Framework
- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **Vite 7.1.2** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Lucide React 0.539.0** - Beautiful SVG icons
- **Custom Components** - Reusable UI components following atomic design

### Development Tools
- **ESLint 9.33.0** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - React support for Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic UI components
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Pagination.tsx
│   │   └── Select.tsx
│   ├── molecules/       # Composite components
│   │   ├── EmptyState.tsx
│   │   ├── FilterControls.tsx
│   │   ├── LeadCard.tsx
│   │   ├── LoadingState.tsx
│   │   └── StatusBadge.tsx
│   ├── LeadDetailPanel.tsx    # Lead editing modal
│   ├── LeadsList.tsx          # Main leads list view
│   └── OpportunitiesTable.tsx # Opportunities display
├── data/
│   └── leads.json       # Sample lead data
├── hooks/
│   └── useLocalStorage.ts     # Custom hook for persistence
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Main application component
├── App.css              # Global styles
├── index.css            # Tailwind imports
└── main.tsx             # Application entry point
```

## 🔄 Application Flows

### 1. Lead Management Flow
```
Load Application → Display Leads List → Apply Filters/Search → Paginate Results
                                    ↓
                              Click Lead Card → Open Detail Panel
```

### 2. Lead Editing Flow
```
Lead Detail Panel → Click Edit → Modify Fields → Validate Input → Save Changes
                                                              ↓
                                                    Update Lead List
```

### 3. Opportunity Conversion Flow
```
Lead Detail Panel → Convert to Opportunity → Fill Opportunity Form → Create Opportunity
                                                                  ↓
                                            Update Lead Status → Close Panel → Refresh Views
```

### 4. Data Persistence Flow
```
User Interaction → Update State → Save to localStorage → Restore on App Load
```

## 🎯 Key Components

### **App.tsx**
- Main application container
- State management for leads and opportunities
- Handles lead updates and opportunity creation
- Manages selected lead for detail panel

### **LeadsList.tsx**
- Displays paginated list of leads
- Implements search, filtering, and sorting
- Handles loading and error states
- Manages pagination controls

### **LeadDetailPanel.tsx**
- Modal for viewing/editing lead details
- Form validation for email and required fields
- Opportunity conversion form
- Simulated API calls with loading states

### **FilterControls.tsx**
- Search input with icon
- Status dropdown filter
- Sort field and direction controls
- Responsive layout for mobile/desktop

### **OpportunitiesTable.tsx**
- Tabular display of opportunities
- Stage-based badge coloring
- Currency formatting
- Empty state handling

## 🎨 Design Patterns

### **Atomic Design**
- **Atoms**: Basic UI elements (Button, Input, Badge)
- **Molecules**: Composite components (LeadCard, FilterControls)
- **Organisms**: Complex components (LeadsList, OpportunitiesTable)

### **Component Composition**
- Props-based configuration
- Render props for flexibility
- Custom hooks for logic reuse

### **State Management**
- React hooks for local state
- Custom localStorage hook for persistence
- Prop drilling for component communication

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/cfrinka/lead-management
cd take-home

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔧 Configuration

### **Vite Configuration**
- React plugin for JSX support
- TypeScript compilation
- Hot module replacement (HMR)

### **Tailwind CSS**
- Utility-first styling approach
- Responsive design utilities
- Custom color palette
- Component-scoped styles

### **TypeScript**
- Strict type checking
- Interface definitions for all data models
- Generic components for reusability

## 📊 Data Models

### **Lead Interface**
```typescript
interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
}
```

### **Opportunity Interface**
```typescript
interface Opportunity {
  id: string;
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
  createdFrom?: string;
}
```

## 🎯 User Experience Features

- **Instant Search**: Real-time filtering as you type
- **Smart Pagination**: Automatic page reset on filter changes
- **Persistent Preferences**: Remembers your filter and pagination settings
- **Responsive Design**: Optimized for mobile and desktop
- **Loading States**: Clear feedback during data operations
- **Form Validation**: Real-time validation with helpful error messages
- **Accessibility**: Keyboard navigation and screen reader support

## 🔮 Future Enhancements

- Real API integration
- Advanced filtering options
- Bulk operations
- Lead assignment and ownership
- Activity tracking and notes
- Email integration
- Reporting and analytics dashboard
