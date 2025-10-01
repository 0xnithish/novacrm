# Types Directory

This directory contains all shared TypeScript interfaces and types for the Nova CRM application.

## Organization

### Core Types

- **`lead.ts`** - Lead and deal management types
  - `Activity` - Activities like calls, emails, meetings
  - `Note` - Notes attached to leads
  - `Lead` - Main lead/deal interface
  - `SimpleLead` - Simplified lead for tables/lists

- **`task.ts`** - Task management types
  - `Task` - Individual task interface
  - Task-related enums and status types

- **`analytics.ts`** - Dashboard and metrics types
  - `PerformanceData` - Chart performance data
  - `RevenueData` - Revenue breakdown data
  - `KPIData` - Key performance indicators
  - `DashboardMetrics` - General dashboard metrics

- **`user.ts`** - User and authentication types
  - `User` - User account information
  - `UserProfile` - User profile data
  - `UserPreferences` - User settings and preferences

- **`common.ts`** - Shared utility types
  - `BaseEntity` - Common entity properties
  - `PaginatedResponse` - API pagination structure
  - `ApiResponse` - Standard API response format
  - Utility types for forms, filters, etc.

## Usage

### Import Individual Types
```typescript
import type { Lead, Activity, Note } from '@/types'
```

### Import from Specific Files
```typescript
import type { User, UserRole } from '@/types/user'
import type { Task, TaskStatus } from '@/types/task'
```

### Import Everything (Not Recommended)
```typescript
import type * as Types from '@/types'
```

## Best Practices

1. **Use `type` imports** - Always use `import type` for TypeScript interfaces
2. **Keep types generic** - Make types flexible enough to handle variations
3. **Document complex types** - Add JSDoc comments for complex interfaces
4. **Use consistent naming** - Follow PascalCase for interfaces, camelCase for properties
5. **Group related types** - Keep related interfaces in the same file

## Path Aliases

The following path aliases are configured in `tsconfig.json`:

- `@/types` - Points to the types directory root
- `@/types/*` - Points to specific type files

## Example Usage in Components

```typescript
// Component using lead types
import type { Lead, Activity } from '@/types'

interface LeadCardProps {
  lead: Lead
  onActivityAdd: (activity: Omit<Activity, 'id' | 'timestamp'>) => void
}

export function LeadCard({ lead, onActivityAdd }: LeadCardProps) {
  // Component implementation
}
```

## Migration Notes

All existing type definitions have been consolidated from:
- `hooks/useLeadDetails.ts` ✅ Migrated
- `lib/data/mock-data.ts` ✅ Migrated  
- Inline component types ✅ Migrated

The application now uses centralized types for better maintainability and consistency.