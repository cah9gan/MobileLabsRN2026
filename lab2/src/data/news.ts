export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const initialNews: NewsItem[] = [
  {
    id: "1",
    title: "Реліз Next.js 15",
    description:
      "Нові можливості маршрутизації та покращена робота з кешем для React-додатків.",
    image: "https://picsum.photos/id/0/400/200",
  },
  {
    id: "2",
    title: "Jujutsu Kaisen добігає кінця",
    description:
      "Останні розділи популярної манги б'ють усі рекорди за переглядами серед фанатів.",
    image: "https://picsum.photos/id/1/400/200",
  },
  {
    id: "3",
    title: "Оновлення Factorio 2.0",
    description:
      "Космічна ера та нові конвеєрні механіки логістики вже доступні для гравців.",
    image: "https://picsum.photos/id/2/400/200",
  },
  {
    id: "4",
    title: "NestJS та Prisma",
    description:
      "Як ефективно налаштувати ORM для мікросервісної архітектури на Node.js.",
    image: "https://picsum.photos/id/3/400/200",
  },
  {
    id: "5",
    title: "Docker Desktop оновлено",
    description: "Покращена швидкодія контейнерів на процесорах Apple Silicon.",
    image: "https://picsum.photos/id/4/400/200",
  },
  {
    id: "6",
    title: "TypeScript 5.5",
    description:
      "Нові можливості виведення типів та покращена продуктивність компілятора.",
    image: "https://picsum.photos/id/5/400/200",
  },
  {
    id: "7",
    title: "Анонс iPhone 17 Pro Max",
    description:
      "Перші чутки про новий дизайн камер, збільшений екран та акумулятор.",
    image: "https://picsum.photos/id/6/400/200",
  },
];
