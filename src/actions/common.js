import Swal from 'sweetalert2';
export const API_PATHS = process.env.REACT_APP_API_PATHS;
export const SERVER_PATHS = process.env.REACT_APP_SERVER_PATHS;
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const MAIN_TOKEN ='';
export const PICS = process.env.REACT_APP_PHOTO;
export const imgx = process.env.REACT_APP_PHOTO;
export const imgb = process.env.REACT_APP_BG;
export const axiosConfig = {
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
    }
  };
export const axiosConfig1 = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
  };
export const callError = (err) =>{
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: err,
    showConfirmButton: false,
    timer: 1500
  })
}
  export const checkImage = imageSrc =>{
      var img = new Image();
      try{
        img.src = imageSrc;
        return true;
      }catch(err){
        return false;
      }

  }
  export const timeConvert = date =>{
    return ''

}