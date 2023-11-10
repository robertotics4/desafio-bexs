export interface IConsoleInterface {
  run(filePath: string): Promise<void>;
}
