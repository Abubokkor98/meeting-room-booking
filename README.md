# 🏢 Meeting Room Booking System

A full-stack meeting room booking system that allows users to book, manage, and cancel room reservations, while admins can manage rooms and bookings efficiently.

## ✨ Features

### ✅ Admin Features:
- Fetch all bookings
- Add a new room
- Update a room
- Delete a room
- Manage rooms & bookings efficiently

### ✅ User Features:
- Fetch user-specific bookings
- Allow users to book rooms
- Cancel bookings
- Favorite Room (Using Local Storage)

## 🚀 Tech Stack
**Frontend:** Next.js 14, React 18, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB  
**State Management:** TanStack React Query  
**Forms & Validation:** React Hook Form  
**Notifications:** React Hot Toast  
**API Requests:** Axios  
**Authentication:** Clerk

---

### **🖥️ Admin Dashboard Credentials**

Use the following credentials to access the admin dashboard:

- **Email**: `himu3311@gmail.com`
- **Password**: `meeting-room-admin`

---

## 🚀 Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/Abubokkor98/meeting-room-booking.git
    ```

2. Navigate to the project directory:
    ```bash
    cd meeting-room-booking
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Setup Environment Variables:
    Create a `.env.local` file in the root directory with the following variables:
    ```plaintext
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
    NEXT_PUBLIC_VITE_IMAGE_HOSTING_KEY=your_imgbb_api_key
    NEXT_PUBLIC_API_BASE_URL= your_backend_api_url
    ```

5. Run the Project:
    ```bash
    npm run dev
    ```

6. Access the application at `http://localhost:3000`.

---

## 🎯 Features to Improve
- Implement Stripe Payment for room bookings
- Add Calendar View for room availability
- Improve Admin Dashboard UI
- Integrate Email Notifications for bookings

## 🛠️ Additional Notes
- Make sure MongoDB is running if using a local database
- Clerk authentication must be set up correctly for user authentication
- TanStack Query is used for real-time data updates without manually reloading pages

---

### **🙋‍♂️ About the Developer**

Built with 💻 and passion by **Abu Bokkor Siddik**.

- **GitHub**: [Abubokkor98](https://github.com/Abubokkor98)
- **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/in/abubokkor)
