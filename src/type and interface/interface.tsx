import { NavigateFunction } from "react-router-dom";

export default interface HubCardProps {
	path: string;
	name: string;
	desciption: string;
	navigate: NavigateFunction;
}
