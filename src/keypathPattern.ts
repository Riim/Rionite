import { namePattern } from './namePattern';
export let keypathPattern = `(?:${namePattern}|\\d+)(?:\\.(?:${namePattern}|\\d+))*`;
