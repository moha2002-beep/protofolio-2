# Scholarly Library

Scholarly Library is a web application designed to manage and search educational materials. It allows users to view, add, edit, and delete materials, authors, and categories. The application is built using Node.js, Express, and MySQL, with EJS as the templating engine and Bootstrap for styling.

## Features

- View all materials with their authors and categories.
- Add new materials, authors, and categories.
- Edit existing materials, authors, and categories.
- Delete materials, authors, and categories.
- Search functionality to find specific materials.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MySQL server installed and running.
- Access to a terminal or command line interface.

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd scholarly-library
   ```

2. **Install dependencies:**

   Run the following command to install the necessary packages:

   ```bash
   npm install
   ```

3. **Configure the database:**

   - Create a MySQL database named `scholarly_library`.
   - Import the database schema and sample data:

     ```bash
     mysql -u <username> -p scholarly_library < db/db.sql
     mysql -u <username> -p scholarly_library < db/sample_data.sql
     ```

   Replace `<username>` with your MySQL username.

4. **Set environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   DB_HOST=localhost
   DB_USER=<your_mysql_username>
   DB_PASSWORD=<your_mysql_password>
   DB_DATABASE=scholarly_library
   ```

   Replace `<your_mysql_username>` and `<your_mysql_password>` with your MySQL credentials.

5. **Run the application:**

   Start the server by running:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:8000`.

## Usage

- Navigate to `http://localhost:8000` in your web browser.
- Use the navigation links to explore materials, authors, and categories.
- Add, edit, or delete entries as needed.

## File Structure

- `db/`: Contains the database connection file and SQL scripts for schema and sample data.
- `routes/`: Contains the main application routes and views.
- `public/`: Contains static files such as CSS and JavaScript.
- `views/`: Contains EJS templates for rendering HTML pages.

## Dependencies

- Express
- MySQL2
- Body-parser
- EJS
- Bootstrap
