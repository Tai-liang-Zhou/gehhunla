export const normalizeName = name => name.normalize('NFKC').replace(/\s+/gu, '');

export function lookupGuest(guests, name) {
  if (typeof name !== 'string' || !normalizeName(name)) return { message: '先告訴我們你的名字吧！' };
  if (name.length > 80) return { message: '請輸入有效的完整姓名（最多 80 字）。' };
  const inputName = normalizeName(name);
  const exactMatches = guests.filter(guest => normalizeName(guest.name) === inputName);
  const matches = exactMatches.length ? exactMatches : guests.filter(guest => {
    const guestName = normalizeName(guest.name);
    return guestName.length > 0 && inputName.includes(guestName);
  });
  if (!matches.length) return { message: '還沒找到你的名字，可以聯繫台亮或孟庭確認！' };
  if (matches.length > 1) return { message: '有多筆符合的賓客資料，請洽現場接待人員確認桌次。' };
  return { guest: matches[0] };
}
