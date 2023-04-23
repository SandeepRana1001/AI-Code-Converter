import axios from 'axios';
import { useParams } from 'react-router-dom';

import './DownloadFile.css'
const DownloadFile = () => {

    const { language } = useParams()

    const downloadHandler = (event) => {
        event.preventDefault();
        axios.get(`${process.env.REACT_APP_BACKEND}/file/${language}`, {
            responseType: 'blob' // Set the response type to 'blob' to handle binary data
        }).then(response => {
            // Create a download link and trigger the download
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `${language}.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    }
    return (
        <div>
            <p>
                Your File(s) has been converted successfully
            </p>

            <button className="btn themebtn downloadFile"
                onClick={downloadHandler}
            >
                <span>
                    Download File(s)
                </span>
                <span>
                    <i className="fas fa-file-download"></i>
                </span>
            </button>
        </div>
    )
}


export default DownloadFile