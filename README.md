# CF Profile Analyzer
Link        https://cf-pr-analyst.netlify.app/

CF Profile Analyzer is a React web application that helps users analyze their Codeforces profile, providing insights into the number of problems solved by tag, rating, unsolved problems, best rank, acceptance rate, and more. Users can input their Codeforces handle and get real-time data. The app also allows users to receive problem recommendations based on unsolved problems and difficulty ratings.

## Features

- Analyze Codeforces profile data, including solved problems, unsolved problems, and contest performance.
- Visualize problem-solving stats by tags and ratings using pie and bar charts.
- Scroll through unsolved problems and solved problems by tag with a smooth UI experience.
- Receive problem recommendations based on unsolved problems of specific ratings.
- Modern UI using **React.js** and styled with **Tailwind CSS**.

## Getting Started

To get started with the project, you can clone this repository and install the necessary dependencies.

### Prerequisites

- Node.js (version >= 14.0)
- npm or yarn (depending on your preference)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Goelankita15/CF-Profile-Analizer.git
   cd CF-Profile-Analizer
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Project

In the project directory, you can run:

#### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes to the code.

### Building the Project

To create a production build of the app, run:

#### `npm run build`

This will build the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include hashes.

### Deployment

You can deploy the production build to any static server, including GitHub Pages, Netlify, or Vercel.

For more details on deployment, visit the official [Create React App documentation](https://create-react-app.dev/docs/deployment).

### Learn More

To learn more about React and Create React App, you can refer to the following resources:

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://create-react-app.dev/docs/getting-started)

### Project Structure

The project is structured as follows:

```
/src
  /components
    - Dashboard.js        // Main component that fetches and displays user data
    - Problem Reccomender.js    // Problem Reccommender
  App.js                  // Main app file
  index.js                // Entry point of the React application
  App.css                 // Tailwind CSS configuration
```

### Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Starts the app in development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Launches the test runner.
- `npm run eject`: Ejects the configuration files if you need to customize them.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
