# Excel File Uploader

This is a Express.js and Vue.js application for bulk uploading shipment data from excel file.

## Features

- Upload Excel files containing shipment data.
- Process uploaded data and save shipments to the database.
- Refresh shipment data.
- Download demo Excel file.

## Installation

1. Clone this repository.
2. Install dependencies for both the backend and frontend:
   ```bash
   npm install
   ```
3. Start the backend server on port `8000`:
   ```bash
   npm start
   ```
4. Start the frontend development server on port `5173`:
   ```bash
   npm run dev
   ```

Ensure that you have Node.js installed on your system before proceeding with the installation. These commands will set up the backend server on port `8000` and the frontend development server on port `5173`.

## Usage

1. Upload an Excel file containing shipment data.
2. Click "Upload Excel" to initiate the upload process.
3. Once uploaded successfully, click "Refresh" to load the data.
4. To download a demo Excel file, click "Download Sample".

## Screenshots

![Screenshot](frontend/public/demo.png)

## Technologies Used

- Vue.js
- Node.js
- Express.js
- MongoDB

## Further Improvements

- Implement global error handling to gracefully handle errors throughout the application.
- Enhance validation mechanisms to ensure data integrity and consistency.
- Implement additional security practices such as input sanitization, authentication, authorization, and data encryption to enhance application security.
- Enhance UI indicators to provide clearer feedback to users, improving the overall user experience and usability.
