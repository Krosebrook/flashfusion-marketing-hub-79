import { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, Loader2, Download, RefreshCw, AlertCircle, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export default function PRDGeneratorPage() {
  const [featureIdea, setFeatureIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPRD, setGeneratedPRD] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generatePRD = async () => {
    if (!featureIdea.trim()) {
      toast.error('Please enter a feature idea');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedPRD(null);

    try {
      // Simulate PRD generation with structured content
      const prd = generatePRDContent(featureIdea.trim());
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setGeneratedPRD(prd);
      toast.success('PRD generated successfully!');
    } catch (err) {
      console.error('PRD generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate PRD');
      toast.error('Failed to generate PRD');
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePRDContent = (idea: string): string => {
    const timestamp = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return `# Product Requirements Document (PRD)

**Feature Idea:** ${idea}  
**Date:** ${timestamp}  
**Version:** 1.0

---

## 1. Executive Summary

### High-Level Overview
This document outlines the product requirements for: ${idea}. This feature aims to enhance user experience, drive business value, and align with our strategic goals.

### Business Case and Goals
- **Primary Goal:** Deliver a solution that addresses user needs and market demands
- **Business Impact:** Increase user engagement, retention, and revenue opportunities
- **Strategic Alignment:** Support company vision and competitive positioning
- **Success Metrics:** User adoption rate, engagement metrics, customer satisfaction scores

---

## 2. Problem Statement

### Problem Description
Users currently face challenges that limit their ability to achieve their goals efficiently. The proposed feature addresses these pain points by providing a streamlined, intuitive solution.

### Who Experiences This Problem
- **Primary Users:** End users seeking to accomplish specific tasks or workflows
- **Secondary Users:** Administrators and support teams managing user experiences
- **Impact:** High - affects daily operations and user satisfaction

### Why It's Critical
- Competitive disadvantage without this feature
- User churn risk due to unmet needs
- Market opportunity for differentiation
- Direct impact on revenue and growth metrics

---

## 3. Target Audience / User Personas

### Persona 1: Power User
- **Role:** Frequent user requiring advanced capabilities
- **Goals:** Efficiency, customization, integration with existing workflows
- **Pain Points:** Limited features, time-consuming processes, lack of automation
- **Tech Savvy:** High

### Persona 2: Business User
- **Role:** Decision-maker focused on outcomes and ROI
- **Goals:** Clear insights, easy reporting, team collaboration
- **Pain Points:** Complex interfaces, poor data visibility, limited analytics
- **Tech Savvy:** Medium

### Persona 3: New User
- **Role:** First-time or occasional user
- **Goals:** Quick onboarding, intuitive interface, clear guidance
- **Pain Points:** Steep learning curve, unclear workflows, lack of support
- **Tech Savvy:** Low to Medium

---

## 4. Functional Requirements

### Core Features

#### Feature 1: User Interface
- Clean, intuitive design following modern UX principles
- Responsive layout supporting desktop, tablet, and mobile devices
- Accessibility compliance (WCAG 2.1 AA standards)
- Dark mode support

#### Feature 2: Data Management
- Create, read, update, delete (CRUD) operations
- Data validation and error handling
- Bulk operations support
- Export/import functionality

#### Feature 3: Integration
- RESTful API endpoints
- Webhooks for real-time notifications
- Third-party service integrations
- SSO support

#### Feature 4: Search and Filter
- Full-text search capabilities
- Advanced filtering options
- Saved searches and custom views
- Sort and pagination

### Edge Cases
- Handle empty states gracefully
- Manage concurrent user operations
- Address network failures and timeouts
- Support offline mode where applicable
- Handle large data volumes efficiently

---

## 5. Non-Functional Requirements

### Performance
- Page load time: < 2 seconds
- API response time: < 500ms for 95th percentile
- Support 10,000 concurrent users
- Database query optimization

### Scalability
- Horizontal scaling capability
- Auto-scaling based on load
- CDN for static assets
- Database sharding strategy

### Uptime and Reliability
- 99.9% uptime SLA
- Automated failover mechanisms
- Regular backup and disaster recovery
- Health monitoring and alerting

### Localization
- Support for multiple languages (i18n)
- Regional date/time formats
- Currency localization
- RTL language support

### Accessibility
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation
- Color contrast standards

---

## 6. User Stories & Acceptance Criteria

### Story 1: Basic User Flow
**As a** user  
**I want to** access the main feature functionality  
**So that** I can accomplish my primary task efficiently

**Acceptance Criteria:**
- **Given** I am an authenticated user
- **When** I navigate to the feature page
- **Then** I should see the main interface within 2 seconds
- **And** all interactive elements should be accessible via keyboard
- **And** the interface should be responsive on mobile devices

### Story 2: Data Operations
**As a** user  
**I want to** perform CRUD operations on my data  
**So that** I can manage my information effectively

**Acceptance Criteria:**
- **Given** I have the necessary permissions
- **When** I create/update/delete an item
- **Then** the operation should complete within 500ms
- **And** I should receive confirmation feedback
- **And** the changes should persist correctly
- **And** appropriate error messages should display for invalid inputs

### Story 3: Search and Filter
**As a** user  
**I want to** search and filter my data  
**So that** I can quickly find relevant information

**Acceptance Criteria:**
- **Given** I have data in the system
- **When** I enter search terms or apply filters
- **Then** results should update in real-time (< 300ms)
- **And** I should see the number of results found
- **And** I should be able to clear filters easily
- **And** my search preferences should be saved

---

## 7. Technical Architecture Overview

### High-Level System Design

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   API GW    │────▶│  Backend    │
│  (React)    │◀────│  (Gateway)  │◀────│  Services   │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                                        ┌─────────────┐
                                        │  Database   │
                                        │ (PostgreSQL)│
                                        └─────────────┘
\`\`\`

### Services Involved

**Frontend:**
- Framework: React 18+ with TypeScript
- State Management: React Context API + React Query
- UI Components: Shadcn/ui + Tailwind CSS
- Build Tool: Vite

**Backend:**
- Runtime: Node.js / Supabase Functions
- Framework: Express.js or similar
- Authentication: JWT-based auth
- API Style: RESTful

**Database:**
- Primary: PostgreSQL with Row Level Security
- Caching: Redis for session management
- Search: Full-text search capabilities

**Infrastructure:**
- Hosting: Cloud platform (AWS/Azure/GCP)
- CDN: CloudFront or similar
- Monitoring: Application Performance Monitoring (APM)

### Sequence Diagram: Primary User Flow

\`\`\`
User → Frontend: Open feature page
Frontend → API: GET /api/feature/data
API → Database: Query user data
Database → API: Return results
API → Frontend: JSON response
Frontend → User: Render interface
User → Frontend: Perform action
Frontend → API: POST /api/feature/action
API → Database: Update data
Database → API: Confirm update
API → Frontend: Success response
Frontend → User: Display confirmation
\`\`\`

---

## 8. API Design

### REST Endpoints

#### GET /api/v1/feature
**Description:** Retrieve feature data  
**Authentication:** Required (Bearer token)  
**Request Headers:**
\`\`\`json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
\`\`\`

**Query Parameters:**
- \`page\` (integer, optional): Page number for pagination (default: 1)
- \`limit\` (integer, optional): Items per page (default: 20, max: 100)
- \`search\` (string, optional): Search query
- \`filter\` (string, optional): Filter criteria

**Response (200 OK):**
\`\`\`json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "createdAt": "ISO8601 timestamp",
      "updatedAt": "ISO8601 timestamp"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
\`\`\`

#### POST /api/v1/feature
**Description:** Create new feature item  
**Authentication:** Required (Bearer token)  
**Request Body:**
\`\`\`json
{
  "name": "string (required, max 255 chars)",
  "description": "string (optional, max 1000 chars)",
  "metadata": {
    "key": "value"
  }
}
\`\`\`

**Response (201 Created):**
\`\`\`json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "createdAt": "ISO8601 timestamp"
}
\`\`\`

#### PUT /api/v1/feature/:id
**Description:** Update existing feature item  
**Authentication:** Required (Bearer token)

#### DELETE /api/v1/feature/:id
**Description:** Delete feature item  
**Authentication:** Required (Bearer token)

### Error Responses

**400 Bad Request:**
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": [
      {
        "field": "name",
        "message": "Name is required"
      }
    ]
  }
}
\`\`\`

**401 Unauthorized:**
\`\`\`json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
\`\`\`

**403 Forbidden:**
\`\`\`json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
\`\`\`

**404 Not Found:**
\`\`\`json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
\`\`\`

**500 Internal Server Error:**
\`\`\`json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
\`\`\`

### Authentication & Authorization
- **Authentication:** JWT tokens with 24-hour expiration
- **Token Refresh:** Refresh token mechanism for extended sessions
- **Rate Limiting:** 100 requests per minute per user
- **CORS:** Configured for approved domains only

---

## 9. UI/UX Considerations

### Page Layout

**Main Dashboard:**
- Header with navigation and user profile
- Sidebar with primary feature sections
- Main content area with responsive grid
- Footer with links and information

**Component Structure:**
- Card-based layout for data display
- Modal dialogs for quick actions
- Drawer/sidebar for detailed views
- Toast notifications for feedback

### Interaction Expectations

**Loading States:**
- Skeleton screens for initial load
- Spinner for background operations
- Progress bars for lengthy tasks
- Optimistic UI updates where appropriate

**Feedback:**
- Immediate visual feedback on user actions
- Clear success/error messaging
- Undo functionality for destructive actions
- Confirmation dialogs for critical operations

**Navigation:**
- Breadcrumbs for deep navigation
- Tab-based navigation for related content
- Persistent state across page transitions
- Back button support

### Mobile Responsiveness

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile Optimizations:**
- Touch-friendly target sizes (min 44x44px)
- Simplified navigation (hamburger menu)
- Reduced content density
- Gesture support (swipe, pinch-to-zoom where applicable)

**Progressive Enhancement:**
- Core functionality works without JavaScript
- Enhanced features for modern browsers
- Graceful degradation for older browsers

---

## 10. Security & Compliance

### Data Handling Policies

**Data Classification:**
- Public: Non-sensitive, publicly accessible
- Internal: Company data, employee access only
- Confidential: Sensitive user data, restricted access
- Restricted: Highly sensitive, minimal access

**Data Protection:**
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Data anonymization for analytics
- Regular data privacy audits

**Data Retention:**
- User data retained per user agreement
- Logs retained for 90 days
- Backups retained for 30 days
- Right to deletion (GDPR compliance)

### Role-Based Access Control (RBAC)

**Roles:**
- **Admin:** Full system access
- **Manager:** Team management and reporting
- **User:** Standard feature access
- **Guest:** Limited read-only access

**Permissions:**
- Fine-grained permission model
- Resource-level access control
- Temporary permission elevation
- Audit logging for all permission changes

### Compliance Requirements

**GDPR (General Data Protection Regulation):**
- User consent management
- Data portability support
- Right to erasure implementation
- Privacy policy transparency
- Data processing agreements

**SOC 2 (Security and Availability):**
- Access control policies
- Change management procedures
- Incident response plan
- Regular security assessments
- Third-party vendor management

**HIPAA (if handling health data):**
- Protected Health Information (PHI) safeguards
- Business Associate Agreements (BAA)
- Audit controls and logging
- Breach notification procedures

### Security Best Practices

**Application Security:**
- Input validation and sanitization
- Output encoding to prevent XSS
- CSRF token protection
- SQL injection prevention (parameterized queries)
- Secure session management

**Infrastructure Security:**
- Network segmentation
- Firewall configuration
- DDoS protection
- Regular security patching
- Intrusion detection systems

**Monitoring:**
- Real-time security monitoring
- Anomaly detection
- Failed login attempt tracking
- Audit logging
- Regular security reviews

---

## 11. Testing Strategy

### Unit Testing
- **Coverage Target:** 80% minimum
- **Framework:** Vitest / Jest
- **Scope:** Individual functions, components, utilities
- **Practices:**
  - Test-driven development (TDD) where appropriate
  - Mock external dependencies
  - Test edge cases and error conditions
  - Fast execution (< 10 seconds for full suite)

### Integration Testing
- **Framework:** Testing Library / Cypress Component Testing
- **Scope:** Component interactions, API integration, data flow
- **Practices:**
  - Test user workflows
  - Verify API contract compliance
  - Database transaction testing
  - External service mocking

### End-to-End (E2E) Testing
- **Framework:** Playwright / Cypress
- **Scope:** Complete user journeys, critical paths
- **Practices:**
  - Test in production-like environment
  - Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - Mobile device testing
  - Performance monitoring during tests

### Performance Testing
- **Tools:** Lighthouse, WebPageTest, Artillery
- **Metrics:**
  - Page load time
  - Time to interactive (TTI)
  - First contentful paint (FCP)
  - API response times
  - Resource usage

### Security Testing
- **Tools:** OWASP ZAP, Snyk, npm audit
- **Scope:**
  - Vulnerability scanning
  - Dependency auditing
  - Penetration testing
  - Code security reviews

### Accessibility Testing
- **Tools:** axe DevTools, WAVE, Lighthouse
- **Standards:** WCAG 2.1 AA compliance
- **Manual Testing:** Screen reader testing, keyboard navigation

### Automation Plan
- **CI/CD Integration:** Run tests on every pull request
- **Automated Regression:** Nightly test runs for comprehensive suites
- **Test Reporting:** Dashboard with test results and trends
- **Failure Alerts:** Immediate notification on test failures
- **Test Maintenance:** Regular review and update of test suites

---

## 12. Deployment & DevOps Plan

### Environments

**Development (Dev):**
- **Purpose:** Active development and testing
- **Data:** Mock/synthetic data
- **Access:** All developers
- **Deployment:** On push to development branch

**Staging:**
- **Purpose:** Pre-production validation
- **Data:** Anonymized production data copy
- **Access:** QA team, select stakeholders
- **Deployment:** On merge to staging branch
- **Practices:** Smoke tests, integration tests, UAT

**Production (Prod):**
- **Purpose:** Live customer-facing environment
- **Data:** Real customer data
- **Access:** Authorized personnel only
- **Deployment:** Scheduled releases via approval workflow

### CI/CD Strategy

**Continuous Integration:**
\`\`\`
Code Push → Lint & Format → Unit Tests → Build → Integration Tests
\`\`\`

**Continuous Deployment:**
\`\`\`
Merge to Main → Build Artifacts → Deploy to Staging → 
Automated Tests → Manual Approval → Deploy to Production → 
Health Check → Smoke Tests
\`\`\`

**Pipeline Tools:**
- CI/CD Platform: GitHub Actions / GitLab CI / Jenkins
- Container Registry: Docker Hub / ECR
- Artifact Storage: S3 / Artifact Registry

**Deployment Strategy:**
- **Blue-Green Deployment:** Zero-downtime deployments
- **Canary Releases:** Gradual rollout to subset of users
- **Feature Flags:** Enable/disable features without redeployment

### Rollback Plans

**Automated Rollback Triggers:**
- Error rate > 5% for 5 minutes
- Response time > 2 seconds for 95th percentile
- Health check failures
- Critical security alerts

**Rollback Procedure:**
1. Trigger rollback automation or manual approval
2. Route traffic to previous version
3. Verify system stability
4. Investigate root cause
5. Communicate with stakeholders

**Database Rollback:**
- Backward-compatible migrations
- Database backup before deployments
- Transaction rollback capabilities
- Point-in-time recovery options

### Monitoring & Observability

**Application Monitoring:**
- Real-time performance metrics
- Error tracking and alerting
- User session recording
- Custom business metrics

**Infrastructure Monitoring:**
- Server health and resource usage
- Network performance
- Database performance
- CDN performance

**Logging:**
- Centralized log aggregation
- Log levels: DEBUG, INFO, WARN, ERROR
- Structured logging format (JSON)
- Log retention: 90 days

**Alerting:**
- On-call rotation
- Escalation policies
- Incident response runbooks
- Post-mortem process

---

## 13. Assumptions, Risks & Open Questions

### Assumptions

1. **User Access:** Users have modern browsers (released within last 2 years)
2. **Network:** Users have stable internet connection (minimum 1 Mbps)
3. **Authentication:** Existing authentication system can be leveraged
4. **Permissions:** Current permission model supports new requirements
5. **Infrastructure:** Cloud infrastructure supports scaling requirements
6. **Third-Party Services:** External APIs remain available and stable
7. **Team:** Development team has necessary skills and bandwidth
8. **Timeline:** No major external dependencies or blockers

### Risks

#### High-Priority Risks

**Risk 1: Scope Creep**
- **Impact:** High - delays timeline, increases costs
- **Likelihood:** Medium
- **Mitigation:**
  - Strict change control process
  - Regular scope reviews
  - Clear MVP definition
  - Prioritized backlog

**Risk 2: Technical Complexity**
- **Impact:** High - may require architecture changes
- **Likelihood:** Medium
- **Mitigation:**
  - Proof of concept for complex features
  - Early technical spike
  - Architecture review sessions
  - Expert consultation

**Risk 3: Performance Issues at Scale**
- **Impact:** Medium - user experience degradation
- **Likelihood:** Low
- **Mitigation:**
  - Load testing early in development
  - Performance monitoring
  - Scalability design patterns
  - Database optimization

#### Medium-Priority Risks

**Risk 4: Third-Party Integration Failures**
- **Impact:** Medium - feature limitations
- **Likelihood:** Low
- **Mitigation:**
  - Vendor SLA review
  - Fallback mechanisms
  - Circuit breaker patterns
  - Alternative provider research

**Risk 5: Security Vulnerabilities**
- **Impact:** High - data breaches, compliance issues
- **Likelihood:** Low
- **Mitigation:**
  - Security reviews at each phase
  - Automated security scanning
  - Penetration testing
  - Security training for team

### External Dependencies

1. **Third-Party APIs:** Availability and API stability
2. **Cloud Provider:** Infrastructure uptime and support
3. **Payment Gateway:** (if applicable) Transaction processing
4. **Email Service:** Notification delivery
5. **CDN Provider:** Asset delivery performance
6. **Monitoring Tools:** Observability and alerting
7. **Authentication Provider:** User authentication and SSO

### Open Questions

**Product Questions:**
1. What is the exact priority order of features for MVP?
2. Are there any existing features that should be deprecated?
3. What is the expected user adoption timeline?
4. How should we handle enterprise vs. individual users differently?

**Technical Questions:**
1. Should we support real-time collaboration features?
2. What is the expected data retention period?
3. Are there any specific compliance requirements not covered?
4. What browsers must be supported (IE11, older Safari, etc.)?

**Business Questions:**
1. What is the budget allocation for this feature?
2. What is the target launch date and any hard deadlines?
3. Are there marketing or sales commitments tied to this launch?
4. What are the success criteria for post-launch evaluation?

**Design Questions:**
1. Are there brand guidelines that must be followed?
2. Should this feature have a dedicated onboarding flow?
3. Are there accessibility requirements beyond WCAG 2.1 AA?
4. What level of customization should users have?

---

## Appendix

### Glossary
- **API:** Application Programming Interface
- **CRUD:** Create, Read, Update, Delete
- **JWT:** JSON Web Token
- **RBAC:** Role-Based Access Control
- **SLA:** Service Level Agreement
- **TLS:** Transport Layer Security
- **TTI:** Time To Interactive
- **UAT:** User Acceptance Testing
- **WCAG:** Web Content Accessibility Guidelines

### References
- Internal architecture documentation
- Design system documentation
- API style guide
- Security policies and procedures
- Compliance documentation

### Change Log
- **Version 1.0 (${timestamp}):** Initial document creation

---

**Document Owner:** Product Manager  
**Stakeholders:** Engineering Team, Design Team, QA Team, Business Leadership  
**Review Cycle:** Bi-weekly until feature completion

---

*This PRD is a living document and will be updated as requirements evolve and new information becomes available.*
`;
  };

  const handleDownload = () => {
    if (!generatedPRD) return;

    const blob = new Blob([generatedPRD], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PRD-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('PRD downloaded successfully!');
  };

  const handleReset = () => {
    setFeatureIdea('');
    setGeneratedPRD(null);
    setError(null);
  };

  return (
    <>
      <SEO 
        title="PRD Generator"
        description="Generate comprehensive Product Requirements Documents with AI assistance."
        url="/prd-generator"
      />

      <div className="min-h-[calc(100vh-5rem)] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">PRD Generator</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Generate <span className="gradient-text">Product Requirements</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create comprehensive, production-grade PRDs following best practices in software engineering and technical product management.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 md:p-8"
          >
            {!generatedPRD ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Feature Idea / Product Concept
                  </label>
                  <Textarea
                    value={featureIdea}
                    onChange={(e) => setFeatureIdea(e.target.value)}
                    placeholder="Example: A real-time collaborative document editor with AI-powered suggestions and multi-user editing capabilities..."
                    className="min-h-[200px] text-base"
                    disabled={isGenerating}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Describe your product or feature idea in detail. Include the problem it solves, target users, and key functionality.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={generatePRD} 
                    disabled={isGenerating || !featureIdea.trim()}
                    className="gap-2 flex-1 sm:flex-none"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating PRD...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate PRD
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">Error</p>
                      <p className="text-sm text-destructive/80">{error}</p>
                    </div>
                  </div>
                )}

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-3">What you'll get:</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span>Executive Summary & Business Case</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span>Target Audience & User Personas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span>Functional & Non-Functional Requirements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span>User Stories with Gherkin Format</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span>Technical Architecture Overview</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span>API Design Specifications</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span>Security & Compliance Guidelines</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span>Testing & Deployment Strategy</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">PRD Generated Successfully</h3>
                      <p className="text-sm text-muted-foreground">
                        Your comprehensive Product Requirements Document is ready
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4 bg-muted/30 max-h-[600px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm font-mono">{generatedPRD}</pre>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleDownload} className="gap-2">
                    <Download className="h-4 w-4" />
                    Download as Markdown
                  </Button>
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Generate New PRD
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong>Tip:</strong> Review and customize the generated PRD to match your specific project needs, team structure, and organizational requirements.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Comprehensive Structure</h3>
              <p className="text-sm text-muted-foreground">
                All 13 essential sections following industry best practices and standards.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Production-Ready</h3>
              <p className="text-sm text-muted-foreground">
                Professional formatting with technical specifications and compliance guidelines.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Export</h3>
              <p className="text-sm text-muted-foreground">
                Download as Markdown format for easy editing and version control.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
