import { useState } from 'react';
import { useSnackbar } from 'notistack'
import axios from 'axios';
import './languageModal.css'

const topProgrammingLanguages = {
    "JavaScript": ".js",
    "HTML": ".html",
    "CSS": ".css",
    "Python": ".py",
    "Java": ".java",
    "C++": ".cpp",
    "C#": ".cs",
    "TypeScript": ".ts",
    "Go": ".go",
    "Ruby": ".rb",
    "Swift": ".swift",
    "Kotlin": ".kt",
    "Rust": ".rs",
    "PHP": ".php",
    "Shell Scripting (e.g. Bash)": ".sh",
    "SQL": ".sql",
};



const LanguageModel = ({ files }) => {

    const [language, setLanguage] = useState(null)
    const [other, setOther] = useState(null)
    const [formSubmitted, setFormSubmitted] = useState(false)

    const { enqueueSnackbar } = useSnackbar()


    const handleChangeSelect = (event) => {
        const value = event.target.value

        setLanguage(value.toLowerCase())
        if (value === 'other') {
            setOther('')
        } else {
            setOther(null)
        }
    }


    /**
     * Displays the snackbar
     * @param {string} msg - the message to be displayed
     * @param {string} variant - sets the color of the snackbar
     */


    const showSnackBar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'

        })
    }

    const handleOther = (event) => {
        setOther(event.target.value)
    }

    const validateData = (language, other) => {
        let error = false
        let msg = '';
        if (language === null || language.trim().length < 2) {
            error = true
            msg = 'Please select a language to start the process'
        } else if (language === 'other' && (other === null || other.trim().length < 2)) {
            error = true
            msg = 'Please provide a language name to start the process'
        } else {
            error = false
        }

        if (error) {
            showSnackBar(msg, 'error')
        }

        return error
    }

    const submitData = async (event) => {
        event.preventDefault()
        const hasErrors = validateData(language, other)
        if (hasErrors) {
            return;
        }
        setFormSubmitted(true)
        if (language === 'other') {
            setLanguage(other)
        }

        const formData = new FormData()
        for (const i of Object.keys(files)) {
            formData.append("files", files[i]);
        }
        formData.append("conver", language)

        const options = {
            url: `${process.env.REACT_APP_BACKEND}/file/fileconvert`,
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'application/json'
            },
            body: formData

        }

        let response;

        try {

            await fetch(options)
                .then(async response => {
                    console.log(await response.blob())
                })
                .then(blob => {
                    // Create a download link
                    const url = window.URL.createObjectURL(blob);
                    console.log(url)
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.txt'); // Replace with the actual file name
                    document.body.appendChild(link);
                    link.click();

                    // Clean up
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => console.error('Error downloading file:', error));

            // response.then((data) => {
            //     console.log(data)
            //     setFormSubmitted(false)
            // }).catch((err) => {
            //     console.log('error')
            //     console.log(err)
            // })
            setFormSubmitted(false)
        } catch (err) {
            showSnackBar(err.message, 'error')
            setFormSubmitted(false)

        }


    }

    return (
        <div>
            <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="languageModal" tabIndex="-1" aria-labelledby="languageModal" aria-hidden="true">
                <div className="modal-dialog  modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="languageModal">
                                Select Language
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='form-group mt-3'>
                                    <label> Convert to:</label>

                                    <select className='form-control' onChange={handleChangeSelect}>
                                        <option defaultValue={null} hidden>
                                            Convert To
                                        </option>
                                        {
                                            Object.keys(topProgrammingLanguages).map((language) => {
                                                return <option value={language} key={language}>
                                                    {
                                                        language + ' (' + topProgrammingLanguages[language] + ')'
                                                    }
                                                </option>
                                            })
                                        }
                                        <option value={'other'}>
                                            Other
                                        </option>
                                    </select>
                                </div>

                                {
                                    other !== null &&

                                    <div className="form-group mt-3">
                                        <label> Enter another language :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter language"
                                            onChange={handleOther}
                                            value={other}
                                        />
                                    </div>
                                }

                                <div className='form-group mt-3'>
                                    <button
                                        className='btn themebtn convertBtn'
                                        onClick={submitData}
                                        disabled={formSubmitted}
                                    >
                                        <span>
                                            {
                                                !formSubmitted && 'Start File Conversion'
                                            }

                                            {
                                                formSubmitted &&
                                                'File Conversion in progress'
                                            }
                                        </span>
                                        <span>
                                            <i
                                                className={`
                                            ${formSubmitted && `always_animate`}
                                            fa-sharp fa-solid fa-gear
                                            `}>

                                            </i>
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default LanguageModel