# playwright-smart-reporter

## Installation

```bash
npm install -D playwright-smart-reporter
```

### Flakiness Indicators
- 🟢 **Stable** (<10% failure rate)
- 🟡 **Unstable** (10-30% failure rate)
- 🔴 **Flaky** (>30% failure rate)
- ⚪ **New** (no history yet)
- ⚪ **Skipped** (test was skipped)



Notifications include:
- Summary of passed/failed tests
- List of first 5 failed test names
- Only sent when there are failures


## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run demo tests
npm run test:demo

# Open the report
open example/smart-report.html
```
