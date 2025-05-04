#!/bin/bash
echo "Installing Earthquake Analyst Premium dependencies..."
echo ""
echo "This will install all required packages for the application"
echo ""
npm install
echo ""
echo "Installation complete!"
echo "Run ./start.sh to start the application"
echo ""

# Make the start script executable
chmod +x start.sh 