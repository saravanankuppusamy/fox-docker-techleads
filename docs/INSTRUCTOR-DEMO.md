# Instructor Live Demo (25–35 minutes)

**Goal:** Demonstrate build → image → container → network → volume → restart. Avoid teaching React code.

| Time      | Action                                                                                         | Talking point                                               |
| --------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 0–3 min   | Show folder tree and three Dockerfiles                                                         | One recipe per service                                      |
| 3–9 min   | `docker compose up --build -d`                                                                 | Docker builds three images and starts three containers      |
| 9–12 min  | `docker compose ps`; `docker image ls`                                                         | Images are templates; containers are instances              |
| 12–16 min | Open `http://localhost:8080` and tabs                                                          | Three services cooperate to deliver one application         |
| 16–20 min | `docker compose logs --tail=20 api mongodb`                                                    | Logs help diagnose startup and API problems                 |
| 20–24 min | `docker compose exec mongodb mongosh foxinsurance --quiet --eval 'db.claims.find().toArray()'` | Seed data is stored in MongoDB, not React                   |
| 24–28 min | `docker compose stop api`, refresh browser, `docker compose start api`                         | A stopped API disrupts requests; recover without rebuilding |
| 28–32 min | `docker compose down` then `docker compose up -d`                                              | Containers are recreated; named volume preserves data       |
| 32–35 min | `docker compose ps`; recap                                                                     | Three images, three containers, one network, one volume     |

## Optional image-versus-instance demonstration

```bash
docker compose run --rm --no-deps api node --version
```

This creates a **temporary additional container** from the same API image, runs Node, and removes the temporary container. It does not start the web server. Explain that a single image can create many distinct container instances.

## Optional teardown and reseed (destructive to demo data)

```bash
docker compose down -v
docker compose up --build -d
```

This deletes the demo volume and reseeds it. Explain why production data must be backed up and protected.

## Ask students

1. Why does the browser connect to port 8080 instead of port 80?
2. Why does the API connect to `mongodb` instead of `localhost`?
3. What survives `docker compose down`?
4. Does `docker compose restart api` rebuild the image? (No.)
5. What does the React multi-stage Dockerfile accomplish?
