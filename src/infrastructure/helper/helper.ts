import moment from "moment";
import slugify from "slugify";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const validateFields = (isImplicitChange = false, key: any, isCheck: any, setError: Function, error: any, message: string) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};

export const configImageURL = (img: string) => {
    if (img) {
        return `${baseURL}/files/preview/${img}`
    }
    return ""
}

export const configFileURL = (img: string) => {
    if (img) {
        return `${baseURL}/files/files/stream/${img}`
    }
    return ""
}

export const convertStringToBoolean = (value: string) => {
    const booleanValue = value === 'true'; // Chuyển chuỗi 'true' và 'false' về boolean
    return booleanValue
};

export const convertDate = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DD hh:mm:ss");
    } return null;

};
export const convertDateShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm:ss DD-MM-YYYY");
    } return null;

};

export const convertDateOnlyShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD-MM-YYYY");
    } return null;

};

export const convertDateOnly = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DD");
    } return null;

};
export const convertDateBooking = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DDThh:mm:ss");
    } return null;
};

export const formatCurrencyVND = (amount: any) => {
    // Định dạng số với phân cách hàng nghìn
    let formattedAmount = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedAmount} ₫`;
}

export const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const splitTakeId = (route: string) => {
    if (route) {
        const word1 = route.split(".html");
        const word2 = word1[0].split("-");
        const wordResult = word2[word2.length - 1];
        return wordResult
    }
    return "";
}


export const convertSlug = (str: string) => {
    if (str) {
        return slugify(str, { lower: true, locale: "vi" })
    }
    return ""
};

export const getEmbedUrl = (youtubeUrl: string) => {
    const match = youtubeUrl.match(/(?:\?v=|\/embed\/|\.be\/)([\w\-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};


export const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};
