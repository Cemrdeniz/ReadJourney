import styles from "./BookCard.module.css";

export default function BookCard({ book, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={book.imageUrl} alt={book.title} />
      <h4>{book.title}</h4>
      <p>{book.author}</p>
    </div>
  );
}