import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../index.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import  { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import profileImage from "../assets/waheed.png";
import cvFile from "../assets/Waheed_Akhtar_CV.pdf";
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import Docurious from "../assets/docurious.png";
import ChefPortal from "../assets/chef-portal.png";
import Charity from "../assets/charity.png";
import HealthCare from "../assets/health_care.png";
import Betki from "../assets/marketing.png";
import Cloves from "../assets/cloves.mp4";

export default () => {
  const [input2, onChangeInput2] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const [navScrolled, setNavScrolled] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);
  const cursorCoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseWidth = 1440;
  const isDesktop = viewportWidth >= 1024;
  const scale = isDesktop ? Math.min(1, viewportWidth / baseWidth) : 1;
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "work", label: "Work" },
    { id: "profile", label: "Profile" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const projects = [
    {
      title: "Event & Challenge Platform",
      category: "Full Stack",
      url: "https://portal.docurious.com",
      description: "A platform that connects users and service providers, where vendors organize challenges (events) for users to participate in.It automates key processes such as participation tracking and payouts, ensuring a seamless experience for all parties.",
      tags: ["Laravel", "MySQL", "React", "REST APIs"],
      image: Docurious,
      type:"image"
    },
    {
      title: "Chef Portal & Order Management Platform",
      category: "Full Stack",
      url: "https://prepbychef.com",
      description: "A platform connecting chefs and users, managing orders, deliveries, and commissions seamlessly. The system automates key processes to make the experience smooth and efficient for everyone..",
      tags: ["Laravel", "MySQL"],
      image: ChefPortal,
      type:"image"
    },
    {
      title: "Secure Online Charity & Donation Platform",
      category: "Full Stack",
      url: "https://demo-customlinks.com/nationempower_dev",
      description: "This charity website is a full-stack web application that enables users to donate online using PayPal and Stripe payment gateways. It includes secure payment processing, responsive UI, donation management, and a scalable backend architecture.",
      tags: ["Laravel","MySQL"],
      image: Charity,
      type:"image"
    },
    {
      title: "Biteki Marketing – Creative Agency Platform",
      category: "Full Stack",
      url: "https://demo-customlinks.com/biteki_dev",
      description: "Creative social media marketing and food photography website for UK restaurants, offering content shoots, short-form videos, and flexible, no-contract marketing plans.",
      tags: ["Laravel","MySQL"],
      image: Betki,
      type:"image"
    },
    {
      title: "Healthcare Staffing NW",
      category: "Full Stack",
      url: "https://demo-customlinks.com/health_care_dev",
      description: "A modern healthcare staffing agency website designed to support medical professionals by simplifying job placement, promoting work–life balance, and building long-term partnerships through flexible and supportive staffing solutions.",
      tags: ["Laravel", "MySQL"],
      image:HealthCare,
      type:"image"
    },
    {
      title: "ClovesRX Global — Prescription Delivery",
      category: "Full Stack",
      url: "#",
      description: "A prescription delivery platform built to support secure and on-time medication delivery for pharmacies across Southern California, helping streamline prescription fulfillment and improve patient access to essential medications.",
      tags: [ "Laravel", "MySQL"],
      image:Cloves,
      type:"video"
    },
  ];

  const onSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    setSendSuccess(false);

    const fullName = input2.trim();
    const fromEmail = email.trim();
    const msg = message.trim();

    if (!fullName || !fromEmail || !msg) {
      setSendError("Please fill in name, email, and message.");
      return;
    }
    // Simple email sanity check (avoid blocking valid but uncommon emails)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
      setSendError("Please enter a valid email address.");
      return;
    }

    const env = (import.meta as any).env as {
      VITE_EMAILJS_SERVICE_ID?: string;
      VITE_EMAILJS_TEMPLATE_ID?: string;
      VITE_EMAILJS_PUBLIC_KEY?: string;
    };
    const serviceId = env.VITE_EMAILJS_SERVICE_ID;
    const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSendError("Missing EmailJS configuration. Check your .env file.");
      return;
    }

    // try {
      setIsSending(true);
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: fullName,
          from_email: fromEmail,
          message: msg,
        },
        { publicKey }
      );
      setSendSuccess(true);
      onChangeInput2("");
      setEmail("");
      setMessage("");
    // } catch {
    //   setSendError("Failed to send. Please try again in a moment.");
    // } finally {
    //   setIsSending(false);
    // }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!isDesktop) return;
    if (!cursorGlowRef.current || !cursorCoreRef.current) return;

    const glowNode = cursorGlowRef.current;
    const coreNode = cursorCoreRef.current;
    let animationFrameId = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.14;
      currentY += (mouseY - currentY) * 0.14;
      glowNode.style.transform = `translate3d(${currentX - 110}px, ${currentY - 110}px, 0)`;
      coreNode.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
      animationFrameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [viewportWidth]);

  return (
    <div className="flex flex-col bg-[#080B12] w-full overflow-x-clip relative text-[#F0EDE8]">
      {/* Ambient background */}
      <div className="ambient-stage">
        <div className="ambient-grid"></div>
        <div className="ambient-blob ambient-blob-cyan"></div>
        <div className="ambient-blob ambient-blob-violet"></div>
      </div>

      {/* Desktop cursor glow — hidden on mobile */}
      <div
        ref={cursorGlowRef}
        className="fixed pointer-events-none z-[9999] w-[220px] h-[220px] rounded-full hidden lg:block"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.22) 0%, rgba(124,58,237,0.14) 40%, rgba(8,11,18,0) 72%)",
          filter: "blur(6px)",
          willChange: "transform",
        }}
      />
      <div
        ref={cursorCoreRef}
        className="fixed pointer-events-none z-[10000] w-[10px] h-[10px] rounded-full hidden lg:block"
        style={{
          backgroundColor: "#00F5FF",
          boxShadow: "0 0 18px rgba(0,245,255,0.9), 0 0 30px rgba(124,58,237,0.5)",
          willChange: "transform",
        }}
      />

      {/* ── INNER wrapper: zoom only on desktop ── */}
      <div className="relative z-10 w-full">
        {/* ── NAV (full-width bottom border) ── */}
        <div
          className={`w-full sticky top-0 z-[10001] border-b border-solid border-[#FFFFFF1A] mb-8 lg:mb-[87px] transition ${
            navScrolled
              ? "bg-[#0D1120] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              : "bg-transparent shadow-none backdrop-blur-0"
          }`}
        >
          <div
            className="origin-top lg:mx-auto"
            style={isDesktop ? { width: `${baseWidth}px`, zoom: scale } : {}}
          >
            <div
              className="flex justify-between items-center self-stretch py-4 lg:py-6 px-4 lg:px-20 relative"
            >

            {/* Logo */}
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-[#00F5FF] text-lg font-bold">{"</>"}</span>
              <span className="text-[#F0EDE8] text-lg lg:text-[21px] font-bold">DEV</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden lg:flex shrink-0 items-center gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`text-sm transition ${
                    activeSection === item.id ? "text-[#00F5FF]" : "text-[#8B8FA8]"
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-[#00F5FF] text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

            {/* Hire Me button */}
            <button
              className="hidden lg:flex bg-transparent text-left py-2.5 px-6 rounded-lg border border-[#00F5FF]"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              <span className="text-[#00F5FF] text-xs">HIRE ME</span>
            </button>

            {/* Mobile dropdown menu */}
            {menuOpen && (
              <div className="absolute top-full left-0 w-full bg-[#0D1120] border-t border-[#FFFFFF1A] flex flex-col lg:hidden z-50">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className={`text-left px-4 py-3 border-b border-[#FFFFFF1A] ${
                      activeSection === item.id ? "text-[#00F5FF]" : "text-[#8B8FA8]"
                    }`}
                    onClick={() => {
                      scrollToSection(item.id);
                      setMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}

                <button
                  className="px-4 py-3 text-[#00F5FF] text-left"
                  onClick={() => alert("Pressed!")}
                >
                  HIRE ME
                </button>
              </div>
            )}
            </div>
          </div>
        </div>

        <div
          className="origin-top lg:mx-auto"
          style={isDesktop ? { width: `${baseWidth}px`, zoom: scale } : {}}
        >
          <div className="flex flex-col items-center self-stretch">

            {/* ── HERO ── */}
            <div
              className="flex flex-col lg:flex-row items-center self-stretch mb-12 lg:mb-[177px] px-4 lg:mx-20 lg:px-0 reveal-up gap-8 lg:gap-0"
              id="profile"
            >
              {/* Text */}
              <div className="flex flex-1 flex-col items-start">
                <div className="flex items-center bg-[#0D112012] py-1.5 px-4 mb-6 lg:mb-8 gap-2 rounded-[9999px] border border-solid border-[#00F5FF4D]">
                  <div className="bg-[#00F5FF] w-2 h-2 rounded-[9999px]" />
                  <span className="text-[#00F5FF] text-[10px]">Available for Work</span>
                </div>

                <div className="flex flex-col items-start self-stretch mb-6 lg:mb-[31px]">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[68px] font-bold leading-[0.93] tracking-[-0.02em] lg:w-[900px]">
                  <span className="text-[#F0EDE8]">Building Scalable</span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F5FF] to-[#00F5FF]">
                    Full-Stack Systems
                  </span>
                </h1>
                </div>

                <div className="flex flex-col items-start mb-6 lg:mb-[31px] pl-0 lg:pl-6">
                  <span className="text-[#8B8FA8] text-base lg:text-lg lg:w-[429px]">
                    Full-Stack Developer &amp; Backend Architect specializing in high-performance digital experiences.
                  </span>
                </div>

                <div className="flex flex-row flex-wrap sm:flex-wrap items-center gap-3 lg:gap-6">
                <button
                  className="flex items-center justify-center bg-[#00F5FF] text-left py-2 px-4 sm:py-3 sm:px-6 lg:py-[19px] lg:px-[43px] rounded-lg border-0 text-xs sm:text-sm lg:text-lg font-bold text-[#080B12] glow-pulse"
                  style={{ boxShadow: "0px 0px 30px #00F5FF4D" }}
                  onClick={() => {
                    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View My Work
                </button>
                <button
                  className="flex items-center justify-center bg-[#0D112012] text-left py-2 px-4 sm:py-3 sm:px-6 lg:py-[19px] lg:px-[43px] rounded-lg border border-solid border-[#FFFFFF1A] text-xs sm:text-sm lg:text-lg font-bold text-[#F0EDE8]"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = cvFile;
                    link.download = "Waheed_Akhtar_CV.pdf";
                    link.click();
                  }}
                >
                  Download CV
                </button>
                </div>
              </div>

              {/* Profile image */}
              <div className="flex flex-1 flex-col items-center relative py-4 float-soft">
                <button
                  className="flex items-center justify-center bg-transparent text-left p-6 lg:p-8 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[470px] lg:h-[470px] rounded-full border-2 border-solid border-[#00F5FF33]"
                  onClick={() => alert("Pressed!")}
                >
                  <div className="flex items-center justify-center p-0.5 rounded-full border border-solid border-[#7C3AED1A]">
                    <img
                      src={profileImage}
                      className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[340px] lg:h-[340px] rounded-full object-cover border-4 border-[#00F5FF33] p-[2px]"
                    />
                  </div>
                </button>

                {/* Tech tags */}
                <div className="absolute top-10 flex items-center gap-2">
                  <img
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg"
                    alt="Laravel"
                    className="w-4 h-4 -mt-3 sm:mt-0"
                  />
                  <span className="text-[#F0EDE8] text-xs hidden sm:inline">Laravel</span>
                </div>

                <div className="absolute bottom-[180px] right-4 flex items-center gap-2">
                  <img
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
                    alt="React"
                    className="w-4 h-4 -mb-20 sm:mb-0"
                  />
                  <span className="text-[#F0EDE8] text-xs hidden sm:inline">React</span>
                </div>

                <div className="absolute bottom-40 left-[-5px] sm:left-5 flex items-center gap-2">
                  <img
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
                    alt="Node.js"
                    className="w-4 h-4 -mb-20 ml-5 sm:mb-0 sm:ml-0"
                  />
                  <span className="text-[#F0EDE8] text-xs hidden sm:inline">Node.js</span>
                </div>  
              </div>
            </div>

            {/* ── ENGINEERING & EXPERTISE ── */}
            <div className="flex flex-col lg:flex-row items-start self-stretch mb-12 lg:mb-[200px] px-4 lg:mx-16 lg:px-0 reveal-up delay-1 gap-8 lg:gap-0">
              {/* Left image card */}
              <div className="flex flex-1 flex-col items-start lg:mr-20 w-full">
                <button
                  className="flex flex-col items-start bg-[#0D112012] text-left p-3 rounded-2xl border-2 border-solid border-[#00F5FF4D] w-full lg:w-auto"
                  onClick={() => alert("Pressed!")}
                >
                  <div
                    className="flex flex-col items-start bg-cover bg-center w-full lg:w-[576px] pt-[280px] lg:pt-[448px] pl-[21px] pr-4 lg:pr-[408px] rounded-2xl border border-solid border-[#FFFFFF1A]"
                    style={{
                      backgroundImage:
                        "url(https://storage.googleapis.com/tagjs-prod.appspot.com/v1/6fQTmiJWHc/yt883f85_expires_30_days.png)",
                    }}
                  >
                    <div className="flex flex-col items-start bg-[#0D112012] p-6 mb-5 gap-1 rounded-2xl border border-solid border-[#00F5FF80]">
                      <span className="text-[#00F5FF] text-[27px] font-bold">3+</span>
                      <span className="text-[#8B8FA8] text-[10px]">Years of Craft</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Right text */}
              <div className="flex-1 py-0.5 mt-0 lg:mt-4">
                <div className="flex flex-col items-start self-stretch pb-6 lg:pb-8">
                  <span className="text-[#F0EDE8] text-2xl sm:text-3xl lg:text-6xl font-bold lg:w-[372px]">
                  Engineering & <span className="text-[#00F5FF] leading-tight">Expertise.</span>
                  </span>
                </div>
                <div className="flex flex-col items-start self-stretch pb-8 lg:pb-12">
                  <span className="text-[#8B8FA8] text-base lg:text-lg lg:w-[592px]">
                    I am a Full-Stack Developer focused on building scalable, maintainable, and high-performance web applications. I bridge the gap between complex backend logic and intuitive user interfaces, ensuring every byte serves a purpose.
                  </span>
                </div>
                <div className="flex flex-col self-stretch pb-[3px] gap-[27px]">
                  <div className="flex justify-center items-center self-stretch gap-4 lg:gap-6">
                    <div className="flex flex-col shrink-0 items-start bg-[#0D112012] p-6 lg:p-8 gap-2 rounded-2xl border border-solid border-[#00F5FF] flex-1">
                      <span className="text-[#F0EDE8] text-xl lg:text-2xl font-bold">10+</span>
                      <span className="text-[#8B8FA8] text-xs">Projects Completed</span>
                    </div>
                    <div className="flex flex-col shrink-0 items-start bg-[#0D112012] p-6 lg:p-8 gap-2 rounded-2xl border border-solid border-[#7C3AED] flex-1">
                      <span className="text-[#F0EDE8] text-xl lg:text-2xl font-bold">99%</span>
                      <span className="text-[#8B8FA8] text-xs">Success Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── TECH BADGES ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 self-stretch mb-12 lg:mb-[200px] px-4 lg:mx-20 lg:px-0 gap-4 lg:gap-8 reveal-up delay-2">
              {/* Laravel */}
              <div className="flex items-center bg-[#0D112012] py-8 lg:py-[41px] rounded-2xl border border-solid border-[#FFFFFF1A]">
                <div className="bg-[#FF2D201A] w-14 h-14 lg:w-16 lg:h-16 ml-6 lg:ml-10 mr-6 lg:mr-8 rounded-xl border border-solid border-[#FF2D2033] flex items-center justify-center shrink-0">
                  <span className="text-[#FF2D20] text-2xl font-bold">L</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[#F0EDE8] lg:text-[21px] font-bold">Laravel Expert</span>
                  <span className="text-[#8B8FA8] text-sm">PHP / REST APIs / OOP</span>
                </div>
              </div>

              {/* Node.js */}
              <div className="flex items-center bg-[#0D112012] py-8 lg:py-[41px] rounded-2xl border border-solid border-[#FFFFFF1A]">
                <div className="bg-[#7C3AED1A] w-14 h-14 lg:w-16 lg:h-16 ml-6 lg:ml-10 mr-6 lg:mr-8 rounded-xl border border-solid border-[#7C3AED33] flex items-center justify-center shrink-0">
                  <span className="text-violet-400 text-xl lg:text-2xl font-bold">N</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[#F0EDE8] lg:text-[21px] font-bold">Node.js Backend</span>
                  <span className="text-[#8B8FA8] text-sm">Node / Express / APIs</span>
                </div>
              </div>

              {/* Database */}
              <div className="flex items-center bg-[#0D112012] py-8 lg:py-[41px] rounded-2xl border border-solid border-[#FFFFFF1A]">
                <div className="bg-[#2563EB1A] w-14 h-14 lg:w-16 lg:h-16 ml-6 lg:ml-10 mr-6 lg:mr-8 rounded-xl border border-solid border-[#2563EB33] flex items-center justify-center shrink-0">
                  <span className="text-[#60A5FA] text-xl lg:text-2xl font-bold">DB</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[#F0EDE8] lg:text-[21px] font-bold">Database Optimization</span>
                  <span className="text-[#8B8FA8] text-sm">MySQL / PostgreSQL</span>
                </div>
              </div>

              {/* Frontend */}
              <div className="flex items-center bg-[#0D112012] py-8 lg:py-[41px] rounded-2xl border border-solid border-[#FFFFFF1A] lg:col-span-1">
                <div className="bg-[#14B8A61A] w-14 h-14 lg:w-16 lg:h-16 ml-6 lg:ml-10 mr-6 lg:mr-8 rounded-xl border border-solid border-[#14B8A633] flex items-center justify-center shrink-0">
                  <span className="text-[#2DD4BF] text-xl lg:text-2xl font-bold">⚛</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[#F0EDE8] lg:text-[21px] font-bold">Frontend Development</span>
                  <span className="text-[#8B8FA8] text-sm">React / Vue / Tailwind</span>
                </div>
              </div>
            </div>

            {/* ── SKILLS ── */}
            <div className="flex flex-col self-stretch mb-12 lg:mb-[100px] px-4 lg:mx-20 lg:px-0 gap-10 lg:gap-16 reveal-up delay-2" id="skills">
  
              <div className="flex flex-col items-center self-stretch">
                <span className="text-[#F0EDE8] text-2xl sm:text-3xl lg:text-6xl font-bold">
                  Technical <span className="text-[#00F5FF]">Stack.</span>
                </span>
              </div>

              <div className="flex flex-col lg:flex-row items-stretch self-stretch gap-6 lg:gap-8"> 
              {/* ── Frontend ── */}
                <div className="flex flex-1 flex-col bg-[#0D112012] p-6 lg:p-10 gap-8 rounded-3xl border border-solid border-[#FFFFFF1A]">
                  <div className="flex justify-between items-center self-stretch">
                    <span className="text-[#00F5FF] text-sm">Frontend Development</span>
                    <div className="bg-[#00F5FF1A] p-2 rounded-lg">
                      <span className="text-[#00F5FF] text-xs font-bold">UI</span>
                    </div>
                  </div>

                  <div className="flex flex-col self-stretch gap-6">
                    {/* React */}
                    <div className="flex flex-col self-stretch gap-2">
                      <div className="flex justify-between items-center self-stretch">
                        <span className="text-[#F0EDE8] text-sm">React.js</span>
                        <span className="text-[#F0EDE8] text-sm">85%</span>
                      </div>
                      <div className="self-stretch bg-[#FFFFFF0D] rounded-[9999px]">
                        <div className="bg-[#00F5FF] h-1.5 rounded-[9999px]" style={{ width: "85%", boxShadow: "0px 0px 10px #00F5FF" }} />
                      </div>
                    </div>

                    {/* Vue */}
                    <div className="flex flex-col self-stretch gap-2">
                      <div className="flex justify-between items-center self-stretch">
                        <span className="text-[#F0EDE8] text-sm">Vue.js</span>
                        <span className="text-[#F0EDE8] text-sm">80%</span>
                      </div>
                      <div className="self-stretch bg-[#FFFFFF0D] rounded-[9999px]">
                        <div className="bg-[#00F5FF] h-1.5 rounded-[9999px]" style={{ width: "80%", boxShadow: "0px 0px 10px #00F5FF" }} />
                      </div>
                    </div>

                    {/* JavaScript */}
                    <div className="flex flex-col self-stretch gap-2">
                      <div className="flex justify-between items-center self-stretch">
                        <span className="text-[#F0EDE8] text-sm">JavaScript / jQuery</span>
                        <span className="text-[#F0EDE8] text-sm">88%</span>
                      </div>
                      <div className="self-stretch bg-[#FFFFFF0D] rounded-[9999px]">
                        <div className="bg-[#00F5FF] h-1.5 rounded-[9999px]" style={{ width: "88%", boxShadow: "0px 0px 10px #00F5FF" }} />
                      </div>
                    </div>

                    {/* CSS Frameworks */}
                    <div className="flex flex-col self-stretch gap-2">
                      <div className="flex justify-between items-center self-stretch">
                        <span className="text-[#F0EDE8] text-sm">Tailwind / Bootstrap / Chakra UI</span>
                        <span className="text-[#F0EDE8] text-sm">92%</span>
                      </div>
                      <div className="self-stretch bg-[#FFFFFF0D] rounded-[9999px]">
                        <div className="bg-[#00F5FF] h-1.5 rounded-[9999px]" style={{ width: "92%", boxShadow: "0px 0px 10px #00F5FF" }} />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center self-stretch py-2 gap-2">
                      {["HTML5", "CSS3", "JavaScript", "jQuery", "Ajax", "React", "Vue.js", "Bootstrap", "Tailwind CSS", "Chakra UI"].map((item) => (
                        <button key={item} className="bg-[#FFFFFF0D] text-left py-1 px-3 rounded-[9999px] border border-solid border-[#FFFFFF1A]">
                          <span className="text-[#8B8FA8] text-[10px]">{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Backend ── */}
                <div className="flex flex-1 flex-col bg-[#0D112012] p-6 lg:p-10 gap-8 rounded-3xl border border-solid border-[#FFFFFF1A]">
                  <div className="flex justify-between items-center self-stretch">
                    <span className="text-violet-400 text-sm">Backend Engineering</span>
                    <div className="bg-[#7C3AED1A] p-2 rounded-lg">
                      <span className="text-violet-400 text-xs font-bold">API</span>
                    </div>
                  </div>

                  <div className="flex flex-col self-stretch gap-6">
                    {/* PHP / Laravel */}
                    <div className="flex flex-col self-stretch gap-2">
                      <div className="flex justify-between items-center self-stretch">
                        <span className="text-[#F0EDE8] text-sm">PHP / Laravel</span>
                        <span className="text-[#F0EDE8] text-sm">95%</span>
                      </div>
                      <div className="self-stretch bg-[#FFFFFF0D] rounded-[9999px]">
                        <div className="bg-violet-500 h-1.5 rounded-[9999px]" style={{ width: "95%", boxShadow: "0px 0px 10px #7C3AED" }} />
                      </div>
                    </div>

                    {/* Node.js */}
                    <div className="flex flex-col self-stretch gap-2">
                      <div className="flex justify-between items-center self-stretch">
                        <span className="text-[#F0EDE8] text-sm">Node.js / Express</span>
                        <span className="text-[#F0EDE8] text-sm">78%</span>
                      </div>
                      <div className="self-stretch bg-[#FFFFFF0D] rounded-[9999px]">
                        <div className="bg-violet-500 h-1.5 rounded-[9999px]" style={{ width: "78%", boxShadow: "0px 0px 10px #7C3AED" }} />
                      </div>
                    </div>

                    {/* REST APIs */}
                    <div className="flex flex-col self-stretch gap-2">
                      <div className="flex justify-between items-center self-stretch">
                        <span className="text-[#F0EDE8] text-sm">REST APIs / OOP</span>
                        <span className="text-[#F0EDE8] text-sm">93%</span>
                      </div>
                      <div className="self-stretch bg-[#FFFFFF0D] rounded-[9999px]">
                        <div className="bg-violet-500 h-1.5 rounded-[9999px]" style={{ width: "93%", boxShadow: "0px 0px 10px #7C3AED" }} />
                      </div>
                    </div>

                    {/* Third-party APIs */}
                    <div className="flex flex-col self-stretch gap-2">
                      <div className="flex justify-between items-center self-stretch">
                        <span className="text-[#F0EDE8] text-sm">Third-Party API Integration</span>
                        <span className="text-[#F0EDE8] text-sm">90%</span>
                      </div>
                      <div className="self-stretch bg-[#FFFFFF0D] rounded-[9999px]">
                        <div className="bg-violet-500 h-1.5 rounded-[9999px]" style={{ width: "90%", boxShadow: "0px 0px 10px #7C3AED" }} />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center self-stretch py-2 gap-2">
                      {["PHP", "Laravel", "Node.js", "Express.js", "REST APIs", "OOP", "AJAX", "XML", "JSON", "Git", "GitHub", "Third Party APIs"].map((item) => (
                        <button key={item} className="bg-[#FFFFFF0D] text-left py-1 px-3 rounded-[9999px] border border-solid border-[#FFFFFF1A]">
                          <span className="text-[#8B8FA8] text-[10px]">{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ── WORK / PROJECTS ── */}
            <div className="flex flex-col self-stretch bg-[#00000033] py-12 lg:py-[100px]  lg:mb-[100px] gap-10 lg:gap-16 reveal-up delay-3" id="work">
              <div className="flex flex-col sm:flex-row justify-between items-start self-stretch flex-wrap gap-6">
                <div className="flex flex-col shrink-0 items-start gap-4">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <span className="text-[#F0EDE8] text-2xl sm:text-3xl lg:text-6xl font-bold leading-tight">
                    Explore <span className="text-[#00F5FF]">My Work.</span>
                  </span>

                  <span className="text-[#8B8FA8] text-[10px] sm:text-xs lg:text-sm tracking-[1px] sm:tracking-[2px] mt-2">
                    CRAFTING DIGITAL EXPERIENCES THROUGH PRECISION CODE.
                  </span>
                </div>
                </div>
              </div>

             {/* Slider wrapper — extra horizontal padding makes room for outside arrows */}
                  <div className="relative px-8 lg:px-12">

                  {/* Custom Prev Arrow */}
                  <button
                    className="swiper-btn-prev absolute left-0 top-1/2 -translate-y-1/2 z-10
                      w-8 h-8 rounded-full border border-[#FFFFFF22] bg-[#0D1120]
                      flex items-center justify-center
                      text-[#8B8FA8] hover:text-[#00F5FF] hover:border-[#00F5FF]
                      transition-all duration-300 text-sm"
                  >
                    ‹
                  </button>

                  {/* Custom Next Arrow */}
                  <button
                    className="swiper-btn-next absolute right-0 top-1/2 -translate-y-1/2 z-10
                      w-8 h-8 rounded-full border border-[#FFFFFF22] bg-[#0D1120]
                      flex items-center justify-center
                      text-[#8B8FA8] hover:text-[#00F5FF] hover:border-[#00F5FF]
                      transition-all duration-300 text-sm"
                  >
                    ›
                  </button>

                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={false}
                    pagination={{ clickable: true }}
                    navigation={{
                      prevEl: ".swiper-btn-prev",
                      nextEl: ".swiper-btn-next",
                    }}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                    }}
                    className="w-full pb-10"
                  >
                    {projects.map((project, index) => (
                      <SwiperSlide key={index}>
                        <div className="flex flex-col rounded-3xl border border-[#FFFFFF1A] bg-[#0D1120] overflow-hidden">

                          {/* Browser mockup frame */}
                          <div className="bg-[#1A1D2E] px-3 pt-3 pb-0">
                            <div className="bg-[#0D1120] rounded-t-xl px-3 py-2 flex items-center gap-2">
                              <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                              </div>
                              <div className="flex-1 bg-[#1A1D2E] rounded-full px-3 py-1 mx-2">
                                <span className="text-[#8B8FA8] text-[10px]">
                                  {project.url || "www.project-demo.com"}
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden rounded-none">
                              {project.type === "video" ? (
                               <video
                               src={project.image}
                               className="w-full h-[200px] sm:h-[220px] lg:h-[240px] object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                               controls
                               playsInline
                             />
                              ) : (
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-[200px] sm:h-[220px] lg:h-[240px] object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                                />
                              )}
                            </div>
                          </div>

                          {/* Card body */}
                          <div className="flex flex-col p-5 lg:p-6 gap-4">
                            <span className="text-[#00F5FF] text-[10px] uppercase tracking-[2px]">
                              {project.category}
                            </span>
                            <h3 className="text-[#F0EDE8] text-lg lg:text-xl font-bold leading-tight h-14">
                              {project.title}
                            </h3>
                            <p className="text-[#8B8FA8] text-sm leading-6 h-[120px]">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.tags?.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="text-[#8B8FA8] text-[10px] bg-[#FFFFFF0D] border border-[#FFFFFF1A] px-3 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-fit mt-1 text-xs lg:text-sm text-[#F0EDE8] border border-[#FFFFFF22] px-5 py-2 rounded-full hover:bg-[#00F5FF] hover:text-[#080B12] transition-all duration-300 inline-block"
                            >
                              View Project →
                            </a>
                          </div>

                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  </div>
                </div>

            {/* ── TIMELINE ── */}
            <div className="flex flex-col items-center mb-16 lg:mb-[206px] px-4 lg:px-0 w-full reveal-up delay-3">
              <div className="flex flex-col items-center lg:items-start pb-12 lg:pb-20 w-full lg:w-auto text-center lg:text-left">
                <span className="text-[#F0EDE8] text-2xl sm:text-3xl lg:text-6xl font-bold">
                  Journey & <span className="text-[#00F5FF]">Growth.</span>
                </span>
              </div>

              {/* Mobile timeline — stacked */}
              <div className="flex flex-col lg:hidden w-full gap-4">
                {[
                  {
                    color: "#00F5FF",
                    borderColor: "border-[#00F5FF]",
                    textColor: "text-[#00F5FF]",
                    date: "AUG 2024 - PRESENT",
                    role: "Senior Full Stack Laravel Developer",
                    company: "MentorSol",
                    desc: "Leading backend development of scalable Laravel applications, optimizing databases, and integrating REST APIs with third-party services at MentorSol."
                  },
                  {
                    color: "#7C3AED",
                    borderColor: "border-[#7C3AED]",
                    textColor: "text-violet-400",
                    date: "NOV 2023 - JUN 2024",
                    role: "Associate Full Stack Laravel Developer",
                    company: "IT Extension",
                    desc: "Developed customized Laravel applications, maintained AJAX-based prototype libraries, and integrated payment & notification APIs at IT Extension."
                  },
                  {
                    color: "#FF4D8D",
                    borderColor: "border-[#FF4D8D]",
                    textColor: "text-[#FF4D8D]",
                    date: "JAN 2022 - JUN 2023",
                    role: "Junior Full Stack Laravel Developer",
                    company: "ProByte",
                    desc: "Built and deployed 10+ client web applications, implemented OOP design patterns, and collaborated closely with UI/UX teams at ProByte."
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex flex-col bg-[#0D112012] p-6 gap-2 rounded-2xl border border-solid ${item.borderColor}`}
                  >
                    <span className={`${item.textColor} text-[10px]`}>
                      {item.date}
                    </span>
                    <span className="text-[#F0EDE8] text-lg font-bold">
                      {item.role}
                    </span>
                    <span className="text-[#8B8FA8] text-sm leading-6">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop timeline — alternating */}
              <div className="relative hidden lg:flex flex-col items-start">
                <div
                  className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2"
                  style={{
                    background: "linear-gradient(to bottom, #00F5FF 0%, #7C3AED 50%, #FF4D8D 100%)",
                    boxShadow: "0 0 12px rgba(124,58,237,0.35)"
                  }}
                />

                {/* Senior */}
                <div className="flex items-center mb-24 gap-[37px]">
                  <div className="flex flex-col shrink-0 items-start bg-[#0D112012] p-8 gap-2 rounded-2xl border border-solid border-[#00F5FF]">
                    <span className="text-[#00F5FF] text-[10px]">AUG 2024 - PRESENT</span>
                    <span className="text-[#F0EDE8] text-lg font-bold">
                      Senior Full Stack Laravel Developer
                    </span>
                    <span className="text-[#8B8FA8] text-sm w-[340px] leading-6">
                      Leading backend development of scalable Laravel applications, optimizing databases, and integrating REST APIs with third-party services at MentorSol.
                    </span>
                  </div>
                  <div className="bg-[#00F5FF] w-4 h-4 rounded-full border-4 border-[#080B12]" style={{ boxShadow: "0px 0px 15px #00F5FF" }} />
                  <div className="w-[403px] h-[163px]" />
                </div>

                {/* Associate */}
                <div className="flex items-center mb-24 gap-9">
                  <div className="w-[403px] h-[163px]" />
                  <div className="bg-violet-600 w-4 h-4 rounded-full border-4 border-[#080B12]" style={{ boxShadow: "0px 0px 15px #7C3AED" }} />
                  <div className="flex flex-col shrink-0 items-start bg-[#0D112012] p-8 gap-2 rounded-2xl border border-solid border-[#7C3AED]">
                    <span className="text-violet-400 text-[10px]">NOV 2023 - JUN 2024</span>
                    <span className="text-[#F0EDE8] text-lg font-bold">
                      Associate Full Stack Laravel Developer
                    </span>
                    <span className="text-[#8B8FA8] text-sm w-[330px] leading-6">
                      Developed customized Laravel applications, maintained AJAX-based prototype libraries, and integrated payment & notification APIs at IT Extension.
                    </span>
                  </div>
                </div>

                {/* Junior */}
                <div className="flex items-center gap-[37px]">
                  <div className="flex flex-col shrink-0 items-start bg-[#0D112012] p-8 gap-2 rounded-2xl border border-solid border-[#FF4D8D]">
                    <span className="text-[#FF4D8D] text-[10px]">JAN 2022 - JUN 2023</span>
                    <span className="text-[#F0EDE8] text-lg font-bold">
                      Junior Full Stack Laravel Developer
                    </span>
                    <span className="text-[#8B8FA8] text-sm w-[340px] leading-6">
                    Built and deployed client web applications, implemented OOP design patterns, and collaborated closely with UI/UX teams at ProByte.
                    </span>
                  </div>
                  <div className="bg-[#FF4D8D] w-4 h-4 rounded-full border-4 border-[#080B12]" style={{ boxShadow: "0px 0px 15px #FF4D8D" }} />
                  <div className="w-[403px] h-[163px]" />
                </div>
              </div>
            </div>

            {/* ── TESTIMONIALS ── */}
            <div className="flex flex-col lg:flex-row items-stretch self-stretch mb-16 lg:mb-44 px-4 lg:mx-20 lg:px-0 gap-4 lg:gap-8 reveal-up">
              {[
                { quote: "One of the few developers who truly understands the intersection of robust backend logic and beautiful user interfaces.", name: "Sarah Jenkins", role: "CTO @ Innovate", imgKey: "kjochlvg", starKey: "wmt6ev5g" },
                { quote: "Transformed our legacy system into a modern, lightning-fast application. Technical expertise is unmatched.", name: "Marcus Chen", role: "Product Manager", imgKey: "vh5kqx1p", starKey: "onq6f1nu" },
                { quote: "Professional, communicative, and exceptionally skilled. A pleasure to work with on complex integrations.", name: "David Miller", role: "Founder @ TechFlow", imgKey: "7ry7cvf2", starKey: "q3p8dtf2" },
              ].map((t, i) => (
                <div key={i} className="flex flex-1 flex-col items-center bg-[#0D112012] p-6 lg:pt-10 gap-6 rounded-3xl border border-solid border-[#FFFFFF1A]">
                  <img
                    src={`https://storage.googleapis.com/tagjs-prod.appspot.com/v1/6fQTmiJWHc/${t.starKey}_expires_30_days.png`}
                    className="w-[200px] lg:w-[325px] h-3 rounded-3xl object-fill"
                  />
                  <p className="text-[#8B8FA8] text-sm lg:text-base flex-1">{t.quote}</p>
                  <div className="flex items-center self-stretch gap-4">
                    <img
                      src={`https://storage.googleapis.com/tagjs-prod.appspot.com/v1/6fQTmiJWHc/${t.imgKey}_expires_30_days.png`}
                      className="w-12 h-12 object-fill"
                    />
                    <div className="flex flex-col shrink-0 items-start">
                      <span className="text-[#F0EDE8] text-sm font-bold">{t.name}</span>
                      <span className="text-[#8B8FA8] text-[10px]">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── CONTACT ── */}
            <div
              className="flex flex-col lg:flex-row items-start self-stretch bg-[#0D112012] p-6 lg:p-20 mb-12 lg:mb-[108px] mx-4 lg:mx-20 rounded-[40px] border border-solid border-[#FFFFFF1A] reveal-up delay-1 gap-10 lg:gap-0"
              id="contact"
            >
              {/* Left */}
              <div className="flex flex-1 flex-col lg:mr-20 gap-8 lg:gap-12 w-full">
                <span className="text-[#F0EDE8] text-2xl sm:text-3xl lg:text-6xl leading-tight font-bold">
                  Let's Build <span className="text-[#00F5FF]">Something Great.</span>
                </span>

                <div className="flex flex-col self-stretch gap-6">
                  {[
                 {
                  icon: <FaEnvelope />,
                  bg: "bg-[#00F5FF1A]",
                  border: "border-[#00F5FF33]",
                  iconColor: "text-[#00F5FF]",
                  label: "Email Me",
                  value: "waheed47623@gmail.com",
                  link: "mailto:waheed47623@gmail.com",
                },
                {
                  icon: <FaLinkedin />,
                  bg: "bg-[#7C3AED1A]",
                  border: "border-[#7C3AED33]",
                  iconColor: "text-violet-400",
                  label: "LinkedIn",
                  value: "linkedin.com/in/waheed-akhtar",
                  link: "https://linkedin.com/in/waheed-akhtar",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  bg: "bg-[#FF4D8D1A]",
                  border: "border-[#FF4D8D33]",
                  iconColor: "text-[#FF4D8D]",
                  label: "Location",
                  value: "Lahore, Pakistan",
                  link: "https://maps.google.com/?q=Lahore,Pakistan",
                }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center self-stretch gap-4 lg:gap-6">
                      <div className={`${item.bg} p-3 lg:p-4 rounded-2xl border border-solid ${item.border} shrink-0`}>
                        <span className={`${item.iconColor} text-lg lg:text-xl`}>{item.icon}</span>
                      </div>
                      <div className="flex flex-col shrink-0 items-start">
                        <span className="text-[#8B8FA8] text-xs">{item.label}</span>
                        <a
                          href={item.label === "Email Me" ? `mailto:${item.value}` : item.link}
                          target={item.label !== "Email Me" ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-[#F0EDE8] text-base lg:text-xl font-bold break-all hover:text-[#00F5FF] transition-colors duration-300"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right form */}
              <form className="flex flex-1 flex-col w-full gap-6" onSubmit={onSubmitContact}>
                <div className="flex flex-col sm:flex-row justify-center items-center self-stretch gap-4 lg:gap-6">
                  <div className="flex flex-col w-full items-start gap-2">
                    <span className="text-[#8B8FA8] text-[10px] ml-2">Full Name</span>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={input2}
                      onChange={(e) => onChangeInput2(e.target.value)}
                      className="w-full text-gray-400 bg-[#FFFFFF05] text-base py-4 lg:py-[22px] px-6 rounded-xl border border-solid border-[#FFFFFF1A] outline-none"
                      autoComplete="name"
                      disabled={isSending}
                    />
                  </div>
                  <div className="flex flex-col w-full items-start gap-2">
                    <span className="text-[#8B8FA8] text-[10px] ml-2">Email Address</span>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-gray-400 bg-[#FFFFFF05] text-base py-4 lg:py-[22px] px-6 rounded-xl border border-solid border-[#FFFFFF1A] outline-none"
                      autoComplete="email"
                      disabled={isSending}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start self-stretch gap-2">
                  <span className="text-[#8B8FA8] text-[10px] ml-2">Message</span>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-gray-400 bg-[#FFFFFF05] text-base py-4 px-6 rounded-xl border border-solid border-[#FFFFFF1A] outline-none resize-none"
                    disabled={isSending}
                  />
                </div>

                <button
                  type="submit"
                  className="flex flex-col items-center self-stretch bg-[#00F5FF] text-left py-4 lg:py-5 rounded-xl border-0 transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
                  style={{ boxShadow: "0px 0px 30px #00F5FF33" }}
                  disabled={isSending}
                >
                  <span className="text-[#080B12] text-base lg:text-lg font-bold">
                    {isSending ? "Sending..." : "Send Message"}
                  </span>
                </button>

                {sendError ? (
                  <div className="text-red-300 text-sm">{sendError}</div>
                ) : sendSuccess ? (
                  <div className="text-emerald-300 text-sm">Message sent successfully.</div>
                ) : null}
              </form>
            </div>

            {/* ── FOOTER ── */}
            <div className="flex flex-col lg:flex-row justify-between items-center self-stretch bg-[#080B12] py-8 px-4 lg:px-20 gap-6 border-t border-solid border-[#FFFFFF1A] w-full">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <span className="text-[#F0EDE8] text-xl font-bold">WAHEED AKHTAR</span>
                  <span className="text-[#8B8FA8] text-[10px]">Laravel Backend Developer &amp; React Developer</span>
                </div>
                <div className="flex items-center justify-center gap-6">
                  <a href="#projects" className="text-[#8B8FA8] text-xs hover:text-white transition">Projects</a>
                  <a href="#skills" className="text-[#8B8FA8] text-xs hover:text-white transition">Skills</a>
                  <a href="#contact" className="text-[#8B8FA8] text-xs hover:text-white transition">Contact</a>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-[#8B8FA8] text-[10px]">© 2026 Waheed Akhtar. All Rights Reserved</span>
                <div className="bg-[#00F5FF1A] w-10 h-10 rounded-full flex items-center justify-center border border-solid border-[#00F5FF33]">
                  <span className="text-[#00F5FF] text-sm font-bold">WA</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};