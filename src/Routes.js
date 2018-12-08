import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";

export default function Routes() {
	return [
		{
			path: "/",
			component: Home,
			exact: true
		},
		{
			path: "/contact",
			component: Contact,
			exact: true
		}
	]
}