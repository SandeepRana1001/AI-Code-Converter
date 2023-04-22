import { useEffect } from 'react'
import DownloadFile from '../components/shared/downloadfile/DownloadFile'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const Download = ({ isRedirected }) => {

    const history = useHistory()

    useEffect(() => {
        if (!isRedirected) {
            // history.push('/')
        }
    }, [])

    return (
        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <DownloadFile />

                    </div>

                </div>
            </div>
        </section>
    )
}


export default Download