# ElAmir Mansour - 3D Portfolio

This is a personal portfolio website built with Three.js, HTML, CSS, and JavaScript. It features various 3D animations and interactive elements to showcase ElAmir Mansour's skills, projects, experience, and education.

## Features

*   **Hero Section:** Interactive particle system with floating spheres and a 3D brain model.
*   **About Section:** Rotating geometric shapes.
*   **Skills Section:** Interactive 3D shapes with dynamic rotation and hover effects.
*   **Projects Section:** 3D models for each project, with content displayed on hover.
*   **Experience Section:** 3D timeline with interactive cubes and smooth scrolling animation.
*   **Education Section:** 3D book with turning pages and educational icons.
*   **Contact Section:** 3D contact form.
*   **Responsive Design:** Optimized for various screen sizes.
*   **Smooth Scrolling:** Enhanced user experience with smooth navigation.

## Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd "ElAmir Portfolio"
    ```

2.  **Install a local server:**

    You need a local server to serve the HTML and asset files due to browser security restrictions (CORS).

    If you have Python installed, you can use its built-in HTTP server:

    ```bash
    python3 -m http.server
    ```

    Alternatively, you can use a Node.js based server like `http-server`:

    ```bash
    npm install -g http-server
    http-server
    ```

3.  **Open in browser:**

    Once the server is running, open your web browser and navigate to `http://localhost:8000/index.html` (or the port indicated by your server).

## Assets

Some sections of the portfolio use 3D models that need to be downloaded separately and placed in the `assets` folder. Please ensure you have the following files in your `assets` directory:

*   `brain.obj`: For the Hero Section.
*   `plane.obj`: For the Rahal - Tourism Platform project.
*   `earth.jpg`: For The Silk Road project.
*   `pyramids.obj`: For the Pearl - AI Skincare Platform project.

## Customization

*   **Colors:** Modify the CSS variables in `css/style.css` to change the color scheme.
*   **Content:** Update the `index.html` file to change text content, project details, and educational information.
*   **3D Models:** Replace existing 3D models or add new ones by updating the `assets` folder and modifying the corresponding JavaScript functions in `js/main.js`.
*   **Animations:** Adjust animation parameters in `js/main.js` to fine-tune the 3D effects and interactions.

## Technologies Used

*   HTML5
*   CSS3
*   JavaScript
*   Three.js (r128)
*   GSAP (GreenSock Animation Platform)
*   OBJLoader.js (for loading .obj models)
*   OrbitControls.js (for camera controls)
*   CSS3DRenderer.js (for 3D HTML elements)

## Contact

ElAmir Mansour
*   LinkedIn: [https://www.linkedin.com/in/elamir-mansour/](https://www.linkedin.com/in/elamir-mansour/)
*   Udemy: [https://www.udemy.com/user/elamir-mansour/](https://www.udemy.com/user/elamir-mansour/)
*   YouTube: [https://www.youtube.com/@ElAmir](https://www.youtube.com/@ElAmir)
*   Email: elamirmansour@outlook.com

Feel free to reach out for collaborations or any inquiries!
