// This file centralizes all the calls to your backend API.

import type { AppType } from './types';
import { mockApps } from './data';

// The base URL of the Python Flask server you created.
const API_BASE_URL = 'http://127.0.0.1:5000';

// A helper function to map the raw data from gplay-scraper to our AppType interface
const mapApiDataToAppType = (data: any): AppType => {
  return {
    _id: data.appId,
    name: data.title,
    slug: data.appId,
    developer: data.developer,
    developerWebsite: data.developerWebsite,
    privacyPolicy: data.privacyPolicy,
    icon: data.icon,
    screenshots: data.screenshots || [],
    shortDescription: data.summary,
    fullDescription: data.description,
    // Safely handle whatsNew which might be an array or null
    whatsNew: Array.isArray(data.whatsNew) && data.whatsNew.length > 0 ? data.whatsNew.join('\\n') : 'No recent updates provided.',
    category: data.genre,
    tags: data.topKeywords ? Object.keys(data.topKeywords) : [],
    version: data.version,
    fileSize: 0, // gplay-scraper doesn't provide this directly, might need another source
    minAndroidVersion: String(data.androidVersion),
    downloads: data.realInstalls || 0,
    ratings: data.ratings || 0,
    reviewsCount: data.reviews || 0,
    averageRating: data.score || 0,
    histogram: data.histogram || [0,0,0,0,0],
    reviews: (data.reviewsData || []).map((r: any) => ({
      id: r.id || Math.random().toString(),
      user: r.user,
      avatar: r.avatar,
      rating: r.rating,
      text: r.text,
      version: r.version || null,
    })),
    contentRating: data.contentRating,
    permissions: data.permissions || {},
    dataSafety: data.dataSafety || [],
    status: 'published',
    isFeatured: data.isFeatured || false,
    updatedAt: data.lastUpdated,
  };
};

export const getAppDetails = async (appId: string): Promise<AppType> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-app-data?id=${appId}`);
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    return mapApiDataToAppType(data);
  } catch (error) {
    console.warn(
      `⚠️ Could not fetch live data for '${appId}'. Falling back to mock data. \n` +
      `Ensure your Python backend server is running on ${API_BASE_URL} to get live data.`,
    );
    const mockApp = mockApps.find(app => app.slug === appId);
    if (mockApp) {
      return mockApp;
    }
    throw new Error(`Failed to fetch app details for ${appId} and no mock data was found.`);
  }
};


const fetchAppsList = async (appIds: string[]): Promise<AppType[]> => {
    // Use Promise.allSettled to ensure that failure of one app fetch doesn't prevent others from loading.
    const results = await Promise.allSettled(
        appIds.map(id => getAppDetails(id))
    );

    return results
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<AppType>).value);
}


export const getFeaturedApps = async (): Promise<AppType[]> => {
  // Use slugs from mock data to ensure fallback works correctly.
  const featuredAppIds = [
    "com.hubolabs.hubo",
    "nova-launcher-prime",
  ];
  const apps = await fetchAppsList(featuredAppIds);
  return apps.map(app => ({...app, isFeatured: true}));
};

export const getLatestApps = async (): Promise<AppType[]> => {
    // Use slugs from mock data to ensure fallback works correctly.
    const latestAppIds = [
        "taskmaster-pro",
        "galaxy-runner",
    ];
    return await fetchAppsList(latestAppIds);
}