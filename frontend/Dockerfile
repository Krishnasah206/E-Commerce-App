# ============================
# Build stage
# ============================
FROM node:18-slim AS build
WORKDIR /app

COPY package*.json ./

# Install deps
RUN npm install

# Copy full frontend source
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build React app (output -> /app/frontend/dist)
RUN npm run build

# ============================
# Nginx stage
# ============================
FROM nginx:stable-alpine

# 👇 change path to /app/frontend/dist
COPY --from=build /app/dist /usr/share/nginx/html

# If build goes into frontend/dist instead:
# COPY --from=build /app/frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
