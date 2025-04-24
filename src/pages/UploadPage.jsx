import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FileSpreadsheet, Upload, AlertCircle, Check, X } from 'lucide-react';
import Button from '../components/ui/Button';
import * as XLSX from 'xlsx';

const UploadPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    // Filter for Excel files
    const excelFiles = acceptedFiles.filter(
      file => file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
             file.type === 'application/vnd.ms-excel'
    );
    
    if (excelFiles.length === 0) {
      setError('Please upload Excel files (.xls or .xlsx) only.');
      return;
    }
    
    setError(null);
    setFiles(excelFiles);
    
    // Read the Excel file data for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (e.target?.result) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          setFileData({
            name: excelFiles[0].name,
            size: excelFiles[0].size,
            sheetName: firstSheetName,
            rows: jsonData.length,
            columns: jsonData[0] ? jsonData[0].length : 0,
            headers: jsonData[0] || [],
            preview: jsonData.slice(1, 6) // First 5 rows for preview
          });
        }
      } catch (err) {
        setError('Unable to read the Excel file. The file may be corrupted or in an unsupported format.');
        setFileData(null);
      }
    };
    
    reader.readAsArrayBuffer(excelFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    }
  });

  const removeFile = () => {
    setFiles([]);
    setFileData(null);
    setUploadProgress(null);
    setError(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            // Redirect to visualization page with a mock file ID
            navigate('/dashboard/visualization/new-file-123');
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Upload Data
        </h1>
        <p className="text-slate-600">
          Upload your Excel spreadsheets to create visualizations and gain insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Upload area */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Excel File Upload
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {files.length === 0 ? (
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-slate-300 hover:border-primary-400'
                }`}
              >
                <input {...getInputProps()} />
                <FileSpreadsheet className="w-10 h-10 mx-auto text-slate-400 mb-4" />
                <p className="font-medium text-slate-700 mb-1">
                  {isDragActive ? 'Drop the files here...' : 'Drag & drop Excel files here'}
                </p>
                <p className="text-sm text-slate-500 mb-4">
                  or click to browse from your computer
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  leftIcon={<Upload size={16} />}
                >
                  Select Files
                </Button>
                <p className="text-xs text-slate-500 mt-4">
                  Supported file types: .xlsx, .xls
                </p>
              </div>
            ) : (
              <div>
                {/* File preview */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FileSpreadsheet className="w-8 h-8 text-green-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-slate-900">{files[0].name}</h3>
                        <p className="text-sm text-slate-500">{formatFileSize(files[0].size)}</p>
                      </div>
                    </div>
                    <button 
                      onClick={removeFile}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {uploadProgress !== null && (
                    <div className="mb-4">
                      <div className="flex justify-between mb-1 text-xs">
                        <span className="font-medium text-slate-700">Uploading...</span>
                        <span className="text-slate-500">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary-600 h-2.5 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {fileData && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-slate-900 mb-2">File Preview</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-100">
                              {fileData.headers.map((header, index) => (
                                <th key={index} className="px-3 py-2 border border-slate-200">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {fileData.preview.map((row, rowIndex) => (
                              <tr key={rowIndex} className="bg-white">
                                {fileData.headers.map((_, colIndex) => (
                                  <td key={colIndex} className="px-3 py-2 border border-slate-200">
                                    {row[colIndex]}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-xs text-slate-500 mt-2">
                        Showing {Math.min(fileData.preview.length, 5)} of {fileData.rows - 1} rows
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="primary"
                      leftIcon={<Upload size={16} />}
                      isLoading={isUploading}
                      onClick={handleUpload}
                    >
                      Upload and Visualize
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Instructions */}
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Upload Guidelines
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Upload Excel files (.xlsx or .xls) only</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Maximum file size: 10MB</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>First row should contain column headers</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Data should be clean and properly formatted</span>
              </li>
            </ul>
          </div>

          {/* Tips */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Tips for Better Results
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start">
                <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary-600">1</span>
                </div>
                <span>Remove any empty rows or columns before uploading</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary-600">2</span>
                </div>
                <span>Ensure consistent data types in each column</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary-600">3</span>
                </div>
                <span>Use clear and descriptive column headers</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary-600">4</span>
                </div>
                <span>Check for any merged cells and unmerge them</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage; 