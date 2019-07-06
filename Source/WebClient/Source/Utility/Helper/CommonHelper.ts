
export class Common {

	private static readonly _byteUnits = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	public static clearArray<T>(array: T[]) {
		array.length = 0;
	}

	public static bytesToReadable(count: number): string {
		if (Math.abs(count) < 1024)
			return count + ' B';

		let u = -1;
		do {
			count /= 1024;
			u++;
		} while (Math.abs(count) >= 1024 && u < Common._byteUnits.length - 1);
		return count.toFixed(2) + ' ' + Common._byteUnits[u];
	}

	public static getExtension(path: string): string {
		const lastDot = path.lastIndexOf(".");
		return path.substring(lastDot);
	}

	public static changeExtension(path: string, extension: string | null) {
		const lastDot = path.lastIndexOf(".");
		if (extension == null || extension.length == 0)
			return path.substring(0, lastDot);

		throw "not done";
	}

	public static coordsToSegmentKey(x: number, y: number): string {
		return x + "," + y;
	}

	public static segmentKeyToCoords(key: string): number[] {
		const split = key.split(",");
		return [parseInt(split[0]), parseInt(split[1])];
	}
}