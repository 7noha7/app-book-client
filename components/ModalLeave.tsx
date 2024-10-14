import apiClient from "@/src/lib/apiClient";
import { useRouter } from "next/router";
import React, {useState} from 'react'; 
import Modal from './Modal';
import { useAuth } from "@/src/context/userAuth";

type ModalLeaveProps = {
  open: boolean;
  onClose: ()=> void;
  onConfirm: ()=> void;
};

const ModalLeave :React.FC<ModalLeaveProps> =({open, onClose,onConfirm}) =>{
return (
  <Modal open={open} onClose ={onClose}>
<div>
  <h2>退会の確認</h2>
      <p>本当に退会しますか？</p>
      <p>この操作は取り消せません。全てのデータが削除されます。</p>
      <div>
<button onClick ={onConfirm}>はい、退会します。</button>
<button onClick ={onClose}>考え直します。</button>
      </div>
</div>



  </Modal>
);


};

export default ModalLeave;