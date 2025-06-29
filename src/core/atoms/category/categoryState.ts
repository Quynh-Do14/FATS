import { atom } from "recoil";

export const CategoryBlogState = atom({
    key: 'CATEGORY_BLOG_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<any>>[],

    }, // default value (aka initial value)
});