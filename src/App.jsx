import React, { useState, useEffect, useRef } from 'react';

// Import all your static assets
import profilePhoto from './assets/Profile_Photo.jpeg';
import streamifyImage from './assets/Streamify.jpg';
import whatsappImage from './assets/Whatsapp_Project.png';
import pixelImage from './assets/Pixel_Project.jpg';
import demonSlayerVideo from './assets/Demon_slayer.mp4';
import resumeFile from './assets/prashant_resume.pdf'; // Correctly import the PDF file


// Main App component for the portfolio website
const App = () => {
  const videoRef = useRef(null);
  
  // State to manage modal visibility
  const [activeModal, setActiveModal] = useState(null);
  // State to track scroll position for header and scroll-to-top button
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState('home');

  // Project data with static images and descriptions
  const projects = {
    streamify: {
      title: 'Streamify - Netflix Clone',
      image: streamifyImage,
      category: 'react',
      description: 'Streamify is a Netflix clone website built to replicate the core features of a streaming service. This project showcases my skills in front-end development, focusing on creating a responsive and dynamic user interface. Key features include a homepage with a variety of content carousels, detailed movie/show pages, and seamless navigation. Technologies used: React, CSS, and API integration.',
      liveLink: '#',
      githubLink: '#'
    },
    whatsapp: {
      title: 'WhatsApp Clone',
      image: whatsappImage,
      category: 'android',
      description: 'This is a WhatsApp clone created for Android devices using Kotlin and modern Android development practices. I used Jetpack Compose for building a modern, declarative UI, and Hilt for dependency injection, ensuring the app is scalable and maintainable. The project features a calls screen with a list of favorite and recent contacts.',
      liveLink: '#',
      githubLink: '#'
    },
    pixel: {
      title: 'Pixel AI Assistant',
      image: pixelImage,
      category: 'python',
      description: 'Pixel is a powerful AI assistant with a variety of capabilities. Built with Python, it features robust automation, a dynamic chatbot, and real-time searching facilities. The assistant is also equipped with text-to-speech and speech-to-text abilities, providing a hands-free and interactive user experience.',
      liveLink: '#',
      githubLink: '#'
    }
  };

  // Effect hook to handle video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  // Effect hook for scroll event listeners
  useEffect(() => {
    const handleScroll = () => {
      // Handle header scroll effect
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Handle active link highlighting and scroll-to-top button visibility
      const sections = document.querySelectorAll('section');
      let currentSectionId = '';

      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSectionId = sec.getAttribute('id');
        }
      });
      setActiveNavLink(currentSectionId);

      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to toggle the mobile navigation menu
  const toggleMenu = () => {
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('#menu-btn');
    navbar.classList.toggle('active');
    menuBtn.classList.toggle('fa-xmark');
  };

  // Function to open a specific modal
  const openModal = (id) => {
    setActiveModal(id);
  };

  // Function to close the currently open modal
  const closeModal = () => {
    setActiveModal(null);
  };

  // Project filtering functionality
  const handleFilter = (filterValue) => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.projects-container .project-box');

    filterButtons.forEach(btn => btn.classList.remove('active-filter'));
    document.querySelector(`[data-filter="${filterValue}"]`).classList.add('active-filter');

    projectBoxes.forEach(box => {
      if (filterValue === 'all' || box.getAttribute('data-category') === filterValue) {
        box.classList.remove('hidden');
        box.style.display = 'block';
      } else {
        box.classList.add('hidden');
        setTimeout(() => {
          box.style.display = 'none';
        }, 500);
      }
    });
  };

  return (
    <>
      <style>
        {`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
        :root {
          --bg-color: #f0f0f0;
          --text-color: #333333;
          --main-color: #007bff;
          --secondary-color: #6c757d;
          --accent-color: #0056b3;
          --box-bg-color: #ffffff;
          --box-border-color: #e0e0e0;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          text-decoration: none;
          outline: none;
          border: none;
          scroll-behavior: smooth;
        }

        body {
          background: var(--bg-color);
          color: var(--text-color);
          line-height: 1.6;
        }
        
        section {
          min-height: 100vh;
          padding: 8rem 4rem 2rem;
          transition: opacity 1s ease-in-out, transform 1s ease-in-out;
        }
        
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 2rem 4rem;
          background: var(--box-bg-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          transition: 0.5s ease;
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
          padding: 1.5rem 4rem;
        }

        .logo {
          font-size: 2.5rem;
          color: var(--text-color);
          font-weight: 600;
        }

        .navbar a {
          font-size: 1.7rem;
          color: var(--text-color);
          margin-left: 4rem;
          transition: 0.3s;
        }
        
        .navbar a:hover,
        .navbar a.active {
          color: var(--main-color);
        }

        #menu-btn {
          font-size: 3.6rem;
          color: var(--text-color);
          cursor: pointer;
          display: none;
        }

        .home {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
          position: relative;
          overflow: hidden;
          background-color: #0f172a;
          color: #ffffff;
        }
        
        .home-bg-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          overflow: hidden;
        }

        .home-bg-video video {
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          object-fit: cover;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .home .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: -1;
        }

        .home-content, .home-img {
          z-index: 1;
        }

        .home-content {
          color: white;
        }

        .home-content h3 {
          font-size: 3.2rem;
          font-weight: 700;
        }
        .home-content h1 {
          font-size: 5.6rem;
          font-weight: 700;
          line-height: 1.3;
        }
        .home-content p {
          font-size: 1.6rem;
          margin-bottom: 2rem;
          max-width: 600px;
        }
        .home-img img {
          max-width: 100%;
          border-radius: 50%;
          border: 0.5rem solid var(--main-color);
          box-shadow: 0 0 1rem var(--main-color);
        }
        .btn {
          display: inline-block;
          padding: 1rem 2.8rem;
          background: var(--main-color);
          border-radius: 4rem;
          color: #ffffff;
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: 0.1rem;
          transition: 0.5s ease;
        }
        .btn:hover {
          background: var(--accent-color);
        }

        .heading {
          text-align: center;
          font-size: 4.5rem;
          margin-bottom: 5rem;
        }
        .heading span {
          color: var(--main-color);
        }
        .about-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .about-img img {
          width: 35vw;
          border-radius: 0.8rem;
        }
        .about-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 600px;
        }
        .about-content h3 {
          font-size: 2.6rem;
        }
        .about-content p {
          font-size: 1.6rem;
          margin: 2rem 0 3rem;
        }
        .skills {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 1rem;
          margin-top: 1rem;
          margin-bottom: 3rem;
        }
        .skills span {
          display: inline-block;
          background: var(--box-bg-color);
          border: 1px solid var(--box-border-color);
          color: var(--text-color);
          padding: 0.8rem 1.5rem;
          border-radius: 0.5rem;
          font-size: 1.4rem;
          transition: background 0.3s ease;
        }
        .skills span i {
          color: var(--main-color);
          margin-right: 0.8rem;
        }
        .skills-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 2rem;
        }
        .skills-table th, .skills-table td {
          border: 1px solid var(--box-border-color);
          padding: 1rem;
          text-align: left;
        }
        .skills-table th {
          background: var(--main-color);
          color: #ffffff;
          font-size: 1.8rem;
          text-align: center;
        }
        .skills-table td {
          font-size: 1.6rem;
        }
        .skills-table td i {
          color: var(--main-color);
          margin-right: 0.8rem;
        }
        
        .filter-buttons {
          text-align: center;
          margin-bottom: 3rem;
        }
        .filter-btn {
          background: none;
          color: var(--secondary-color);
          font-size: 1.6rem;
          padding: 0.8rem 1.5rem;
          border: 0.1rem solid var(--secondary-color);
          border-radius: 4rem;
          cursor: pointer;
          margin: 0 0.5rem;
          transition: all 0.3s ease;
        }
        .filter-btn:hover,
        .filter-btn.active-filter {
          background: var(--main-color);
          color: #ffffff;
          border-color: var(--main-color);
        }

        .projects-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
        }

        .project-box {
          background: var(--box-bg-color);
          padding: 2.5rem;
          border-radius: 2rem;
          text-align: center;
          border: 0.2rem solid var(--box-border-color);
          transition: 0.5s ease, opacity 0.5s ease;
        }
        .project-box:hover {
          border-color: var(--main-color);
          transform: scale(1.02);
        }
        .project-box.hidden {
          opacity: 0;
          transform: scale(0.9);
          display: none;
        }
        .project-box img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 1rem;
          margin-bottom: 1.5rem;
        }
        .project-info h4 {
          font-size: 2.5rem;
          color: var(--text-color);
        }
        .project-info p {
          font-size: 1.6rem;
          margin: 1rem 0;
          color: var(--secondary-color);
        }
        
        .contact {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          max-width: 600px;
          margin-top: 2rem;
          text-align: center;
        }
        .contact-form p {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
        .contact-form form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 1.2rem;
          background: var(--box-bg-color);
          border-radius: 0.8rem;
          font-size: 1.6rem;
          color: var(--text-color);
          border: 0.1rem solid var(--box-border-color);
          transition: border-color 0.3s ease;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: var(--main-color);
        }
        .contact-form textarea {
          resize: none;
          height: 150px;
        }
        .contact-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }
        .contact-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--main-color);
          color: #ffffff;
          width: 150px;
          height: 50px;
          border-radius: 0.5rem;
          font-size: 1.6rem;
          transition: 0.5s ease;
        }
        .contact-links a:hover {
          background: var(--accent-color);
        }
        .contact-links a i {
          font-size: 2rem;
          margin-right: 0.8rem;
        }

        .footer {
          padding: 2rem 4rem;
          background: var(--box-bg-color);
          text-align: center;
          font-size: 1.4rem;
          color: var(--secondary-color);
        }
        
        .modal-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.3s, visibility 0.3s;
          z-index: 1000;
        }
        .modal-container.active {
          visibility: visible;
          opacity: 1;
        }
        .modal-content {
          background: #ffffff;
          padding: 3rem;
          border-radius: 1rem;
          width: 90%;
          max-width: 800px;
          position: relative;
          text-align: center;
          transform: translateY(-50px);
          transition: transform 0.4s ease-out;
        }
        .modal-container.active .modal-content {
          transform: translateY(0);
        }
        .close-modal {
          position: absolute;
          top: 1rem;
          right: 2rem;
          font-size: 3rem;
          color: var(--text-color);
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .close-modal:hover {
          transform: rotate(90deg);
        }
        .modal-content h3 {
          font-size: 3.5rem;
          margin-bottom: 2rem;
          color: var(--text-color);
        }
        .modal-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin-bottom: 2rem;
        }
        .modal-content p {
          font-size: 1.8rem;
          text-align: left;
          margin-bottom: 2rem;
          color: var(--secondary-color);
        }
        .modal-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
          section, .header, .footer {
            padding: 2rem 5%;
          }
          #menu-btn {
            display: block;
          }
          .navbar {
            position: absolute;
            top: 100%;
            left: -100%;
            width: 100%;
            padding: 1rem 3%;
            background: var(--box-bg-color);
            border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
            transition: 0.25s ease-in-out;
          }
          .navbar.active {
            left: 0;
          }
          .navbar a {
            display: block;
            font-size: 2rem;
            margin: 1.5rem 0;
            color: var(--text-color);
          }
          .home, .about-container {
            flex-direction: column;
            text-align: center;
          }
          .home-content h1 {
            font-size: 4rem;
          }
          .home-img img {
            width: 70vw;
          }
          .about-img img {
            width: 70vw;
          }
        }
        `}
      </style>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="logo">Prashant</a>
        <nav className="navbar">
          <a href="#home" className={activeNavLink === 'home' ? 'active' : ''}>Home</a>
          <a href="#about" className={activeNavLink === 'about' ? 'active' : ''}>About</a>
          <a href="#projects" className={activeNavLink === 'projects' ? 'active' : ''}>Projects</a>
          <a href="#contact" className={activeNavLink === 'contact' ? 'active' : ''}>Contact</a>
        </nav>
        <div id="menu-btn" className="fas fa-bars" onClick={toggleMenu}></div>
      </header>

      <section className="home" id="home">
        <div className="home-bg-video">
          <video ref={videoRef} autoPlay loop muted playsInline>
            <source src={demonSlayerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="home-content">
          <h3>Hi there! I'm</h3>
          <h1>Prashant</h1>
          <p>I'm an **Android App Developer** with a strong passion for crafting robust and intuitive mobile experiences using **Kotlin**. My journey in development is fueled by an insatiable curiosity and an eagerness to constantly explore new technologies and best practices.</p>
          <a href="#projects" className="btn">View My Work</a>
        </div>
        <div className="home-img">
          <img src={profilePhoto} alt="Prashant" />
        </div>
      </section>

      <section className="about" id="about">
        <h2 className="heading">About <span>Me</span></h2>
        <div className="about-container">
          <div className="about-img">
            <img src={profilePhoto} alt="Prashant" />
          </div>
          <div className="about-content">
            <h3>Android App Developer & Learner</h3>
            <p>I'm Prashant, an Android App Developer with a strong passion for crafting robust and intuitive mobile experiences using Kotlin. My journey in development is fueled by an insatiable curiosity and an eagerness to constantly explore new technologies and best practices. Whether it's diving deep into Android internals or experimenting with new libraries, I'm always looking for the next challenge!</p>
            <p><strong>🌱 What I'm Currently Exploring</strong></p>
            <ul>
              <li>Jetpack Compose: Enhancing UI development with declarative patterns.</li>
              <li>Clean Architecture: Building scalable and maintainable Android applications.</li>
            </ul>
            <p>Always eager to learn something new!</p>
            <p><strong>💖 Beyond the Code: My Anime & Movie Obsession!</strong></p>
            <p>While I love building apps, my world isn't just about lines of code! I'm a huge fan of unwinding and exploring stories.</p>
            <p><strong>Anime Enthusiast (Big Time!):</strong> If you're into anime, we're probably already friends! I absolutely adore diving into different anime worlds. My all-time favorite is *Tokyo Ghoul* – the psychological depth and intense narrative just hooked me in. What's yours? Let's chat about it!</p>
            <p><strong>Horror Movie Buff:</strong> When I'm not watching anime, you might find me glued to a horror movie. I love a good scare and the thrill of suspense!</p>
            <a href={resumeFile} download className="btn">Download CV</a>
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <h2 className="heading">My <span>Projects</span></h2>
        <div className="filter-buttons">
          <button className="filter-btn active-filter" data-filter="all" onClick={() => handleFilter('all')}>All</button>
          <button className="filter-btn" data-filter="react" onClick={() => handleFilter('react')}>React</button>
          <button className="filter-btn" data-filter="android" onClick={() => handleFilter('android')}>Android</button>
          <button className="filter-btn" data-filter="python" onClick={() => handleFilter('python')}>Python</button>
        </div>
        <div className="projects-container">
          {Object.keys(projects).map((key) => {
            const project = projects[key];
            return (
              <div key={key} className="project-box" data-category={project.category}>
                <img src={project.image} alt={project.title} />
                <div className="project-info">
                  <h4>{project.title}</h4>
                  <p>{project.description.substring(0, 100)}...</p>
                  <a href="#" className="btn open-modal" onClick={() => openModal(key)}>Learn More</a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      <section className="contact" id="contact">
        <h2 className="heading">Contact <span>Me</span></h2>
        <div className="contact-form">
          <p>I'm always open to collaborating on exciting projects or just chatting about tech and, of course, anime! Feel free to reach out.</p>
          <form action="https://formspree.io/f/your-formspree-id" method="POST">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit" className="btn">Send Message</button>
          </form>
          <div className="contact-links">
            <a href="mailto:lowkeyprashant@gmail.com" target="_blank"><i className="fas fa-envelope"></i> Email</a>
            <a href="https://linkedin.com/in/prashant" target="_blank"><i className="fab fa-linkedin"></i> LinkedIn</a>
            <a href="https://github.com/prashant" target="_blank"><i className="fab fa-github"></i> GitHub</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Prashant. All Rights Reserved.</p>
      </footer>

      {/* Modals */}
      {Object.keys(projects).map((key) => {
        const project = projects[key];
        return (
          <div key={key} className={`modal-container ${activeModal === key ? 'active' : ''}`} id={key} onClick={e => e.target.id === key && closeModal()}>
            <div className="modal-content">
              <span className="close-modal" onClick={closeModal}>&times;</span>
              <h3>{project.title}</h3>
              <img src={project.image} alt={project.title} />
              <p>{project.description}</p>
              <div className="modal-links">
                <a href={project.liveLink} target="_blank" className="btn">Live Demo</a>
                <a href={project.githubLink} target="_blank" className="btn">GitHub Repo</a>
              </div>
            </div>
          </div>
        );
      })}

      <a href="#home" className={`scroll-top ${showScrollTop ? 'show' : ''}`}><i className="fas fa-arrow-up"></i></a>
    </>
  );
};

export default App;