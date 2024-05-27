import axios from "axios";
import { APPROVAL_BANK_URL } from "../lib/config";

async function loginApi(userId: string) {
const data = JSON.stringify({
  "number": userId
});

const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `${APPROVAL_BANK_URL}/login`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data
};

axios.request(config)
.then((response) => {
  const {redirectURL} = response.data
  if (redirectURL){
    window.location.href=redirectURL;
  }
})
.catch((error) => {
  console.log(error);
});

}

export default loginApi;
