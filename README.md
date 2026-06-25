<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

---

## 📋 About

**HairDay** is a barbershop scheduling application built as a personal project. The app allows users to schedule haircut appointments by selecting a date, time slot and client name. Appointments are grouped by period (morning, afternoon, evening) and persisted across sessions using localStorage.

---

## 🚀 Features

- 📅 **Custom calendar** built from scratch with full date navigation
- 🕐 **Time slot selection** grouped by morning, afternoon and evening
- ✅ **Appointment scheduling** with client name input
- 🗑️ **Delete appointments** per client
- 🔒 **Disabled time slots** for already booked hours on the selected date
- 🚫 **Past dates blocked** — only today and future dates are selectable
- 💾 **localStorage persistence** — appointments survive page refresh
- 📱 **Fully responsive** (mobile-first)
- 🎨 **Design system** with reusable components and CVA variants

---

## 🏗️ Architecture

```
src/
├── assets/
│   └── img/           # App logo SVG
├── components/
│   ├── core/          # Domain components (Sidebar, ScheduleList, PeriodSection, AppointmentItem, AppHeader)
│   └── ui/            # Generic reusable components (Button, ButtonIcon, Calendar, Icon, InputText, Text, TimeSelect)
├── data/
│   └── scheduleData.ts  # Types (Appointment, Period, TimeSlot) + TIME_SLOTS data
└── utils/
    └── buildGrid.ts   # Pure function that builds the 42-cell calendar grid
```

The project follows a **layered component architecture**:

- `ui` components are generic and reusable across any project
- `core` components are domain-specific to the scheduling feature
- `App.tsx` owns the global state and connects both sides

---

## 🧠 State Architecture

```
App.tsx
├── appointments[]       — global list of all appointments
├── selectedDate         — currently viewed date (synced with Sidebar calendar)
├── handleSubmit()       — adds a new appointment
├── handleDelete()       — removes an appointment by id
├── disabledTimes[]      — filters booked times for the selected date only
│
├── Sidebar
│   ├── selectedDate     — controls the calendar and date string generation
│   ├── selectedTime     — currently selected time slot (toggle on/off)
│   ├── clientName       — controlled input value
│   └── onSubmit()       — fires handleSubmit in App with the new appointment
│
└── ScheduleList
    ├── selectedDate     — controls which day's appointments to display
    ├── filtered[]       — appointments matching the selected date
    ├── manha/tarde/noite — filtered by period
    └── onDelete()       — fires handleDelete in App
```

---

## 📅 Calendar — Built From Scratch

The calendar was built without any external date library, using native JavaScript `Date` methods:

```ts
// Days in month
new Date(year, month + 1, 0).getDate();

// Starting weekday
new Date(year, month, 1).getDay();

// Previous month days to fill the grid
Array.from({ length: startingDay }, (_, i) => daysInPrev - startingDay + i + 1);

// Current month days
Array.from({ length: daysInMonth }, (_, i) => i + 1);

// Total cells = dynamic (not fixed 42) based on month layout
Math.ceil((startingDay + daysInMonth) / 7) * 7;
```

Date strings use `getFullYear/getMonth/getDate` instead of `toISOString()` to avoid UTC timezone offset bugs.

---

## 🧰 Tech Stack

| Tech                           | Purpose                          |
| ------------------------------ | -------------------------------- |
| React 19                       | UI library                       |
| TypeScript                     | Type safety                      |
| Tailwind CSS v4                | Styling                          |
| Vite                           | Build tool                       |
| CVA (class-variance-authority) | Component variants               |
| Phosphor Icons                 | Icon library                     |
| localStorage                   | Client-side data persistence     |
| crypto.randomUUID()            | Unique appointment ID generation |

---

## 🎨 Design System

Built a full component library from scratch following the Figma design spec:

- **Typography** — Custom `Text` component with multiple variants (title-l, title-m, title-s, text-m, text-s)
- **Color tokens** — Custom palette registered in Tailwind's `@theme` (yellow, yellow-dark, gray scale)
- **Components** — Button, ButtonIcon, Calendar, Icon, InputText, Text, TimeSelect — all with CVA variants

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Eduardo-Mafezoli/hairday.git

# Navigate to the project
cd hairday

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗂️ Git History

This project was developed following a structured branching strategy:

```
master
└── develop
    ├── feat/project-configuration  (Tailwind tokens, fonts, base config)
    ├── feat/components             (Full UI component library + Calendar)
    ├── feat/core                   (Domain components + scheduling logic)
    └── feat/localstorage           (Persistence layer)
```

---

## 👨‍💻 Author

**Eduardo Mafezoli**

[![GitHub](https://img.shields.io/badge/GitHub-Eduardo--Mafezoli-181717?style=for-the-badge&logo=github)](https://github.com/Eduardo-Mafezoli)

---

## 📄 License

This project was developed as a personal portfolio project and is for educational purposes.
