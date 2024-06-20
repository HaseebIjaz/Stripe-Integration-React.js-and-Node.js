import "dotenv/config";
const config = {
  sk_test: String(process.env.SK_TEST),
  pk_test: String(process.env.PK_TEST),
  port: String(process.env.PORT || "8282"),
};

export default config;
