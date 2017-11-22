export type TComponentParamConfig =
	| Function
	| {
			type?: Function | string;
			required?: boolean;
			readonly?: boolean;
		};

export function ComponentParamDecorator(
	name?: string | null,
	type?: TComponentParamConfig
): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export function ComponentParamDecorator(
	type?: TComponentParamConfig
): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export function ComponentParamDecorator(
	name?: string | TComponentParamConfig | null,
	type?: TComponentParamConfig
) {
	if (typeof name == 'function') {
		type = name;
		name = undefined;
	}

	return (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => {
		//
	};
}
