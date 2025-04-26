# Spatial Experience Brief Generator

An interactive web application that dynamically creates engaging, customizable spatial innovation briefs for workshops.

## Features

- **Brand Selection**: Interactive wheel spinner to randomly select brands or manual brand selection
- **Surface Selection**: Animated slot-machine style randomizer for spatial surfaces with tooltips
- **Brief Generation**: Generates customized briefs based on selected brand and surface
- **Export Options**: Save briefs as images or PDFs for sharing and printing

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
2. **Brand Selection**: Either spin the wheel or manually select a brand
3. **Surface Selection**: Use the spinner or manually select a spatial surface
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
"# spatial-brief-generator" 
