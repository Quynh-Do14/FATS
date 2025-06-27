import { Endpoint } from "@/core/common/apiLink";
import { RequestService } from "../../utils/response";

class StaticService {
    async PersonalStatisticalByGoal(
        goalId: string,
        endDate: string,
        startDate: string,
        timeRange: string,
        setLoading: (loading: boolean) => void
    ) {
        setLoading(true);
        try {
            const response = await RequestService.get(`${Endpoint.Static.Personal.GetStatisticalGoal}`, {
                endDate,
                startDate,
                timeRange
            });
            return response;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async TeamStatisticalByGoal(
        goalId: string,
        byStat: "type" | "user",
        endDate: string,
        startDate: string,
        timeRange: string,
        setLoading: (loading: boolean) => void
    ) {
        setLoading(true);
        try {
            const response = await RequestService.get(`${Endpoint.Static.Team.GetStatisticalGoal}/${goalId}`, {
                endDate,
                startDate,
                timeRange,
                byStat
            });
            return response;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async getStatisticalByTime(
        goalId: string,
        type: "week" | "month",
        setLoading: (loading: boolean) => void
    ) {
        const url = goalId ? `${Endpoint.Static.Common.Team}/${goalId}` : Endpoint.Static.Common.Personal;
        setLoading(true);
        try {
            const response = await RequestService.get(url, {
                timeRange: type
            });
            return response;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
}

const staticService = new StaticService();
export default staticService;
