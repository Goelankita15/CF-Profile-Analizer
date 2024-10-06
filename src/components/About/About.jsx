// src/About.js
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">About Codeforces Profile Analyzer</h1>
      
      <p className="mb-4 text-gray-700">
        Welcome to the Codeforces Profile Analyzer! This tool is designed to help you analyze your performance on the Codeforces platform.
      </p>

      <h2 className="text-2xl font-bold mt-4 mb-2">How It Works</h2>
      <p className="mb-4 text-gray-700">
        By entering your Codeforces handle, the analyzer fetches your submission history and user profile information from the Codeforces API. 
        It provides you with insights into your problem-solving skills, including:
      </p>
      
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Problems solved by different tags (e.g., Dynamic Programming, Greedy)</li>
        <li>Problems solved based on their rating</li>
        <li>Your total number of submissions</li>
        <li>Your acceptance rate (percentage of accepted solutions)</li>
        <li>Your best rank and current rating</li>
        <li>A list of unsolved problems with links for easy access</li>
      </ul>

      <h2 className="text-2xl font-bold mt-4 mb-2">How to Use</h2>
      <p className="mb-4 text-gray-700">
        To get started, follow these simple steps:
      </p>
      <ol className="list-decimal list-inside mb-4 text-gray-700">
        <li>Enter your Codeforces handle in the input field.</li>
        <li>Click on the "Fetch Data" button.</li>
        <li>View your performance analysis displayed on the page.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-4 mb-2">Why Use This Tool?</h2>
      <p className="mb-4 text-gray-700">
        The Codeforces Profile Analyzer helps you track your progress and identify areas for improvement. By visualizing your problem-solving trends, 
        you can focus your efforts on specific tags or ratings, enhancing your competitive programming skills.
      </p>

      <h2 className="text-2xl font-bold mt-4 mb-2">Get Started!</h2>
      <p className="mb-4 text-gray-700">
        Ready to dive into your Codeforces stats?
        <a className= 'text-blue-800' href="/dashboard"> Click here</a>
      </p>
    </div>
  );
};

export default About;
