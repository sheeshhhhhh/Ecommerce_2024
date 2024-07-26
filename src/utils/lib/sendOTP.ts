
import nodemailer from 'nodemailer'

const sendOTP = async (email: string, otpCode: string) => {
  try {

    if(!otpCode || !email) return false

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'santosblogapp@gmail.com',
            pass: 'ymbb otnn gxda xbik'
        }
    })

    let mailOptions = {
        from: 'santosblogapp@gmail.com',
        to: email,
        subject: 'OTP Ecommerce Login',
        html: 
            `
                <h2>This OTP code will be use for your login</h2>
                <p>${otpCode}</p>
            `
    }

    await transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log('error in the sendmeail', err)
            return false // false mean error
        } else {
            console.log()
            return `Email sent ${info.response}`
        }
    })
    
  } catch (error) {
    console.log(error)
    return false
  }
}

export default sendOTP