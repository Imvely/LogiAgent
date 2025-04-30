import { styled } from "styled-components";
import { iReview } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
`;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
`;

const DeleteButton = styled.button`
    background-color: #ed1b24;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 50px;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.9;
    }
`;

export default function Review({ username, photo, review, userId, id }: iReview) {
    const user = auth.currentUser;
    const onDelete = async () => {
        const ok = confirm("Are you sure you want to delete this review?");
        if (!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "reviews", id));
            if (photo) {
                const photoRef = ref(storage, `reviews/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
            console.log(e);
        } finally {
            //
        }
    };
    return (
        <Wrapper>
            <Column>
                <Username>{username}</Username>
                <Payload>{review}</Payload>
                {user?.uid === userId ? (
                    <DeleteButton onClick={onDelete}>X</DeleteButton>
                ) : null}
            </Column>
            <Column>
                {photo ? (<Photo src={photo} />) : null}
            </Column>
        </ Wrapper>
    );
}