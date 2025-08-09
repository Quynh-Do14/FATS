"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import "@/assets/styles/components/MainLayout.css";
import HeaderClient from "./Header";
import HeaderMobileComponent from "./Header-Mobile";
import { isTokenStoraged } from "../../utils/storage";
import authService from "../../repositories/auth/service/auth.service";
import { useRecoilState } from "recoil";
import { ProfileState } from "@/core/atoms/profile/profileState";
import budgetService from "../../repositories/budget/budget.service";
import { BudgetState } from "@/core/atoms/budget/budgetState";
import { CategoryBlogState } from "@/core/atoms/category/categoryState";
import categoryBlogService from '@/infrastructure/repositories/category/categoryBlog.service';

const LayoutClientNoFooter = ({ ...props }: any) => {
    const [isLoginClick, setIsLoginClick] = useState<boolean>(false);
    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [isOpenModalProfile, setIsOpenModalProfile] = useState<boolean>(false);
    const [isOpenModalChangePassword, setIsOpenModalChangePassword] = useState<boolean>(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollDirection, setScrollDirection] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const [token, setToken] = useState<boolean>(false);
    const [isLoadingToken, setIsLoadingToken] = useState<boolean>(false);
    const [dataProfile, setDataProfile] = useState<any>({});
    const [, setProfileState] = useRecoilState(ProfileState);
    const [, setBudgetState] = useRecoilState(BudgetState);
    const [, setCategoryBlogState] = useRecoilState(CategoryBlogState);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const tokenS = await isTokenStoraged();
                setToken(tokenS);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingToken(true);
            }
        };

        fetchToken();
    }, []);

    const getProfileUser = async () => {
        if (isLoadingToken) {
            if (!token) return;
            try {
                await authService.profile(
                    () => { }
                ).then((response) => {
                    if (response) {
                        setDataProfile(response)
                        setProfileState(
                            {
                                data: response,
                            }
                        )
                    }
                })
            } catch (error) {
                console.error(error);
            }
        }
    }
    const onGetBudgetAsync = async () => {
        if (isLoadingToken) {
            if (!token) return;
            try {
                await budgetService.GetBudget(
                    () => { }
                ).then((response) => {
                    setBudgetState({
                        data: response
                    });

                })
            }
            catch (error) {
                console.error(error)
            }
        }
    };


    useEffect(() => {
        getProfileUser().then(() => { })
        onGetBudgetAsync().then(() => { });
    }, [token, isLoadingToken])

    const onGetListCategoryBlogAsync = async () => {
        try {
            await categoryBlogService.GetCategory(
                {},
                () => { }
            ).then((response) => {
                setCategoryBlogState(
                    {
                        data: response.content,
                    }
                )
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListCategoryBlogAsync().then(() => { });
    }, []);


    const handleScroll = useCallback(() => {
        if (scrollRef.current) {
            const currentScrollY = scrollRef.current.scrollTop;
            if (currentScrollY > lastScrollY) {
                setScrollDirection(false);
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection(true);
            }
            setLastScrollY(currentScrollY);

        }
    }, [lastScrollY]);

    useEffect(() => {
        const element = scrollRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);

            return () => {
                element.removeEventListener('scroll', handleScroll);
            };
        }
        return () => { };
    }, [lastScrollY]);
    return (
        <div className="main-layout-client">
            <HeaderMobileComponent
                collapsed={collapsed}
                dataProfile={dataProfile}
                setCollapsed={setCollapsed}
                isLoginClick={isLoginClick}
                setIsLoginClick={setIsLoginClick}
                isOpenModalLogout={isOpenModalLogout}
                setIsOpenModalLogout={setIsOpenModalLogout}
                isOpenModalProfile={isOpenModalProfile}
                setIsOpenModalProfile={setIsOpenModalProfile}
                isOpenModalChangePassword={isOpenModalChangePassword}
                setIsOpenModalChangePassword={setIsOpenModalChangePassword}
            />
            <HeaderClient
                dataProfile={dataProfile}
                scrollDirection={scrollDirection}
                lastScrollY={lastScrollY}
                isLoginClick={isLoginClick}
                setIsLoginClick={setIsLoginClick}
                isOpenModalLogout={isOpenModalLogout}
                setIsOpenModalLogout={setIsOpenModalLogout}
                isOpenModalProfile={isOpenModalProfile}
                setIsOpenModalProfile={setIsOpenModalProfile}
                isOpenModalChangePassword={isOpenModalChangePassword}
                setIsOpenModalChangePassword={setIsOpenModalChangePassword}
            />
            {/* <div className="overlay"></div> */}
            <div ref={scrollRef} className="content-layout-client">
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default LayoutClientNoFooter