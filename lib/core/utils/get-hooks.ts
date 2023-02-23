import path from 'path';

export const getHooks = async (hooks: string[]) => {
  const length = hooks.length;
  const res: any[] = []
  for (let i = 0; i < length; i++) {
    const hook = hooks[i];
    const h = await import(path.join(__dirname, `../hooks/${hook}`));
    res.push(h)
  }
  return res
}