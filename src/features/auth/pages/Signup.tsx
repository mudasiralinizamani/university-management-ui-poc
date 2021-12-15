import { Link } from "react-router-dom";

function Signup() {
  return (
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
      />
      <div className="out">
        <div className="page">
          <div className="header js-header header_empty">
            <div className="header__bg js-header-bg"></div>
          </div>
          <div className="page__wrapper">
            <div className="entry">
              <div className="entry__wrap">
                <h1 className="entry__title">Sign Up As</h1>

                <div className="row mt-5">
                  <div className="col-sm-6 text-center my-2">
                    <div className="register-box">
                      <Link to="/auth/itadministrator">
                        <i className="fas fa-user-shield"></i>
                        <h4>It Administrator</h4>
                      </Link>
                    </div>
                  </div>

                  <div className="entry__bottom">
                    <Link className="entry__link" to="/">
                      Already have an account? Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
