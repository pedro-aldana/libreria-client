interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  total_copies: number;
  copies: string;
  avalible_copies: string;
  description: string;
  color: string;
  cover: string;
  video: string;
  summary: string;
  isLoanedBook?: boolean;
}
