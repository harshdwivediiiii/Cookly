` <h1>🍳 Cookly</h1>
  <p><strong>Cookly</strong> is an AI-powered cooking assistant web app designed to help users follow recipes easily—especially those who prefer text-based guidance over YouTube videos. Built with <a href="https://nextjs.org">Next.js</a>, the app combines intelligent interactions with a beautiful UI to deliver a seamless cooking experience.</p>

  <h2>🚀 Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> <a href="https://nextjs.org">Next.js 14</a>, <a href="https://ui.shadcn.com">ShadCN UI</a>, <a href="https://tailwindcss.com">Tailwind CSS</a></li>
    <li><strong>AI Integration:</strong> <a href="https://deepmind.google/technologies/gemini">Gemini API</a> via Drixxle</li>
    <li><strong>TypeScript:</strong> Ensures scalable and type-safe code</li>
    <li><strong>Animations & UX:</strong> <a href="https://www.framer.com/motion/">Framer Motion</a></li>
  </ul>

  <hr/>

  <h2>🛠️ Getting Started</h2>
  <p>To run the project locally, clone the repo and install dependencies:</p>
  <pre><code>git clone https://github.com/your-username/cookly.git
cd cookly
npm install
</code></pre>
  <p>Then, start the development server:</p>
  <pre><code>npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
</code></pre>
  <p>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser to view the app.</p>

  <hr/>

  <h2>📁 Project Structure</h2>
  <pre><code>.
├── app/
│   └── page.tsx           # Homepage & main UI
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── public/                # Static assets
├── styles/                # Global styles
├── types/                 # TypeScript types
└── ...
</code></pre>

  <hr/>

  <h2>✨ Features</h2>
  <ul>
    <li>🍲 AI-guided cooking instructions</li>
    <li>🔍 Search and filter recipes easily</li>
    <li>🌙 Dark mode with smooth transitions</li>
    <li>📱 Responsive design for all screen sizes</li>
    <li>🧠 Smart ingredient listing and step-by-step guide</li>
  </ul>

  <hr/>

  <h2>🧠 Learn More</h2>
  <ul>
    <li><a href="https://nextjs.org/docs">Next.js Documentation</a></li>
    <li><a href="https://nextjs.org/learn">Learn Next.js</a></li>
    <li><a href="https://ui.shadcn.com/docs">ShadCN UI Docs</a></li>
  </ul>

  <hr/>

  <h2>📦 Deployment</h2>
  <p>Deploy Cookly instantly using <a href="https://vercel.com">Vercel</a>:</p>
  <a href="https://vercel.com/new"><img src="https://vercel.com/button" alt="Deploy with Vercel" /></a>
  <p>Read the <a href="https://nextjs.org/docs/app/building-your-application/deploying">Next.js deployment docs</a> for more info.</p>

  <hr/>
<h2>⚙️ Environment Variables</h2>
<p>Make sure to set the following environment variables in your <code>.env</code> file:</p>
<pre><code>
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=your_mongodb_uri_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
</code></pre>

<h2>🔧 Prerequisites</h2>
<ul>
  <li><strong>Node.js:</strong> Ensure you have Node.js installed. You can download it from <a href="https://nodejs.org">here</a>.</li>
  <li><strong>npm / yarn / pnpm:</strong> Package managers to install dependencies. Choose one of these: <a href="https://www.npmjs.com/get-npm">npm</a>, <a href="https://yarnpkg.com/">yarn</a>, or <a href="https://pnpm.io/">pnpm</a>.</li>
  <li><strong>Git:</strong> To clone the repository, install Git from <a href="https://git-scm.com/">here</a>.</li>
</ul>

<h2>📝 API Documentation</h2>
<p>Cookly connects to the following endpoints:</p>
<ul>
  <li><strong>GET /recipes</strong> - Fetches a list of available recipes.</li>
  <li><strong>POST /search</strong> - Search for a recipe based on ingredients or cuisine.</li>
</ul>

<h2>🧪 Running Tests</h2>
<p>To run the test suite, use the following command:</p>
<pre><code>npm test</code></pre>
<p>This will run Jest or your preferred test runner to verify everything is working as expected.</p>

<h2>📜 License</h2>
<p>This project is licensed under the <strong>MIT License</strong> - see the <a href="LICENSE">LICENSE</a> file for details.</p>

<h2>📅 Roadmap</h2>
<p>Here are some features we plan to implement in the future:</p>
<ul>
  <li>🍽️ Meal planner integration</li>
  <li>📈 User progress tracking</li>
  <li>💬 Voice guidance for cooking</li>
</ul>

<h2>📦 Changelog</h2>
<p>See the <a href="CHANGELOG.md">CHANGELOG.md</a> for a list of all changes in each version.</p>

<h2>📧 Support</h2>
<p>If you encounter any issues, feel free to open an issue on GitHub or contact us via email:</p>
<ul>
  <li>Email: <a href="mailto:support@cookly.com">support@cookly.com</a></li>
</ul>

<h2>📝 Acknowledgments</h2>
<ul>
  <li>🍴 <a href="https://spoonacular.com/food-api">Spoonacular API</a> for recipe data.</li>
  <li>💡 <a href="https://www.framer.com/motion/">Framer Motion</a> for animations.</li>
</ul>

  <h2>🙌 Contributing</h2>
  <p>Found a bug or have a suggestion? Feel free to fork this repo, open an issue, or submit a PR.</p>

  <hr/>

  <h2>🧑‍🍳 Author</h2>
  <p>Made with ❤️ by Harshvardhan Dwivedi</p>
  <p>
    <a href="`https://www.linkedin.com/in/harshvardhan-dwivedi-86b375290" class="text-blue-500">LinkedIn</a> |
    <a href="https://github.com/harshdwivediiiii" class="text-blue-500">GitHub</a>
  </p>