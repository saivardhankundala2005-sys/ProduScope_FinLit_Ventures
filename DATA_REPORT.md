# DATA_REPORT.md — Data Inspection and Selection Report

**Project:** SIP Pause Co-pilot (ProduScope 2026 / FinLit Ventures)  
**Date:** October 5, 2026  

---

## 1. File-by-File Data Audit

### File 1: `data/raw/mutual_funds_nav_history_cleaned.parquet`
* **Size:** 315.8 MB
* **Row Count:** 21,830,787 rows
* **Schema:**
  * `Scheme_Code` (int64): Unique AMFI scheme identifier
  * `Date` (string/datetime64): Format `YYYY-MM-DD`
  * `NAV` (float64): Net Asset Value per unit
  * `year` (int64), `month` (int64), `day` (int64), `dayOfweek` (int64), `quarter` (int64)
  * `pct change` (float64): Daily NAV percentage change
  * `average_compound` (float64): Rolling compounding metric
* **Date Range:** `2006-04-01` to `2026-08-03`
* **Missing Days:** Standard trading calendar gaps (weekends, national stock market holidays). No unexpected data dropouts within trading periods.
* **Duplicate Dates:** 0 duplicate `(Scheme_Code, Date)` pairs.
* **Scheme Universe:** 14,986 unique scheme codes present.
* **Plan & Option Types:** Contains both Direct and Regular plans across Growth and IDCW options. Filtered strictly to **Direct Plan, Growth Option** for candidate selections.

---

### File 2: `data/raw/archive/Nifty 50 Historical Data.csv`
* **Size:** 385 KB
* **Row Count:** 6,899 rows
* **Schema:** `Date`, `Price`, `Open`, `High`, `Low`, `Volume`, `Chg%`
* **Date Format:** `MM/DD/YYYY` (e.g. `7/27/2023`)
* **Date Range:** Historical daily Nifty 50 spot price data.

---

### File 3: `data/raw/archive/NIFTY50.csv`
* **Size:** 342 KB
* **Row Count:** 4,524 rows
* **Schema:** `Price`, `Close`, `High`, `Low`, `Open`, `Volume`
* **Date Format:** `YYYY-MM-DD`

---

## 2. Chosen Mutual Fund Schemes

Per Section 3 of the build specification, 3 Direct Plan, Growth Option schemes were selected from the dataset:

| Category | Scheme Name | Scheme Code | Min Date | Max Date | Row Count | Justification |
| --- | --- | --- | --- | --- | --- | --- |
| **Mid-Cap (Preferred Demo Fund)** | HDFC Mid-Cap Opportunities Fund - Direct - Growth | `118989` | 2013-01-01 | 2026-07-31 | 3,259 | Top retail mid-cap fund in India with high SIP volume. Clean daily NAV coverage across both 2020 crash and 2024–2026 market correction. |
| **Flexi-Cap / Large-Cap** | HDFC Flexi Cap Fund - Direct - Growth | `119063` | 2013-01-01 | 2026-07-31 | 3,259 | Popular diversified equity fund with large-cap tilt, representing standard retail growth portfolios. |
| **Nifty 50 Index** | UTI Nifty 50 Index Fund - Direct - Growth | `120716` | 2013-01-02 | 2026-07-31 | 3,257 | Passive market benchmark fund with lowest tracking error among Indian index funds. |

---

## 3. Market Crisis & Drawdown Episode Coverage

Both major market drawdown episodes are fully covered in the raw data:

1. **COVID-19 Crash (Feb – Jun 2020):** Full daily NAV series available for all 3 funds. HDFC Mid-Cap Opportunities fell from peak NAV 60.97 (Feb 2020) to trough NAV 38.45 (March 2020), a ~37% market dip.
2. **2024–2026 Market Correction:** Full daily NAV series available up to August 2026. HDFC Mid-Cap Opportunities reached a peak NAV of 214.13 in late 2024 before correcting.

---

## 4. Candidate "As Of" Dates for Demo Fund (HDFC Mid-Cap Opportunities, Code 118989)

Criteria: Demo fund sits **10% to 16% below its trailing 12-month peak**.

### 2020 COVID Crisis Candidates:
* `2020-03-09`: NAV 53.94 | 12-Mo Peak: 60.97 | **-11.53%**
* `2020-03-11`: NAV 53.52 | 12-Mo Peak: 60.97 | **-12.21%**

### 2024–2026 Correction Candidates:
* `2025-02-18`: NAV 184.29 | 12-Mo Peak: 214.13 | **-13.93%**
* `2025-02-24`: NAV 184.08 | 12-Mo Peak: 214.13 | **-14.03%** *(Selected primary default date)*
* `2025-03-06`: NAV 184.16 | 12-Mo Peak: 214.13 | **-13.99%**

**Primary Default Date for Prototype:** `2025-02-24` (14.03% drawdown, closest to target 14%). Configurable on the fly via the Judge panel.

---

## 5. Output Data Pipeline

The build script `scripts/build-data.ts` (executed via tsx/node) extracts and packages clean, compact JSON files into `public/data/`:

* `public/data/funds.json`: Fund metadata and default drawdown states.
* `public/data/nav_daily.json`: Daily NAV series for replay and calculations.
* `public/data/nav_monthly.json`: Month-start NAV series for fast simulation lookup.
* `public/data/nifty_daily.json`: Benchmark Nifty 50 daily closing prices.

No live network calls are made at runtime. All data is precomputed and bundled statically.
