const express = require('express');
const path = require('path');
const app = express();

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes by serving index.html (important for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Club Management - Frontend Server     ║
║  Running on port ${PORT}                    ║
║  Status: ✓ Ready                       ║
╚════════════════════════════════════════╝
  `);
});
