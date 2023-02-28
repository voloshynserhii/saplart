const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : process.env.SERVER_URL;

export { url };
