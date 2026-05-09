# Time Tracker App

A simple time tracking web application built with **React and TypeScript**, demonstrating a basic **DevOps workflow** including GitHub collaboration, branch management, and Docker containerization.

## Features

- **Time Tracker** - Record studying, break, and procrastination time with a timer
- **Weekly Summary** - View time distribution for the last 7 days
- **Data Persistence** - All entries saved automatically in browser localStorage

## Requirements

- Node.js 
- Docker 
- Git

## Quick Start

### Option 1: Run with Docker

```bash
git clone https://github.com/DickaRaditya/GSLC-SESI-4.git
cd GSLC-SESI-4
docker-compose up dev --build
```
Open http://localhost:5173

### Option 2: Run locally

```bash
git clone https://github.com/DickaRaditya/GSLC-SESI-4.git
cd GSLC-SESI-4
npm install
npm run dev
```
Open http://localhost:5173

## Project Structure

```
GSLC-SESI-4/
├── App.tsx              # Main component
├── TimeTracker.tsx      # Timer component
├── WeeklySummary.tsx    # Summary component
├── Dockerfile           # Production config
├── Dockerfile.dev       # Development config
├── docker-compose.yml   # Docker orchestration
└── package.json         # Dependencies
```

## Branch Structure

| Branch | Content |
|--------|---------|
| `main` | App.tsx + config files |
| `feature/time-tracker` | TimeTracker.tsx |
| `feature/weekly-summary` | WeeklySummary.tsx |

## Common Git Commands

```bash
git status                # Check file status
git add .                 # Stage all files
git commit -m "message"   # Commit changes
git push origin main      # Push to GitHub
git checkout branch-name  # Switch branch
```

## Docker Commands

```bash
docker-compose up dev --build   # Start development container
docker-compose up prod --build  # Start production container
docker-compose down             # Stop containers
```
#testing
