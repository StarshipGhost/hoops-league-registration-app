import CheckIcon from './icons/CheckIcon'
import DollarSignIcon from './icons/DollarSignIcon'
import CardIcon from './icons/CardIcon'

const PricingHeader = () => {
  return (
    <div className="section-header">
      <div className="icon-container" id="green-tag">
        <DollarSignIcon />
      </div>
      <h1 style={{whiteSpace: 'nowrap'}}>Pricing & Payment</h1>
      <p className="text" id="text-center">
        The price include court rental and equipements
      </p>
    </div>
  )
}

const PricingCard = () => {
  return (
    <div className="pricing-card">
      <h2>Single Game</h2>
      <div className="game-price-container">
        <h1 className="price">$15</h1>
        <span id="text">per game</span>
      </div>
      <p className="text" id="text-center">
        Perfect for trying out our games
      </p>
      <div className="benefits-container">
        <div className="check-icon-container">
          <CheckIcon />
          <span className="benefit-text">Access to one game session</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span>More than 2 hours of play time</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span>All equipement provided</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span>Drinks included</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span>Beginner friendly</span>
        </div>
      </div>
      <button className="button" id="pricing-button">
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
        <h2>Accepted Payment Methods</h2>
      </div>
      <div className="check-icon-container">
        <CheckIcon />
        <span>Cash (at venue)</span>
      </div>
      <div className="payment-method-note">
        <b>Note: </b>
        <span className="text">
          If there are no spots left and you have a reserved spot (as a confirmed player), any no-show or cancellation within 2 hours of the games will count as
          a presence.
        </span>
      </div>
    </div>
  )
}

const Pricing = () => {
  return (
    <div className="section-container" id="even-section">
      <PricingHeader />
      <PricingCard />
      <PaymentMethod />
    </div>
  )
}

export default Pricing;
