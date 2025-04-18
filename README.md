# Purpose

A faith-aligned job board and talent platform built with Vue.js and TailwindCSS.

## Overview

Purpose is a platform that connects Muslim professionals with faith-aligned job opportunities. The platform features:

- Job listings with faith alignment indicators (Halal Income, Prayer Friendly)
- Talent profiles with detailed professional information
- Advanced search and filtering capabilities
- Modern, responsive UI design

## Features

### Jobs Board
- Browse faith-aligned job opportunities
- Filter by location and experience level
- Search across job titles, companies, locations, and required skills
- View detailed job information including salary ranges and requirements

### Talent Pool
- Browse skilled professionals
- Filter by location and experience level
- Search across names, titles, skills, certifications, and more
- View detailed talent profiles including education, languages, and certifications

## Technology Stack

- Vue 3 with Composition API
- TypeScript for type safety
- TailwindCSS for styling
- Vite for fast development and building

## Project Structure

```
frontend/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Vue components
│   ├── data/         # Mock data for jobs and talents
│   ├── router/       # Vue Router configuration
│   ├── types/        # TypeScript interfaces
│   ├── views/        # Page components
│   ├── App.vue       # Root component
│   └── main.ts       # Application entry point
├── public/           # Public static assets
└── index.html        # HTML entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/purpose.git
cd purpose/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```