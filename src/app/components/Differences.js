import React from "react";

const Differences = ({ differences }) => {
  console.log(differences, typeof differences); // Log to verify the input

  // Split the response based on the '**' delimiter and filter out empty sections
  const rawSections = differences
    .split("**")
    .filter((item) => item.trim() !== "");

  // Function to extract sections and titles
  const extractSections = (sections) => {
    let parsedSections = [];

    // Loop through raw sections and pair each title with content
    for (let i = 0; i < sections.length; i += 2) {
      // Title is the first item in the pair, content is the second
      if (i + 1 < sections.length) {
        parsedSections.push({
          title: sections[i].trim(),
          content: sections[i + 1].trim(),
        });
      }
    }

    return parsedSections;
  };

  const sections = extractSections(rawSections);

  // Ensure sections is not empty
  if (sections.length === 0) {
    return (
      <p className="text-gray-500 text-center bg-gray-100 textw">
        No sections to display
      </p>
    );
  }

  return (
    <div className="w-4/5 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg bg-gray-100">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Evaluation of Test Document compared to Standard Document
      </h2>

      {/* Dynamically display each section */}
      {sections.map((section, index) => (
        <section
          key={index}
          className="bg-white p-6 mb-6 border-l-4 border-blue-500 rounded-lg shadow-md transition-all hover:transform hover:scale-105 hover:shadow-xl"
        >
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            {section.title}:
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            {section.content}
          </p>
        </section>
      ))}
    </div>
  );
};

export default Differences;
