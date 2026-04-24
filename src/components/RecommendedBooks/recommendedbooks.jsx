import { useEffect, useState } from "react";
import {
  getRecommendedBooks,
  addBookFromRecommend,
  getMyBooks,
} from "../../services/booksApi";

export default function RecommendedBooks() {
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const rec = await getRecommendedBooks();
      const my = await getMyBooks();

      // 🔥 BURASI KRİTİK
      setBooks(rec?.results || rec || []);
      setMyBooks(my || []);
    } catch (err) {
      console.error(err);
    }
  };

  const isAdded = (bookId) => {
    return myBooks.some((item) => item.book?._id === bookId);
  };

  const handleAdd = async (book) => {
    try {
      setAddingId(book._id);

      await addBookFromRecommend(book._id);

      const my = await getMyBooks();
      setMyBooks(my || []);
    } catch (err) {
      console.error(err);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div>
      <h2>Recommended Books</h2>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {books.map((book) => (
          <div key={book._id}>
            <img src={book.imageUrl} alt={book.title} width={100} />

            <p>{book.title}</p>
            <p>{book.author}</p>

            {isAdded(book._id) ? (
              <button disabled>Already in library</button>
            ) : (
              <button
                onClick={() => handleAdd(book)}
                disabled={addingId === book._id}
              >
                {addingId === book._id ? "Adding..." : "Add to library"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}