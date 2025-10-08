export interface ReviewType {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  version: string | null;
}

export interface AppType {
  _id: string;
  name: string;
  slug: string;
  developer: string;
  developerWebsite: string;
  privacyPolicy: string;
  icon: string;
  screenshots: string[];
  shortDescription: string;
  fullDescription: string;
  whatsNew: string;
  category: string;
  tags: string[];
  version: string;
  fileSize: number; // in MB
  minAndroidVersion: string;
  downloads: number;
  ratings: number; // Total number of ratings
  reviewsCount: number; // Total number of reviews
  averageRating: number;
  histogram: number[]; // [1 star, 2 star, ..., 5 star]
  reviews: ReviewType[];
  contentRating: string;
  permissions: Record<string, string[]>;
  dataSafety: string[];
  status: 'published' | 'draft';
  isFeatured: boolean;
  updatedAt: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  icon: string; // URL or identifier for an icon component
  appsCount: number;
}
