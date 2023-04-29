import { useState } from 'react';
import { useSnackbar } from 'notistack'
import axios from 'axios';
import './languageModal.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { $ } from 'react-jquery-plugin'


const topProgrammingLanguages = {
    "javascript": ".js",
    "html": ".html",
    "css": ".css",
    "python": ".py",
    "java": ".java",
    "c++": ".cpp",
    "c#": ".cs",
    "typescript": ".ts",
    "go": ".go",
    "ruby": ".rb",
    "swift": ".swift",
    "kotlin": ".kt",
    "rust": ".rs",
    "php": ".php",
    "shell scripting (e.g. bash)": ".sh",
    "sql": ".sql",
};



const LanguageModel = ({ files }) => {

    const [language, setLanguage] = useState(null)
    const [other, setOther] = useState(null)
    const [extension, setExtension] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const history = useHistory()

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
        // // Create a FormData object to store the selected files



        let formData = new FormData();
        for (let file of files) {
            formData.append("files", file);
        }
        formData.append('language', language);
        formData.append('extension', topProgrammingLanguages[language.toLowerCase()]);

        try {

            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND}/file/fileconvert`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            // const responseData = await response.json()
            console.log(response)

            if (response.status === 200) {
                $('#languageModal').modal('hide')

                history.push(`/download/${language}`)
            }
            setFormSubmitted(false)


        } catch (err) {
            showSnackBar(err.message, 'error')
            setFormSubmitted(false)
        }

        setFormSubmitted(false)


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