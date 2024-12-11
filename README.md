# HappyNest

## Project Description

*HappyNest* is a community-focused web application built using NextJS and MongoDB. The app aims to encourage users to engage in positive social actions by allowing them to share and interact with content around good deeds, community news, and relevant updates. Currently, the project includes sections for news, good deeds, a good deed of the day toast, and a leaderboard for who did the most good deeds.

This project communicates with a FastAPI api for its backend and the relevant routes that we hit are documented in that repository's [README](https://github.com/moeez-tariq/HappyNest).

## Component Documentation

1. **Sidebar**
   - Links to each of the various pages in the application (and the Good Deed of the Day toast). You can also use this to sign in to the app using Clerk's auth system.
   
2. **GoodDeedsFeed**
   - A twitter-like interface that lets users post their good deeds and reply to others

3. **NewsSidebar**
   - Renders a list of articles containing information about their title, description, date, and a link to the actual website.
   - Has a switch that lets you display either global news (by default) or local news. At first, it displays data from out database before repopulating it with the latest news for the associated setting (global or local).
   - Has an audio button that lets you play a transcript of the day's news (up to 10 articles)

4. **Leaderboard**
   - Displays who has done the most good deeds

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/moeez-tariq/HappyNest-Frontend
   cd HappyNest-Frontend
   ```

2. **Install Dependencies**
   ```bash
    npm install
    ```

3. **Create .env.local File**
    ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_val_here>
    CLERK_SECRET_KEY=<your_val_here>
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=<your_val_here>
    NEXT_PUBLIC_BACKEND_URL=<your_val_here>
    ```

4. **Run the Application**
    ```bash
    npm run dev
    ```

5. **Access the Application**
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Development Process

### Design Decisions

- **User-Centric Design**: The *HappyNest* website was crafted to immediately bring value to the user, putting everything in one page. The minimalistic and user-friendly interface allows for easy navigation. There is lots of error handling that prevents users from unknowingly messing with the application. We also put care into the loading states to try and make sure the application rarely displays empty information.

- **Scalable Layout**: A modular, page-based layout was created to support scalability.

### Technical Choices

- **Next.js Framework**: Next.js was chosen for its ability to enhance the React-based architecture with optimized performance, server-side rendering, and built-in routing. This framework also allows for SEO optimizations, which can benefit *HappyNest* in future stages as it scales to a broader audience.

- **Tailwind CSS for Styling**: Tailwind CSS was used to streamline styling with utility classes, making it easier to create responsive, consistent, and visually structured layouts without writing custom CSS from scratch. This approach provided a balance between functional and aesthetically pleasing design, while keeping the focus on layout rather than detailed styling.

### AI Usage

- **Claude 3.5 Sonnet**: Claude 3.5 Sonnet, was utilized specifically to generate code for the layout, aiding in efficient structuring and alignment of components. This assistance included suggestions for positioning, responsiveness, and use of Tailwind utility classes to create a clean and functional layout. 
- **Component Structuring**: AI recommendations also supported the modular architecture by suggesting reusable component structures that improve maintainability and scalability.
- **Mock Data Creation**: AI assisted in creating mock data, simulating API responses for realistic testing and layout verification.

## Wireframe
[Wireframe Figma](https://www.figma.com/board/xB3yScVV0C7HwKwjxudB1r/HappyNest-Frontend?node-id=0-1&t=iHWp1yUGLsD4MQ0U-1)

![HappyNest Wireframe](./WireFrame.png)
