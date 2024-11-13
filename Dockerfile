# Use Node.js official image with alpine for smaller size
FROM node:20-alpine

# Add required packages for production applications
RUN apk add --no-cache \
    dumb-init \
    curl

# Create app directory
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy application source code
COPY . .

# Create a non-root user for security
RUN addgroup -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nodejs && \
    chown -R nodejs:nodejs /usr/src/app

# Switch to non-root user
USER nodejs

# Expose your microservice port
# EXPOSE 3000

# # Use dumb-init as PID 1 to handle signals properly
# ENTRYPOINT ["dumb-init", "--"]

# # Define healthcheck
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#     CMD curl -f http://localhost:3000/health || exit 1

# Start the microservice
CMD ["node", "main.js"]