# Stock Portfolio Manager

This project is an Express.js-based application for managing stock portfolios. It allows users to perform CRUD operations on stocks and calculate the total portfolio value.

## Steps to Run the Project Locally

1. **Clone the Repository**:

   ```bash
   git clone <repository-link>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   Make sure you have Node.js and npm installed. Then, run:

   ```bash
   npm install
   ```

3. **Set Environment Variables**:
   Create a `.env` file in the project root and configure the following variable:

   ```env
    VITE_API_URL_PROD=http://localhost:4000
   ```

4. **Start MongoDB**:
   Ensure you have MongoDB installed and running locally or provide a remote database URI in your environment variables:

   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/portfolio
   ```

5. **Run the Server**:
   Start the server with:

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:4000` by default.
