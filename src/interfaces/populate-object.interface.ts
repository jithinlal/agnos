export interface PopulateObjectInterface {
	path: any;
	select?: any;
	model?: string | undefined;
	populate?: [PopulateObjectInterface];
}
