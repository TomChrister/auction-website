# Auction Website 🙋🏼‍♂️

This project is a front-end application for an auction website where users can list items for bidding, place bids on other items, and manage their profiles and credits. This project showcases skills in HTML, CSS, JavaScript, and API integration developed over three semesters.

## Table of Contents 🗂️
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [API Integration](#api-integration)
6. [Development Tools](#development-tools)
7. [Deployment](#deployment)
8. [Credits](#credits)

---

### Project Overview  📊

The auction website provides a platform for users to list items for auction and bid on items listed by others. New users start with 1000 credits, which they can increase by selling items or decrease by buying them. This project covers the front-end, while all back-end functionalities are managed through the provided Noroff API.

### Features 💡

- **User Registration and Authentication**: Users with `stud.noroff.no` emails can register, log in, and log out.
- **Profile Management**: Users can update their avatars and view their total credits.
- **Auction Listings**: Users can create, view, and search listings with a title, deadline, media gallery, and description.
- **Bidding**: Registered users can place bids on listings and view bids made on each listing.
- **Responsive Design**: Styled using Tailwind CSS for a mobile-first, responsive layout.

---

### Getting Started 💿

1. **Clone the repository**:
    ```bash
    git clone https://github.com/TomChrister/auction-website.git
    cd auction-website
    ```

2. **Install dependencies**:
   This project uses Vite as a build tool. Run the following to install dependencies:
    ```bash
    npm install
    ```

3. **Run the development server**:
    ```bash
    npm run dev
    ```
   The application will be accessible at `http://localhost:3000`.

### Usage 🖱️

- **Registration**: To create an account, use an email address ending with `@stud.noroff.no`.
- **Creating Listings**: Once logged in, navigate to "Create Listing" to add an item for auction.
- **Bidding**: View details of a listing and place bids if logged in.
- **Profile**: View your credits and update your avatar through the profile page.

### API Integration 🔌

This project uses the [Noroff Auction API](https://api.noroff.dev) to manage user accounts, listings, and bidding data. Refer to the Noroff API Swagger documentation under "Auction Endpoints" for details on each API endpoint.

### Development Tools 💻

- **CSS Framework**: Tailwind CSS
- **JavaScript Framework**: Vite for fast development and module bundling
- **Design Tools**: Figma (for design prototypes)
- **Planning**: GitHub Projects for task and progress tracking

---

### Deployment 📱

The project is hosted on Vercel [Bidwise Auction](https://bidwise-auction.vercel.app)

---

### Credits 👨🏼‍🎓

This project was developed by Tom Christer, as a front-end development semester project.

