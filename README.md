# Omnichannel Lead Engine (n8n + Telegram + Twilio + Google Sheets)

A highly resilient, automated lead-capture and routing architecture built with [n8n](https://n8n.io/). This workflow aggregates leads from multiple sources, sanitizes data in real-time, prevents CRM duplication, and ensures instant sales team notification & client SMS engagement.

## 🚀 Key Features

- **Omnichannel Ingestion:** Captures leads from Webhooks (websites/landing pages) and Telegram Bots simultaneously.
- **Smart Data Sanitation:** Custom JavaScript to format names and standardize international phone numbers.
- **Duplicate Prevention:** Real-time Google Sheets API lookup to prevent CRM clutter.
- **Instant SMS Engagement:** Automated Twilio integration to text prospects immediately.
- **Fail-Safe Alerting:** A global error-catching mechanism that notifies the admin via Telegram if any node fails.

## 🏗 Architecture Overview

![Architecture / Workflow Screenshot](assets/workflow-screenshot.png)

1. **Trigger:** Webhook or Telegram Message.
2. **Transform:** Data normalization and JS-based sanitation.
3. **Database Check:** Lookup in Google Sheets.
4. **Router:** If duplicate -> Alert Team. If new -> Save -> Alert Team -> Send Twilio SMS.

## 📂 Repository Structure

- `/workflows` - Contains the sanitized `json` export of the n8n workflow.
- `/scripts` - Contains the raw JavaScript used inside the n8n Code nodes.
- `/assets` - Architecture diagrams and screenshots.

## 🛠 Setup Instructions

1. Copy the contents of `workflows/omnichannel_lead_routing_sanitized.json`.
2. Open your n8n instance and click "Import from file" or simply paste the JSON into the editor.
3. Update the `⚙️ CONFIGURATOR` node with your specific Google Sheet ID, Admin Chat ID, and Bot usernames.
4. Add your own credentials for Telegram, Google Sheets, and Twilio.

## ⚠️ Security Note
This repository contains a **sanitized** version of the workflow. All personal tokens, API keys, and sensitive Chat IDs have been removed.

---
*Created by [Твое Имя/Ник на GitHub] — Automation & API Integration Expert.*
