"use client";

import React, { useState, DragEvent, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type OnboardingProps = {
  documents: File[];
  setDocuments: React.Dispatch<React.SetStateAction<File[]>>;
};

const Onboarding: React.FC<OnboardingProps> = ({ documents = [], setDocuments }) => {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const objectURLs = documents.map((doc) => URL.createObjectURL(doc));

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {

    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setDocuments((prevDocs) => [...prevDocs, ...newFiles]);

  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const exportToExcel = () => {
    const docNames = documents.map((doc) => doc.name).join(", ");
    const data = [
      { Field: "First Name", Value: profile.firstName },
      { Field: "Last Name", Value: profile.lastName },
      { Field: "Email", Value: profile.email },
      { Field: "Phone", Value: profile.phone },
      { Field: "Uploaded Documents", Value: docNames || "None" },
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Onboarding");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "onboarding.xlsx");
  };

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)] bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl h-full flex flex-col justify-between">
        <div>
          {/* Step Buttons */}
          <div className="flex items-center justify-center mb-6">
            {["Profile", "Upload Documents", "Review"].map((label, idx) => (
              <React.Fragment key={idx}>
                <button
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition duration-200 ${
                    step === idx + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-blue-300 text-blue-500 hover:bg-blue-100"
                  }`}
                  onClick={() => setStep(idx + 1)}
                >
                  {label}
                </button>
                {idx < 2 && <span className="mx-2 text-blue-400">→</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <div className="h-[400px] overflow-y-auto">
            {step === 1 && (
              <div className="space-y-4">
                <input
                  name="firstName"
                  className="border p-2 w-full rounded"
                  placeholder="First Name"
                  value={profile.firstName}
                  onChange={handleInputChange}
                />
                <input
                  name="lastName"
                  className="border p-2 w-full rounded"
                  placeholder="Last Name"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
                <input
                  name="email"
                  className="border p-2 w-full rounded"
                  placeholder="Email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
                <input
                  name="phone"
                  className="border p-2 w-full rounded"
                  placeholder="Phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <div
                  className="border-2 border-dashed p-8 rounded text-center text-gray-600"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  Drag & drop documents here
                </div>
                <ul className="mt-4 text-sm text-gray-700">
                  {documents.map((doc, idx) => (
                    <li key={idx}>📄 {doc.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded border">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile Review</h3>
                  <ul className="text-sm text-gray-800 space-y-1">
                    <li><strong>First Name:</strong> {profile.firstName || <span className="text-gray-400">Not provided</span>}</li>
                    <li><strong>Last Name:</strong> {profile.lastName || <span className="text-gray-400">Not provided</span>}</li>
                    <li><strong>Email:</strong> {profile.email || <span className="text-gray-400">Not provided</span>}</li>
                    <li><strong>Phone:</strong> {profile.phone || <span className="text-gray-400">Not provided</span>}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded border">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Document Preview</h3>
                  {documents.length > 0 ? (
                    <div className="grid gap-6">
                      {documents.map((doc, index) => (
                        <div key={index} className="border rounded overflow-hidden">
                          <div className="bg-gray-100 px-3 py-2 text-sm text-gray-600 border-b">{doc.name}</div>
                          <iframe
                            src={objectURLs[index]}
                            className="w-full h-72"
                            title={doc.name}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No documents uploaded.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={exportToExcel}
            >
              Export
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
