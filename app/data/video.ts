export const videoPaths: string[] = ['caitlyn', 'kaisa', 'sylas-entrace', 'sylas'];

export const randomNumber = (): number => {
  return Math.floor(Math.random() * videoPaths.length);
};