import fs from 'fs';
import path from 'path';
import { Book } from '../constants/types';

const readingListFilePath = path.join(__dirname, '../data/readingList.json');

export const readReadingListData = (): Book[] => {
  try {
    const data = fs.readFileSync(readingListFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading reading list data:', err);
    return [];
  }
};

export const writeReadingListData = (data: Book[]): void => {
  try {
    console.log('book', data);
    fs.writeFileSync(readingListFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing reading list data:', err);
  }
};
