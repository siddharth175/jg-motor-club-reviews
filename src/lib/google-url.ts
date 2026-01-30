// Derived from user provided link CID: 0x423a622e1b5d1a3d -> 4772234705319565885
export const GOOGLE_PLACE_ID = "4772234705319565885";

export const getGoogleReviewUrl = () => {
    return `https://maps.google.com/?cid=${GOOGLE_PLACE_ID}`;
};
