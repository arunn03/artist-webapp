import "../styles/Pricing.css";

const Pricing = () => {
  return (
    <div className="background">
      <div className="container pricing-container">
        <div className="panel pricing-table">
          <div className="pricing-plan">
            {/* <img
              src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png"
              alt=""
              className="pricing-img"
              width={100}
            /> */}
            <h2 className="pricing-header">Basic</h2>
            <ul className="pricing-features">
              <li className="pricing-features-item">
                Can contact at most 1 profile
              </li>
              <li className="pricing-features-item">24x7 Support</li>
            </ul>
            <span className="pricing-price">₹499</span>
            <span className="pricing-per">/day</span>
            <a href="#" className="pricing-button">
              Buy Now
            </a>
          </div>

          <div className="pricing-plan">
            {/* <img
              src="https://s28.postimg.cc/ju5bnc3x9/plane.png"
              alt=""
              className="pricing-img"
              width={100}
            /> */}
            <h2 className="pricing-header">Gold</h2>
            <ul className="pricing-features">
              <li className="pricing-features-item">
                Can contact upto 3 profiles
              </li>
              <li className="pricing-features-item">24x7 Support</li>
            </ul>
            <span className="pricing-price">₹999</span>
            <span className="pricing-per">/15 days</span>
            <a href="#" className="pricing-button is-featured">
              Buy Now
            </a>
          </div>

          <div className="pricing-plan">
            {/* <img
              src="https://s21.postimg.cc/tpm0cge4n/space-ship.png"
              alt=""
              className="pricing-img"
              width={100}
            /> */}
            <h2 className="pricing-header">Diamond</h2>
            <ul className="pricing-features">
              <li className="pricing-features-item">
                Can contact upto 5 profiles
              </li>
              <li className="pricing-features-item">24x7 Support</li>
            </ul>
            <span className="pricing-price">₹1499</span>
            <span className="pricing-per">/15 days</span>
            <a href="#" className="pricing-button">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
