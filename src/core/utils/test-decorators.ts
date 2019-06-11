export const MetaClassDecorator = (): ClassDecorator => target => {
	console.log(Reflect.getMetadata("design:paramtypes", target));
};
