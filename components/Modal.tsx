import React, { useRef } from 'react';
import stylesModal from '../styles/Module.module.css';


const Modal = ({ open, onClose, children}:{open :boolean,onClose: () => void, children:React.ReactNode})=> {
  const dialogRef = useRef<HTMLDialogElement | null >(null);

  React.useEffect(() => {
    if(open && dialogRef.current){
    
      dialogRef.current.showModal();

    } else if (dialogRef.current){
      dialogRef.current.close();
    }
  }, [ open] );

  return (
    <dialog ref = { dialogRef}
    className={stylesModal.dialog}>
<div className={ stylesModal.dialogContent}>
  <button className={ stylesModal.closeButton}
  onClick= { onClose }> &times; </button>
  {children}
</div>
    </dialog>
  );
};

export default Modal;