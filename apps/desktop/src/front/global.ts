import {useRouter} from "@nexts-stack/desktop-uix";

/**
 * The app global state.
 */
const global = {
	/**
	 * The app router.
	 */
	router: null as null | ReturnType<typeof useRouter>
}

export default global;
