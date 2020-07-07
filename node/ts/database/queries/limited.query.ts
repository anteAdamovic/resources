export class LimitedQuery {
  private limit!: number;
  private offset!: number;

  public static MIN_LIMIT: number = 1;
  public static MAX_LIMIT: number = 100;
  public static DEFAULT_LIMIT: number = 10;

  public static MIN_OFFSET: number = 0;
  public static MAX_OFFSET: number = 1000;
  public static DEFAULT_OFFSET: number = 0;

  constructor(limit?: number, offset?: number) {
      this.verifyLimit(limit);
      this.verifyOffset(offset);
  }

  public getLimit(): number {
      return this.limit;
  }

  public getOffset(): number {
      return this.offset;
  }

  private verifyLimit(limit: number | undefined) {
      if(!limit && limit !== 0) {
          return this.limit = LimitedQuery.DEFAULT_LIMIT;
      }

      if (typeof limit === 'number') {
          if (limit === 0) {
              this.limit = 9007199254740991; // Max int value
          } else if (limit < 0) {
              throw new Error('Limit must be a positive or zero number!');
          } else {
              limit = Math.min(LimitedQuery.MAX_LIMIT, limit);
              limit = Math.max(LimitedQuery.MIN_LIMIT, limit);
              this.limit = limit;
          }
      } else {
          throw new Error('Limit can only be a number!');
      }
  }

  private verifyOffset(offset: number | undefined) {
      if(!offset) {
          return this.offset = LimitedQuery.DEFAULT_OFFSET;
      }

      if (typeof offset === 'number') {
          if (offset < 0) {
              throw new Error('Offset must be a positive or zero number!');
          } else {
              offset = Math.min(LimitedQuery.MAX_OFFSET, offset);
              offset = Math.max(LimitedQuery.MIN_OFFSET, offset);
              this.offset = offset;
          }
      } else {
          throw new Error('Offset can only be a number!');
      }
  }
}