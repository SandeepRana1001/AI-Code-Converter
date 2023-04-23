import { useState } from 'react'
import './codeAttachment.css'
import { useSnackbar } from 'notistack'
import PreviewAttachment from '../previewAttachment/previewAttachment'
import LanguageModel from '../languageModal/languageModal'
import { $ } from 'react-jquery-plugin'

const CodeAttachment = () => {

    const [files, setFiles] = useState([])
    const [modal, setModal] = useState(false)

    const { enqueueSnackbar } = useSnackbar()

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

    const fileHander = (event) => {
        let num = 0
        const files = event.target.files
        const requestFiles = []

        for (let file of Object.keys(files)) {
            if (num >= 5) {
                showSnackBar('You can upload only 5 files at a time', 'error')
                break;
            }
            const type = files[file].type.split('/')[0]

            if (type.toLowerCase() !== 'text') {
                showSnackBar(`Ignoring ${files[file].name}  due to invalid File Format`, 'error')
            } else {
                num = num + 1
                requestFiles.push(files[file])
            }
        }

        setFiles([...requestFiles])
    }

    const removeFile = (index) => {
        const file = files.splice(index, 1)
        console.log(file)
        setFiles([...files])

        showSnackBar(`Removing ${file[0].name} from queue `, 'error')

    }

    const toggleModal = () => {
        console.log('Go')
        setModal(!modal)
        $('#languageModal').modal('show')
    }


    return (
        <section>
            {
                files.length === 0 &&
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12">
                            <div  >
                                <label htmlFor="file" className="file-dropper-container">
                                    Add Your File(s) here - (Max Limit: 5)
                                </label>
                                {files.length === 0 &&
                                    <input type="file" id="file" hidden
                                        multiple
                                        accept="text/*"
                                        onChange={fileHander}
                                    />
                                }

                                {files.length !== 0 &&
                                    <input type="file" id="file" hidden
                                        multiple
                                        accept="text/*"
                                        onChange={fileHander}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                files.length > 0 &&

                <PreviewAttachment
                    files={files}
                    removeFile={removeFile}
                    toggleModal={toggleModal}
                />
            }

            <LanguageModel
                files={files}

            />

        </section>
    )
}


export default CodeAttachment