import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';
import { db } from './config';
import type { Session } from '@/types/session';
import type { Member } from '@/types/member';
import type { HairParameters } from '@/types/hair-params';

// Collection references
const sessionsCol = collection(db, 'sessions');
const usersCol = collection(db, 'users');
const presetsCol = collection(db, 'presets');

// Sessions
export async function createSession(session: Omit<Session, 'id'>): Promise<string> {
  const ref = doc(sessionsCol);
  await setDoc(ref, { ...session, id: ref.id });
  return ref.id;
}

export async function getSession(id: string): Promise<Session | null> {
  const snap = await getDoc(doc(sessionsCol, id));
  return snap.exists() ? (snap.data() as Session) : null;
}

export async function updateSession(id: string, data: Partial<Session>): Promise<void> {
  await updateDoc(doc(sessionsCol, id), data as DocumentData);
}

export async function getSessions(...constraints: QueryConstraint[]): Promise<Session[]> {
  const q = query(sessionsCol, ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as Session);
}

export async function getRecentSessions(count: number = 20): Promise<Session[]> {
  return getSessions(orderBy('createdAt', 'desc'), limit(count));
}

// Users / Members
export async function createMember(member: Omit<Member, 'id'>, uid: string): Promise<void> {
  await setDoc(doc(usersCol, uid), { ...member, id: uid });
}

export async function getMember(uid: string): Promise<Member | null> {
  const snap = await getDoc(doc(usersCol, uid));
  return snap.exists() ? (snap.data() as Member) : null;
}

export async function updateMember(uid: string, data: Partial<Member>): Promise<void> {
  await updateDoc(doc(usersCol, uid), data as DocumentData);
}

export async function deleteMember(uid: string): Promise<void> {
  await deleteDoc(doc(usersCol, uid));
}

export async function getDesigners(): Promise<Member[]> {
  const q = query(usersCol, where('role', '==', 'designer'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as Member);
}

export async function getAllMembers(): Promise<Member[]> {
  const snap = await getDocs(usersCol);
  return snap.docs.map((d) => d.data() as Member);
}

// Presets
export interface HairPreset {
  id: string;
  name: string;
  baseStyleId: string;
  hairParams: HairParameters;
  thumbnailUrl?: string;
  createdBy: string;
  isDefault: boolean;
  createdAt: number;
}

export async function getPresets(): Promise<HairPreset[]> {
  const snap = await getDocs(presetsCol);
  return snap.docs.map((d) => d.data() as HairPreset);
}

export async function savePreset(preset: Omit<HairPreset, 'id'>): Promise<string> {
  const ref = doc(presetsCol);
  await setDoc(ref, { ...preset, id: ref.id });
  return ref.id;
}
