export const ObjectHelper = {
	copyObject: (object) => {
		return JSON.parse(JSON.stringify(object));
	}
};