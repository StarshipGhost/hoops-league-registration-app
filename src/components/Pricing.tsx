import CheckIcon from './icons/CheckIcon'
import DollarSignIcon from './icons/DollarSignIcon'
import CardIcon from './icons/CardIcon'

const PricingHeader = () => {
  return (
    <div className="section-header">
      <div className="icon-container green-tag">
        <DollarSignIcon />
      </div>
      <h1 className='header-title'>Pricing & Payment</h1>
      <p className="text" id="text-center">
        The price include court rental and equipements.
      </p>
    </div>
  )
}

const PricingCard = ({scrollFunction} : {scrollFunction : (index: number) => void}) => {
  return (
    <div className="pricing-card">
      <h2 id='light-mode-black'>Single Game</h2>
      <div className="game-price-container">
        <h1 className="price" id='light-mode-black'>$15</h1>
        <span className='text'>per game</span>
      </div>
      <p className="text" id="text-center">
        Perfect for trying out our games
      </p>
      <div className="benefits-container">
        <div className="check-icon-container">
          <CheckIcon />
          <span className="benefit-item">Access to one game session</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span className="benefit-item">More than 2 hours of play time</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span className="benefit-item">All equipment provided</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span className="benefit-item">Drinks included</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span className="benefit-item">Beginner friendly</span>
        </div>
      </div>
      <button onClick={() => scrollFunction(4)}className="button" id="pricing-button">
        Get Started
      </button>
    </div>
  )
}

const PaymentMethod = () => {
  return (
    <div className="payment-method-container">
      <div className="payment-method-header">
        <CardIcon />
        <h2 id='light-mode-black'>Accepted Payment Methods</h2>
      </div>
      <div className="check-icon-container">
        <CheckIcon />
        <span id='light-mode-black'>Cash (at venue)</span>
      </div>
      <div className="payment-method-note">
        <b id='light-mode-black'>Note: </b>
        <span className="text">
          If there are no spots left and you have a reserved spot (as a confirmed player), any no-show or cancellation within 2 hours of the games will count as
          a presence.
        </span>
      </div>
    </div>
  )
}

const Pricing = ({scrollFunction} : {scrollFunction : (index: number) => void}) => {
  return (
    <div className="section-container" id="even-section">
      <PricingHeader />
      <PricingCard scrollFunction={scrollFunction}/>
      <PaymentMethod />
    </div>
  )
}

export default Pricing;
