const HeroIntro = () => {
  return (
    <div className="hero-intro-container">
      <div className="tag hero-orange-tag">
        <span> 🏀 </span>
        <span>Join the Community</span>
      </div>
      <div className="hero-title">
        <h1 className='header-title'>Play Basketball</h1>
        <h1 className="orange-header-title">Every Week</h1>
      </div>
      <p className="text" id="text-center">
        Join our organized basketball games for all skill levels. Meet new players, improve your game, and have fun on the court every week.
      </p>
    </div>
  )
}

const HeroButton = ({scrollFunction}: {scrollFunction: (index: number) => void}) => {
  return (
    <div className="hero-button-container">
      <button onClick={() => scrollFunction(4)} className="button hero-button" id="hero-register-button">
        Register Now
      </button>
      <button onClick={() => scrollFunction(1)} className="button hero-button" id="hero-schedule-button">
        View Schedule
      </button>
    </div>
  )
}

const HeroInformation = () => {
  return (
    <div className="hero-information">
      <div className="information-container">
        <span id="number">100+ </span>
        <span className="text">Active Players</span>
      </div>
      <div className="information-container">
        <span id="number">4 </span>
        <span className="text">Games/Week</span>
      </div>
      <div className="information-container">
        <span id="number">3 </span>
        <span className="text">Courts</span>
      </div>
    </div>
  )
}
const Hero = ({scrollFunction}: {scrollFunction: (index: number) => void}) => {
  return (
    <div className="hero-container">
      <HeroIntro />
      <HeroButton scrollFunction={scrollFunction} />
      <HeroInformation />
    </div>
  )
}

export default Hero
