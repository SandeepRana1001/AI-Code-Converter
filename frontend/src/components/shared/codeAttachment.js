import './codeAttachment.css'

const CodeAttachment = () => {

    return (
        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12">
                        <div  >
                            <label htmlFor="file" className="file-dropper-container">
                                Add Your File(s) here
                            </label>
                            <input type="file" id="file" hidden />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default CodeAttachment