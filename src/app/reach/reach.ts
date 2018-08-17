export class Reach {
  post_impressions: PostImpressions;
  post_impressions_organic: PostImpressions;
  post_impressions_viral: PostImpressions;
  post_impressions_paid: PostImpressions;
}

export class PostImpressions {
  value: string;
  timestamp: Date;
}
