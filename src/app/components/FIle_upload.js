"use client";

import React, { useState } from "react";
import axios from "axios";
import Differences from "./Differences";

const FileUpload = () => {
  const [fileType, setFileType] = useState("");
  const [sampleFile, setSampleFile] = useState(null);
  const [compareFile, setCompareFile] = useState(null);
  const [comparedData, setCompareData] = useState(null);

  const handleSampleFileChange = (e) => {
    setSampleFile(e.target.files[0]);
  };

  const handleCompareFileChange = (e) => {
    setCompareFile(e.target.files[0]);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sampleFile || !compareFile) {
      alert("Please select both files.");
      return;
    }
    if (!fileType) {
      alert("Please select a file type.");
      return;
    }
    const formData = new FormData();
    formData.append("standardFile", sampleFile);
    formData.append("testFile", compareFile);
    formData.append("file_type", fileType);

    try {
      const response = await axios.post(
        "http://localhost:3001/evaluate",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log("Files uploaded successfully:", response.data.evaluation);
      // let differences = Array.isArray(response.data)
      //   ? response.data
      //   : Array.from(response.data);
      setCompareData(response.data.evaluation);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Upload Your Files
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sample File Input */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Select Sample File
              </label>
              <input
                type="file"
                onChange={handleSampleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
            </div>

            {/* Compare File Input */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Select Compare File
              </label>
              <input
                type="file"
                onChange={handleCompareFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
            </div>

            {/* File Type Dropdown */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                File Type
              </label>
              <select
                value={fileType}
                onChange={handleFileTypeChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose file type</option>
                <option value="pdf">PDF</option>
                <option value="doc">DOC</option>
                <option value="txt">TXT</option>
                <option value="image">Image</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {comparedData ? (
        <Differences differences={comparedData} />
      ) : (
        <p className="text-gray-500 text-center bg-gray-100 ">
          No differences to display.
        </p>
      )}
    </div>
  );
};

export default FileUpload;
