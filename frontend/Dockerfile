# ---------------------------
# 1) Build React App
# ---------------------------
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build


# ---------------------------
# 2) Serve using NGINX
# ---------------------------
FROM nginx:alpine

# Remove default config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy your SPA routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
