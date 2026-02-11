# Multi-stage build for PetVision PWA
FROM node:18-alpine AS builder


WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build:web

# Production stage with nginx
FROM nginx:alpine


# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html


# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
