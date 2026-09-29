# MEDICARE Hospital Website

## Project Overview
A complete, production-quality, frontend-only hospital website built with React 18 + Vite, featuring a public website, authentication system, and patient portal.

## Tech Stack
- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: lucide-react
- **Forms**: react-hook-form + Zod
- **SEO**: react-helmet-async

## Design System
- **Primary Blue**: #0B5ED7
- **Teal Accent**: #14B8A6
- **Soft Background**: #F5F8FC
- **Font**: Poppins (Google Fonts)
- **Style**: Clean, modern, trustworthy with rounded-2xl cards, soft shadows, smooth hover effects

## Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Input.jsx
│   ├── Select.jsx
│   ├── Modal.jsx
│   ├── Badge.jsx
│   ├── SectionTitle.jsx
│   ├── Loader.jsx
│   ├── Skeleton.jsx
│   ├── Accordion.jsx
│   ├── Tabs.jsx
│   ├── ScrollToTop.jsx
│   ├── FloatingButtons.jsx
│   └── Logo.jsx
├── pages/
│   ├── public/         # Public-facing pages
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Departments.jsx
│   │   ├── DepartmentDetail.jsx
│   │   ├── Services.jsx
│   │   ├── Doctors.jsx
│   │   ├── DoctorProfile.jsx
│   │   ├── BookAppointment.jsx
│   │   ├── OnlineConsultation.jsx
│   │   ├── HealthPackages.jsx
│   │   ├── LabTests.jsx
│   │   ├── Insurance.jsx
│   │   ├── PatientGuide.jsx
│   │   ├── Gallery.jsx
│   │   ├── News.jsx
│   │   ├── NewsArticle.jsx
│   │   ├── Careers.jsx
│   │   ├── Contact.jsx
│   │   ├── Emergency.jsx
│   │   ├── Privacy.jsx
│   │   ├── Terms.jsx
│   │   └── NotFound.jsx
│   ├── auth/           # Authentication pages
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── OTPVerification.jsx
│   │   └── ResetPassword.jsx
│   └── portal/         # Patient portal pages
│       ├── Dashboard.jsx
│       ├── Profile.jsx
│       ├── MedicalHistory.jsx
│       ├── Appointments.jsx
│       ├── LabReports.jsx
│       ├── Prescriptions.jsx
│       ├── Billing.jsx
│       ├── Vitals.jsx
│       ├── HealthRecords.jsx
│       ├── Messages.jsx
│       └── Settings.jsx
├── layouts/
│   ├── PublicLayout.jsx
│   └── DashboardLayout.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── ToastContext.jsx
├── data/               # Mock data
│   ├── doctors.js
│   ├── departments.js
│   ├── services.js
│   ├── packages.js
│   ├── labTests.js
│   ├── testimonials.js
│   ├── news.js
│   ├── insurance.js
│   ├── jobs.js
│   ├── gallery.js
│   ├── leadership.js
│   ├── timeline.js
│   ├── faqs.js
│   └── patientData.js
├── hooks/
│   ├── useScrollToTop.js
│   └── useCountUp.js
├── routes/
│   └── index.jsx
├── assets/
├── App.jsx
├── main.jsx
└── index.css
```

## Design Rules
1. **Consistency**: Use the defined color palette and typography throughout
2. **Accessibility**: Include alt text, labels, focus states, and ARIA attributes
3. **Responsiveness**: Mobile-first design with breakpoints for tablet and desktop
4. **Dark Mode**: Support dark mode across all pages
5. **Animations**: Use Framer Motion for smooth transitions and micro-interactions
6. **Toast Notifications**: Provide user feedback for all actions
7. **Loading States**: Show skeleton loaders and spinners during data fetching

## Demo Credentials
- **Email**: demo@medicare.com
- **Password**: Demo@1234

## Running the Project
```bash
npm install
npm run dev
```

## Building for Production
```bash
npm run build
```
