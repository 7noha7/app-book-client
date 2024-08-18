export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  books: BookList[];
}


export interface BookList {
  id: number;
  booktitle: string;
  bookauthor: string;
  genru: number;
  content: string;
  createdAt:string;
  userId: number;
  user: UserType;

}