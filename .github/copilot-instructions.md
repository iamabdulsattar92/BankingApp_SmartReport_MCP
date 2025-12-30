# Playwright Smart Reporter - AI Coding Guidelines

## Architecture Overview
This is a modular Playwright HTML reporter with AI-powered analysis. Core components:
- **Collectors**: Gather test data (history, steps, attachments) - `HistoryCollector`, `StepCollector`, `AttachmentCollector`
- **Analyzers**: Detect patterns (flakiness, performance, retries, stability) - `FlakinessAnalyzer`, `PerformanceAnalyzer`, `RetryAnalyzer`, `FailureClusterer`, `StabilityScorer`, `AIAnalyzer`
- **Generators**: Create HTML reports (charts, cards, gallery) - `html-generator.ts`, `chart-generator.ts`, `card-generator.ts`, `gallery-generator.ts`, `comparison-generator.ts`
- **Notifiers**: Send alerts (Slack, Teams) - `SlackNotifier`, `TeamsNotifier`
- **Utils**: Helper functions - `formatDuration`, `stripAnsiCodes`, `sanitizeFilename`

Data flow: Playwright calls `SmartReporter.onBegin()` → `onTestEnd()` → `onEnd()`, which orchestrates collectors → analyzers → generators → HTML output.

## Key Patterns
- **Modular Design**: Each feature is a separate class with single responsibility, exported via barrel files (e.g., `analyzers/index.ts`)
- **Data Flow**: Collectors gather data into `TestResultData[]`, analyzers enrich with analysis, generators produce HTML
- **History Persistence**: JSON-based test history in `test-history.json` for trend analysis across runs
- **Feature Flags**: All new features controlled by `enable*` options in `SmartReporterOptions` (default true)
- **Type Safety**: All data structures defined in `types.ts` with interfaces like `TestResultData`, `TestHistory`
- **Async Handling**: Use proper error handling in async operations, strip ANSI codes from errors

## Development Workflow
```bash
npm run build          # Compile TypeScript to dist/
npm run test:demo      # Run example tests with example/playwright.config.ts
npm run test:merge-local  # Test parallel run merging with blob reports
```

## Configuration Examples
```typescript
// playwright.config.ts
reporter: [
  ['list'],
  ['playwright-smart-reporter', {
    outputFile: 'smart-report.html',
    historyFile: 'test-history.json',
    maxHistoryRuns: 10,
    performanceThreshold: 0.2,
    enableAIRecommendations: true,
    stabilityThreshold: 70,
    slackWebhook: 'https://hooks.slack.com/...',
  }],
]
```

## CLI Tools
- **Merge History**: `npx playwright-smart-reporter-merge-history input1.json input2.json -o merged.json` - Combine histories from parallel CI runs
- Supports glob patterns and `--max-runs` limiting

## Testing Parallel Runs
Use blob reports for merging:
```bash
PLAYWRIGHT_BLOB_OUTPUT_DIR=blob-reports/run1 playwright test --shard=1/2
PLAYWRIGHT_BLOB_OUTPUT_DIR=blob-reports/run2 playwright test --shard=2/2
npx playwright-smart-reporter-merge-history blob-reports/*/test-history.json -o test-history.json
npx playwright merge-reports blob-reports/*/ --reporter=./dist/smart-reporter.js
```

## AI Integration
- Supports Claude/OpenAI via `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` env vars
- `AIAnalyzer` analyzes failed tests and adds `aiSuggestion` to `TestResultData`
- Results embedded in HTML report with actionable recommendations

## CI Considerations
- Persist `test-history.json` between runs for trend accuracy
- Use merge-history CLI for parallel CI shards
- Auto-detects CI providers (GitHub, GitLab, CircleCI, Jenkins, Azure DevOps) and captures metadata
- Output reports to `test-results/` directory

## Code Examples
- Analyzers modify `TestResultData` in-place (e.g., `test.flakinessScore = score`)
- Generators use feature flags: `if (options.enableGalleryView !== false)`
- HTML generation coordinates sub-generators: `generateTrendChart()`, `generateGroupedTests()`</content>
<parameter name="filePath">D:\Code\playwright-smart-reporter-master\playwright-smart-reporter-master\.github\copilot-instructions.md