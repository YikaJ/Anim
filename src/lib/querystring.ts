export function parse(str: string){
    const parsed: Record<string, any> = {};

    if (typeof str === "string" && str.length > 0){
      if (str[0] === '?') {
        str = str.substr(1);
      }

      const strArr = str.split('&');

      for (var i = 0, length = strArr.length; i < length; i++){
        var element = str[i],
            eqPos = element.indexOf('='),
            keyValue, elValue;

        if (eqPos >= 0){
          keyValue = element.substr(0,eqPos);
          elValue = element.substr(eqPos +1);
        }
        else {
          keyValue = element;
          elValue = '';
        }

        elValue = decodeURIComponent(elValue);

        if (parsed[keyValue] === undefined){
          parsed[keyValue] = elValue;
        }
        else if (parsed[keyValue] instanceof Array) {
          parsed[keyValue].push(elValue);
        }
        else {
          parsed[keyValue] = [parsed[keyValue], elValue];
        }
      }
    }

    return parsed;
  }

export function stringify(input: any): string {
	// Avoid [].includes (needs to be polyfilled)
	if (!input || [Array, Object].indexOf(input.constructor) === -1) {
		// Always return string, even for inputs that can't be serialized
		return "";
	}
	const flattened: any[] = [];
	(function flatten(input: any, path: string[]): void {
		if (!input || [Boolean, Number, String].indexOf(input.constructor) !== -1) {
			const serializedPath = path.map((key, index) => index ? `[${key}]` : key).join("");
			// Replace null and undefined with empty strings
			flattened.push([serializedPath, input == null ? "" : input]);
		} else if ([Array, Object].indexOf(input.constructor) !== -1) {
			for (const key in input) {
				if (input.hasOwnProperty(key)) {
					flatten(input[key], path.concat([key]));
				}
			}
		}
	})(input, []);
	return flattened.map(pair => pair.map(encodeURIComponent).join("=")).join("&");
}

export default {
  parse,
  stringify
}
