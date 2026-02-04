import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MailOpen, Stars } from 'lucide-react';
import './App.css';

const GIFT_DATA = [
  {
    id: 1,
    title: "A Love Letter",
    icon: "💌",
    message: `My Dearest,

You are my favorite part of every day. Every year we spend together is like a beautiful dream come true. Thank you for making our home full of smiles and my heart full of love.

I am so lucky to have you by my side. Love you forever. 💖`,
    revealType: "letter"
  },
  {
    id: 2,
    title: "Shared Memories",
    icon: "📸",
    message: "Every photograph here is a chapter of the incredible journey we've shared. From our first nervous dates to the beautiful family we've raised together, these memories are the treasures of my heart. They remind me of the laughter that filled our home, the lessons we learned through challenges, and the quiet love that grew even during the busiest days. Let's look back on the path we've walked—it's a journey I'd take a thousand times over, as long as it's with you.",
    revealType: "memories"
  },
  {
    id: 3,
    title: "A Promise",
    icon: "✨",
    message: "To always respect the love we built, to carry our values forward, and to celebrate us—today and always. I promise to hold your hand through every future season, just as we have through the past.",
    revealType: "promise"
  }
];

const OrbitingHearts = () => (
  <div className="global-orbit-container">
    <motion.div
      className="infinite-symbol-small"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
    >
      {[...Array(10)].map((_, i) => (
        <div key={i} className={`orbit-heart oh${i + 1}`} />
      ))}
    </motion.div>
  </div>
);

const PHOTO_ASSETS = [
  "/photos/photo1.jpg",
  "/photos/photo2.jpg",
  "/photos/photo3.jpg",
  "/photos/photo4.jpg",
  "/photos/photo5.jpg",
  "/photos/photo6.jpg",
  "/photos/photo7.jpg",
  "/photos/photo8.jpg",
  "/photos/photo9.jpg",
  "/photos/photo10.jpg",
  "/photos/photo11.jpg",
  "/photos/photo0.jpg"
];

const RAIN_EMOJIS = ['💕', '✨', '😘', '🥰', '💞', '✨', '🥰', '✨', '💖', '💗'];

const ROMANTIC_SONG_URL = "/audio/song.mp3";

const SparkleTrail = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      if (!x || !y) return;

      const newSparkle = {
        id: Date.now(),
        x,
        y,
        size: Math.random() * 10 + 5,
        color: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd700'][Math.floor(Math.random() * 4)]
      };

      setSparkles((prev) => [...prev.slice(-15), newSparkle]);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return (
    <div className="sparkle-trail-container">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="sparkle"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              background: s.color,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const RosePetals = () => {
  const petals = useRef([...Array(12)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: 10 + Math.random() * 15,
    delay: Math.random() * 10,
    rotate: Math.random() * 360,
    size: 15 + Math.random() * 20
  })));

  return (
    <div className="rose-petals-container">
      {petals.current.map((p) => (
        <motion.div
          key={p.id}
          className="petal"
          initial={{ y: -100, x: 0, rotate: p.rotate, opacity: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.random() * 100 - 50, 0],
            rotate: p.rotate + 720,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
};

function App() {
  const [phase, setPhase] = useState('intro');
  const [selectedGift, setSelectedGift] = useState(null);
  const audioRef = useRef(null);
  const cardRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Background hearts - fewer on mobile
  const hearts = useRef([...Array(isMobile ? 6 : 15)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${10 + Math.random() * 8}s`,
    size: `${1.2 + Math.random() * 1.5}rem`
  })));

  // Floating sparkles - fewer on mobile
  const sparkles = useRef([...Array(isMobile ? 3 : 8)].map((_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    delay: Math.random() * 2,
    size: 20 + Math.random() * 15
  })));

  // Emoji rain - fewer on mobile
  const emojiRain = useRef([...Array(isMobile ? 10 : 30)].map((_, i) => ({
    id: i,
    emoji: RAIN_EMOJIS[Math.floor(Math.random() * RAIN_EMOJIS.length)],
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
    size: 1.5 + Math.random() * 1.5
  })));

  const startMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }
  };

  // Try to play music as soon as page loads
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.preload = 'auto'; // Force preload

      // Try to play when audio is ready
      const tryPlay = () => {
        audio.play().catch(() => {
          console.log("Waiting for user interaction");
        });
      };

      // Play as soon as enough data is loaded
      audio.addEventListener('canplaythrough', tryPlay);

      // Also try immediately
      tryPlay();

      return () => audio.removeEventListener('canplaythrough', tryPlay);
    }
  }, []);

  const handleOpenSurprise = () => {
    startMusic();
    setPhase('gift_selection');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ffd700', '#ff8fa3']
    });
  };

  const handleSelectGift = (gift) => {
    startMusic();
    setSelectedGift(gift);
    setPhase('gift_detail');
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.8 },
      colors: ['#ff4d6d', '#ff758f', '#ffffff']
    });
  };

  const handleBackToGifts = () => {
    setPhase('gift_selection');
    setSelectedGift(null);
  };

  const handleBackToIntro = () => {
    setPhase('intro');
  };

  const triggerFirecrackers = () => {
    const colors = ['#ff4d6d', '#ff758f', '#ffd700', '#ff6b6b', '#ffffff', '#ffccd5'];
    const particleBase = isMobile ? 30 : 100;

    confetti({
      particleCount: particleBase,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
      colors,
      startVelocity: 45,
      gravity: 0.8,
      ticks: isMobile ? 150 : 300
    });

    const explode = (x, y, delay) => {
      setTimeout(() => {
        confetti({
          particleCount: isMobile ? 25 : 80,
          spread: 360,
          origin: { x, y },
          colors,
          startVelocity: 40,
          gravity: 1,
          ticks: isMobile ? 150 : 250
        });
      }, delay);
    };

    // Fewer explosions on mobile
    if (isMobile) {
      explode(0.3, 0.4, 300);
      explode(0.7, 0.4, 600);
    } else {
      explode(0.2, 0.3, 200);
      explode(0.8, 0.3, 400);
      explode(0.3, 0.7, 600);
      explode(0.7, 0.7, 800);
      explode(0.5, 0.2, 1000);
      explode(0.1, 0.5, 1200);
      explode(0.9, 0.5, 1400);
    }

    // Final burst - smaller on mobile
    setTimeout(() => {
      confetti({
        particleCount: isMobile ? 40 : 150,
        spread: 360,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#ff4d6d', '#ffd700', '#ffffff'],
        startVelocity: isMobile ? 35 : 55,
        gravity: 0.6,
        ticks: isMobile ? 200 : 400
      });
    }, isMobile ? 800 : 1800);

    // Continuous bursts - skip on mobile
    if (!isMobile) {
      let burstCount = 0;
      const burstInterval = setInterval(() => {
        confetti({
          particleCount: 30,
          spread: 100,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
          colors,
          startVelocity: 30
        });
        burstCount++;
        if (burstCount > 8) clearInterval(burstInterval);
      }, 400);
    }
  };

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: "backOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="app-container" onClick={startMusic}>
      <audio ref={audioRef} src={ROMANTIC_SONG_URL} loop />

      <SparkleTrail />
      <RosePetals />

      {/* Background Hearts */}
      <div className="bg-hearts">
        {hearts.current.map(h => (
          <div
            key={h.id}
            className="bg-heart"
            style={{
              left: h.left,
              animationDelay: h.delay,
              animationDuration: h.duration,
              fontSize: h.size
            }}
          >
            💗
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="intro-container"
          >
            {/* Mobile Hanging Photos for Home Page */}
            {isMobile && (
              <>
                <div className="mobile-hanging-row top home">
                  {PHOTO_ASSETS.slice(0, 3).map((photo, i) => (
                    <motion.div key={i} className="mobile-frame" variants={itemVariants}>
                      <div className="mobile-string" />
                      <img src={photo} alt="" />
                    </motion.div>
                  ))}
                </div>
                <div className="mobile-hanging-row bottom home">
                  {PHOTO_ASSETS.slice(3, 6).map((photo, i) => (
                    <motion.div key={i} className="mobile-frame" variants={itemVariants}>
                      <div className="mobile-string" />
                      <img src={photo} alt="" />
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {!isMobile && (
              <div className="homepage-photo-wall">
                {PHOTO_ASSETS.map((photo, i) => (
                  <motion.div
                    key={i}
                    className="homepage-frame-wrapper"
                    initial={{ y: -150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "backOut" }}
                    style={{
                      left: i < 6 ? `${i * 8 + 2}%` : `${(i - 6) * 8 + 55}%`,
                      top: (i % 3) * 15 + (i % 2 === 0 ? 5 : 10) + '%',
                      zIndex: 2
                    }}
                  >
                    <div className="frame-string" />
                    <motion.div
                      className="elegant-frame-small"
                      animate={{ rotate: [i % 2 === 0 ? -1.5 : 1.5, i % 2 === 0 ? 1.5 : -1.5, i % 2 === 0 ? -1.5 : 1.5] }}
                      transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, ease: "easeInOut" }}
                    >
                      <img src={photo} alt="" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Global Orbiting Hearts Animation on Home */}
            <div className="home-orbit-wrapper">
              <OrbitingHearts />
            </div>

            {/* Restored Love Ladder on Right Side */}
            <div className="love-ladder-container">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="ladder-step"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2 + i * 0.3 }}
                >
                  <Heart size={20 + i * 5} color="#ff4d6d" fill={i % 2 === 0 ? "#ff4d6d" : "none"} />
                  {i < 5 && <div className="ladder-line" />}
                </motion.div>
              ))}
            </div>

            <div className="opening-text">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                A story that began long ago... <br />
                and still shines today ✨
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="opening-subtext"
              >
                This is for Mom & Dad forever and always.
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenSurprise}
              className="btn-surprise"
              style={{ marginBottom: '80px' }} // Explicitly pushed upward
            >
              Click to Open a Little Surprise🥰
            </motion.button>
          </motion.div>
        )}

        {phase === 'gift_selection' && (
          <motion.div
            key="gift_selection"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              },
              exit: { opacity: 0, scale: 0.9 }
            }}
            className="gift-selection-view"
          >
            <h2 className="selection-title">Choose a Special Gift</h2>
            <OrbitingHearts />
            <div className="gift-cards-grid">
              {GIFT_DATA.map((gift) => (
                <motion.div
                  key={gift.id}
                  variants={{
                    hidden: { y: 50, opacity: 0, scale: 0.8 },
                    visible: { y: 0, opacity: 1, scale: 1 }
                  }}
                  className="gift-card-item"
                  whileHover={{ y: -15, scale: 1.05, boxShadow: "0 25px 50px rgba(255, 77, 109, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectGift(gift)}
                >
                  <span className="gift-card-icon">{gift.icon}</span>
                  <p className="gift-card-title">{gift.title}</p>
                  <div className="card-glow" />
                  <motion.div
                    className="card-shine"
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear', delay: Math.random() * 2 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Background Floating Icons for Decoration */}
            <div className="floating-icons-bg">
              {['✨', '💝', '🌸', '✨', '💖'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                  style={{
                    position: 'absolute',
                    top: `${10 + i * 20}%`,
                    left: i % 2 === 0 ? '5%' : '90%',
                    fontSize: '2rem',
                    opacity: 0.2
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              onClick={handleBackToIntro}
              className="btn-back-intro"
            >
              ← Back to Start
            </motion.button>
          </motion.div>
        )}

        {phase === 'gift_detail' && selectedGift && (
          <motion.div
            key="gift_detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="gift-detail-view"
          >
            <OrbitingHearts />
            {/* Desktop Side Hanging Photos */}
            {!isMobile && (
              <>
                <div className="side-hanging-photos left">
                  {selectedGift.revealType === 'memories'
                    ? PHOTO_ASSETS.slice(2, 7).map((photo, i) => (
                      <motion.div key={i} className="side-frame" variants={itemVariants}>
                        <div className="string" />
                        <img src={photo} alt="" />
                      </motion.div>
                    ))
                    : PHOTO_ASSETS.slice(0, 6).map((photo, i) => (
                      <motion.div key={i} className="side-frame" variants={itemVariants}>
                        <div className="string" />
                        <img src={photo} alt="" />
                      </motion.div>
                    ))
                  }
                </div>

                <div className="side-hanging-photos right">
                  {selectedGift.revealType === 'memories'
                    ? PHOTO_ASSETS.slice(7, 12).map((photo, i) => (
                      <motion.div key={i} className="side-frame" variants={itemVariants}>
                        <div className="string" />
                        <img src={photo} alt="" />
                      </motion.div>
                    ))
                    : PHOTO_ASSETS.slice(6, 12).map((photo, i) => (
                      <motion.div key={i} className="side-frame" variants={itemVariants}>
                        <div className="string" />
                        <img src={photo} alt="" />
                      </motion.div>
                    ))
                  }
                </div>
              </>
            )}

            {/* Mobile Top & Bottom Hanging Photos */}
            {isMobile && (
              <>
                <div className="mobile-hanging-row top">
                  {PHOTO_ASSETS.slice(0, 6).map((photo, i) => (
                    <motion.div key={i} className="mobile-frame" variants={itemVariants}>
                      <div className="mobile-string" />
                      <img src={photo} alt="" />
                    </motion.div>
                  ))}
                </div>
                <div className="mobile-hanging-row bottom">
                  {PHOTO_ASSETS.slice(6, 12).map((photo, i) => (
                    <motion.div key={i} className="mobile-frame" variants={itemVariants}>
                      <div className="mobile-string" />
                      <img src={photo} alt="" />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
            {selectedGift.revealType === 'letter' && (
              <div className="promise-reveal-box">
                <div className="symbol-container">
                  <motion.div
                    className="infinite-symbol"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  >
                    <div className="orbiting-heart h1" />
                    <div className="orbiting-heart h2" />
                  </motion.div>
                  <Stars className="promise-stars" color="#ffd700" />
                </div>
                <div className="promise-text-container">
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    A Heartfelt Letter
                  </motion.h2>
                  <div className="letter-text-content">
                    {selectedGift.message.split('\n\n').map((para, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.5, duration: 1 }}
                      >
                        {para}
                      </motion.p>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                  >
                    <Heart size={30} fill="#ff4d6d" color="#ff4d6d" />
                  </motion.div>
                </div>
              </div>
            )}

            {selectedGift.revealType === 'memories' && (
              <div className="memories-reveal-box">
                <div className="memories-scroll-container">
                  <div className="memories-gallery dual-feature">
                    {/* Two Large Featured Photos in Middle */}
                    <div className="dual-featured-container">
                      <motion.div
                        className="featured-memory large"
                        initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
                        animate={{ scale: 1, opacity: 1, rotate: -2 }}
                        transition={{ duration: 0.8 }}
                      >
                        <img src={PHOTO_ASSETS[0]} alt="Memory 1" />
                      </motion.div>
                      <motion.div
                        className="featured-memory large"
                        initial={{ scale: 0.8, opacity: 0, rotate: 3 }}
                        animate={{ scale: 1, opacity: 1, rotate: 2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <img src={PHOTO_ASSETS[1]} alt="Memory 2" />
                      </motion.div>
                    </div>

                    <motion.div
                      className="memories-intro-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p>{selectedGift.message}</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {selectedGift.revealType === 'promise' && (
              <div className="promise-reveal-box">
                <div className="symbol-container">
                  <motion.div
                    className="infinite-symbol"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  >
                    <div className="orbiting-heart h1" />
                    <div className="orbiting-heart h2" />
                  </motion.div>
                  <Stars className="promise-stars" color="#ffd700" />
                </div>
                <div className="promise-text-container">
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    A Promise
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    {selectedGift.message}
                  </motion.p>
                </div>
              </div>
            )}

            {/* Global Back Button for all details */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleBackToGifts}
              className="btn-back"
            >
              Back to Gifts
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
