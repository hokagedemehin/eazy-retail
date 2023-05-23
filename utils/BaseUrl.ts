export default function BaseUrl() {
  if(process.env.NODE_ENV === 'production') {
    return 'https://mymoolahapp.com'
  } else {
    return 'https://c661-92-18-85-54.ngrok-free.app'
  }
}
