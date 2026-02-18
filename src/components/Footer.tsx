import { BasketballLogo } from "../App"
import { useHeaderContext } from "./customs/HeaderContext"

const FooterSummary = () => {
  return (
    <div className="footer-summary-container">
      <BasketballLogo />
      <p className="text" id="footer-text">
        Bringing basketball enthusiasts together for competitive and fun games every week.
      </p>
    </div>
  )
}

const FooterLinks = () => {
  const { scrollFunction } = useHeaderContext();
  return (
    <div className="footer-col">
      <div className="footer-col-header">Quick Links</div>
      <div onClick={() => scrollFunction(1)} className="text footer-link"><a>Schedule</a></div>
      <div onClick={() => scrollFunction(2)} className="text footer-link"><a>Registered Players</a></div>
      <div onClick={() => scrollFunction(3)} className="text footer-link"><a>Rules</a></div>
      <div onClick={() => scrollFunction(4)} className="text footer-link"><a>Pricing</a></div>
      <div onClick={() => scrollFunction(5)} className="text footer-link"><a>Register</a></div>
    </div>
  )
}

const FooterContact = () => {
  return (
    <div className="footer-col">
      <div className="footer-col-header">Contact</div>
      <div className="text">Email: info@hoopsleague.com</div>
      <div className="text">Phone: (438)-xxx-xxxx</div>
      <div className="text">Hours: Mon-Sun, 6AM-10PM</div>
    </div>
  )
}

const FooterSocials = () => {
  return (
    <div className="footer-col">
      <div className="footer-col-header">Follow Us</div>
      <div className="text footer-link"><a>Facebook</a></div>
      <div className="text footer-link"><a>Instagram</a></div>
      <div className="text footer-link"><a>Twitter</a></div>
    </div>
  )
}

const FooterInformation = () => {
  return (
    <div className="footer-grid">
      <FooterLinks />
      <FooterContact />
      <FooterSocials />
    </div>
  )
}

const Footer = () => {
  return (
    <div className="footer">
      <FooterSummary />
      <FooterInformation />
    </div>
  )
}

export default Footer