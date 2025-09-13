export type FaqDict = {
  readonly page: {
    readonly title: string;
    readonly description: string;
  };
  readonly items: readonly {
    readonly question: string;
    readonly answer: string;
    readonly icon?: string;
    readonly iconPosition?: "left" | "right";
  }[];
};
