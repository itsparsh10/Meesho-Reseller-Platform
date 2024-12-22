Meesho Reseller Platform
Meesho is a platform that enables individuals to start their own online businesses by reselling products. This project is a full-stack application designed to manage product listings, reseller profiles, and customer transactions, with seamless integration into social media platforms.

Features
Product Management: Add, update, and delete product listings with detailed information and images.
Reseller Profiles: Create and manage reseller accounts with personalized dashboards.
Customer Transactions: Handle orders, payments, and track delivery statuses efficiently.
Social Media Integration: Share products directly to social media platforms to reach a wider audience.
Technologies Used
Frontend: React.js, CSS, HTML
Backend: Node.js, Express.js
Database: MongoDB,Firebase
API : Google Gemini

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/itsparsh10/Meesho-Reseller-Platform.git
Navigate to the project directory:

bash
Copy code
cd Meesho-Reseller-Platform
Install dependencies for both frontend and backend:

bash
Copy code
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
Set up environment variables:

Create a .env file in the backend directory and add the following:

makefile
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
API : Google Gemini API
FIREBASE
Start the development servers:

bash
Copy code
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../frontend
npm start
The application should now be running, with the frontend accessible at http://localhost:3000 and the backend at http://localhost:5000.

Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
Meesho for inspiring this project.
MongoDB, Express.js, React.js, and Node.js for providing the technological stack.
