export abstract class PaginationArgs {
  first!: number | null;
  after!: string | null;

  last!: number | null;
  before!: string | null;
}
