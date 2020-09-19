import { atom } from "recoil";

export const userAtom = atom({
	key: "userAtom",
	default: JSON.parse(localStorage.getItem("user")),
	persistence_UNSTABLE: {
		type: "log",
	},
});

export const tokenAtom = atom({
	key: "tokenAtom",
	default: localStorage.getItem("token"),
	persistence_UNSTABLE: {
		type: "log",
	},
});
