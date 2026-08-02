# ─────────────────────────────────────────────────────────────────
# CommuteShare — Production Dockerfile
# Base: nginx:alpine (~25MB) | Serves static site
# ─────────────────────────────────────────────────────────────────
FROM nginx:alpine

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx server config (extracted to nginx/default.conf)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy all static web assets from src/
COPY src/index.html              /usr/share/nginx/html/
COPY src/assets/css/style.css    /usr/share/nginx/html/assets/css/
COPY src/assets/js/script.js     /usr/share/nginx/html/assets/js/
COPY src/assets/images/hero-bg.png /usr/share/nginx/html/assets/images/

EXPOSE 80

# Healthcheck — ensures nginx is running and responding
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1