"use client";

import React, { useState } from "react";
import Onboarding from "./OnboardingPage"; // adjust the path if needed

const OnboardingPage = () => {
  const [documents, setDocuments] = useState<File[]>([]);

  return (
    <Onboarding documents={documents} setDocuments={setDocuments} />
  );
};

export default OnboardingPage;