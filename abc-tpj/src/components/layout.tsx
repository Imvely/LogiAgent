import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { RedBold, Title } from "./auth-components";

const Wrapper = styled.div`
    display:grid;
    gap:20px;
    grid-template-columns: 1fr 4fr;
    height: 100%;
    padding: 50px 0px;
    width: 100%;
    max-width: 860px;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const MunuItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border:2px solid white;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    svg {
        width: 30px;
        fill: white;
    }
    &.log-out {
        border-color: #ed1b24;
        svg{
            fill: #ed1b24;
        }
    }
`;

export default function Layout() {
    const navigate = useNavigate();
    const onLogOut = async () => {
        const ok = confirm("Are you sure you want to log out?");
        if (ok) {
            await auth.signOut();
            navigate("/login");
        }
    }
    return (
        <Wrapper>
            <Menu>
                <Title><RedBold>L</RedBold>-ogiAgent</Title>
                <Link to="/">
                    <MunuItem>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                        </svg>
                    </MunuItem>
                </Link>
                <Link to="/profile">
                    <MunuItem>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                        </svg>
                    </MunuItem>
                </Link>
                <MunuItem onClick={onLogOut} className="log-out">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clip-rule="evenodd" />
                    </svg>
                </MunuItem>
            </Menu>
            <Outlet />
        </ Wrapper>
    );
}