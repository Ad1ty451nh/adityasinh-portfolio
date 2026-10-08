const projects = [
  {
    name: "SportXR",
    label: "AR football experience",
    description:
      "An augmented reality iOS app that lets football fans explore iconic stadiums in their own environment while learning about their history and structure. Submitted to Apple's Swift Student Challenge.",
    tags: ["SwiftUI", "ARKit", "RealityKit", "iOS"],
    link: "https://github.com/Ad1ty451nh/SportXR",
    accent: "#48d9c5",
  },
  {
    name: "GestureFX",
    label: "Ongoing experiment",
    description:
      "A futuristic gesture-controlled desktop app using Python, OpenCV, and MediaPipe to turn hand gestures into real-time visual effects.",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    link: "https://github.com/Ad1ty451nh/GestureFX",
    accent: "#ff7b6e",
  },
];

const skills = [
  "Swift",
  "SwiftUI",
  "ARKit",
  "RealityKit",
  "Core ML",
  "Create ML",
  "RevenueCat",
  "React Native",
  "Android",
  "Java",
  "Kotlin",
  "Flutter",
  "Dart",
  "Angular",
  "JavaScript",
  "HTML",
  "CSS",
  "SQL",
  "MySQL",
  "PostgreSQL",
  "Firebase",
  "Supabase",
  "Docker",
  "Git",
  "AI-assisted coding",
  "Prompt Engineering",
];

const links = {
  resume: "assets/Adityasinh_Raulji_Resume.pdf",
  github: "https://github.com/Ad1ty451nh",
  linkedin: "https://www.linkedin.com/in/adityasinh-raulji-29514024a",
  email: "mailto:adityasinhraulji007@gmail.com",
};

function renderProjects() {
  const stack = document.querySelector("#projectStack");
  stack.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card" data-reveal style="--accent: ${project.accent}">
          <span>${project.label}</span>
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map((tag) => `<b>${tag}</b>`).join("")}
          </div>
          <a class="text-link" href="${project.link}" target="_blank" rel="noreferrer">View repository</a>
        </article>
      `,
    )
    .join("");
}

function renderSkills() {
  const cloud = document.querySelector("#skillCloud");
  cloud.innerHTML = skills
    .map((skill, index) => {
      const offset = `${(index % 5) * 8 - 14}px`;
      return `<span class="skill-pill" style="--offset: ${offset}">${skill}</span>`;
    })
    .join("");
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
}

function setupTerminal() {
  const form = document.querySelector("#terminalForm");
  const input = document.querySelector("#terminalInput");
  const output = document.querySelector("#terminalOutput");

  const responses = {
    help: "Commands: resume, projects, skills, contact, whoami, clear",
    whoami:
      "Adityasinh Raulji - Software Developer, mobile app builder, iOS learner, and useful generalist from Surat.",
    projects:
      "Featured projects: Dr.Paw, SportXR, GestureFX. Opening the projects section now...",
    skills:
      "Core areas: iOS, SwiftUI, ARKit, RealityKit, Core ML, React Native, Android, SQL, Firebase, Supabase, RevenueCat.",
    contact: "Email: adityasinhraulji007@gmail.com. LinkedIn and GitHub links are in the contact section.",
    resume: "Opening resume in a new tab...",
  };

  const append = (html) => {
    output.insertAdjacentHTML("beforeend", html);
    output.scrollTop = output.scrollHeight;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value.trim().toLowerCase();
    if (!command) return;

    append(`<p><span class="prompt">guest@adiii:~$</span> ${command}</p>`);
    input.value = "";

    if (command === "clear") {
      output.innerHTML = "";
      return;
    }

    append(`<p>${responses[command] || `Unknown command: ${command}. Try help.`}</p>`);

    if (command === "resume") {
      window.open(links.resume, "_blank", "noreferrer");
    }

    if (command === "projects") {
      document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
    }

    if (command === "skills") {
      document.querySelector("#skills").scrollIntoView({ behavior: "smooth" });
    }

    if (command === "contact") {
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    }
  });
}

function setupCursor() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  let ringX = 0;
  let ringY = 0;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.opacity = "1";
    ring.style.opacity = "1";
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  const animate = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  };
  animate();

  document.querySelectorAll("a, button, input, [data-tilt]").forEach((element) => {
    element.addEventListener("mouseenter", () => ring.classList.add("is-hovering"));
    element.addEventListener("mouseleave", () => ring.classList.remove("is-hovering"));
  });
}

function setupTilt() {
  const card = document.querySelector("[data-tilt]");
  if (!card || !window.matchMedia("(hover: hover)").matches) return;

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${4 - y * 8}deg) rotateY(${-8 + x * 12}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(4deg) rotateY(-8deg)";
  });
}

renderProjects();
renderSkills();
setupReveal();
setupTerminal();
setupCursor();
setupTilt();
