# ArtLink - Collaborative Drawing Application

ArtLink is a collaborative drawing application built with **Spring Boot** for the backend and **React** for the frontend. It allows multiple users to draw and interact on a shared canvas in real-time. The application supports various shapes, undo/redo functionality, and real-time updates through WebSocket communication.

## Features

- **Real-Time Collaboration**: Multiple users can draw on the same canvas simultaneously.
- **Shape Drawing**: Supports drawing various shapes like rectangles, circles, ellipses, lines, polygons, and text.
- **Undo/Redo**: Users can undo or redo their actions on the canvas.
- **WebSocket Communication**: Real-time updates are handled using WebSocket for seamless collaboration.
- **Redis Caching**: Redis is used for caching undo/redo actions and shape data.

## Technologies Used

### Backend (Spring Boot)
- **Spring Boot**: Core framework for building the backend.
- **WebSocket**: For real-time communication between the server and clients.
- **Redis**: For caching undo/redo actions and shape data.

### Frontend (React)
- **React**: JavaScript library for building the user interface.
- **WebSocket**: For real-time communication with the backend.
- **Konva API**: Utilized for rendering shapes and handling user interactions on the canvas.


## Setup and Installation

### Backend (Spring Boot)

1. **Prerequisites**:
   - Java 17 or higher
   - Maven
   - Redis server

2. **Clone the repository**:
   ```bash
   git clone https://github.com/Michael23Magdy/ArtLink.git
   cd ArtLink/backend
   ```
3. **Run Redis**:
    Make sure Redis is running on your local machine or update the Redis configuration in `application.properties`.

4. **Build and Run**:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.


### Frontend (React)

1. **Prerequisites**:
   - Node.js and npm

2. **Clone the repository** :
   ```bash
   git clone https://github.com/Michael23Magdy/ArtLink.git
   cd ArtLink/frontend
   ```
3. Install dependencies:

    ```bash
    npm install
    ```
4. Run the application:

    ``` bash
    npm run dev
    ```
    The frontend will start on `http://localhost:5173`.

### Usage
1. Open the application in your browser.

2. Start drawing on the canvas using the toolbar.

2. Use the undo/redo buttons to revert or reapply actions.

2. Collaborate with other users in real-time by sharing the canvas URL.


### Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the coding standards and include tests for new features.
