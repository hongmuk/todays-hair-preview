import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

export async function uploadBase64Image(
  path: string,
  base64Data: string
): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadString(storageRef, base64Data, 'data_url');
  return getDownloadURL(storageRef);
}

export async function uploadSessionImage(
  sessionId: string,
  type: 'before' | 'after',
  base64Data: string
): Promise<string> {
  return uploadBase64Image(`sessions/${sessionId}/${type}.png`, base64Data);
}
