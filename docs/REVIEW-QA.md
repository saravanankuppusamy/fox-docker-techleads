# Review Questions and Sample Answers

1. **What is a Docker image?** A reusable, read-only package of application files and runtime dependencies used to create containers.
2. **What is a Docker container?** An isolated instance created from an image; it can be running or stopped.
3. **How many images and services does this project have?** Three custom images and three Compose services: web, api, mongodb.
4. **What does `docker compose build` do?** Builds service images according to their Dockerfiles.
5. **What does `docker compose up -d` do?** Creates/starts the configured services in the background, building images if needed.
6. **What is a Dockerfile?** A text recipe used to build an image.
7. **Why does the frontend Dockerfile have two `FROM` instructions?** The first stage builds the React static site; the second runs Nginx without including the build toolchain.
8. **Why is MongoDB addressed as `mongodb` from the API?** Compose provides internal DNS resolution by service name.
9. **What does `8080:80` mean?** Host port 8080 forwards to container port 80.
10. **What is a Docker volume?** Docker-managed persistent storage separate from the container writable layer.
11. **Will `docker compose down` delete the customer data?** No, the named volume remains by default.
12. **What does `docker compose down -v` do?** Removes the Compose-managed named volume, deleting this demo's MongoDB data.
13. **How can you inspect a failing API?** `docker compose ps`, `docker compose logs api`, and `/api/health`.
14. **Can one image create multiple containers?** Yes. Each is a distinct instance with its own runtime state.
15. **Does restarting a container rebuild its image?** No; rebuilding and restarting are different operations.
16. **Would this demo be ready for production?** No; it is a classroom demo with read-only data and intentionally simplified security and operations.
