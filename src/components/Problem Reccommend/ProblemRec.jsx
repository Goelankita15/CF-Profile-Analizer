import React, { useState } from 'react';

const ProblemRec = () => {
    const [handle, setHandle] = useState('');
    const [rating, setRating] = useState('');
    const [recommendedProblem, setRecommendedProblem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setRecommendedProblem(null);
        setLoading(true);

        // Validate rating
        const ratingNum = parseInt(rating);
        if (ratingNum < 800 || ratingNum > 4000) {
            setLoading(false);
            setError('Please enter a rating between 800 and 4000.');
            return;
        }

        try {
            // Fetch submission history from Codeforces API
            const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
            const data = await response.json();

            if (data.status !== 'OK') {
                setLoading(false);
                setError('Error fetching submission history. Please check the Codeforces handle.');
                return;
            }

            const solvedProblems = new Set();

            // Collect all solved problem names
            data.result.forEach(submission => {
                if (submission.verdict === 'OK') {
                    solvedProblems.add(submission.problem.name);
                }
            });

            // Fetch problems based on the rating
            const allProblemsResponse = await fetch(`https://codeforces.com/api/problemset.problems`);
            const allProblemsData = await allProblemsResponse.json();

            if (allProblemsData.status !== 'OK') {
                setLoading(false);
                setError('Error fetching problems from the problem set.');
                return;
            }

            // Filter problems by rating and ensure they are not solved
            const problems = allProblemsData.result.problems.filter(problem => {
                return (
                    problem.rating === ratingNum &&
                    !solvedProblems.has(problem.name)
                );
            });

            setLoading(false);

            if (problems.length > 0) {
                // Recommend a random unsolved problem
                const randomProblem = problems[Math.floor(Math.random() * problems.length)];
                setRecommendedProblem(randomProblem);
            } else {
                setError('No unsolved problems found for the specified rating.');
            }
        } catch (err) {
            setLoading(false);
            setError('An error occurred while fetching data. Please try again later.');
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4">Problem Recommendation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="handle" className="block text-gray-700">Codeforces Handle:</label>
                    <input
                        type="text"
                        id="handle"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rating" className="block text-gray-700">Rating (800 - 4000):</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    Get Recommendation
                </button>
            </form>

            {/* Show loading spinner or message */}
            {loading && (
                <div className="flex justify-center mt-4">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>
                    <p className="ml-2 text-blue-600">Fetching problem...</p>
                </div>
            )}

            {/* Show the recommended problem */}
            {recommendedProblem && !loading && (
                <div className="mt-6 p-4 bg-white rounded-md shadow">
                    <h3 className="text-xl font-semibold">Recommended Problem:</h3>
                    <p><strong>Title:</strong> {recommendedProblem.name}</p>
                    <p><strong>Rating:</strong> {recommendedProblem.rating}</p>
                    <p><strong>Tags:</strong> {recommendedProblem.tags.join(', ')}</p>
                    <a
                        href={`https://codeforces.com/problemset/problem/${recommendedProblem.contestId}/${recommendedProblem.index}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        View Problem
                    </a>
                </div>
            )}
        </div>
    );
};

export default ProblemRec;
