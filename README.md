# Omnichannel Lead Engine (n8n + Telegram + Twilio + Google Sheets)

A highly resilient, automated lead-capture and routing architecture built with [n8n](https://n8n.io/). This workflow aggregates leads from multiple sources, sanitizes data in real-time, prevents CRM duplication, and ensures instant sales team notification & client SMS engagement.

## 🚀 Key Features

- **Omnichannel Ingestion:** Captures leads from Webhooks (websites/landing pages) and Telegram Bots simultaneously.
- **Smart Data Sanitation:** Custom JavaScript to format names and standardize international phone numbers.
- **Duplicate Prevention:** Real-time Google Sheets API lookup to prevent CRM clutter.
- **Instant SMS Engagement:** Automated Twilio integration to text prospects immediately.
- **Fail-Safe Alerting:** A global error-catching mechanism that notifies the admin via Telegram if any node fails.

## 🏗 Architecture Overview
```mermaid
graph TD
    %% --- Sources ---
    subgraph Sources [Input Channels]
        SiteForm[Website Form]:::source
        TGuser[Telegram User]:::source
    end

    %% --- Triggers & Normalization ---
    WebHook[Webhook Trigger]:::n8n
    TGTrigger[Telegram Trigger]:::n8n
    NormWeb[Normalize Website Data]:::logic
    NormTG[Normalize Telegram Data]:::logic
    Config[Configurator Setup]:::config

    %% --- Processing Hub ---
    subgraph Processing [Data Sanitization Hub]
        JSCode[JS: Data Sanitation]:::logic
        PinDB[(Google Sheet)]:::db
        CheckDup{Check Duplicate}:::logic
    end

    %% --- Routing & Execution ---
    subgraph Routing [Smart Routing & Actions]
        NewOrOld{Duplicate Found?}:::logic
        AlertDup[Alert: Duplicate]:::tg
        SaveDB[Save NEW Lead]:::db
        AlertNew[Alert: New Lead]:::tg
        Wait[Wait 2 min]:::n8n
        SendTwilio[Send SMS via Twilio]:::twilio
    end

    %% --- Technical Guard ---
    GlobalError[Global Error Catch]:::error
    TechAlert[Technical Alert: Node Failed]:::tg

    %% --- Main Flow Connections ---
    SiteForm --> WebHook
    TGuser --> TGTrigger
    
    WebHook --> NormWeb
    TGTrigger --> NormTG

    NormWeb --> Config
    NormTG --> Config

    Config --> JSCode
    JSCode --> CheckDup
    
    CheckDup -.-> PinDB
    PinDB -.-> CheckDup
    CheckDup --> NewOrOld

    %% --- Routing Connections ---
    NewOrOld -->|YES| AlertDup
    NewOrOld -->|NO| SaveDB

    SaveDB --> AlertNew
    AlertNew --> Wait
    Wait --> SendTwilio

    %% --- Error Guard Connection ---
    Processing -.-> GlobalError
    Routing -.-> GlobalError
    GlobalError --> TechAlert

    %% --- Styling ---
    classDef source fill:#f9f,stroke:#333,stroke-width:2px,color:black;
    classDef n8n fill:#FF6B6B,stroke:#333,stroke-width:1px,color:white;
    classDef logic fill:#4ECDC4,stroke:#333,stroke-width:1px,color:black;
    classDef db fill:#FFE66D,stroke:#333,stroke-width:1px,color:black;
    classDef tg fill:#0088cc,stroke:#333,stroke-width:1px,color:white;
    classDef twilio fill:#F22F46,stroke:#333,stroke-width:1px,color:white;
    classDef config fill:#a1a1a1,stroke:#333,stroke-width:2px,color:black;
    classDef error fill:#FF0000,stroke:#333,stroke-width:2px,color:white;
```
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
