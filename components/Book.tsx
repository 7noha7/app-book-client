import React, { useState } from "react";
import listLayout from "../styles/libraryList.module.css";
import boxStyles from "../components/layout.module.css";
import utilStyle from "../styles/utils.module.css";
import { BookList } from "@/src/types";
import apiClient from "@/src/lib/apiClient";

type Props = {
  book: BookList;
  onDelete: (id: number) => void;
  onEdit: (book: BookList) => void;
};



const Book: React.FC<Props>= ( { book, onDelete, onEdit } ) =>{
  const handleDelete = async()=>{
    try {
      await apiClient.delete(`/library/book/${book.id}`);
      onDelete(book.id);
    } catch(error) {
      console.error("削除エラー：",error);
      alert("書籍の削除に失敗しました")
    }
  }
  

return (

  <div className={listLayout.grid}>
      <article>
        <div className={boxStyles.box6}>
          <div className={boxStyles.box6Title}>
            <p>タイトル  {book.booktitle} /  <small>作者名: {book.bookauthor} / ジャンル:{book.genru}</small></p>
          </div>
              <p className={utilStyle.boxFontSmall}>{book.content}</p>
<div className={boxStyles.buttonSet}>
<button className={boxStyles.buttonDelete } onClick={handleDelete} >削除</button>
<button className={boxStyles.buttonEdit} onClick={() => onEdit(book)}>編集</button>
</div>
        </div>
      </article>
      
      </div>

)};

export default Book;