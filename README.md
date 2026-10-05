# SIP Pause Co-pilot (ProduScope 2026 / FinLit Ventures)

[![GitHub Repository](https://img.shields.io/badge/GitHub-ProduScope__FinLit__Ventures-blue?logo=github)](https://github.com/saivardhankundala2005-sys/ProduScope_FinLit_Ventures.git)
[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://github.com/saivardhankundala2005-sys/ProduScope_FinLit_Ventures.git)

An independent, objective decision check for mutual fund investors in India tapping **Pause**, **Reduce**, or **Cancel** on an equity SIP. It reveals the true financial cost of pausing to the user's personal financial goal without recommending any specific action or retaining funds.

---

## 🌟 Key Features

1. **Pause Receipt**: Bordered ticket with a perforated top edge, dotted leaders, and total cost at goal date with 6%–10% uncertainty ranges.
2. **Historical Replay Engine**: Real monthly NAV series replay through the March 2020 COVID crash comparing *"Kept investing"* vs. *"Paused for 3 months"* with interactive cursor scrubbing.
3. **Neutral Decision Priority Slider**: Closed-form mathematical flip points dynamically highlighting which option leads without reordering cards or judging user choices.
4. **Fast Path (<45s)**: Direct 1-card consequence check for users facing immediate cash tightness.
5. **Multi-SIP Support**: Simultaneous management of multiple equity mutual fund SIPs (Mid-Cap, Flexi-Cap, Nifty 50 Index) with dedicated action menus.
6. **Dual Layout Views**:
   - **📱 Phone View**: Centered 390px × 844px mobile phone frame with side-by-side Judge Panel.
   - **💻 Full Desktop View**: Expanded 1100px wide client portal dashboard for PC web browsers.
7. **AI Decision Assistant**: Built-in 100% offline knowledge base chatbot answering questions about calculations, flip points, options, and tool mechanics.
8. **Judge Control Panel**: Live switching of personas (Rohan, Priya), emergency buffer bands, as-of dates, funds, and return rates.
9. **Metrics & Guardrails Dashboard**: 240 simulated sessions, North Star Informed Decision Rate (IDR), outcome mix distribution, 30-day survey, and guardrail tracking.
10. **Automated Copy Compliance**: Vitest unit test suite enforcing plain verbs, zero banned words, no emojis, no exclamation marks, and strict disclosures.

---

## 🚀 Quick Start & Deployment

### Option 1: Streamlit Deployment (Cloud or Local)

Deploy directly on [Streamlit Community Cloud](https://streamlit.io/cloud) or run locally:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run Streamlit application
streamlit run app.py
```

### Option 2: Local Web Development (Vite + React)

```bash
# Install Node dependencies
npm install

# Run local development server
npm run dev
```

### Option 3: Production Static Build

```bash
# Build production bundle to /dist
npm run build

# Preview static production build
npm run preview
```

---

## 🧪 Testing & Data Pipeline

### Rebuild Market Data
Processes raw parquet NAV series (`data/raw/mutual_funds_nav_history_cleaned.parquet`) and writes compact JSON files to `public/data/`:
```bash
npm run build:data
```

### Run Unit & Copy Tests
Runs all 14 engine acceptance tests and automated copy rule tests:
```bash
npm test
```

---

## 📄 Documentation

* **[`SPEC.md`](SPEC.md)**: Product build specification.
* **[`DATA_REPORT.md`](DATA_REPORT.md)**: Dataset inspection audit and candidate as-of date selections.

---

## 🔗 Repository
GitHub Repository: [https://github.com/saivardhankundala2005-sys/ProduScope_FinLit_Ventures.git](https://github.com/saivardhankundala2005-sys/ProduScope_FinLit_Ventures.git)
