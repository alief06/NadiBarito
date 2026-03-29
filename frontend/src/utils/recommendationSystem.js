/**
 * Simple Categorical Recommendation System
 * Logic:
 * 1. Get user favorite categories from their liked items
 * 2. Rank categories by frequency
 * 3. Filter items matching the top categories
 * 4. Exclude items already in favorites
 * 5. Limit to top N results
 */

export const getRecommendations = (allItems, userFavorites, favoriteIds) => {
    if (!favoriteIds || favoriteIds.length === 0) {
        // Fallback: return highest rated items if no favorites
        return [...allItems]
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 4);
    }

    // 1. Calculate category weights
    const categoryWeights = {};
    userFavorites.forEach(item => {
        const category = item.category || 'General';
        categoryWeights[category] = (categoryWeights[category] || 0) + 1;
    });

    // 2. Score items
    const scoredItems = allItems
        .filter(item => !favoriteIds.includes(item._id)) // Exclude already liked
        .map(item => {
            const category = item.category || 'General';
            const score = (categoryWeights[category] || 0) * (item.rating || 4);
            return { ...item, recommendationScore: score };
        });

    // 3. Sort and slice
    return scoredItems
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 4);
};
