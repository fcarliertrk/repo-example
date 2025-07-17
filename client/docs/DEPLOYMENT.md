# Deployment Guide

This document provides comprehensive instructions for deploying the Example Web Application to various environments.

## Table of Contents

- [Overview](#overview)
- [Environments](#environments)
- [Prerequisites](#prerequisites)
- [Build Process](#build-process)
- [Deployment Methods](#deployment-methods)
- [Environment Configuration](#environment-configuration)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Rollback Procedures](#rollback-procedures)
- [Troubleshooting](#troubleshooting)

## Overview

The application is built with Vite and can be deployed as static files to any web server or CDN. The deployment process includes building the application, running tests, and deploying to the target environment.

## Environments

### Development
- **Purpose**: Local development and testing
- **URL**: `http://localhost:3000`
- **Database**: Local PostgreSQL
- **Deployment**: Automatic on code changes

### Staging
- **Purpose**: Pre-production testing and QA
- **URL**: `https://staging.example.com`
- **Database**: Staging PostgreSQL
- **Deployment**: Automatic on `develop` branch changes

### Production
- **Purpose**: Live application for end users
- **URL**: `https://example.com`
- **Database**: Production PostgreSQL
- **Deployment**: Manual trigger on `main` branch

## Prerequisites

### System Requirements

- Node.js 18 or higher
- npm 8 or higher
- Git
- Access to deployment servers
- Environment-specific configuration files

### Access Requirements

- GitHub repository access
- Deployment server SSH keys
- Environment variables and secrets
- Database connection credentials

## Build Process

### Automated Build (CI/CD)

The build process is automated through GitHub Actions:

1. **Code Quality Checks**
   - ESLint code linting
   - TypeScript type checking
   - Security audit

2. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests (staging/production)

3. **Build**
   - Vite production build
   - Asset optimization
   - Bundle analysis

4. **Deployment**
   - Deploy to target environment
   - Health checks
   - Rollback on failure

### Manual Build

For manual builds, use the provided script:

```bash
# Build for production
./scripts/build.sh

# Build output will be in the `dist/` directory
```

## Deployment Methods

### Method 1: Automated Deployment (Recommended)

Deployments are triggered automatically through GitHub Actions:

**Staging Deployment:**
```bash
git push origin develop
```

**Production Deployment:**
```bash
git push origin main
```

### Method 2: Manual Deployment

For manual deployments, use the deployment script:

```bash
# Deploy to staging
./scripts/deploy.sh staging

# Deploy to production
./scripts/deploy.sh production
```

### Method 3: Docker Deployment

```bash
# Build Docker image
docker build -t example-web-app:latest .

# Run container
docker run -d -p 3000:3000 example-web-app:latest
```

### Method 4: Static File Deployment

```bash
# Build the application
npm run build

# Deploy static files to web server
rsync -av dist/ user@server:/var/www/html/
```

## Environment Configuration

### Environment Variables

Create environment-specific `.env` files:

**Development (.env.development):**
```bash
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Example Web App (Dev)
```

**Staging (.env.staging):**
```bash
NODE_ENV=staging
VITE_API_BASE_URL=https://api-staging.example.com
VITE_APP_NAME=Example Web App (Staging)
```

**Production (.env.production):**
```bash
NODE_ENV=production
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Example Web App
```

### GitHub Secrets

Configure the following secrets in GitHub repository settings:

- `DEPLOY_KEY`: SSH key for deployment servers
- `DATABASE_URL`: Database connection string
- `JWT_SECRET`: JWT signing secret
- `SENDGRID_API_KEY`: Email service API key

### Server Configuration

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name example.com;
    
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName example.com
    DocumentRoot /var/www/html
    
    <Directory /var/www/html>
        Options -Indexes
        AllowOverride All
        Require all granted
    </Directory>
    
    ProxyPass /api/ http://localhost:3000/api/
    ProxyPassReverse /api/ http://localhost:3000/api/
</VirtualHost>
```

## Monitoring and Maintenance

### Health Checks

The application includes health check endpoints:

- **Frontend**: `https://example.com/health`
- **API**: `https://example.com/api/health`

### Monitoring Tools

- **Uptime Monitoring**: Pingdom, StatusCake
- **Performance**: Google Analytics, New Relic
- **Error Tracking**: Sentry, Rollbar
- **Logs**: ELK Stack, Splunk

### Maintenance Tasks

#### Daily
- Monitor application health
- Check error logs
- Verify backup completion

#### Weekly
- Review performance metrics
- Update dependencies
- Run security scans

#### Monthly
- Database maintenance
- Certificate renewal
- Capacity planning review

## Rollback Procedures

### Automated Rollback

If deployment fails, the system automatically rolls back:

1. Health checks fail
2. Deployment script exits with error
3. Previous version is restored
4. Team is notified

### Manual Rollback

```bash
# Rollback to previous version
git revert <commit-hash>
git push origin main

# Or rollback using deployment script
./scripts/rollback.sh <version>
```

### Database Rollback

```bash
# Rollback database migrations
npm run db:rollback

# Restore from backup
pg_restore -d database_name backup_file.sql
```

## Troubleshooting

### Common Issues

#### Build Failures

**Issue**: TypeScript compilation errors
**Solution**: 
```bash
npm run type-check
# Fix reported errors
```

**Issue**: Dependency conflicts
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Deployment Failures

**Issue**: Permission denied on deployment server
**Solution**: Check SSH keys and file permissions

**Issue**: Database connection errors
**Solution**: Verify database credentials and network connectivity

#### Runtime Issues

**Issue**: 404 errors for routes
**Solution**: Configure server for SPA routing

**Issue**: CORS errors
**Solution**: Update CORS configuration in API server

### Debugging Steps

1. **Check Logs**
   ```bash
   # Application logs
   tail -f /var/log/app.log
   
   # Nginx logs
   tail -f /var/log/nginx/error.log
   ```

2. **Test Connectivity**
   ```bash
   # Test API endpoints
   curl -v https://api.example.com/health
   
   # Test database connection
   psql -h database-host -U username -d database
   ```

3. **Verify Configuration**
   ```bash
   # Check environment variables
   printenv | grep VITE_
   
   # Verify file permissions
   ls -la /var/www/html/
   ```

### Getting Help

- Check application logs
- Review deployment scripts
- Contact DevOps team
- Create support ticket
- Consult documentation

## Security Considerations

- Use HTTPS in production
- Keep dependencies updated
- Implement proper authentication
- Use environment variables for secrets
- Regular security audits
- Monitor for vulnerabilities

## Performance Optimization

- Enable gzip compression
- Configure CDN
- Optimize images
- Implement caching headers
- Monitor bundle size
- Use lazy loading

## Backup and Recovery

- Daily database backups
- Configuration file backups
- Automated backup verification
- Disaster recovery procedures
- RTO/RPO definitions

For additional support, contact the DevOps team or refer to the internal documentation.