# ─────────────────────────────────────────────────────────
# CommuteShare — Production Docker Image
# Serves the static site via nginx (Alpine, minimal size)
# ─────────────────────────────────────────────────────────
FROM nginx:alpine

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy all static assets into the nginx web root
COPY index.html   /usr/share/nginx/html/
COPY style.css    /usr/share/nginx/html/
COPY script.js    /usr/share/nginx/html/
COPY hero-bg.png  /usr/share/nginx/html/

# Custom nginx config for clean routing & caching headers
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Enable gzip compression\n\
    gzip on;\n\
    gzip_types text/css application/javascript image/png;\n\
\n\
    # Cache static assets for 7 days\n\
    location ~* \.(css|js|png|jpg|svg|woff2)$ {\n\
        expires 7d;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
\n\
    # Serve index.html for all routes (SPA fallback)\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

# Healthcheck — ensures nginx is up
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1