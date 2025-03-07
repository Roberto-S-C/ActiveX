function validateFile({ model, setModel, setValidModel, setShowAlert, setAlertDetails }) {

    let file = model[0]
    if (!file) {
        setValidModel(false)
        setAlertDetails({ status: 'error', message: 'Select a file', duration: 3000 })
        setShowAlert(true)
        return
    }

    const isValidExtension = file.name.toLowerCase().endsWith('.glb');
    if (!isValidExtension) {
        setValidModel(false)
        setAlertDetails({ status: 'error', message: 'Select a .glb file', duration: 3000 })
        setShowAlert(true)
        return
    }

    if (file.length === 0) {
        setValidModel(false)
        setAlertDetails({ status: 'error', message: 'Invalid file', duration: 3000 })
        setShowAlert(true)
        return
    }

    const isValidSize = file.size <= 20971520 // 20MB limit

    if (!isValidSize) {
        setValidModel(false)
        setAlertDetails({ status: 'error', message: 'File can not exceed 20 MB', duration: 3000 })
        setShowAlert(true)
        return
    }

    setValidModel(true)
    setModel(file)
}

export default validateFile