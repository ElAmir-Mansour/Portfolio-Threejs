// Hide loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== THREE.JS IMPLEMENTATIONS =====

// 1. HERO SECTION - Particle System with 3D Spheres
function createHeroScene() {
    const container = document.getElementById('hero-canvas');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x667eea,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add floating spheres
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const spheres = []; // FIX: Proper array initialization
    
    for(let i = 0; i < 15; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: Math.random() > 0.5 ? 0x667eea : 0x764ba2,
            emissive: 0x667eea,
            emissiveIntensity: 0.3,
            shininess: 100
        });
        const sphere = new THREE.Mesh(sphereGeometry, material);
        sphere.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        sphere.userData = {
            speedX: (Math.random() - 0.5) * 0.02,
            speedY: (Math.random() - 0.5) * 0.02,
            speedZ: (Math.random() - 0.5) * 0.02
        };
        spheres.push(sphere);
        scene.add(sphere);
    } // FIX: Added missing closing brace for the for loop
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 15;

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        // Rotate particles
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Move spheres
        spheres.forEach(sphere => {
            sphere.position.x += sphere.userData.speedX;
            sphere.position.y += sphere.userData.speedY;
            sphere.position.z += sphere.userData.speedZ;

            // Bounce back
            if(Math.abs(sphere.position.x) > 10) sphere.userData.speedX *= -1;
            if(Math.abs(sphere.position.y) > 10) sphere.userData.speedY *= -1;
            if(Math.abs(sphere.position.z) > 10) sphere.userData.speedZ *= -1;

            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
        });

        // Camera follows mouse
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    });
}

// 1.1. HERO SECTION - Brain Model
function createBrainScene() {
    const container = document.getElementById('brain-container');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Add controls
            camera.position.z = 15;
            object.position.set(-2, 2, 0);

    // Load model
    const loader = new THREE.OBJLoader();
    loader.load('assets/brain.obj', (object) => {
        scene.add(object);

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            object.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    });
}

// 2. ABOUT SECTION - Rotating Geometric Shapes
function createAboutScene() {
    const container = document.getElementById('about-canvas');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create torus
    const torusGeometry = new THREE.TorusGeometry(3, 1, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0x667eea,
        emissive: 0x667eea,
        emissiveIntensity: 0.2,
        wireframe: true
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-8, 3, -5);
    scene.add(torus);

    // Create icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(2, 0);
    const icoMaterial = new THREE.MeshPhongMaterial({
        color: 0x764ba2,
        emissive: 0x764ba2,
        emissiveIntensity: 0.3,
        wireframe: true
    });
    const ico = new THREE.Mesh(icoGeometry, icoMaterial);
    ico.position.set(8, -3, -5);
    scene.add(ico);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x667eea, 1);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        ico.rotation.x += 0.005;
        ico.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    });
}

// 3. SKILLS SECTION - 3D Rotating Cubes
function createSkillCubes() {
    const cubeIds = ['skill-cube-1', 'skill-cube-2', 'skill-cube-3', 'skill-cube-4', 'skill-cube-5', 'skill-cube-6'];
    const colors = [0x667eea, 0x764ba2, 0x3b82f6, 0x667eea, 0x764ba2, 0x3b82f6];

    cubeIds.forEach((id, index) => {
        const container = document.getElementById(id);
        if (!container) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
                container.insertBefore(renderer.domElement, container.firstChild);

                // Create different shapes
                const geometries = [
                    new THREE.SphereGeometry(1.5, 32, 32),
                    new THREE.ConeGeometry(1.5, 3, 32),
                    new THREE.CylinderGeometry(1, 1, 2, 32),
                    new THREE.TorusGeometry(1.5, 0.5, 16, 100),
                    new THREE.IcosahedronGeometry(1.5, 0),
                    new THREE.DodecahedronGeometry(1.5, 0)
                ];
                const geometry = geometries[index];
                const material = new THREE.MeshPhongMaterial({
                    color: colors[index],
                    emissive: colors[index],
                    emissiveIntensity: 0.3,
                    wireframe: false
                });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.y = 0;
                scene.add(mesh);

                // Add wireframe
                const wireframeGeometry = new THREE.EdgesGeometry(geometry);
                const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
                const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
                mesh.add(wireframe);

                // Lighting
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
                scene.add(ambientLight);
                const pointLight = new THREE.PointLight(0xffffff, 1);
                pointLight.position.set(5, 5, 5);
                scene.add(pointLight);

                camera.position.z = 5;

                function animate() {
                    requestAnimationFrame(animate);
                    mesh.rotation.x += 0.005 + Math.sin(Date.now() * 0.001) * 0.002;
                    mesh.rotation.y += 0.005 + Math.cos(Date.now() * 0.001) * 0.002;
                    renderer.render(scene, camera);
                }
                animate();

                // Hover effect
                container.addEventListener('mouseenter', () => {
                    gsap.to(mesh.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 });
                });
                container.addEventListener('mouseleave', () => {
                    gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
                });
    });
}

// 4. PROJECTS SECTION - 3D Card Backgrounds
function createProjectCards() {
    const cardIds = ['project-card-1', 'project-card-2', 'project-card-3'];
    const modelUrls = ['assets/brain.obj', '', 'assets/plane.obj'];

    cardIds.forEach((id, index) => {
        const container = document.getElementById(id);
        if (!container) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.insertBefore(renderer.domElement, container.firstChild);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x667eea, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 5;

        if (modelUrls[index]) {
            // Load model
            const loader = modelUrls[index].endsWith('.obj') ? new THREE.OBJLoader() : new THREE.GLTFLoader();
            loader.load(modelUrls[index], (object) => {
                                    const model = modelUrls[index].endsWith('.obj') ? object : object.scene;
                                    // Center the model
                                    const box = new THREE.Box3().setFromObject(model);
                                    const center = box.getCenter(new THREE.Vector3());
                                    model.position.sub(center); // center the model
                
                                    if (index === 2) { // Index 2 is the Rahal project
                                        model.position.z = -10;
                                        model.position.x = -2;
                                        model.position.y = 5;
                                    }
                                    if (index === 0) { // Index 2 is the Pearl project
                                        model.position.z = -5;
                                        model.position.x = 0;
                                        model.position.y = 2;
                                    }
                                    
                
                                    scene.add(model);
            // Animation
            function animate() {
                requestAnimationFrame(animate);
                model.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();
            });
        } else {
            // Create placeholder
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const texture = new THREE.TextureLoader().load('assets/earth.jpg');
            const material = new THREE.MeshPhongMaterial({
                map: texture
            });
                                const sphere = new THREE.Mesh(geometry, material);
                                sphere.position.set(0, 2, 0);
                                scene.add(sphere);
            // Animation
            function animate() {
                requestAnimationFrame(animate);
                sphere.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();
        }
    });
}

// 5. EXPERIENCE SECTION - Floating Particles
function createExperienceScene() {
    const container = document.getElementById('experience-canvas');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create multiple small spheres
    const spheres = []; // FIX: Proper array initialization
    for(let i = 0; i < 30; i++) {
        const geometry = new THREE.SphereGeometry(0.3, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: Math.random() > 0.5 ? 0x667eea : 0x764ba2,
            emissive: 0x667eea,
            emissiveIntensity: 0.5
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        sphere.userData.speed = Math.random() * 0.02 + 0.01;
        spheres.push(sphere);
        scene.add(sphere);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);
        spheres.forEach(sphere => {
            sphere.position.y += sphere.userData.speed;
            if(sphere.position.y > 10) sphere.position.y = -10;
        });
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
         if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    });
}

// 5.1. EXPERIENCE SECTION - 3D Timeline
function createExperienceTimeline() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x667eea, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 15;

    // Create timeline
    const experiences = document.querySelectorAll('.timeline-item');
    const cubes = [];
    experiences.forEach((experience, index) => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0x667eea,
            emissive: 0x667eea,
            emissiveIntensity: 0.3
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, index * -5, 0);
        cubes.push(cube);
        scene.add(cube);
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        cubes.forEach(cube => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
    }
    animate();

    // Scroll animation
    window.addEventListener('scroll', () => {
        const top = window.scrollY;
        const timeline = document.getElementById('experience-timeline');
        const timelineTop = timeline.offsetTop;
        const timelineHeight = timeline.offsetHeight;
        const windowHeight = window.innerHeight;

        if (top > timelineTop - windowHeight && top < timelineTop + timelineHeight) {
            const scroll = top - timelineTop;
            const scrollPercent = scroll / timelineHeight;
            gsap.to(camera.position, { y: scrollPercent * -20, duration: 1, ease: 'power2.out' });
        }
    });

    // Resize handler
    window.addEventListener('resize', () => {
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    });
}

// 6. CONTACT SECTION - Wave Effect
function createContactScene() {
    const container = document.getElementById('contact-canvas');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Wave Geometry
    const planeGeometry = new THREE.PlaneGeometry(40, 40, 50, 50);
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0x667eea,
        emissive: 0x764ba2,
        emissiveIntensity: 0.2,
        wireframe: true
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);



    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x667eea, 1);
    pointLight.position.set(0, 10, 5);
    scene.add(pointLight);

    camera.position.z = 15;
    camera.position.y = 5;
    camera.lookAt(scene.position);

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Animate wave
        const positions = plane.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const y = positions.getY(i);
            const x = positions.getX(i);
            const z = Math.sin(x * 0.5 + elapsedTime) * 0.5 + Math.cos(y * 0.5 + elapsedTime) * 0.5;
            positions.setZ(i, z);
        }
        positions.needsUpdate = true;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
         if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    });
}

// 6.1. CONTACT SECTION - 3D Contact Form
function createContactForm() {
    const container = document.getElementById('contact-form');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.CSS3DRenderer();
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x667eea, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 15;

    // Create form
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Name';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    const messageInput = document.createElement('textarea');
    messageInput.placeholder = 'Message';
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Send';

    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(messageInput);
    form.appendChild(submitButton);

    const object = new THREE.CSS3DObject(form);
    scene.add(object);

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        object.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    });
}

// 7. EDUCATION SECTION - 3D Book
function createEducationScene() {
    const container = document.getElementById('education-canvas');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x667eea, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Create book
    const book = new THREE.Group();
    scene.add(book);

    // Create cover
    const coverGeometry = new THREE.BoxGeometry(3, 4, 0.2);
    const coverMaterial = new THREE.MeshPhongMaterial({ color: 0x667eea });
    const cover = new THREE.Mesh(coverGeometry, coverMaterial);
    book.add(cover);

    // Create pages
    const pageGeometry = new THREE.BoxGeometry(2.8, 3.8, 0.1);
    const pageMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    for (let i = 0; i < 10; i++) {
        const page = new THREE.Mesh(pageGeometry, pageMaterial);
        page.position.z = i * 0.02;
        book.add(page);
    }

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        book.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Animate stat numbers on scroll
function animateStats() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString();
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
}

// Intersection Observer for animations (KEEP ONLY ONE)
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.set(section, { opacity: 0, y: 50 });
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    const scenesToCreate = {
        'hero-canvas': createHeroScene,
        'brain-container': createBrainScene,
        'about-canvas': createAboutScene,
        'experience-canvas': createExperienceScene,
        'experience-timeline': createExperienceTimeline,
        'contact-canvas': createContactScene,
        'contact-form': createContactForm,
        'education-canvas': createEducationScene,
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                if (scenesToCreate[id] && !entry.target.dataset.initialized) {
                    scenesToCreate[id]();
                    entry.target.dataset.initialized = 'true';
                }
                
                if (entry.target.classList.contains('skill-cube-wrapper') && !document.getElementById('skills').dataset.initialized) {
                    createSkillCubes();
                    document.getElementById('skills').dataset.initialized = 'true';
                }

                if (entry.target.classList.contains('project-card-3d') && !document.getElementById('projects').dataset.initialized) {
                    createProjectCards();
                    document.getElementById('projects').dataset.initialized = 'true';
                }

                if (entry.target.classList.contains('about-stats') && !entry.target.dataset.animated) {
                    animateStats();
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.canvas-container,.skill-cube-wrapper,.project-card-3d,.about-stats').forEach(el => {
        if (el) observer.observe(el);
    });
});