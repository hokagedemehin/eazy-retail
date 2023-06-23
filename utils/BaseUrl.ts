export default function BaseUrl() {
  if(process.env.NODE_ENV === 'production') {
    return 'https://easyretail.ng/api'
  } else {
    return 'https://easyretail.ng/api'
  }
}


//https://c661-92-18-85-54.ngrok-free.app