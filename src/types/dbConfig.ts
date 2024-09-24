export interface DbConfig {
  type: "postgres" | "mysql" | "mongodb";
  config: any;
}
