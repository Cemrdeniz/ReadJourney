import { useEffect, useState } from "react";
import { getMyBooks, removeBook } from "../../services/booksApi";

export default function MyLibrary() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getMyBooks();

        // 🔥 DOĞRU YAPI
        setBooks(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await removeBook(id);

      const data = await getMyBooks();
      setBooks(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>My Library</h2>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {books.map((item) => {
          const book = item.book;

          return (
            <div key={item._id}>
              {/* IMAGE */}
              {book?.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  width={100}
                />
              )}

              {/* TITLE */}
              <p>{book?.title}</p>

              {/* AUTHOR */}
              <p>{book?.author}</p>

              <button onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}