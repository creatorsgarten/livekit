/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Events = "events",
	Sponsors = "sponsors",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type EventsRecord = {
	name?: string
	logo?: string
	useBackgroundImage?: boolean
	backgroundColor?: string
	backgroundImage?: string
	sponsors?: RecordIdString[]
}

export type SponsorsRecord = {
	logo?: string
	position?: number
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type SponsorsResponse = Required<SponsorsRecord> & BaseSystemFields
export type UsersResponse = Required<UsersRecord> & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	events: EventsRecord
	sponsors: SponsorsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	events: EventsResponse
	sponsors: SponsorsResponse
	users: UsersResponse
}