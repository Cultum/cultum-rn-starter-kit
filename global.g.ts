declare interface NodeModule {
  hot: {
    accept(path?: () => void): void
  }
}
