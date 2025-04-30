import { styled } from "styled-components";
import PostReviewForm from "../components/post-review-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
  
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Firefox용 */
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export default function Home() {
    return (
        <Wrapper>
            <PostReviewForm />
            <Timeline />
        </Wrapper>
    );
}
