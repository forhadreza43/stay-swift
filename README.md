# 🏨 StaySwift

A modern, full-stack hotel booking platform built with Next.js 16, MongoDB, and Better Auth. Browse hotels, filter by amenities and price, check availability, and complete secure bookings with an intuitive UI.


## ✨ Features

### 🔐 Authentication

- Email & Password authentication
- Social login (GitHub, Google)
- Secure session management with Better Auth
- Protected routes and user authorization

### 🏨 Hotel Management

- Browse hotels with detailed information
- Advanced filtering system:
  - Price range filter
  - Star rating categories
  - Amenities (WiFi, Pool, Spa, etc.)
  - Sort by price (low to high / high to low)
- Real-time availability checking
- Interactive image gallery with modal view
- Hotel ratings and reviews

### 📅 Booking System

- Date picker for check-in/check-out selection
- Booking availability validation
- Conflict detection (prevents double bookings)
- Upcoming and past bookings dashboard
- Booking history with detailed information

### 💳 Payment Integration

- Secure payment form with card validation
- Payment inputs with card type detection
- Booking confirmation flow
- Price calculation based on duration

### 📱 Responsive Design

- Mobile-first approach
- Hamburger menu for small devices
- Adaptive layouts for all screen sizes
- Dark/Light theme support

## 🚀 Tech Stack

### Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4.0
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Icons:** Lucide React
- **Animations:** tw-animate-css
- **Theme:** next-themes

### Backend
- **Database:** MongoDB 7.0 with Mongoose
- **Authentication:** Better Auth
- **API Routes:** Next.js API Routes
- **Data Fetching:** Server Components with direct DB queries

### Key Libraries
- `react-payment-inputs` - Credit card input validation
- `react-day-picker` - Date selection
- `date-fns` - Date manipulation
- `sonner` - Toast notifications
- `class-variance-authority` - Component variants

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher
- **MongoDB** database (local or Atlas)
- **GitHub OAuth App** (for GitHub login)
- **Google OAuth App** (for Google login)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/forhadreza43/stay-swift.git
   cd stay-swift
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # MongoDB
   MONGO_URI=mongodb://localhost:27017/stayswift
   # Or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stayswift

   # Better Auth
   BETTER_AUTH_SECRET=your-random-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000

   # GitHub OAuth
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

   **Generate a secret key:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Set up OAuth providers**

   **GitHub:**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Set **Homepage URL:** `http://localhost:3000`
   - Set **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Client Secret to `.env.local`

   **Google:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Go to Credentials → Create OAuth 2.0 Client ID
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy Client ID and Client Secret to `.env.local`

5. **Seed the database (optional)**

   If you have sample hotel data, you can import it into your MongoDB database:
   ```bash
   mongoimport --db stayswift --collection hotels --file hotels.json --jsonArray
   ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
stay-swift/
├── app/
│   ├── (auth)/              # Authentication routes (login, signup)
│   ├── (Home)/              # Main application routes
│   │   ├── hotels/          # Hotel listing and details
│   │   ├── bookings/        # User bookings dashboard
│   │   └── payment/         # Payment processing
│   ├── api/                 # API routes
│   │   ├── auth/            # Better Auth endpoints
│   │   ├── payment/         # Payment processing
│   │   └── ...              # Other API endpoints
│   └── globals.css          # Global styles
├── components/
│   ├── auth/                # Auth forms (sign-in, sign-up)
│   ├── hotel/               # Hotel components (cards, filters, gallery)
│   ├── payment/             # Payment form components
│   ├── search/              # Search and filter components
│   ├── ui/                  # Reusable UI components (Shadcn)
│   └── Navbar.tsx           # Navigation with mobile menu
├── db/
│   ├── models.ts            # Mongoose schemas
│   └── mongo-client.ts      # MongoDB connection
├── lib/
│   ├── auth.ts              # Better Auth configuration
│   ├── auth-client.ts       # Client-side auth hooks
│   └── utils.ts             # Utility functions
├── types/
│   └── types.ts             # TypeScript type definitions
├── utils/
│   ├── data-util.ts         # Data manipulation utilities
│   └── queries.ts           # Database queries
└── public/                  # Static assets
```

## 🔑 Key Features Explained

### Server-Side Data Fetching

The app uses Next.js 15+ server components with direct database queries instead of API routes for optimal performance:

```typescript
// Direct DB query in server component
const { data: hotels } = await getHotels(searchQuery);
```

### Filter System

Advanced filter with URL persistence:
- Price ranges (multiple selection)
- Star ratings (1-5 stars)
- Amenities checkboxes
- Sort options (low/high price)

### Booking Validation

Prevents double bookings by checking existing reservations:
```typescript
const existingBooking = await findBooking(hotelId, checkIn, checkOut);
if (existingBooking) {
  hotel.isBooked = true;
}
```

### Responsive Navigation

Desktop navbar with hamburger Sheet menu on mobile using Shadcn UI components.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Update these values for production:
- `BETTER_AUTH_URL` → Your production domain
- `MONGO_URI` → MongoDB Atlas connection string
- OAuth callback URLs → Update in GitHub/Google console

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👨‍💻 Author

**Forhad Reza**
- GitHub: [@forhadreza43](https://github.com/forhadreza43)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Better Auth](https://www.better-auth.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

---

Made with ❤️ using Next.js and MongoDB
