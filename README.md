# HappyNest

## Project Description

*HappyNest* is a community-focused web application built using React and MongoDB. The app aims to encourage users to engage in positive social actions by allowing them to share and interact with content around good deeds, community news, and relevant updates. Currently, the project includes sections for news, about, and contact information. Future updates will include a *Good Deed of the Day* and a *Community* section to further enhance user interaction and engagement.

This project is designed to integrate with FastAPI in the future, which will provide robust backend support. For now, mock API data is used to simulate server responses.

## Component Documentation

1. **News Section**
   - Displays good news and updates and redirects users to the full article.

2. **About Section**
   - Provides information about *HappyNest* and its mission.

3. **Contact Us Section**
   - Contains information about the developers of the site and how to contact them.

*Upcoming Components*:
   - **Good Deed of the Day**: This feature will highlight a selected good deed daily to inspire users.
   - **Community Section**: This section will allow users to interact with each other and build a sense of community. 

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/moeez-tariq/happyNest-Frontend
   cd happyNest-Frontend
   ```

2. **Install Dependencies**
   ```bash
    npm install
    ```

3. **Run the Application**
    ```bash
    npm run dev
    ```

4. **Access the Application**
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Development Process

### Design Decisions

- **User-Centric Design**: The *HappyNest* wireframe was crafted to prioritize essential sections—*News*, *About*, and *Contact Us*—to provide a clear and informative experience for users. The minimalistic and user-friendly interface allows for easy navigation. Future sections like *Good Deed of the Day* and *Community* are planned to further enhance user interaction and engagement.

- **Scalable Layout**: A modular layout was created to support scalability. The Figma wireframe includes placeholders for additional components, ensuring that features can be added without affecting the current structure. This modular design allows each component to be developed independently, supporting iterative development and future updates.

### Technical Choices

- **Next.js Framework**: Next.js was chosen for its ability to enhance the React-based architecture with optimized performance, server-side rendering, and built-in routing. This framework also allows for SEO optimizations, which can benefit *HappyNest* in future stages as it scales to a broader audience.

- **Tailwind CSS for Styling**: Tailwind CSS was used to streamline styling with utility classes, making it easier to create responsive, consistent, and visually structured layouts without writing custom CSS from scratch. This approach provided a balance between functional and aesthetically pleasing design, while keeping the focus on layout rather than detailed styling.

### AI Usage

- **Claude 3 Opus on Perplexity**: Claude 3 Opus, accessed via Perplexity, was utilized specifically to generate code for the layout, aiding in efficient structuring and alignment of components. This assistance included suggestions for positioning, responsiveness, and use of Tailwind utility classes to create a clean and functional layout. 
- **Component Structuring**: AI recommendations also supported the modular architecture by suggesting reusable component structures that improve maintainability and scalability.
- **Mock Data Creation**: AI assisted in creating mock data files, simulating API responses for realistic testing and layout verification.