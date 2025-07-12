# Personal Reading List Manager

A modern, responsive web application for tracking personal reading progress. Built as part of the Software Engineering coursework at London South Bank University.

## 🚀 Live Demo

- **Live Application:** [Your Vercel URL here]
- **Demo Video:** [Your YouTube URL here]

## 📱 Features

### Core Functionality
- ✅ **Add Books** - Easy book entry with title, author, status, and notes
- ✅ **View All Books** - Clean list/table display with all book information
- ✅ **Update Status** - Change reading status (To Read, Reading, Completed)
- ✅ **Delete Books** - Remove books with confirmation dialog
- ✅ **Search & Filter** - Find books by title, author, or filter by status

### Enhanced Features
- 📊 **Dashboard** - Visual statistics showing reading progress
- 🔄 **Sorting** - Sort books by title, author, or date added
- 📝 **Personal Notes** - Add thoughts and impressions for each book
- 🎨 **Visual Indicators** - Color-coded status badges and icons
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile

## 🛠️ Technology Stack

- **Frontend:** React 18 with Hooks
- **Build Tool:** Vite (fast development and optimized builds)
- **Styling:** Tailwind CSS (utility-first CSS framework)
- **Database:** Supabase (PostgreSQL with real-time features)
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Supabase account

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/bogdanlsbu/personal-reading-list-manager.git
cd personal-reading-list-manager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
Run this SQL in your Supabase SQL Editor:
```sql
-- Create books table
CREATE TABLE books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('To Read', 'Reading', 'Completed')),
  notes TEXT,
  date_added TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_books_date_added ON books(date_added);
```

### 5. Run Application
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in your browser.

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build
```

## 📊 Project Structure

```
src/
├── components/           # React components
│   ├── BookForm.jsx     # Add new books
│   ├── BookList.jsx     # Display and manage books
│   ├── Dashboard.jsx    # Reading statistics
│   ├── Header.jsx       # App header
│   ├── SearchFilter.jsx # Search and filter
│   └── __tests__/       # Component tests
├── services/            # External service configurations
│   └── supabase.js      # Supabase client setup
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## 🎯 Usage

### Adding Books
1. Fill in book title and author (required)
2. Select reading status (defaults to "To Read")
3. Add optional notes
4. Click "Add Book"

### Managing Your Library
- **Search:** Type in search box to find books by title or author
- **Filter:** Use status dropdown to show specific reading statuses
- **Sort:** Click sort buttons to order by title, author, or date
- **Edit:** Click edit icon to modify book details
- **Delete:** Click trash icon to remove books (with confirmation)

### Reading Progress
- View statistics in the dashboard
- Track books across: To Read, Reading, Completed
- Monitor reading habits over time

## 🏗️ Development Methodology

This project was developed using **Kanban methodology** with:
- Visual workflow management (To Do → In Progress → Done)
- Iterative feature development
- User story-driven requirements
- Continuous integration and testing

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests

## 📈 Performance Features

- ⚡ Fast loading with Vite
- 🗄️ Efficient database queries
- 🎨 Optimized CSS with Tailwind
- 📱 Responsive design for all devices
- 🔍 Real-time search functionality

## 🎓 Academic Context

Created as part of the **Software Engineering** module (CSI_5_SFE) at **London South Bank University**. This project demonstrates:

- Modern web development practices
- Component-based architecture
- Database design and integration
- User experience design
- Testing methodologies
- Professional development workflow

## 📄 License

This project is for educational purposes as part of university coursework.

## 🤝 Contributing

This is an academic project. For questions or suggestions related to the coursework, please contact the module leader.

## 📞 Support

For technical issues or questions about the implementation, refer to the comprehensive documentation or the demo video provided.

---

**Built with ❤️ for Software Engineering coursework**
