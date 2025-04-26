import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const BriefDisplay = ({ brand, surface, brief }) => {
  const briefRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  const saveAsImage = async () => {
    if (!briefRef.current || isExporting) return;
    
    try {
      setIsExporting(true);
      setExportError(null);
      
      const canvas = await html2canvas(briefRef.current, {
        scale: 2,
        backgroundColor: 'white',
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${brand}-${surface}-brief.png`;
      link.click();
      
      setIsExporting(false);
    } catch (error) {
      console.error('Error saving image:', error);
      setExportError('Failed to save as image. Please try again.');
      setIsExporting(false);
    }
  };

  const saveAsPDF = async () => {
    if (!briefRef.current || isExporting) return;
    
    try {
      setIsExporting(true);
      setExportError(null);
      
      const canvas = await html2canvas(briefRef.current, {
        scale: 1.5,
        backgroundColor: 'white',
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.7);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      pdf.save(`${brand}-${surface}-brief.pdf`);
      
      setIsExporting(false);
    } catch (error) {
      console.error('Error saving PDF:', error);
      setExportError('Failed to save as PDF. Please try again.');
      setIsExporting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Your Spatial Brief</h1>
        <div className="flex space-x-2">
          <button
            onClick={saveAsImage}
            disabled={isExporting}
            className={`flex items-center px-4 py-3 rounded-full ${
              isExporting 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{isExporting ? 'Saving...' : 'Save as Image'}</span>
          </button>
          <button
            onClick={saveAsPDF}
            disabled={isExporting}
            className={`flex items-center px-4 py-3 rounded-full ${
              isExporting 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{isExporting ? 'Saving...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>
      
      {exportError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {exportError}
        </div>
      )}

      <div 
        ref={briefRef}
        className="bg-white border border-gray-200 rounded-md p-6"
      >
        <div className="text-right text-gray-500 text-sm mb-2">
          {new Date().toLocaleDateString()}
        </div>

        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-3xl">
              {brand === 'Coca-Cola' && '🥤'}
              {brand === 'Fanta' && '🍊'}
              {brand === 'Powerade' && '🔵'}
              {brand === 'Minute Maid' && '🧃'}
              {brand === 'Jack&Coke' && '⚫'}
            </span>
            <span className="text-sm mt-1 text-gray-900">{brand}</span>
          </div>
          
          <span className="text-2xl text-gray-900">×</span>
          
          <div className="flex flex-col items-center">
            <span className="text-3xl">
              {surface === 'On-Pack' && '📦'}
              {surface === 'Digital OOH' && '🖥️'}
              {surface === 'Virtual Worlds' && '🌐'}
              {surface === 'Location-Based' && '📍'}
              {surface === 'Live & Shared Events' && '🎪'}
              {surface === 'Influencer Collaborations' && '👥'}
              {surface === 'Gaming & Interactive Play' && '🎮'}
              {surface === 'New Frontiers' && '🚀'}
            </span>
            <span className="text-sm mt-1 text-gray-900">{surface}</span>
          </div>
        </div>

        <h2 className="text-center text-lg font-semibold mb-6 text-gray-900">{brief.question}</h2>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">Objective</h3>
          <p className="text-gray-900">{brief.objective}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">Context</h3>
          <p className="text-gray-900">{brief.context}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">Key Steps</h3>
          <ul className="list-disc pl-5 text-gray-900">
            {brief.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">Success Metrics</h3>
          <ul className="list-disc pl-5 text-gray-900">
            {brief.metrics.map((metric, index) => (
              <li key={index}>{metric}</li>
            ))}
          </ul>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-4 text-center text-sm text-gray-500">
          Generated with Spatial Experience Brief Generator
        </div>
      </div>
    </div>
  );
};

export default BriefDisplay; 