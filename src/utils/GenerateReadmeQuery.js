import React from "react";

export const generateReadmeQuery = (repoName) => {
  return {
    query: `Generate a short README.md file in markdown syntax for this repository: ${repoName}. Only include the markdown in the response.
    The README.md file should include:
    Title:

The name of the repository, typically formatted as an H1 heading.

Description:
A brief description of the repository, outlining its purpose and main features.

Table of Contents / Menu Navigation:
A menu/navigation section with links to different sections of the README.

Installation:
Instructions on how to install or set up the project.

Technologies Used:
Include a section detailing the technologies used in this project.

Usage:
Guidance on how to use the project, including any necessary commands or examples.

Contributing:
Information for potential contributors, including guidelines and steps for contributing to the project.

License:
Details about the license under which the project is distributed. Add a license badge if available.

Contact:
A section providing contact information. You can customize this section to include details such as an email address, social media profiles, or any other preferred means of communication.`,
  };
};
