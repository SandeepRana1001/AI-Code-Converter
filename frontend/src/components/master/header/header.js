import { Link } from "react-router-dom/cjs/react-router-dom.min"

import './header.css'

const Header = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg themeBackground">
                <div className="container-fluid">
                    <Link to='/' className='navbar-brand'>
                        <img src="/ai-code-converter.png"
                            height="40"
                            alt="Ai Code Converter"
                        />
                        <span>
                            Ai Code Converter
                        </span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li> */}

                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Header