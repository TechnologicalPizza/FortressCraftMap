import { Web } from "../Namespaces/Helper";
import { Type } from "../Content/ContentType";

/** Callback giving the caller access to download statistics. */
export type StatusCallback = (status: DownloadStatus) => void;

/** Callback for an either successful or failed resource download. */
export type DownloadCallback = (uri: string, response: Web.HttpResponse) => void;

/** Statistics used to observe download progress. */
export interface DownloadStatus {

	/** Gets the progress percentage of the request. */
	readonly percentage: number;

	/** Gets the total amount of bytes that the request has downloaded. */
	readonly totalBytesDownloaded: number;

	/** Gets the total amount of files that the request will download. */
	readonly totalFiles: number;
}

/** Defines attributes about a content type. */
export interface ContentTypeDescription {

	/** Gets the root path to the content.
	 * Content root paths should;
	 *  * use forward slash for path separation.
	 *  * begin with a slash.
	 *  * not end with a slash.
	 */
	readonly path: string;

	/** Gets the file extension used by the content type. */
	readonly extension: string;
}

const Descriptions = new Map<Type, ContentTypeDescription>([
	[Type.Texture, { path: "/Textures", extension: ".png" }],
	[Type.VertexShader, { path: "/Shaders/Vertex", extension: ".glsl" }],
	[Type.FragmentShader, { path: "/Shaders/Fragment", extension: ".glsl" }]
]);

export function getDescription(type: Type): ContentTypeDescription {
	if (Descriptions.has(type))
		return Descriptions.get(type);
	throw new Error(`Failed to get description for type '${type}'.`);
}

export function getPath(type: Type): string {
	return getDescription(type).path;
}

export function getExtension(type: Type): string {
	return getDescription(type).extension;
}

export function getType(uri: string): Type {
	for (const [type, desc] of Descriptions) {
		if (uri.startsWith(desc.path) && uri.endsWith(desc.extension))
			return type;
	}
	throw new Error(`Failed to identify content type from URI '${uri}'.`);
}

/**
 * Gets the needed response type for the content type.
 * @param source The content type or content URI.
 */
export function getXHRType(source: Type | string): XMLHttpRequestResponseType {
	if (typeof (source) == "string")
		source = getType(source);

	switch (source) {
		case Type.Texture:
			return "blob";

		case Type.VertexShader:
		case Type.FragmentShader:
			return "text";

		default:
			throw new Error(`Failed to get response type for '${source}'.`);
	}
}

export * from "../Content/ContentType";
export * from "../Content/ContentManager";
export * from "../Content/ContentList";