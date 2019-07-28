import Constants from "../Constants";
import RenderSegment from "../../Graphics/RenderSegment";

export type NumberOrPos = number | MapSegmentPos;

/**
 * Data container for a 2D map segment.
 * */
export default class MapSegment {

	/** The dimensions of a MapSegment. */
	public static readonly size = Constants.segmentSize;

	/** The amount of blocks in a MapSegment. */
	public static readonly blocks = MapSegment.size * MapSegment.size;

	public readonly position: MapSegmentPos;
	public readonly tiles: Uint16Array;

	constructor(position: MapSegmentPos, tiles: Uint16Array) {
		this.position = position;
		this.tiles = tiles;
	}
}

/**
 * Segment position without the default base offset.
 * */
export class MapSegmentPos {

	/** The x coordinate of the segment (minus default base offset).*/
	public readonly x: number;

	/** The y coordinate of the segment (minus default base offset).*/
	public readonly y: number;

	/** The z coordinate of the segment (minus default base offset).*/
	public readonly z: number;

	/** Gets the x coordinate for the corresponding RenderSegment. */
	public get renderX(): number {
		return Math.floor(this.x / RenderSegment.size);
	}

	/** Gets the z coordinate for the corresponding RenderSegment. */
	public get renderZ(): number {
		return Math.floor(this.z / RenderSegment.size);
	}

	/**
	 * Constructs the position from non-offsetted coordinates.
	 * @param x Can be a number or Array. An Array needs to contain at least 2 elements.
	 * @param y May not be null if x is a number.
	 * @param z May not be null if x is a number.
	 */
	constructor(x: number | number[], y?: number, z?: number) {
		if (x instanceof Array) {
			if (x.length == 3) {
				this.x = x[0];
				this.y = x[1];
				this.z = x[2];
			}
			else if (x.length == 2) {
				this.x = x[0];
				this.z = x[1];
				this.y = 0;
			}
			else
				throw new SyntaxError("The 'x' Array may only contain 2 or 3 elements.");
		}
		else {
			if (y == null || z == null) {
				throw new SyntaxError("'y' and 'z' may not be null if 'x' is not an Array.");
			}
			else {
				this.x = x;
				this.y = y;
				this.z = z;
			}
		}
	}

	/**
	 * Helper for type-checking coordinates.
	 * @param x The x coordinate or a MapSegmentPos.
	 * @param z The z coordinate if 'x' is not a MapSegmentPos.
	 * @param callback The callback to call with the checked coordinates.
	 */
	public static getCoords<TResult>(
		callback: (x: number, z: number) => TResult,
		x: NumberOrPos,
		z?: number): TResult {
		if (x instanceof MapSegmentPos)
			return callback(x.x, x.z);
		else if (z != null)
			return callback(x, z);
		else
			throw new SyntaxError("'z' cannot be null if 'x' is not a SegmentPosition.");
	}
}