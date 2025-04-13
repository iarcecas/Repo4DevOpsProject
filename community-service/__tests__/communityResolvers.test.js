// __tests__/communityResolvers.test.js
import { jest } from '@jest/globals';
import resolvers from '../graphql/resolvers.js';
import CommunityPost from '../models/CommunityPost.js';

jest.mock('../models/CommunityPost.js');

// 👇 ADD THIS LINE to fix the `.find` undefined error
CommunityPost.find = jest.fn();

describe('Community Resolvers - getPosts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return posts sorted by createdAt when no category is provided', async () => {
    const mockPosts = [{ title: 'Post 1' }, { title: 'Post 2' }];
    CommunityPost.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(mockPosts) });

    const result = await resolvers.Query.getPosts(null, {});
    expect(CommunityPost.find).toHaveBeenCalledWith({});
    expect(result).toEqual(mockPosts);
  });

  it('should return filtered posts when a category is provided', async () => {
    const mockCategory = 'news';
    const mockPosts = [{ title: 'News Post' }];
    CommunityPost.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(mockPosts) });

    const result = await resolvers.Query.getPosts(null, { category: mockCategory });
    expect(CommunityPost.find).toHaveBeenCalledWith({ category: mockCategory });
    expect(result).toEqual(mockPosts);
  });
});
