# Spatial Experience Brief Generator

Spatial Experience Brief Generator is an interactive web application designed to help facilitators, designers, and workshop leaders quickly generate engaging, customizable spatial innovation briefs. The app uses playful, animated interfaces to randomly or manually select brands and spatial surfaces, then generates a creative brief that can be exported for sharing or printing.

## What is this web app?

This web app is a tool for ideation and creative workshops. It allows users to:
- Randomly or manually select a brand from a curated list using a visually engaging slot machine interface.
- Randomly or manually select a spatial surface (e.g., wall, floor, ceiling) with animated feedback.
- Instantly generate a unique spatial experience brief that combines the selected brand and surface, providing inspiration for spatial design challenges.
- Export the generated brief as an image or PDF for easy sharing, documentation, or printing.

## How does it work?

1. **Welcome Screen**: Users are greeted and prompted to begin their journey.
2. **Brand Selection**: Users can spin an animated slot machine to randomly select a brand, or manually pick one from the list. The interface uses color and animation to make the process fun and engaging.
3. **Surface Selection**: Users spin another slot machine to select a spatial surface, or choose one manually. Tooltips and icons help clarify each option.
4. **Brief Generation**: The app combines the selected brand and surface to generate a creative brief, which is displayed on screen.
5. **Export Options**: Users can export the brief as an image (using HTML2Canvas) or as a PDF (using jsPDF) for sharing or printing.

## Features

- **Brand Selection**: Interactive slot machine for random or manual brand selection
- **Surface Selection**: Animated slot machine for spatial surfaces with tooltips and icons
- **Brief Generation**: Instantly creates a unique spatial experience brief
- **Export Options**: Save briefs as images or PDFs

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies

```bash
cd spatial-brief-generator
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

This will start the application on [http://localhost:5173](http://localhost:5173).

### Building for Production

```bash
npm run build
```

The production-ready files will be available in the `dist` directory.

## Usage

1. **Welcome Screen**: Click "Begin Journey" to start
2. **Brand Selection**: Spin the slot machine or manually select a brand
3. **Surface Selection**: Spin the slot machine or manually select a spatial surface
4. **Brief Screen**: View your generated brief and export if desired

## Technologies Used

- React
- Tailwind CSS
- HTML2Canvas (for image exports)
- jsPDF (for PDF exports)

## Project Structure

- `src/components/` - React components
- `src/App.jsx` - Main application component
- `src/index.css` - Global styles and animations

---

This project is designed to make creative workshops more dynamic, fun, and productive by providing instant, randomized inspiration for spatial design challenges.