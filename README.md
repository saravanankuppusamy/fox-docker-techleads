# Fox Insurance: Docker Containers for Tech Leads

A **three-container, read-only full-stack demo** focused on Docker images, containers, Compose, logs, networking, and volumes. No prior React/Node/MongoDB programming is required.

## Architecture

```text
Browser http://localhost:8080
        |
        v
  [web container] React static site served by Nginx :80
        | /api/* (Docker DNS: api)
        v
  [api container] Express REST API :3000
        | mongodb://mongodb:27017 (Docker DNS: mongodb)
        v
  [mongodb container] MongoDB :27017
        |
        v
  [mongo-data named volume] Persistent seeded records
```

**Three Dockerfiles = three images = three running containers.** The React image uses a **multi-stage build**: Node compiles the React app; Nginx serves the resulting static files. The MongoDB Dockerfile extends the official Mongo image with a seed script.

## Prerequisites

- Docker Desktop (Windows/macOS) or Docker Engine + Compose plugin (Linux)
- Docker Compose V2 (`docker compose version`)
- Free ports **8080** and **3000**
- Internet connection for the first build/pull

No local Node.js or MongoDB installation is required.

## Quick start

From the repository root:

```bash
docker --version
docker compose version
docker compose up --build -d
docker compose ps
```

Wait for all services to start (first build may take a few minutes). Open **http://localhost:8080**. Explore Customers, Policies, Claims, and their summary counts.

Inspect the API independently at **http://localhost:3000/api/health**, **/api/customers**, **/api/policies**, **/api/claims**, and **/api/summary**.

## Classroom command reference

| Action                             | Command                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| Build all three images             | `docker compose build`                                                                            |
| Start/recreate containers          | `docker compose up -d`                                                                            |
| Build and start in one command     | `docker compose up --build -d`                                                                    |
| Show three running containers      | `docker compose ps`                                                                               |
| Show images                        | `docker image ls fox-insurance-*`                                                                 |
| View API logs                      | `docker compose logs -f api` (Ctrl+C exits log view)                                              |
| View all logs                      | `docker compose logs --tail=30`                                                                   |
| Inspect Mongo records              | `docker compose exec mongodb mongosh foxinsurance --quiet --eval 'db.customers.find().toArray()'` |
| Stop API (see frontend error)      | `docker compose stop api`                                                                         |
| Start API again                    | `docker compose start api`                                                                        |
| Restart frontend                   | `docker compose restart web`                                                                      |
| Show resources                     | `docker stats --no-stream`                                                                        |
| Stop and remove containers/network | `docker compose down`                                                                             |
| Recreate containers, keep data     | `docker compose up -d`                                                                            |
| **DELETE DEMO DATA**               | `docker compose down -v`                                                                          |

**Important:** `docker compose down -v` permanently removes this project's named MongoDB volume. On the next startup, the seed script repopulates the original demo records. Never run `down -v` on an environment whose data you need.

## What is seeded?

- `foxinsurance.customers`: 5 synthetic customers
- `foxinsurance.policies`: 6 sample policies
- `foxinsurance.claims`: 4 sample claims

All sample names and addresses are fictional. The API is intentionally **read-only**, with no authentication, for a controlled classroom environment. Do not expose it publicly or use it for real insurance data.

## Why the frontend calls `/api` instead of `http://api:3000`

The **browser** is outside the Docker network and cannot resolve `api`. Nginx runs **inside** the `web` container and proxies `/api/` to `http://api:3000`. The API uses `mongodb` as the MongoDB hostname. Compose provides service-name DNS on the default network.

## Image versus container

- `Dockerfile`: recipe for building an image
- **Image**: packaged template, e.g. `fox-insurance-api:1.0`
- **Container**: runtime instance created from an image
- **Registry**: place to store/share images (Docker Hub, ECR, GHCR)
- **Volume**: storage surviving container removal
- **Compose**: declarative way to run multiple related containers

## Recommended reading order

1. [Instructor demo walkthrough](docs/INSTRUCTOR-DEMO.md)
2. [Student exercises](docs/STUDENT-LABS.md)
3. [Architecture and data flow](docs/ARCHITECTURE.md)
4. [Review questions and answers](docs/REVIEW-QA.md)

## Troubleshooting

- **Docker daemon unavailable:** Start Docker Desktop / Docker Engine.
- **Port already allocated:** Stop the conflicting process, or change `8080:80` / `3000:3000` host ports.
- **Frontend displays API error:** Run `docker compose ps` and `docker compose logs api mongodb`.
- **MongoDB takes time:** First boot seeds the database; wait for the API to become healthy.
- **Changed seed file but no change in DB:** Initialization runs only when the database volume is empty. For disposable classroom data only, use `docker compose down -v` then `docker compose up --build -d`.
- **Rebuild doesn't change data:** Images and database volumes are different resources.

## Scope

Designed for Docker training, not production deployment. In production, add authentication/authorization, TLS, secret management, image scanning, resource limits, backups, least-privilege access, and private networking. MongoDB is intentionally not published to the host.
