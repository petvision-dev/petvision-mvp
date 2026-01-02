# Pet Care MVP

A mobile-first pet care application built with Expo/React Native. This app helps pet owners monitor their pet's health, track symptoms, access educational resources, and connect with veterinarians.

## Features

- **Welcome Screen**: Introduction to the app with login and registration options
- **Pet Profile Setup**: Create and manage pet profiles with photos and details
- **Home Dashboard**: Overview of pet health status and quick actions
- **Symptom Tracker**: Log and monitor pet health symptoms
- **Educational Resources**: Access articles and resources about pet health
- **AI Health Analysis**: Analyze pet health conditions using AI (placeholder)
- **Profile Management**: User profile and account settings

## Tech Stack

- **Framework**: Expo/React Native with TypeScript
- **Navigation**: Expo Router
- **UI Components**: Custom components with Material Icons
- **Styling**: React Native StyleSheet with theme support
- **Authentication**: Clerk (to be implemented)
- **Database**: Firebase (to be implemented)
- **Camera**: Expo Camera (to be implemented)

## Project Structure

```
/petvision-mvp
├── app/                      # Main application screens
│   ├── (tabs)/               # Tab-based navigation screens
│   │   ├── _layout.tsx       # Tab navigation layout
│   │   ├── home.tsx          # Home tab
│   │   ├── tracker.tsx       # Symptom tracker tab
│   │   ├── camera.tsx        # Camera tab
│   │   ├── resources.tsx     # Educational resources tab
│   │   └── profile.tsx       # Profile tab
│   ├── home/                 # Home screen components
│   ├── tracker/              # Tracker screen components
│   ├── resources/            # Resources screen components
│   ├── onboarding/           # Onboarding screens
│   │   └── pet-profile.tsx   # Pet profile setup screen
│   ├── _layout.tsx           # Root layout with theme provider
│   └── index.tsx             # Welcome screen
├── components/               # Reusable components
│   ├── ThemeProvider.tsx     # Theme context provider
│   └── PlaceholderAssets.tsx # Placeholder images for development
├── constants/                # App constants
│   └── Colors.ts             # Theme colors
└── assets/                   # Static assets
    ├── images/               # Image assets
    └── fonts/                # Font assets
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd petvision-mvp
   ```

2. Install dependencies:
   ```
   npm install
   ```
   
   If you encounter dependency conflicts, use:
   ```
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```
   npx expo start
   ```

4. Run on a device or emulator:
   - Press `a` to run on Android emulator
   - Press `i` to run on iOS simulator
   - Scan the QR code with the Expo Go app on your physical device

## Development Notes

- The app uses a custom theme system with light and dark mode support
- Placeholder assets are used for development until real assets are available
- Navigation is handled by Expo Router with a tab-based structure
- Authentication and database integration will be implemented in future phases

## Deployment Options

The Pet Care MVP can be deployed in several ways to make it accessible via a live URL. Here are detailed instructions for each deployment option:

### 1. GitHub Pages Deployment

The repository includes a GitHub Actions workflow that automatically deploys the app to GitHub Pages when you push to the main branch.

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Enable GitHub Pages in your repository settings:**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Select the `gh-pages` branch as the source
   - Click Save

3. **Access your deployed app:**
   - Your app will be available at `https://<your-github-username>.github.io/petvision-mvp/`
   - The first deployment may take a few minutes to complete

### 2. Cloudflare Pages Deployment

Cloudflare Pages offers free hosting with automatic HTTPS and global CDN distribution.

1. **Sign up for Cloudflare Pages:**
   - Create an account at [Cloudflare Pages](https://pages.cloudflare.com/)

2. **Connect your GitHub repository:**
   - In the Cloudflare Pages dashboard, click "Create a project"
   - Connect your GitHub account and select your repository

3. **Configure your build settings:**
   - Build command: `npx expo export:web`
   - Build output directory: `web-build`
   - Environment variables: Set `NODE_VERSION` to `18`

4. **Deploy your site:**
   - Click "Save and Deploy"
   - Cloudflare will build and deploy your site
   - Your app will be available at `https://<your-project-name>.pages.dev`

### 3. Docker Deployment

The app includes Docker configuration for containerized deployment.

1. **Build the Docker image:**
   ```bash
   docker build -t pet-care-mvp .
   ```

2. **Run the container locally:**
   ```bash
   docker run -p 8080:80 pet-care-mvp
   ```
   - Access the app at `http://localhost:8080`

3. **Push to a container registry:**
   ```bash
   # Tag the image
   docker tag pet-care-mvp:latest <registry-url>/pet-care-mvp:latest
   
   # Push to registry
   docker push <registry-url>/pet-care-mvp:latest
   ```

### 4. Akash Network Deployment

Akash Network provides decentralized cloud computing.

1. **Install Akash CLI:**
   - Follow the [Akash installation guide](https://docs.akash.network/guides/cli/installation)

2. **Fund your Akash account with AKT tokens**

3. **Build and push your Docker image:**
   ```bash
   docker build -t <your-dockerhub-username>/pet-care-mvp:latest .
   docker push <your-dockerhub-username>/pet-care-mvp:latest
   ```

4. **Update the deploy.yml file:**
   - Replace `${DOCKER_IMAGE_TAG}` with your Docker image tag
   - Update the domain in `accept` section

5. **Create a deployment:**
   ```bash
   # Create a certificate
   akash tx cert create client --from <your-key> --chain-id akashnet-2 --fees 5000uakt -y
   
   # Create the deployment
   akash tx deployment create deploy.yml --from <your-key> --chain-id akashnet-2 --fees 5000uakt -y
   
   # View your deployments
   akash query deployment list --owner <your-akash-address> --state active
   ```

6. **Access your deployed app:**
   - The app will be available at the URL provided in the deployment details

## PWA Features

The Pet Care MVP is configured as a Progressive Web App (PWA) with the following features:

- **Installable:** Users can add the app to their home screen
- **Offline Support:** Basic offline functionality with a custom offline page
- **Fast Loading:** Optimized for mobile devices with a responsive design
- **App-like Experience:** Full-screen mode without browser UI when installed

## Next Steps

- Implement authentication with Clerk
- Set up Firebase integration for data storage
- Configure camera functionality for pet analysis
- Add real assets and content
- Implement remaining features from the PRD

## License

This project is proprietary and confidential.
