# Postgres Docker Container

```
Created at: 2024-10-22
```

Here is a command for running a throw-away postgres container:

```sh
HOST_PORT=5400
VERSION=15
PASSWORD=postgres
TEST_NAME=my_sweet_test
CONTAINER_NAME=postgres_${VERSION}_${TEST_NAME}
VOLUME_NAME=${CONTAINER_NAME}_data

# Get the container image.
docker pull postgres:$VERSION

# Run the actual container
docker run \
    --name ${CONTAINER_NAME} \
    -e POSTGRES_PASSWORD=${PASSWORD} \
    -d -p ${HOST_PORT}:5432 \
    -v ${VOLUME_NAME}:/var/lib/postgresql/data \
    --shm-size=4g \
    postgres:$VERSION
```

- I always need to pick a different port so that my test container doesn't
  overlap with whatever Postgres container I am running for work.
- Make sure to add a generous shm size otherwise your container might run out
  of space if you are storing a lot of data there.

To stop and remove everything:

```sh
docker stop $CONTAINER_NAME
docker rm -v $CONTAINER_NAME
```
