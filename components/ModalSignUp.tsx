import apiClient from "@/src/lib/apiClient";
import { useRouter } from "next/router";
import React, {useState} from 'react'; 
import Modal from './Modal';

type ModalSignUpProps = {
  open: boolean;
  onClose: ()=> void;
};



const ModalSignUp:React.FC<ModalSignUpProps> =
  ({open, onClose}) => {
    const [username, setUsername] = useState<string>(""); 
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router =useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        await apiClient.post("/login/register",{
        username,
         email,
         password,
       });

       
       router.push("/");
       
       } catch(err) {
         alert("入力内容が正しくありません。");
       
       };
      }
  
  return (

    <Modal open ={open}
onClose= {onClose}>
<form onSubmit={handleSubmit}>
    <div>
      <p>新規登録画面</p>
      <div>
      <label htmlFor="name">名前：</label>
      <input 
      type ="text" 
      id="name" 
      name="name" 
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
      </div>
      <div>
      <label htmlFor="email">Mail：</label>
      <input 
      type ="email" 
      id="email" 
      name="email" 
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
      </div>
      <div>
      <label htmlFor="password">パスワード：</label>
<input 
type="password" 
id="password" 
name="password" 
onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
</div>
{/* <Link href= "./lists/library"> */}
<button>新規登録する</button> 
{/* </Link> */}
    </div>
  </form>
  </Modal>

  )}


export default ModalSignUp;