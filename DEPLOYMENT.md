# PetVision PWA - Deployment Guide

## 📋 Prerequisites

### 1. Docker Hub Account
- Sign up at https://hub.docker.com
- Create a repository named `petvision-pwa`

### 2. Akash Network Setup
1. Install Akash CLI: https://docs.akash.network/guides/cli/installation
2. Fund your wallet with AKT tokens
3. Create a certificate:
   ```bash
   akash tx cert create client --from <your-key> --chain-id akashnet-2 --fees 5000uakt -y
   ```

### 3. Environment Configuration
Update your `.env` file with your Clerk credentials:
```env
# Clerk Authentication
# Get your publishable key from: https://dashboard.clerk.com/
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_actual_key_here
```

## 🚀 Deployment Steps

### Step 1: Build and Push Docker Image
```bash
# Build the Docker image
docker build -t <your-dockerhub-username>/petvision-pwa:latest .

# Login to Docker Hub
docker login

# Push to Docker Hub
docker push <your-dockerhub-username>/petvision-pwa:latest
```

### Step 2: Update SDL Configuration
Edit `deploy.yml` and replace:
- `YOUR_DOCKERHUB_USERNAME` with your actual Docker Hub username

### Step 3: Deploy to Akash
```bash
# Create the deployment
akash tx deployment create deploy.yml --from <your-key> --chain-id akashnet-2 --fees 5000uakt -y

# View your deployments
akash query deployment list --owner <your-akash-address> --state active
```

### Step 4: Access Your App
After deployment is accepted, find your lease:
```bash
akash provider lease-status --from <your-key> --dseq <deployment-seq> --gseq <group-seq>
```
Follow the instructions to connect to your deployed app.

## 🧪 Testing

### Run E2E Tests
```bash
# Install Playwright
npm install -D @playwright/test

# Run tests
npx playwright test
```

### Manual Testing Checklist
- [ ] Sign up flow works
- [ ] Sign in flow works
- [ ] Dashboard loads correctly
- [ ] Symptom tracker functions
- [ ] PWA installable on mobile
- [ ] Dark mode toggle works

## 🔧 Troubleshooting

### Build Issues
```bash
# Clear cache
rm -rf node_modules .expo dist
npm install --legacy-peer-deps
npx expo export --platform web
```

### Docker Issues
```bash
# Rebuild without cache
docker build --no-cache -t petvision-pwa:latest .
```

### Akash Deployment Issues
- Check wallet has sufficient AKT
- Verify SDL syntax is correct
- Ensure Docker image is publicly accessible
- Check provider status

## 📱 PWA Features
Your PetVision app is a full-featured Progressive Web App:
- ✅ Installable on mobile devices
- ✅ Offline support (basic)
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Fast loading
- ✅ SEO optimized

## 🔐 Security
- ✅ HTTPS via Akash providers
- ✅ Security headers configured
- ✅ Clerk authentication
- ✅ Environment variables properly configured
