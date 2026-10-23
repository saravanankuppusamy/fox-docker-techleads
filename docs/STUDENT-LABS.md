# Student Hands-on Labs (30–45 minutes)

Prerequisites: Docker and Compose installed; terminal open in repo root.

## Lab 1: Build images and start the stack (10 min)

1. Run `docker compose build`.
2. Run `docker image ls fox-insurance-*`. Identify the web, API, and MongoDB images.
3. Run `docker compose up -d`.
4. Run `docker compose ps`. Confirm all three services are running and the API/MongoDB are healthy.
5. Open http://localhost:8080 and select each tab.

**Check:** Dashboard shows 5 customers, 6 policies, and 4 claims.

## Lab 2: Inspect containers and logs (8 min)

1. Run `docker compose logs --tail=20 api`.
2. Run `docker compose exec mongodb mongosh foxinsurance --quiet --eval 'db.policies.countDocuments()'`.
3. Run `docker stats --no-stream`.
4. Run `docker compose ps` and identify which container publishes port 8080.

**Check:** MongoDB returns 6 policies.

## Lab 3: Stop and restart a service (8 min)

1. Run `docker compose stop api`.
2. Refresh the dashboard; explain why requests fail.
3. Run `docker compose start api`.
4. Wait a few seconds and refresh the dashboard.

**Check:** Data loads again without rebuilding the API image.

## Lab 4: Persistent data and cleanup (8 min)

1. Run `docker compose down`.
2. Run `docker compose up -d`.
3. Verify that all seeded records are still present.
4. Run `docker volume ls` and identify the project's `mongo-data` volume.

**Check:** Data persists because `down` does not remove named volumes by default.

## Optional Lab 5: Temporary second instance (5 min)

Run `docker compose run --rm --no-deps api node --version`.

**Explain:** A new, short-lived container instance was created from the existing API image; `--rm` removes it after completion.

## End of lab

Run `docker compose down`. **Do not use `-v`** unless you intentionally want to delete the database data.
