# Next.js Login App – Docker & CI/CD

## Part 2: Dockerize the Application

### Default API URL

Build and run the application:

```bash
docker build -t myapp .
docker run -p 3000:3000 myapp
```

Default API URL used when WEB_HOST is not provided:

```
http://localhost:5000
```

### Environment Configuration

The frontend API base URL is controlled by the `NEXT_PUBLIC_WEB_HOST` environment variable.

- If the variable is not set, the application defaults to:
  http://localhost:5000

- For local development (without Docker), create a `.env.local` file:
  NEXT_PUBLIC_WEB_HOST=http://localhost:5000

- For Docker builds, pass the value at build time:
  docker build --build-arg WEB_HOST=http://localhost:5000 -t myapp .

---

### Configure API URL using WEB_HOST

Build the application with a custom API URL:

```bash
docker build --build-arg WEB_HOST=http://10.39.1.5:5050 -t myapp-custom .
docker run -p 3000:3000 myapp-custom
```

---

## Part 3: CI/CD Pipeline

Workflow file location:

```
.github/workflows/docker.yml
```

### Trigger CI/CD

- Push to the main branch
- Or GitHub → Actions → Run workflow

---

## Docker Image

Image published to GitHub Container Registry:

```
ghcr.io/rezaan6/nextjs-docker-app:latest
```

### Pull and run the image

```bash
docker pull ghcr.io/rezaan6/nextjs-docker-app:latest
docker run -p 3000:3000 ghcr.io/rezaan6/nextjs-docker-app:latest
```
