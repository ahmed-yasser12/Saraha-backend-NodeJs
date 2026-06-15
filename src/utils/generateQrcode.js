import QRCode from "qrcode";

export const qrcodeGenerated = ({ data = '' } = {}) => {
    const qrcode = QRCode.toDataURL(JSON.stringify(data), { errorCorrectionLevel: "H" },
        function (err, url) {
            console.log(url)
        })

    return qrcode
}