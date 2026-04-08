# Hoops League Registration App

A full-stack basketball game registration app with a **React + TypeScript frontend** and an **Express + MongoDB backend**.  
It allows users to view upcoming games, register for the next available event, and lets an admin manage the schedule and player registrations.

## Overview

This repository is split into two apps:

- **frontend** — Vite + React + TypeScript + Tailwind CSS + shadcn/ui
- **backend** — Express server handling schedule, registration, and admin authentication, and MongoDB data persistence

The project is designed around a simple workflow:

- Users can browse game information and register for the next upcoming game
- Registrations are attached to a game event
- Admins can log in, create/delete game events, and remove players from an event

## Repository Structure

```txt
hoops-league-registration-app/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── data/
│   ├── package.json
│   └── index.js
└── README.md