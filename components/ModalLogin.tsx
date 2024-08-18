import apiClient from "@/src/lib/apiClient";
import { useRouter } from "next/router";
import React, {useState} from 'react'; 
import Modal from './Modal';
import { useAuth } from "@/src/context/userAuth";

type ModalLoginProps = {
  open: boolean;
  onClose: ()=> void;
};

const ModalLogin :React.FC<ModalLoginProps> =
  ({open, onClose}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router =useRouter();

    const {login} =useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

    
    
      try {
        const response =await apiClient.post("/login/login",{
         email,
         password,
       });
       const token = response.data.token;
      
       login(token);
       
       router.push("./lists/library/");
       
       } catch(err) {
         alert("入力内容が正しくありません。");
       
       };

  }
  
  return (

    <Modal open ={open}
onClose= {onClose}>
  <form onSubmit={handleSubmit}>
    <div>
      <p>Login画面</p>
      <div>
      <label htmlFor="email">EMAIL：</label>
      <input 
      type ="email" 
      id="email" 
      name="email" 
      value ={email}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      </div>
      <div>
      <label htmlFor="password">パスワード：</label>
<input type="password" id="password" name="password" 
value ={password}
onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
/>
</div>
<button type ="submit">ログイン</button> 
    </div>
  </form>
</Modal>


  )}



export default ModalLogin;