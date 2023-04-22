import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './previewAttachment.css'


const PreviewAttachment = ({ files, removeFile, toggleModal }) => {


    return (
        <div className="container">
            <div className='main-container'>
                <h5 className="text-center">Preview The Selected Files</h5>
            </div>
            <div className="row justify-content-center">
                {
                    files.map((file, index) => {
                        return (
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 mt-3" key={index}>
                                <div className="card themeBackground">
                                    <div className="card-header">
                                        <span>
                                            {file.name}
                                        </span>
                                        <span>
                                            <Link to='#' onClick={() => { removeFile(index) }} >
                                                <i className="fas fa-times"></i>
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>

            <div className="row justify-content-center mt-5">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 mt-3">

                    <button type="button" className="btn themebtn modalbtn" onClick={toggleModal}>
                        <span>
                            Select Language and Convert
                        </span>
                        <span>
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </span>
                    </button>

                </div>
            </div>
        </div>
    )
}


export default PreviewAttachment