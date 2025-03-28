# EmployWise Assignment

A React application for user management with authentication and CRUD operations.

## Features

- User authentication (login/signup)
- User management (create, read, update, delete)
- Pagination
- Responsive design
- Protected routes
- Real-time notifications

## Tech Stack

- React
- Vite
- React Router
- Supabase (Authentication & Database)
- Tailwind CSS
- React Hot Toast
- Lucide React (Icons)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/employwise-assignment.git
   ```

2. Install dependencies:
   ```bash
   cd employwise-assignment
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # Reusable components
├── lib/           # Library configurations
├── pages/         # Page components
├── services/      # API services
└── main.jsx       # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.