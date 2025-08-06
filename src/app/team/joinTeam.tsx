"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import BannerCommon from "@/infrastructure/common/components/banner/BannerCommon";
import banner2 from "@/assets/images/banner/banner2.png";
import banner3 from "@/assets/images/banner/banner3.png";
import lock from "@/assets/images/lock.gif";
import avatar from "@/assets/images/no-avatar.png";
import { configImageURL } from "@/infrastructure/helper/helper";
import { isTokenStoraged } from "@/infrastructure/utils/storage";
import teamService from "@/infrastructure/repositories/team/team.service";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { FullPageLoading } from "@/infrastructure/common/components/controls/loading";
import "@/assets/styles/page/team.css";
import Loading from "./loading";

const JoinTeam = ({ params }: { params: { id: string } }) => {
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [detailTeam, setDetailTeam] = useState<any>({});
    const [member, setMember] = useState<any[]>([]);
    const [token, setToken] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const teamId = searchParams.get("teamId");
    const id = params.id;

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const tokenS = await isTokenStoraged();
                setToken(tokenS);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(true);
            }
        };
        fetchToken();
    }, []);

    const onJoinTeamAsync = async () => {
        try {
            await teamService.JoinTeam(
                String(id),
                String(teamId),
                () => { },
                setLoading
            );
            router.push(ROUTE_PATH.TEAM_PAGE);
        } catch (error) {
            console.error(error);
        }
    };

    const onGetInfoTeamAsync = async () => {
        try {
            const res = await teamService.GetTeamById(String(teamId), setLoading);
            if (res) {
                setDetailTeam(res);
                setMember(res?.members || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        onGetInfoTeamAsync();
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <LayoutClient>
                <BannerCommon
                    title={"Quỹ nhóm"}
                    sub={"Tham gia nhóm"}
                    backgroundUrl={banner2}
                />
                <div className="team-container padding-common">
                    {!isLoading &&
                        (Object.keys(detailTeam).length === 0 ? (
                            <div className="lock-team">
                                <div className="loading-card">
                                    <div className="spinner">
                                        <img src={lock.src} alt="" />
                                    </div>
                                    <p className="loading-text">
                                        Nhóm này đã bị khóa hoặc không tồn tại
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="join-card">
                                <img
                                    src={
                                        detailTeam.imageCode
                                            ? configImageURL(detailTeam.imageCode)
                                            : banner3.src
                                    }
                                    alt="Team Avatar"
                                    className="team-avatar"
                                />
                                <h2 className="team-name">{detailTeam.name}</h2>
                                <p className="invite-message">
                                    Tham gia vào nhóm để cùng quản lý quỹ chung.
                                </p>
                                <div className="member-avatars">
                                    {member.slice(0, 3).map((item, index) => (
                                        <img
                                            key={index}
                                            src={item.avatarCode ? configImageURL(item.avatarCode) : avatar.src}
                                            alt="Member"
                                        />
                                    ))}
                                    {member.length > 3 && (
                                        <span className="more">+{member.length - 3}</span>
                                    )}
                                </div>
                                <div className="actions">
                                    <button
                                        onClick={() =>
                                            token
                                                ? onJoinTeamAsync()
                                                : router.push(ROUTE_PATH.LOGIN)
                                        }
                                        className="join-btn"
                                    >
                                        {token ? "Tham gia nhóm" : "Đăng nhập"}
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <FullPageLoading isLoading={loading} />
            </LayoutClient>
        </Suspense>
    );
};

export default JoinTeam;
