import { Client, Databases, ID, Models, Storage, Account, Teams } from 'appwrite';

import { GrooveSyncEvent } from '@/types';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const storage = new Storage(client);

const account = new Account(client);

const teams = new Teams(client);

export const getEvents = async () => {
  const { documents } = await databases.listDocuments(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_MUSIC_EVENTS_COLLECTION_ID)
  return {
    events: documents.map(doc => mapDocToGrooveSyncEvent(doc))
  }
}

export const getEventById = async (documentId: string): Promise<GrooveSyncEvent> => {
  const result = await databases.getDocument(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_MUSIC_EVENTS_COLLECTION_ID, documentId);

  return mapDocToGrooveSyncEvent(result)
}

export const createEvent = async (event: Omit<GrooveSyncEvent, '$id'>): Promise<GrooveSyncEvent> => {
  const result = await databases.createDocument(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_MUSIC_EVENTS_COLLECTION_ID, ID.unique(), event)

  return mapDocToGrooveSyncEvent(result);
}

export const uploadFile = async (file: File): Promise<Models.File> => await storage.createFile(import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID, ID.unique(), file);

export const getPreviewImageById = (fileId: string): URL => storage.getFilePreview(import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID, fileId);

export const deleteEventById = async (documentId: GrooveSyncEvent['$id']): Promise<Record<string, never>> => await databases.deleteDocument(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_MUSIC_EVENTS_COLLECTION_ID, documentId)

export const deleteFile = async (fileId: string): Promise<Record<string, never>> => await storage.deleteFile(import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID, fileId);

export const login = async (email: string): Promise<Models.Token> => await account.createMagicURLSession(ID.unique(), email, `${window.location.origin}/session`);

export const loginConfirm = async (userId: string, secret: string): Promise<Models.Session> => await account.updateMagicURLSession(userId, secret);

export const getSession = async (sessionId = 'current'): Promise<Models.Session> => await account.getSession(sessionId);

export const deleteSession = async (sessionId = 'current'): Promise<Record<string, never>> => await account.deleteSession(sessionId);

export const getTeams = async (): Promise<Models.Team<Models.Preferences>[]> => (await teams.list()).teams;

const mapDocToGrooveSyncEvent = (document: Models.Document): GrooveSyncEvent => ({
  $id: document.$id,
  name: document.name,
  location: document.name,
  date: document.date,
  imageHeight: document.imageHeight,
  imageWidth: document.imageWidth,
  imageFileId: document.imageFileId
})

