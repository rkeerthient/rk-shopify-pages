export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export enum C_greysonProductRole {
	PARENT = "Parent",
	VARIANT = "Variant",
}

export default interface Product {
	slug?: string,
	name: string,
	c_greysonColorList?: string[],
	c_greysonDepartment?: string,
	c_greysonPattern?: string,
	c_greysonPhotoGallery?: Image[],
	c_greysonProductCategory?: string[],
	c_greysonProductPage?: string,
	c_greysonProductPhoto?: Image,
	c_greysonProductRole?: C_greysonProductRole,
	c_greysonSleeveLength?: string,
	c_greysonStatus?: string,
	keywords?: string[],
}
