import apiClient from "@/src/lib/apiClient";
import { useRouter } from "next/router";
import React, {useEffect, useState} from 'react'; 
import Modal from './Modal';
import { BookList } from "@/src/types";
import { useAuth } from "@/src/context/userAuth";

type ModalAddBookProps = {
  open: boolean;
  onClose: ()=> void;
  onBookSaved: (book: BookList) => void;
  editMode?: boolean;
  initialData?: BookList;
};



const ModalAddBook:React.FC<ModalAddBookProps> =
  ({open, onClose, onBookSaved,editMode = false, initialData}) => 
    {
    const [booktitle, setBookTitle] = useState<string>(""); 
    const [bookauthor, setBookAuthor] = useState<string>("");
    const [genru, setGenre] = useState(3);
    const [content, setContent] = useState<string>("");
    const {user} = useAuth();
    const router =useRouter();


useEffect(() => {
  if(initialData){
    setBookTitle(initialData.booktitle);
    setBookAuthor(initialData.bookauthor);
    setGenre(initialData.genru);
    setContent(initialData.content);
  }
},[initialData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        if(editMode && initialData){
          const response =  await apiClient.put(`/library/book/${initialData.id}`,{
            booktitle,
            bookauthor,
            genru,
            content,
        });
        onBookSaved(response.data.updateBook);
      }else{
           const response =  await apiClient.post("/library/book",{
            booktitle,
            bookauthor,
            genru,
            content,
            userId: user?.id,
          });

        onBookSaved(response.data.newBook);
        }
        onClose();
       
       } catch(err) {
        console.error("入力内容が正しくありません",err);
         alert("入力内容が正しくありません。");
       
       };
      }
  
  return (

    <Modal open ={open}
    onClose= {onClose}>
    <form onSubmit={handleSubmit}>
    <div>
        <p>{editMode ? "リストを編集する" : "リストを追加する"}</p>
        <div>
          <label htmlFor="booktitle">タイトル：</label>
          <input type ="text" id="booktitle" name="title" value={booktitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookTitle(e.target.value)}/>
        </div>
<div>
          <label htmlFor="bookauthor">作者：</label>
          <input type ="text" id="bookauthor" name="Author" value={bookauthor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookAuthor(e.target.value)}
          />
</div>
<div>

          <label>ジャンル：</label>
          <input type="radio" id="novel" name="type" value="1" checked={genru == 1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenre(parseInt(e.target.value))}/>
          <label htmlFor="novel">小説</label>
          <input type="radio" id="comic" name="type" value="2" checked={genru == 2}onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenre(parseInt(e.target.value))} />
          <label htmlFor="comic">漫画</label>
          <input type="radio" id="another" name="type" value="3"  checked={genru == 3} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenre(parseInt(e.target.value))}/>
          <label htmlFor="another">その他</label>
</div>
<div>

          <label htmlFor="note">自由欄</label><br/>
          <textarea id="note" name="note" value= {content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}></textarea>

</div>
          <button type="submit">{editMode ? "編集する":"登録する"}</button>
     </div>
  </form>
</Modal>


  )}


export default ModalAddBook;