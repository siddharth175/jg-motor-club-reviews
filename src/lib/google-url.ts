export const GOOGLE_PLACE_ID = "ChIJt7j_M9BTwokRfTUfHwFKRUQ";

export const getGoogleReviewUrl = () => {
    return `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;
};
