# Project Management System

A lightweight web-based **Project Management System** implemented with vanilla HTML, CSS, and JavaScript.

## Module Coverage

### Core Modules
- User Management
- Project Management
- Task Management
- Collaboration
- Progress Tracking

### System Modules
- Reporting
- Notification
- Admin

### Advanced Modules
- Time Tracking
- Resource Management
- Risk Management
- Dashboard & Analytics

## Features Included
- User registration with role capture (Admin, Manager, Team Member)
- Project creation with manager and timeline
- Task creation with assignment, priority, deadline, and status
- Team discussion comments
- Progress monitoring with completion bar
- JSON report generation (project/task/productivity snapshot)
- Event-based notifications
- Admin reset for all stored records
- Time logging, resource allocation, and risk register
- Dashboard metrics overview

## How to Run
1. Open `index.html` directly in a browser, **or**
2. Start a simple local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Data Storage
The application uses `localStorage` in the browser to persist records.
