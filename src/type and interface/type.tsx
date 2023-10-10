export type IndexCardProps = {
	path: string;
	name: string;
	description: string;
};
type GrapIter = {
	iteration?: number;
	x: number;
	y: number;
};

export type GraphicalRes = {
	data: number;
	iterationData: GrapIter[];
};

type SecantIter = {
	iteration: number;
	xi: number;
	xi_1: number;
	xi_2: number;
};

export type SecantRes = {
	data: string;
	iterationData: SecantIter;
};
