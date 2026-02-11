# Deploy PetVision to Akash Network

Complete guide for deploying PetVision with PostgreSQL database on decentralized Akash Network.

## Overview

This deployment includes:
- ✅ PostgreSQL 15 database (20GB storage)
- ✅ Node.js Express.js API server
- ✅ Full CRUD operations for pets, health records, reminders, and vets
- ✅ Integration with Clerk authentication
- ✅ Dockerized for easy deployment


## Prerequisites

### 1. Akash Account
1. Create account at: https://console.akash.network/
2. Fund your wallet with AKT tokens (~$10-20 for initial deployment)
3. Verify your account

### 2. Build Docker Image
```bash
# Build backend Docker image
cd /a0/usr/projects/petvision_01/backend
docker build -t petvision-backend:latest .

# Push to container registry (Docker Hub, GitHub Packages, etc.)
docker tag petvision-backend:latest your-registry/petvision-backend:latest
docker push your-registry/petvision-backend:latest
```

### 3. Prepare Environment Variables
Create these secrets (DO NOT commit to git):
- `DATABASE_PASSWORD` - Strong password for PostgreSQL
- `JWT_SECRET` - Strong secret for JWT signing

## Deployment Steps

### Step 1: Deploy to Akash

1. Go to: https://console.akash.network/
2. Click "Deploy" button
3. Upload `akash-deployment/deploy.yaml`
4. Configure deployment:
   - Update image URL: `your-registry/petvision-backend:latest`
   - Set environment variables:
     - DATABASE_PASSWORD: [your database password]
     - JWT_SECRET: [your JWT secret]
     - ALLOWED_ORIGINS: `https://yourdomain.com`
5. Add funds to deployment (AKT tokens)
6. Select provider and deploy

### Step 2: Get Deployment URL
After deployment completes:
1. Click on your deployment in Akash Console
2. Copy the "URI" or "URL" provided
3. Test the API:
   ```bash
   curl https://your-deployment-url.akash.network/health
   ```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-02-10T21:43:49.000Z"
}
```

### Step 3: Run Database Migration
SSH into your Akash deployment and run:
```bash
docker exec -it <container-id> npm run migrate
```

This will create all tables and triggers in PostgreSQL.

### Step 4: Update React Native App
Update `.env` file in the React Native app:
```bash
# Replace with your actual Akash deployment URL
EXPO_PUBLIC_API_URL=https://your-deployment-url.akash.network
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_real_key
```

## Architecture

```
┌─────────────────────────────────────────┐
│         Akash Network            │
│                                 │
│  ┌────────────────────┐        │
│  │  PostgreSQL DB    │        │
│  │  (20GB storage)  │        │
│  └────────────────────┘        │
│           ↑                     │
│           │ (internal network)  │
│           ↓                     │
│  ┌────────────────────┐        │
│  │  Express API      │        │
│  │  (Port 3000)     │        │
│  └────────────────────┘        │
│           ↑                     │
│           │ (public)            │
│           ↓                     │
│    Internet/Your App           │
└─────────────────────────────────────────┘
```

## API Endpoints

### Authentication
- `POST /api/auth/user` - Get or create user from Clerk
- `GET /api/auth/user?clerk_id=X` - Get user profile

### Pets
- `GET /api/pets` - Get all user's pets
- `GET /api/pets/:id` - Get single pet
- `POST /api/pets` - Create new pet
- `PUT /api/pets/:id` - Update pet
- `DELETE /api/pets/:id` - Delete pet

### Health Records
- `GET /api/health/pets/:petId` - Get health records for pet
- `POST /api/health` - Create health record
- `DELETE /api/health/:id` - Delete health record

### Reminders
- `GET /api/reminders` - Get user's reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id/complete` - Complete reminder
- `DELETE /api/reminders/:id` - Delete reminder

### Vets
- `GET /api/vets` - Get user's vets
- `GET /api/vets/:id` - Get single vet
- `POST /api/vets` - Create vet
- `PUT /api/vets/:id` - Update vet
- `DELETE /api/vets/:id` - Delete vet

## Cost Estimation

Based on Akash Network typical pricing:

| Resource | Specification | Monthly Cost |
|----------|--------------|--------------|
| PostgreSQL | 1 CPU, 2GB RAM, 20GB storage | ~$5-10 |
| API Server | 1 CPU, 1GB RAM, 2GB storage | ~$3-5 |
| Bandwidth | Included with compute | ~$0 |
| **Total** | | **~$8-15/month** |

This is ~70-90% cheaper than traditional cloud providers.

## Security

- ✅ Environment variables for sensitive data (DATABASE_PASSWORD, JWT_SECRET)
- ✅ CORS configured to only allow your app's domain
- ✅ Rate limiting on API endpoints
- ✅ Helmet.js for security headers
- ✅ Authentication required for all data endpoints
- ✅ User isolation (users can only access their own data)

## Monitoring

The API includes a health check endpoint:
```bash
curl https://your-deployment-url.akash.network/health
```
Set up monitoring with:
- Uptime monitoring (e.g., UptimeRobot)
- Error tracking (e.g., Sentry)
- Performance monitoring (e.g., New Relic)

## Troubleshooting

### Deployment Fails
- Check AKT token balance in escrow
- Verify Docker image is accessible
- Check SDL syntax
- Ensure provider has available capacity

### Database Migration Fails
- SSH into deployment
- Check PostgreSQL logs: `docker logs <container-id>`
- Verify DATABASE_URL is correct
- Run migration manually: `node src/db/migrate.js`
### API Returns 401 Unauthorized
- Verify Clerk token is being sent
- Check `Authorization` header format: `Bearer <token>`
- Verify `verifyToken` middleware is working
### App Can't Connect to API
- Verify `EXPO_PUBLIC_API_URL` in `.env`
- Check CORS settings (ALLOWED_ORIGINS)
- Verify deployment is accessible
- Check browser console for CORS errors
## Next Steps

1. **Deploy to Akash** - Follow deployment steps above
2. **Test API** - Verify all endpoints work
3. **Run migration** - Initialize database schema
4. **Update app config** - Set `EXPO_PUBLIC_API_URL`
5. **Deploy app** - Deploy React Native app to Vercel or similar
6. **Test end-to-end** - Verify full user flow works
7. **Monitor** - Set up uptime and error monitoring

## Support

- Akash Documentation: https://docs.akash.network/
- Akash Console: https://console.akash.network/
- Akash Discord: https://discord.gg/akash-network
