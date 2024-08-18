import Head from "next/head";
import React, {useEffect, useState} from "react"; 
import ModalAddBook from '../../components/ModalAddBook';
import Link from "next/link";
import boxStyles from "../../components/layout.module.css";
import utilStyle from "../../styles/utils.module.css";

import Book from "@/components/Book";
import { BookList } from "@/src/types";
import apiClient from "@/src/lib/apiClient";
// import { useRouter } from "next/router";
import { useAuth } from "@/src/context/userAuth";


export default function LibraryList() {
  
  const {user, logout} =useAuth();

  const [ isModalSetOpen, setIsModalSetOpen] = useState(false);
  const [myLibrary, setMyLibrary] = useState<BookList[]>([]);
  const [editingBook, setEditingBook] = useState<BookList | null>(null);

  const handleOpenModalSet = () => {
    setIsModalSetOpen(true);
  };
  const handleCloseModalSet = () => {
    setIsModalSetOpen(false);
    setEditingBook(null);
  };

  const handleBookAdded = (newBook: BookList) => {

    if(editingBook){
      setMyLibrary((prevLibrary)=>
        prevLibrary.map((book)=>
        book.id === newBook.id ? newBook :book )
    );
    }else {

    setMyLibrary((prevLibrary) => [newBook, ...prevLibrary]); // 新しい本をリストに追加
    }
  };

const handleBookDelete = (id: number) => {
  setMyLibrary(prevLibrary => prevLibrary.filter(book => book.id !== id ));
}

const handleBookEdit = (book: BookList) => {
  setEditingBook(book);
  setIsModalSetOpen(true);
};


 
  
  useEffect(() =>{

      const fetchBooks = async() =>{
        try {
          const response = await apiClient.get(`/library/myBook`);
  console.log(response.data);
          setMyLibrary(response.data.books || []);
  
        } catch(err) {
          console.error("本の取得に失敗しました。",err);
      alert("本の取得に失敗しました");
        }

    };
if(user){
  fetchBooks();

}
  },[user]);
    
  return (
<>
<Head>
      <link rel="icon" href="/favicon.ico" />
      <title>B ♡×♡ K　LIST</title>
      </Head>
      {myLibrary.length >0 && myLibrary[0]?.user?.username && (    
<h3 className={utilStyle.topH2}>
  {myLibrary[0].user.username}　の　リスト</h3>
)}
<div className={boxStyles.btnPosition}>
    <button onClick= {handleOpenModalSet} className={boxStyles.topBtn}>リストを追加</button>
      <ModalAddBook 
      open ={isModalSetOpen} 
      onClose= {handleCloseModalSet} 
      onBookSaved= {handleBookAdded} 
      editMode={!!editingBook} 
      initialData={editingBook || undefined}/>
       
<Link href="/"><button className={boxStyles.topBtn} onClick ={logout}>ログアウト</button></Link>
</div>

{Array.isArray(myLibrary) && myLibrary.map((book: BookList) => (
<Book key={book.id} book= {book} onDelete={handleBookDelete} onEdit= {handleBookEdit}/>

))}


      </>
 )
};