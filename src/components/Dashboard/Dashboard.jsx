// src/UserStats.js
import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserStats = () => {
  const [handle, setHandle] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async (handle) => {
    setLoading(true);
    setError(null);

    try {
      const userStatusResponse = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&lang=en`);
      const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${handle}&lang=en`);

      if (!userStatusResponse.ok || !userInfoResponse.ok) {
        throw new Error('Failed to fetch data. Please check the handle or try again.');
      }

      const statusData = await userStatusResponse.json();
      const infoData = await userInfoResponse.json();

      if (statusData.status !== 'OK' || infoData.status !== 'OK') {
        throw new Error(statusData.comment || infoData.comment);
      }

      const submissions = statusData.result;
      const userInfo = infoData.result[0];

      const problemsSolvedByTag = {};
      const problemsSolvedByRating = {};
      const unsolvedProblems = new Set();

      submissions.forEach((submission) => {
        if (submission.verdict === 'OK') {
          const { tags, rating } = submission.problem;
          tags.forEach((tag) => {
            problemsSolvedByTag[tag] = (problemsSolvedByTag[tag] || 0) + 1;
          });
          problemsSolvedByRating[rating] = (problemsSolvedByRating[rating] || 0) + 1;
        } else {
          unsolvedProblems.add(`${submission.problem.contestId}_${submission.problem.index}_${submission.problem.name}`);
        }
      });

      const acceptedProblemsCount = submissions.filter(sub => sub.verdict === 'OK').length;
      const acceptanceRate = (acceptedProblemsCount / submissions.length) * 100;

      const unsolvedProblemList = Array.from(unsolvedProblems).map((problem) => {
        const [contestId, index, name] = problem.split('_');
        return { contestId, index, name };
      });

      setUserData({
        userName: userInfo.handle,
        totalSubmissions: submissions.length,
        problemsSolvedByTag,
        problemsSolvedByRating,
        unsolvedProblems: unsolvedProblemList,
        acceptanceRate: acceptanceRate.toFixed(2),
        bestRank: userInfo.maxRank || 'Unranked',
        rating: userInfo.rating || 'No rating available',
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handle) {
      fetchUserData(handle);
    }
  };

  const renderCharts = () => {
    if (!userData) return null;

    const tagData = Object.entries(userData.problemsSolvedByTag).map(([tag, count]) => ({ name: tag, value: count }));
    const ratingData = Object.entries(userData.problemsSolvedByRating).map(([rating, count]) => ({ name: rating, value: count }));

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d084b5', '#ff6565'];
    const barColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6565', '#8884D8', '#82CA9D'];

    return (
      <div>
        <h2 className="text-xl font-bold mt-6">User: {userData.userName}</h2>
        <h3 className="text-lg">Total Submissions: {userData.totalSubmissions}</h3>
        <h3 className="text-lg">Best Rank: {userData.bestRank}</h3>
        <h3 className="text-lg">Rating: {userData.rating}</h3>
        <h3 className="text-lg">Acceptance Rate: {userData.acceptanceRate}%</h3>

        <div className="my-6 flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-1/2">
            <h2 className="text-lg font-bold mb-2">Problems Solved by Tag</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={tagData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                  {tagData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Scrollable List of Tags */}
            <div className="h-40 overflow-y-auto mt-1 border border-gray-300 rounded">
              <ul className="list-disc ml-5">
                {tagData.map((tag, index) => (
                  <li key={index} className="text-gray-700">
                    {tag.name}: {tag.value} problems
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-lg font-bold mb-2">Problems Solved by Rating</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={ratingData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {ratingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scrollable List of Unsolved Problems */}
        <div className="my-6">
          <h2 className="text-lg font-bold mb-2">Unsolved Problems</h2>
          <div className="h-40 overflow-y-auto border border-gray-300 rounded">
            <ul className="list-disc ml-5">
              {userData.unsolvedProblems.map((problem, index) => (
                <li key={index}>
                  <a
                    href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {problem.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Codeforces User Stats</h1>

      <form onSubmit={handleSubmit} className="flex justify-center mt-4 mb-8">
        <input
          type="text"
          placeholder="Enter Codeforces Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="border rounded p-2 w-64"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2 ml-2">
          Fetch Data
        </button>
      </form>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
      {!loading && userData && renderCharts()}
    </div>
  );
};

export default UserStats;
