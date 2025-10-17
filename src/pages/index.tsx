import { useContext } from 'react';
import { GetStaticProps } from 'next';

import client from '~graphql/client';
import { GET_REVIEWS } from '~graphql/queries';
import { GetReviewsProps } from '~graphql/types/graphql';
import { ReviewContext } from '~contexts/ReviewContext';
import { ReviewProps } from '~organisms/Review/Review';

import HomePage from '~templates/HomePage/HomePage';

export default function Home({ reviews }: ReviewProps) {
  const { setReviews } = useContext(ReviewContext);
  setReviews(reviews);

  return <HomePage />;
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { allEvaluations } = await client.request<GetReviewsProps>(GET_REVIEWS, { first: 6 });

    const reviews = allEvaluations.map((review) => {
      return {
        answered: review.answered,
        stars: review.stars,
        feedback: review.feedback,
        name: review.name,
        surname: review.surname
      };
    });

    return {
      props: {
        reviews
      }
    };
  } catch (error) {
    console.log('GraphQL error:', error);
    // Retorna dados mockados em caso de erro
    const reviews = [
      {
        answered: true,
        stars: 5,
        feedback: "Excelente atendimento! Recomendo.",
        name: "João",
        surname: "Silva"
      },
      {
        answered: true,
        stars: 4,
        feedback: "Muito bom serviço, ambiente agradável.",
        name: "Maria",
        surname: "Santos"
      }
    ];

    return {
      props: {
        reviews
      }
    };
  }
};
