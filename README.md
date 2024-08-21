<h1 align="center">⭐ NestJS Habit Loop APP ⭐</h1>
<p align="center">
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html"><img src="https://img.shields.io/badge/node-20.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://docs.nestjs.com/v10/"><img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm"/></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/Web_Framework-Fastify_⚡-black.svg" alt="fastify"/></a>
  <a href="https://swc.rs/"><img src="https://img.shields.io/badge/Compiler-SWC_-orange.svg" alt="swc"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Dockerized 🐳_-blue.svg" alt="docker"/></a>
</p>

## Hexagonal Architecture

Hexagonal Architecture, also known as Ports and Adapters, is a design pattern that emphasizes the separation of concerns within an application. It aims to create loosely coupled components that are easy to maintain and extend. The architecture is organized into three main layers:

- **Domain**: The core of the application, which contains the business logic and rules. This layer is independent of external systems and should not be influenced by technical details or infrastructure concerns.

- **Application**: This layer acts as a mediator between the domain and external systems. It defines the use cases, handling the flow of information between the domain and other parts of the application. The application layer coordinates interactions with the domain, ensuring that the business rules are applied correctly.

- **Infrastructure**: The infrastructure layer contains the technical details and implementations for interacting with external systems, such as databases, messaging systems, and external APIs. It is responsible for implementing the interfaces defined by the application layer and for managing the dependencies required to interact with external systems.

The key principle of Hexagonal Architecture is that the **Domain** layer is at the core, with the **Application** and **Infrastructure** layers surrounding it. The domain remains isolated from external influences, making it easier to test, maintain, and evolve.

## Vertical Slicing in Hexagonal Architecture

Vertical slicing is an approach that breaks down a project into vertical slices, where each slice represents a complete feature or functionality that spans across all layers of the architecture: Domain, Application, and Infrastructure. Instead of building an entire layer for the whole application at once, vertical slicing encourages creating a self-contained layer for each entity or feature.

## 🧑‍💻 Developing

First, we will need to create our .env file, we can create a copy from the example one:

```bash
cp .env.example .env
```

if we want to start the app in **development mode**, we just need to run:

```bash
docker-compose up -d habit-loop-dev
```

This development mode will work with **hot-reload** and expose a **debug port**, port `9229`, so later we can connect to it from our editor.

Now, you should be able to start debugging configuring using your IDE. For example, if you are using vscode, you can create a `.vscode/launch.json` file with the following configuration:

```json
{
  "version": "0.1.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to docker",
      "restart": true,
      "port": 9229,
      "remoteRoot": "/app"
    }
  ]
}
```

Also, if you want to run the **production mode**, you can run:

```bash
docker-compose up -d habit-loop-production
```

This service is providing just a health endpoint which you can call to verify the service is working as expected:

```bash
curl --request GET \
  --url http://localhost:3000/health
```

or you can access to the swagger documentation:

```link
http://localhost:3000/api
```

If you want to stop developing, you can stop the service running:

```bash
docker-compose down
```

## ⚙️ Building

```bash
npm run build
```

## ✅ Testing

The service provide different scripts for running the tests, to run all of them you can run:

```bash
npm run test
```

If you want e2e tests, you can execute:

```bash
npm run test:e2e
```

## 💅 Linting

To run the linter you can execute:

```bash
npm run lint
```
