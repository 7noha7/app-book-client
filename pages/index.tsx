
import Head from "next/head";
import  boxStyles from "../components/layout.module.css";
import utilStyle from "../styles/utils.module.css";
import React, {useState} from 'react'; 
import ModalLogin from "../components/ModalLogin";
import ModalSignUp from '../components/ModalSignUp';



export default function Home() {
  const [ isModalLgnOpen, setIsModalLgnOpen] = useState(false);
  const handleOpenModalLgn = () => {
    setIsModalLgnOpen(true);
  };
  const handleCloseModalLgn = () => {
    setIsModalLgnOpen(false);
  };

  const [ isModalNewOpen, setIsModalNewOpen] = useState(false);
  const handleOpenModalNew = () => {
    setIsModalNewOpen(true);
  };
  const handleCloseModalNew = () => {
    setIsModalNewOpen(false);
  };

  return  (
<div>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>B ♡×♡ K　LIST</title>
      </Head>
    <section>
      
      <p className={utilStyle.headingMessage}>本のリストやグッズの記録など、自由に使ってください。</p>
    </section>
    <a href="/" className={utilStyle.caution}>※ 著作権など二次創作を扱うことについての注意事項 ※</a>
<div className={boxStyles.btnPosition}>


<button onClick ={handleOpenModalLgn} className={boxStyles.topBtn}>ログイン</button>
<ModalLogin open ={isModalLgnOpen}
onClose= {handleCloseModalLgn} />
  
<button onClick ={handleOpenModalNew} className={boxStyles.topBtn}>新規登録</button>
<ModalSignUp open ={isModalNewOpen}
onClose= {handleCloseModalNew} />
  
</div>
    </div>
  
  );
}
