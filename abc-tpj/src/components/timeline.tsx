import { collection, doc, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Review from "./review";
import { Unsubscribe } from "firebase/auth";

export interface iReview {
    id: string;
    photo?: string;
    review: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

export default function Timeline() {
    const [reviews, setReviews] = useState<iReview[]>([]);

    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const fetchReviews = async () => {
            const reviewsQuery = query(
                collection(db, "reviews"),
                orderBy("createdAt", "desc"),
                limit(25)
            );
            unsubscribe = await onSnapshot(reviewsQuery, (snapshot) => {
                const reviews = snapshot.docs.map((doc) => {
                    const { review, createdAt, userId, username, photo } = doc.data();
                    return {
                        review,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id: doc.id,
                    };
                });
                setReviews(reviews);
            })
        };
        fetchReviews();
        return () => {
            unsubscribe && unsubscribe();
        }
    }, []);
    return (
        < Wrapper > {
            reviews.map((review) => (
                <Review key={review.id} {...review} />
            ))}
        </ Wrapper >
    );
}