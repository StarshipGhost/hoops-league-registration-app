import { BasketballLogo } from "../App"

const FooterSummary = () => {
  return (
    <div className="footer-summary-container">
      <BasketballLogo />
      <p className="text" id="footer-text">
        Bringing basketball enthusiast together for competitive and fun games every week
      </p>
    </div>
  )
}

const FooterLinks = () => {
  return (
    <div className="footer-col" id="footer-links">
      <div style={{fontWeight: '500'}}>Quick Links</div>
      <div className="navigation-link text">Schedule</div>
      <div className="navigation-link text">Rules</div>
      <div className="navigation-link text">Pricing</div>
      <div className="navigation-link text">Register</div>
    </div>
  )
}

const FooterContact = () => {
  return (
    <div className="footer-col" id="footer-contact">
      <div style={{fontWeight: '500'}}>Contact</div>
      <div className="text">Email: info@hoopsleague.com</div>
      <div className="text">Phone: (438)-xxx-xxxx</div>
      <div className="text">Hours: Mon-Sun, 6AM-10PM</div>
    </div>
  )
}

const FooterSocials = () => {
  return (
    <div className="footer-col" id="footer-socials">
      <div style={{fontWeight: '500'}}>Follow Us</div>
      <div className="navigation-link text">Facebook</div>
      <div className="navigation-link text">Instagram</div>
      <div className="navigation-link text">Twitter</div>
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