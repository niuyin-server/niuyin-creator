import {defineStore} from "pinia";
import {ref} from "vue";

export const themeX = defineStore(
    "theme",
    () => {
        let dark = ref(false);
        const setDark = (val) => {
            dark.value = val;
        };
        const removeDark = () => {
            dark.value = false;
        };
        return {
            dark,
            setDark,
            removeDark,
        };
    },
    {
        persist: true,
    }
);
