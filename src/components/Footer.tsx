import { BasketballLogo } from "../App"

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

const FooterLinks = ({scrollFunction} : {scrollFunction : (index: number) => void}) => {
  return (
    <div className="footer-col" id="footer-links">
      <div style={{fontWeight: '500'}}>Quick Links</div>
      <div onClick={() => scrollFunction(1)} className="navigation-link text">Schedule</div>
      <div onClick={() => scrollFunction(2)} className="navigation-link text">Rules</div>
      <div onClick={() => scrollFunction(3)} className="navigation-link text">Pricing</div>
      <div onClick={() => scrollFunction(4)} className="navigation-link text">Register</div>
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

const FooterInformation = ({scrollFunction} : {scrollFunction : (index: number) => void}) => {
  return (
    <div className="footer-grid">
      <FooterLinks scrollFunction={scrollFunction}/>
      <FooterContact />
      <FooterSocials />
    </div>
  )
}

const Footer = ({scrollFunction} : {scrollFunction : (index: number) => void}) => {
  return (
    <div className="footer">
      <FooterSummary />
      <FooterInformation scrollFunction={scrollFunction}/>
    </div>
  )
}

export default Footer