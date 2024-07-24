import { useMemo } from "react";

// Define types for prize data and lucky history
type PrizeData = [string, number];
type LuckyHistoryItem = { prize: string; user: string; time: string };

// Define named constants for probabilities
const PROBABILITIES: PrizeData[] = [
  ["Macbook Pro 13", 0.03],
  ["SH 300i", 0.03],
  ["Iphone 14 Promax", 0.03],
  ["Mercedes c300", 0.01],
  ["8k", 0.6],
  ["888k", 0.2],
  ["8888k", 0.1],
];

// Define named constants for other configurations
const PHONE_PREFIXES: string[] = [
  "036",
  "034",
  "094",
  "092",
  "096",
  "078",
  "085",
  "093",
  "092",
  "091",
  "038",
  "037",
  "039",
];
const MIN_RANDOM_NUMBER = 1000;
const MAX_RANDOM_NUMBER = 9999;
const DAYS_BACK = 4;

// Generate a random number within a range
function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random phone number
function generatePhone(): string {
  const prefix = PHONE_PREFIXES[random(0, PHONE_PREFIXES.length - 1)];
  const suffix = `***${random(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER)}`;
  return prefix + suffix;
}

// Generate a random date within the last few days
function getRandomDate(daysBack: number): string {
  const today = new Date();
  const pastDates = Array.from({ length: daysBack }, (_, i) => {
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - i);
    return pastDate;
  });
  const randomIndex = Math.floor(Math.random() * pastDates.length);
  const chosenDate = pastDates[randomIndex];
  const day = chosenDate.getDate().toString().padStart(2, "0");
  const month = (chosenDate.getMonth() + 1).toString().padStart(2, "0");
  const year = chosenDate.getFullYear().toString();
  const hour = chosenDate.getHours().toString().padStart(2, "0");
  const minute = chosenDate.getMinutes().toString().padStart(2, "0");
  const second = chosenDate.getSeconds().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}

// Choose a prize based on probabilities
function choosePrize(prizesWithProbability: PrizeData[]): string {
  const totalProbability = prizesWithProbability.reduce(
    (sum, [, probability]) => sum + probability,
    0
  );
  const randomNumber = Math.random() * totalProbability;
  let cumulativeProbability = 0;
  for (const [prize, probability] of prizesWithProbability) {
    cumulativeProbability += probability;
    if (randomNumber < cumulativeProbability) {
      return prize;
    }
  }
  return prizesWithProbability[prizesWithProbability.length - 1][0];
}

export function LuckyDrawHistory(): LuckyHistoryItem[] {
  const dataArray = useMemo(() => {
    const today = new Date();
    const currentHour = today.getHours();
    const is5am = currentHour === 5;
    const valuesToAdd = is5am ? random(10, 12) : 0;
    const existingDataArray: LuckyHistoryItem[] = [];
    for (let i = 0; i < 48; i++) {
      const prize = choosePrize(PROBABILITIES);
      const user = generatePhone();
      const time = getRandomDate(DAYS_BACK);
      const data = { prize, user, time };
      existingDataArray.push(data);
    }
    for (let i = 0; i < valuesToAdd; i++) {
      const prize = choosePrize(PROBABILITIES);
      const user = generatePhone();
      const time = today.toISOString();
      const data = { prize, user, time };
      existingDataArray.push(data);
    }
    return existingDataArray.sort((a, b) => {
      const timeA = new Date(a.time);
      const timeB = new Date(b.time);
      // So sánh theo ngày-tháng-năm
      if (timeA.getFullYear() !== timeB.getFullYear()) {
        return timeA.getFullYear() - timeB.getFullYear();
      }
      if (timeA.getMonth() !== timeB.getMonth()) {
        return timeA.getMonth() - timeB.getMonth();
      }
      return timeA.getDate() - timeB.getDate();
    });
  }, []);

  return dataArray;
}
