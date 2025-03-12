import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-2 mb-md-0">
            <h5 className="text-info">3DMart</h5>
            <p className="mb-0">
              Your premier destination for 3D models and assets.
            </p>
          </div>

          <div className="col-md-6 text-md-end d-flex flex-column justify-content-center">
            <p className="mb-0">© {currentYear} 3DMart. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
