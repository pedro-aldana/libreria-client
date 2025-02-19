import BookList from "./components/BookList/BookList";
import BookOverview from "./components/BookOverview/BookOverview";

export default function Home() {
  return (
    <>
      <BookOverview />

      <BookList />
    </>
  );
}
