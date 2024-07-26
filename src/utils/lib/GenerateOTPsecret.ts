import speakeasy from 'speakeasy'

export const generateOTPSecret = () => {
    try {
        return  Math.floor(100000 + Math.random() * 900000).toString()
        // do later kasi hinde ko mafix yung error
        // const secret = speakeasy.generateSecret();
        // const secretBase32 = secret.base32;
        
        // return secretBase32
    } catch (error) {
        console.log(error)
    }
}