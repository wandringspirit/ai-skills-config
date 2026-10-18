---
name: ga4-analytics-operator
description: >-
  Google Analytics 4 (GA4 Data API v1beta) architecture, automated service account / MCP
  authentication, traffic audits, dimension/metric report generation, user engagement
  diagnostics, and conversion tracking operator. Activate whenever connecting to GA4,
  pulling analytics data, running traffic reads, or diagnosing web performance and traffic drops.
---

# GA4 Analytics Operator (`ga4-analytics-operator`)

This skill defines the end-to-end framework and operational protocol for connecting to Google Analytics 4 (GA4) properties, pulling authoritative metrics via Google Analytics Data API (`google.analytics.data_v1beta`), executing diagnostic traffic reads, and analyzing web property performance.

---

## 1. Domain Overview & Architecture

### Google Analytics Data API (v1beta)
GA4 properties report event-driven data through the Google Analytics Data API:
- **API Client:** `google.analytics.data_v1beta.BetaAnalyticsDataClient`
- **Scope:** `https://www.googleapis.com/auth/analytics.readonly`
- **Resource Format:** `properties/<PROPERTY_ID>` (e.g. `properties/555350015`)
- **Key Concepts:**
  - **Date Ranges:** `DateRange(start_date='YYYY-MM-DD', end_date='YYYY-MM-DD')` or relative (`7daysAgo`, `yesterday`, `today`). Note that today's data is typically incomplete; standard GA4 processing can take 24–48 hours to fully attribute engaged sessions and channels.
  - **Time Zones:** Always check the property's configured time zone (e.g. `Asia/Kolkata` for `playlistduration.com`). All requested dates and hourly cuts align with that time zone.
  - **Metrics vs Dimensions:** Core metrics include `activeUsers`, `totalUsers`, `sessions`, `engagedSessions`, `screenPageViews`, `userEngagementDuration`.
  - **Consent Mode & Cookieless Tracking:** Visitors browsing under strict consent policies or ad blockers may have cookieless pings or suppressed cookies, meaning session counts and client counts reflect consent-mode behavioral modeling where active.

---

## 2. Local Authentication Strategy

### Known Service Account & Credentials
On this machine, the dedicated GA4 service account is configured at:
```
C:\Users\piyus\.config\ga-mcp\ga4-reader.json
```
- **Service Account Name:** `ga4-reader`
- **Role:** Viewer (Read-only access to configured GA4 properties)
- **Local Scratch Runner:** `C:\Users\piyus\.gemini\antigravity\scratch\ga4-analytics\analyze_ga4.py`

### Known Managed Properties
| Property Name | Property ID | Default Timezone | Measurement ID | Primary Domain |
|---|---|---|---|---|
| **Playlist Duration** | `555350015` | `Asia/Kolkata` | `G-3GVL76L9HK` | `https://playlistduration.com` |

---

## 3. Core Report Protocols & Query Specifications

When executing traffic reads (e.g. Wednesday / Friday review cadence), follow the standard 17-query battery:

1. **Daily Totals:** Date, totalUsers, sessions, engagedSessions, userEngagementDuration, screenPageViews.
2. **New vs Returning:** Date, newVsReturning, totalUsers, engagedSessions.
3. **Traffic Sources:** sessionSource, totalUsers, sessions, engagedSessions, userEngagementDuration.
4. **Primary Sources by Day:** Date, sessionSource (filtered to `chatgpt.com`, `google`, `(direct)`).
5. **Geographic Distribution:** Country, totalUsers, engagedSessions, screenPageViews.
6. **Landing Pages by Device:** landingPage, deviceCategory, totalUsers, sessions, engagedSessions, screenPageViews.
7. **Hub & Cluster Performance:** landingPage contains `/best/` or hub path, sessionSource, deviceCategory.
8. **AI Engine / ChatGPT Referral Cohort:** date, totalUsers with pageLocation or sessionSource referencing `chatgpt`.
9. **Peak Day Hourly Breakdown:** dateHour, sessionSource, totalUsers.
10. **Top Pages by Views:** pagePath, screenPageViews, totalUsers, userEngagementDuration.
11. **Device Breakdown by Day:** date, deviceCategory, totalUsers, engagedSessions.
12. **System & Interaction Events:** eventName, eventCount, totalUsers.
13. **Referrers:** pageReferrer, totalUsers, sessions.
14. **First User Acquisition Source:** firstUserSource, newUsers.
15. **User Language:** language, totalUsers, engagedSessions.
16. **Browsers & Operating Systems:** browser, operatingSystem, totalUsers, engagedSessions.
17. **Top Countries by Device Category:** country, deviceCategory, totalUsers, engagedSessions.

---

## 4. Gemini (Antigravity) Execution SOP

When executing GA4 queries or diagnostic analyses in Gemini (Antigravity):

1. **Verify Python Environment & Credentials:**
   - Confirm `google-analytics-data` is available in Python.
   - Use `C:\Users\piyus\.config\ga-mcp\ga4-reader.json` as the service account credential file.
2. **Query Execution Script Pattern:**
   ```python
   from google.analytics.data_v1beta import BetaAnalyticsDataClient
   from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Dimension, Metric, FilterExpression, Filter
   from google.oauth2 import service_account

   cred_path = r'C:\Users\piyus\.config\ga-mcp\ga4-reader.json'
   creds = service_account.Credentials.from_service_account_file(cred_path, scopes=['https://www.googleapis.com/auth/analytics.readonly'])
   client = BetaAnalyticsDataClient(credentials=creds)

   request = RunReportRequest(
       property='properties/555350015',
       date_ranges=[DateRange(start_date='2026-10-11', end_date='2026-10-17')],
       dimensions=[Dimension(name='date')],
       metrics=[Metric(name='totalUsers'), Metric(name='sessions'), Metric(name='screenPageViews')]
   )
   response = client.run_report(request)
   ```
3. **Formatting & Delivery:**
   - Always present numbers as precise raw markdown tables with dates, column headers, and unrounded numbers.
   - Explicitly note time zone (`Asia/Kolkata` for playlistduration.com) and incomplete current-day status.

---

## 5. Claude Execution SOP

When Claude runs traffic reads:
1. **Primary Interface:** Connect via the local `analytics-mcp` server using service account `ga4-reader`.
2. **Fallback:** If MCP is unavailable or session runs in a cloud sandbox without the local connector, fallback to the pre-formatted Gemini prompt in `docs/TRAFFIC-READ.md`.
3. **Consistency:** Check single-day user counts against the GA4 Snapshot report to verify property ID (`555350015`) and time zone matching.

---

## 6. Safety & Verification Gate

1. **Read-Only Scope:** GA4 queries must strictly utilize read-only scopes (`https://www.googleapis.com/auth/analytics.readonly`).
2. **No External PII Leaks:** Do not log or export user IPs, query parameters containing auth tokens, or sensitive client data.
3. **Approval Gate:** Prior to submitting external configuration changes, tracking tag modifications, or production code deployments, request explicit user approval.
